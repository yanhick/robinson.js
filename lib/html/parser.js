var assert = require('assert');
var ElementNode = require('../dom/element');

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
            return c === ' ';
        },

        parseTagName = function () {
            return consumeWhile(isTagNameChar);
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
            assert(consumeChar() === '>');

            //Contents
            var children = parseNodes();

            //Closing tag
            assert(consumeChar() === '<');
            assert(consumeChar() === '/');
            assert(parseTagName() === tagName);
            assert(consumeChar() === '>');

            return new ElementNode(tagName, [], children);
        },

        parseNode = function () {
            switch(nextChar()) {
                case '<':
                    return parseElement();
                default:
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
