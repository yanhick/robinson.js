module.exports = function () {
    return {
        SolidColor: function (color, rect) {
            return {
                type: 'solid-color',
                value: {
                    color: color,
                    rect: rect
                }
            };
        }
    };
};
