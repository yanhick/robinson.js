var _ = require('lodash');

var StyledNode = require('./styled-node');
var MatchedRule = require('./matched-rule');

module.exports = styleTree;

function styleTree (root, stylesheet) {

    var values = root.nodeType === 1 ? specifiedValues(root, stylesheet) : {},

        children = root.children.map(function (child) {
            return styleTree(child, stylesheet);
        });

    return new StyledNode(root, values, children);
}

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

function matchingRules (elem, stylesheet) {
    return _.compact(stylesheet.rules.map(function (rule) {
        return matchRule(elem, rule);
    }));
}

function matchRule (elem, rule) {
    var matchedSelector = _.find(rule.selectors, function (selector) {
        return matches(elem, selector);
    });

    if (!matchedSelector) {
        return null;
    }

    return new MatchedRule(matchedSelector.specificity(), rule);
}

function matches (elem, selector) {
    switch (selector.type) {
        case 'simple':
            return matchesSimpleSelector(elem, selector.value);
    }
}

function matchesSimpleSelector (elem, selector) {

    if (selector.tagName !== null && elem.tagName !== selector.tagName) {
        return false;
    }

    if (selector.id !== null && elem.id !== selector.id) {
        return false;
    }

    if (! _.all(selector.className, function (name) {
        return elem.classes().indexOf(name) !== -1;
    })) {
        return false;
    }

    return true;
}

