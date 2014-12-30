module.exports = function (content, padding, border, margin) {

        // The area covered by the content area plus its padding.
    var paddingBox = function () {
            return content.expandedBy(padding);
        },

        // The area covered by the content area plus padding and borders.
        borderBox = function () {
            return paddingBox().expandedBy(border);
        },

        // The area covered by the content area plus padding, borders, and margin.
        marginBox = function () {
            return borderBox().expandedBy(margin);
        };

    return {
        paddingBox: paddingBox,
        borderBox: borderBox,
        marginBox: marginBox,

        // Position of the content area relative to the document
        // origin
        content: content,

        // Surrounding edges
        padding: padding,
        border: border,
        margin: margin
    };
};
