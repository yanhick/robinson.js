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

        nextChar = function () {
            return input.charAt(pos);
        },

        eof = function () {
            return pos >= input.length;
        },

        consumeChar = function () {
            return input.charAt(pos++);
        },

        //Consume characters until 'test' returns false
        consumeWhile = function (test) {
            var result = '';

            while(!eof() && test(nextChar())) {
                result += consumeChar();
            }

            return result;
        },

        consumeWhiteSpace = function () {
            consumeWhile(isWhiteSpace);
        },

        isWhiteSpace = function (c) {
            return c === ' ' || c === '\n';
        },

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

            selectors.sort(function (a, b) {
                return a.specificity() - b.specificity();
            });
            return selectors;
        },

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

        validIdentifierChar = function (str) {
            var c = str.charCodeAt(0);
            return (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) ||
                   (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) ||
                   (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0)) ||
                   c === '-'.charCodeAt(0) || c === '_'.charCodeAt(0);
        },

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
                    return Unit.Px();

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

        parseHexPair = function () {
            var s = input.slice(pos, pos + 2);
            pos = pos + 2;
            return parseInt(s, 16);
        },

        parseIdentifier = function () {
            return consumeWhile(validIdentifierChar);
        },

        parseRule = function () {
            return new Rule(parseSelectors(), parseDeclarations());
        },

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

        parse = function (css) {
            pos = 0;
            input = css;

            return new Stylesheet(parseRules());
        };

    return {
        parse: parse
    };
};
