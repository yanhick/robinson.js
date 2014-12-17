module.exports = function (dimensions, boxType, children) {

    var layoutBox = {
            dimensions: dimensions,
            boxType: boxType,
            children: children
        },

        getStyleNode = function () {
            switch (boxType.type) {
                case 'block':
                    return boxType.value;

                case 'inline':
                    return boxType.value;

                case 'anonymous':
                    throw 'anonymous block box has no style node';
            }

        };

    layoutBox.getStyleNode = getStyleNode;

    return layoutBox;
};
