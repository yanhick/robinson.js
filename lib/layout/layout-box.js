var Value = require('../css/value');
var Unit = require('../css/unit');
var Dimensions = require('../layout/dimensions');
var Rect = require('../layout/rect');
var EdgeSize = require('../layout/edge-size');

module.exports = function (boxType, dimensions, children) {

    dimensions = dimensions || new Dimensions(
        new Rect(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0)
    );

    children = children || [];

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
        },

        layout = function (containingBlock) {
            switch (boxType.type) {
                case 'block':
                    layoutBlock(containingBlock);
                    break;

                default:
            }
        },

        layoutBlock = function (containingBlock) {

            calculateBlockWidth(containingBlock);

            calculateBlockPosition(containingBlock);

            layoutBlockChildren();

            calculateBlockHeight();
        },

        calculateBlockWidth = function (containingBlock) {

            var style = getStyleNode();

            var auto = new Value().Keyword('auto');
            var width = style.value('width') || auto;

            var zero = new Value().Length(0.0, Unit.Px());

            var marginLeft = style.lookup('margin-left', 'margin', zero);
            var marginRight = style.lookup('margin-right', 'margin', zero);

            var borderLeft = style.lookup('border-left-width', 'border-width', zero);
            var borderRight = style.lookup('border-right-width', 'border-width', zero);

            var paddingLeft = style.lookup('padding-left-width', 'padding', zero);
            var paddingRight = style.lookup('padding-right-width', 'padding', zero);

            var total = [marginLeft, marginRight, borderLeft, borderRight,
                         paddingLeft, paddingRight, width].reduce(function (sum, value) {
                             return sum + value.toPx();
                         }, 0);

            if (width != auto && total > containingBlock.content.width) {
                if (marginLeft == auto) {
                    marginLeft = new Value().Length(0.0, Unit.Px());
                }
                if (marginRight == auto) {
                    marginRight = new Value().Length(0.0, Unit.Px());
                }
            }

            var underflow = containingBlock.content.width - total;

            var widthIsAuto = width == auto;
            var marginLeftIsAuto = marginLeft == auto;
            var marginRightIsAuto = marginRight == auto;

            if (!widthIsAuto && !marginLeftIsAuto && !marginRightIsAuto) {
                marginRight = new Value().Length(marginRight.toPx() + underflow, Unit.Px());
            }
            else if (!widthIsAuto && !marginLeftIsAuto && marginRightIsAuto) {
                marginRight = new Value().Length(underflow, Unit.Px());
            }
            else if (!widthIsAuto && marginLeftIsAuto && !marginRightIsAuto) {
                marginLeft = new Value().Length(underflow, Unit.Px());
            }
            else if (widthIsAuto) {
                if (marginLeftIsAuto) {
                    marginLeft =  new Value().Length(0.0, Unit.Px());
                }

                if (marginRightIsAuto) {
                    marginRight =  new Value().Length(0.0, Unit.Px());
                }

                if (underflow >= 0.0) {
                    width = new Value().Length(underflow, Unit.Px());
                }
                else {
                    width = new Value().Length(0.0, Unit.Px());
                    marginRight = new Value().Length(marginRight.toPx() + underflow, Unit.Px());
                }
            }
            else if (!widthIsAuto && marginLeftIsAuto && marginRightIsAuto) {
                marginLeft = new Value().Length(underflow / 2.0, Unit.Px());
                marginRight = new Value().Length(underflow / 2.0, Unit.Px());
            }


            dimensions.content.width = width.toPx();

            dimensions.padding.left = paddingLeft.toPx();
            dimensions.padding.right = paddingRight.toPx();

            dimensions.border.left = borderLeft.toPx();
            dimensions.border.right = borderRight.toPx();

            dimensions.margin.left = marginLeft.toPx();
            dimensions.margin.right = marginRight.toPx();
        },

        calculateBlockPosition = function (containingBlock) {
            var style = getStyleNode();

            var zero = new Value().Length(0.0, Unit.Px());

            dimensions.margin.top = style.lookup('margin-top', 'margin', zero).toPx();
            dimensions.margin.bottom = style.lookup('margin-bottom', 'margin', zero).toPx();

            dimensions.border.top = style.lookup('border-top', 'border', zero).toPx();
            dimensions.border.bottom = style.lookup('border-bottom', 'border', zero).toPx();

            dimensions.padding.top = style.lookup('padding-top', 'padding', zero).toPx();
            dimensions.padding.bottom = style.lookup('padding-bottom', 'padding', zero).toPx();

            dimensions.content.x = containingBlock.content.x +
                                   dimensions.margin.left +
                                   dimensions.border.left +
                                   dimensions.padding.left;

            dimensions.content.y = containingBlock.content.y +
                                   containingBlock.content.height +
                                   dimensions.margin.top +
                                   dimensions.border.top +
                                   dimensions.padding.top;

        },

        layoutBlockChildren = function () {
            children.forEach(function (child) {
                child.layout(dimensions);
                dimensions.content.height = dimensions.content.height +
                                            child.dimensions.marginBox().height;
            });
        },

        calculateBlockHeight = function () {
            var styleNode = getStyleNode();
            var height = styleNode.value('height');

            if (height === null) {
                return;
            }

            if (height.type === 'length') {
                dimensions.content.height = height.toPx();
            }
        },

        getInlineContainer = function () {
            switch (boxType.type) {
                case 'inline':
                    return layoutBox;

                case 'anonymous':
                    return layoutBox;

                case 'block':
                    if (_.last(children).boxType.type !== 'anonymous') {
                        children.push(new LayoutBox());
                    }
                    return _.last(children);
            }
        };

    layoutBox.getStyleNode = getStyleNode;
    layoutBox.calculateBlockHeight = calculateBlockHeight;
    layoutBox.calculateBlockPosition = calculateBlockPosition;
    layoutBox.calculateBlockWidth = calculateBlockWidth;
    layoutBox.layoutBlockChildren = layoutBlockChildren;
    layoutBox.getInlineContainer = getInlineContainer;
    layoutBox.layout = layout;

    return layoutBox;
};
