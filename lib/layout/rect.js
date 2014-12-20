module.exports = function (x, y, width, height) {

    function expandedBy (rect, edge) {
        var expandedRect = {
            x: rect.x - edge.left,
            y: rect.y - edge.top,
            width: rect.width + edge.left + edge.right,
            height: rect.height + edge.top + edge.bottom,
        };

        expandedRect.expandedBy = expandedBy.bind(null, expandedRect);

        return expandedRect;
    }

    var rect = {
        x: x,
        y: y,
        width: width,
        height: height
    };

    rect.expandedBy = expandedBy.bind(null, rect);

    return rect;
};
