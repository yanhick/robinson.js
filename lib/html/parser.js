var ElementNode = require('../dom/element');

module.exports = function () {

    var pos = 0,
        input = '',

        parse = function (html) {
            pos = 0;
            input = html;
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
            return input.charAt(++pos);
        },

        consumeWhile = function (test) {
            var result = '';

            while(!eof() && test(nextChar())) {
                result.push(consumeChar());
            }

            return result;
        },

        parseTagName = function () {

        },

        parseElement = function () {
            //Opening tag
            assert(consumeChar() === '<');
            var tagName = parseTagName();
            assert(consumechar() === '>');

            //Closing tag
            assert(consumechar() === '<');
            assert(consumechar() === '/');
            assert(parseTagName() === tagName);

            return new ElementNode(tagName, [], []);
        };

    return {
        parse: parse
    };
};
