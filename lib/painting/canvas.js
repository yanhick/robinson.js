var _ = require('lodash');
var Color = require('../css/color');

// Create a blank canvas
module.exports = function (width, height) {

    var pixels = [],

        paintItem = function (item) {
            switch(item.type) {
                case 'solid-color':
                    paintSolidColor(item.value.color, item.value.rect);
                    break;
            }
        },

        paintSolidColor = function (color, rect) {
            var x0 = rect.x;
            var y0 = rect.y;
            var x1 = rect.x + rect.width;
            var y1 = rect.y + rect.height;

            for (var y = y0; y < y1; y++) {
                for (var x = x0; x < x1; x++) {
                    pixels[y * width + x] = color;
                }
            }
        };

    for (var i = 0; i < width * height; i++) {
        pixels.push(new Color(255, 255, 255, 255));
    }

    return {
        width: width,
        height: height,
        pixels: pixels,
        paintItem: paintItem
    };
};
