var Canvas = require('../../lib/painting/canvas');
var Rect = require('../../lib/layout/rect');
var DisplayCommand = require('../../lib/painting/display-command');

// Paint a tree of LayoutBoxes to an array of pixels.
module.exports = function (layoutRoot, bounds) {
    var displayList = buildDisplayList(layoutRoot);
    var canvas = new Canvas(bounds.width, bounds.height);

    displayList.forEach(canvas.paintItem);
    return canvas;
};

function buildDisplayList (layoutRoot) {
    var list = [];
    renderLayoutBox(list, layoutRoot);
    return list;
}

function renderLayoutBox (list, layoutBox) {
    renderBackground(list, layoutBox);
    renderBorders(list, layoutBox);
    layoutBox.children.forEach(function (child) {
        renderLayoutBox(list, child);
    });
}

function renderBackground (list, layoutBox) {
    var color = getColor(layoutBox, 'background');

    if (color === null) {
        return null;
    }

    list.push(new DisplayCommand().SolidColor(color, layoutBox.dimensions.borderBox()));
}

function renderBorders (list, layoutBox) {
    var color = getColor(layoutBox, 'border-color');

    if (color === null) {
        return;
    }

    var d = layoutBox.dimensions;
    var borderBox = d.borderBox();

    // Left border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y,
        d.border.left,
        borderBox.height
    )));

    // Right border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x + borderBox.width - d.border.right,
        borderBox.y,
        d.border.right,
        borderBox.height
    )));

    // Top border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y,
        borderBox.width,
        d.border.top
    )));

    // Bottom border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y + borderBox.height - d.border.bottom,
        borderBox.width,
        d.border.bottom
    )));
}

// Return the specified color for CSS property `name`, or `null` if no color was specified.
function getColor (layoutBox, name) {
    var getColorFromStyle = function (style) {
        var color = style.value(name);

        if (color === null) {
            return null;
        }

        return color.type === 'color' ? color.value : null;
    };

    switch (layoutBox.boxType.type) {
        case 'block':
            return getColorFromStyle(layoutBox.boxType.value);

        case 'inline':
            return getColorFromStyle(layoutBox.boxType.value);

        case 'anonymous':
            return null;
    }
}
