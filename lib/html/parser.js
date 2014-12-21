var assert = require('assert');
var ElementNode = require('../dom/element');
var TextNode = require('../dom/text');

module.exports = function () {

    var pos = 0,

        input = '',

        nextChar = function () {
            return input.charAt(pos);
        },

        startsWith = function (str) {
            return input.substr(pos).indexOf(str) === 0;
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

        parseTagName = function () {
            return consumeWhile(isTagNameChar);
        },

        parseAttributes = function () {
            var attributes = {};
            while (true) {
                consumeWhiteSpace();
                if (nextChar() === '>') {
                    break;
                }
                var attribute = parseAttr();
                attributes[attribute.name] = attribute.value;
            }
            return attributes;
        },

        parseAttr = function () {
            var name = parseTagName();
            assert(consumeChar() === '=');
            var value = parseAttrValue();

            return {
                name: name,
                value: value
            };
        },

        parseAttrValue = function () {
            var openQuote = consumeChar();
            assert(openQuote === '"' || openQuote === '\'');
            var value = consumeWhile(isAttributeValueChar(openQuote));
            assert(consumeChar() === openQuote);

            return value;
        },

        isAttributeValueChar = function (quote) {
            return function (c) {
                return c !== quote;
            };
        },

        isTagNameChar = function (str) {
            var c = str.charCodeAt(0);
            return (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) ||
                   (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) ||
                   (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0));
        },

        parseElement = function () {
            //Opening tag
            assert(consumeChar() === '<');
            var tagName = parseTagName();
            var attrs = parseAttributes();
            assert(consumeChar() === '>');

            //Contents
            var children = parseNodes();

            //Closing tag
            assert(consumeChar() === '<');
            assert(consumeChar() === '/');
            assert(parseTagName() === tagName);
            assert(consumeChar() === '>');

            return new ElementNode(tagName, attrs, children);
        },

        parseText = function () {
            return new TextNode(consumeWhile(isTextChar));
        },

        isTextChar = function (c) {
            return c !== '<';
        },

        parseNode = function () {
            switch(nextChar()) {
                case '<':
                    return parseElement();
                default:
                    return parseText();
            }
        },

        parseNodes = function () {
            var nodes = [];
            while (true) {
                consumeWhiteSpace();
                if (eof() === true || startsWith('</') === true) {
                    break;
                }
                nodes.push(parseNode());
            }
            return nodes;
        },

        parse = function (html) {
            pos = 0;
            input = html;

            var nodes = parseNodes();

            if (nodes.length === 1) {
                return nodes[0];
            }
            else {
                return ElementNode('html', [], nodes);
            }
        };

    return {
        parse: parse
    };
};
