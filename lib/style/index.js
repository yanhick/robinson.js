/**
 * Code for applying CSS styles to the DOM.
 *
 * This is not very interesting at the moment. It will get much more
 * complicated if I add support for compound selectors.
 */

var _ = require('lodash');

var StyledNode = require('./styled-node');
var MatchedRule = require('./matched-rule');

module.exports = styleTree;

// Apply a stylesheet to an entire DOM tree, returning a StyledNode tree.
//
// This finds only the specified values at the moment. Eventually it should
// be extended to find the computed values too, including inherited values.
function styleTree (root, stylesheet) {

    var values = root.nodeType === 1 ? specifiedValues(root, stylesheet) : {},

        children = root.children.map(function (child) {
            return styleTree(child, stylesheet);
        });

    return new StyledNode(root, values, children);
}

// Apply styles to a single element, returning the specified styles.
function specifiedValues (elem, stylesheet) {
    var values = {},
        matchedRules = matchingRules(elem, stylesheet);

    matchedRules.sort(function (a, b) {
        return a.specificity - b.specificity;
    });

    var rules = matchedRules.map(function (matchedRule) {
        return matchedRule.rule;
    });

    rules.forEach(function (rule) {
        rule.declarations.forEach(function (declaration) {
            values[declaration.name] = declaration.value;
        });
    });

    return values;
}

// Find all CSS rules that match the given element.
function matchingRules (elem, stylesheet) {
    // For now, we just do a linear scan of all the rules. For large
    // documents, it would be more efficient to store the rules in hash tables
    // based on tag name, id, class, etc.
    return _.compact(stylesheet.rules.map(function (rule) {
        return matchRule(elem, rule);
    }));
}

// If `rule` matches `elem`, return a `MatchedRule`. Otherwise return `null`.
function matchRule (elem, rule) {
    var matchedSelector = _.find(rule.selectors, function (selector) {
        return matches(elem, selector);
    });

    if (!matchedSelector) {
        return null;
    }

    return new MatchedRule(matchedSelector.specificity(), rule);
}

// Selector matching:
function matches (elem, selector) {
    switch (selector.type) {
        case 'simple':
            return matchesSimpleSelector(elem, selector.value);
    }
}

function matchesSimpleSelector (elem, selector) {

    // Check type selector
    if (selector.tagName !== null && elem.tagName !== selector.tagName) {
        return false;
    }

    // Check ID selector
    if (selector.id !== null && elem.id() !== selector.id) {
        return false;
    }

    // Check class selector
    if (! _.all(selector.className, function (name) {
        return elem.classes().indexOf(name) !== -1;
    })) {
        return false;
    }

    // We didn't find any non-matching selector components.
    return true;
}

