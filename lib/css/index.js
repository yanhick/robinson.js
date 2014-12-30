/**
 * A simple parser for a tiny subset of CSS.
 *
 * To support more CSS syntax, it would probably be easiest to replace
 * this hand-rolled parser with one based on library or parser generator.
 */

var assert = require('assert');
var Stylesheet = require('./stylesheet');
var Selector = require('./selector');
var SimpleSelector = require('./simple-selector');
var Declaration = require('./declaration');
var Rule = require('./rule');
var Value = require('./value');
var Unit = require('./unit');
var Color = require('./color');

module.exports = function () {

    var pos = 0,

        input = '',

        // Parse a whole CSS stylesheet.
        parse = function (css) {
            pos = 0;
            input = css;

            return new Stylesheet(parseRules());
        },

        // Parse a list of rule sets, separated by optional whitespace.
        parseRules = function () {
            var rules = [];
            while (true) {
                consumeWhiteSpace();
                if (eof()) {
                    break;
                }

                rules.push(parseRule());
            }
            return rules;
        },

        // Parse a rule set: `<selectors> { <declarations> }`.
        parseRule = function () {
            return new Rule(parseSelectors(), parseDeclarations());
        },

        // Parse a comma-separated list of selectors.
        parseSelectors = function () {
            var selectors = [];
            while (true) {
                selectors.push(new Selector().SimpleSelector(parseSimpleSelector()));
                consumeWhiteSpace();
                if (nextChar() === ',') {
                    consumeChar();
                    consumeWhiteSpace();
                }
                else if (nextChar() === '{') {
                    break;
                }
                else {
                    throw 'Unexpected character' + nextChar() + 'in selector list';
                }
            }

            // Return selectors with highest specificity first, for use in matching.
            selectors.sort(function (a, b) {
                return a.specificity() - b.specificity();
            });
            return selectors;
        },

        // Parse one simple selector, e.g.: `type#id.class1.class2.class3`
        parseSimpleSelector = function () {
            var selector = new SimpleSelector(null, null, []);
            while (!eof()) {
                if (nextChar() ===  '#') {
                    consumeChar();
                    selector.id = parseIdentifier();
                }
                else if (nextChar() === '.') {
                    consumeChar();
                    selector.className.push(parseIdentifier());
                }
                else if (nextChar() === '*') {
                    // universal selector
                    consumeChar();
                }
                else if (validIdentifierChar(nextChar())) {
                    selector.tagName = parseIdentifier();
                }
                else {
                    break;
                }
            }
            return selector;
        },

        // Parse a list of declarations enclosed in `{ ... }`.
        parseDeclarations = function () {
            assert(consumeChar() === '{');
            var declarations = [];
            while (true) {
                consumeWhiteSpace();
                if (nextChar() === '}') {
                    consumeChar();
                    break;
                }
                declarations.push(parseDeclaration());
            }
            return declarations;
        },

        // Parse one `<property>: <value>;` declaration.
        parseDeclaration = function () {
            var propertyName = parseIdentifier();
            consumeWhiteSpace();
            assert(consumeChar() === ':');
            consumeWhiteSpace();
            var value = parseValue();
            consumeWhiteSpace();
            assert(consumeChar() === ';');

            return new Declaration(propertyName, value);
        },

        // Methods for parsing values:

        parseValue = function () {
            if (isLengthChar(nextChar())) {
                return parseLength();
            }
            else if (nextChar() === '#') {
                return parseColor();
            }
            else {
                return new Value().Keyword(parseIdentifier());
            }
        },

        isLengthChar = function (str) {
            var c = str.charCodeAt(0);
            return c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0);
        },

        parseLength = function () {
            return new Value().Length(parseCSSFloat(), parseUnit());
        },

        parseCSSFloat = function () {
            var s = consumeWhile(isFloatChar);
            return parseFloat(s);
        },

        isFloatChar = function (str) {
            var c = str.charCodeAt(0);
            return (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0)) ||
                   c === '.'.charCodeAt(0);
        },

        parseUnit = function () {
            switch (parseIdentifier().toLowerCase()) {
                case 'px':
                    return new Unit().Px();

                default:
                    throw 'unrecognized unit';
            }
        },

        parseColor = function () {
            assert(consumeChar() === '#');
            return new Value().ColorValue(new Color(
                parseHexPair(), parseHexPair(), parseHexPair(), 255
            ));
        },

        // Parse two hexadecimal digits.
        parseHexPair = function () {
            var s = input.slice(pos, pos + 2);
            pos = pos + 2;
            return parseInt(s, 16);
        },

        // Parse a property name or keyword.
        parseIdentifier = function () {
            return consumeWhile(validIdentifierChar);
        },

        validIdentifierChar = function (str) {
            var c = str.charCodeAt(0);
            return (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) ||
                   (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) ||
                   (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0)) ||
                   c === '-'.charCodeAt(0) || c === '_'.charCodeAt(0);
        },

        // Consume and discard zero or more whitespace characters.
        consumeWhiteSpace = function () {
            consumeWhile(isWhiteSpace);
        },

        isWhiteSpace = function (c) {
            return c === ' ' || c === '\n';
        },

        // Consume characters until 'test' returns false
        consumeWhile = function (test) {
            var result = '';

            while(!eof() && test(nextChar())) {
                result += consumeChar();
            }

            return result;
        },

        // Return the current character, and advance self.pos to the
        // next character.
        consumeChar = function () {
            return input.charAt(pos++);
        },

        // Read the current character without consuming it.
        nextChar = function () {
            return input.charAt(pos);
        },

        // Return true if all input is consumed.
        eof = function () {
            return pos >= input.length;
        };

    return {
        parse: parse
    };
};
