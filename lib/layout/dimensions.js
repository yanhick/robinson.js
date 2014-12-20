module.exports = function (content, padding, border, margin) {
    var paddingBox = function () {
            return content.expandedBy(padding);
        },

        borderBox = function () {
            return paddingBox().expandedBy(border);
        },

        marginBox = function () {
            return borderBox().expandedBy(margin);
        };

    return {
        content: content,
        padding: padding,
        border: border,
        margin: margin,
        paddingBox: paddingBox,
        borderBox: borderBox,
        marginBox: marginBox
    };
};
