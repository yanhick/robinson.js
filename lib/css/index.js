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
