module.exports = function () {
    var value = {},

        // Return the size of a length in px, or zero for
        // non-lengths.
        toPx = function () {
            if (value.type !== 'length') {
                return 0;
            }
            return value.value.value;
        };

    return {

        Keyword: function (keyword) {
            value = {
                type: 'keyword',
                value: keyword,
                toPx: toPx
            };
            return value;
        },

        Length: function (length, unit) {
            value = {
                type: 'length',
                value: {
                    value: length,
                    unit: unit
                },
                toPx: toPx
            };
            return value;
        },

        ColorValue: function (color) {
            value = {
                type: 'color',
                value: color,
                toPx: toPx
            };
            return value;
        }
    };
};
