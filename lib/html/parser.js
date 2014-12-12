var assert = require('assert');
var ElementNode = require('../dom/element');

module.exports = function () {

    var pos = 0,
        input = '',

        parse = function (html) {
            pos = 0;
            input = html;
            return parseNodes();
        },

        nextChar = function () {
            return input.charAt(pos);
        },

        startsWith = function (str) {
            return input.substr(pos).indexOf(str) === 0;
        },

        eof = function () {
            return pos === input.length;
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

            //Closing tag
            assert(consumeChar() === '<');
            assert(consumeChar() === '/');
            assert(parseTagName() === tagName);

            return new ElementNode(tagName, [], []);
        },

        parseNodes = function () {
            switch(nextChar()) {
                case '<':
                    return parseElement();
                default:
            }
        };

    return {
        parse: parse
    };
};
