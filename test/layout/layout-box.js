
var expect = require('chai').expect;
var BoxType = require('../../lib/layout/box-type');
var Dimensions = require('../../lib/layout/dimensions');
var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');
var LayoutBox = require('../../lib/layout/layout-box');
var StyledNode = require('../../lib/style/styled-node');
var ElementNode = require('../../lib/dom/element');
var Value = require('../../lib/css/value');
var Unit = require('../../lib/css/unit');

describe('layout box', function () {
    describe('#getStyleNode', function () {
        it('should allow to retrieve the styled node', function () {
            var boxType = BoxType.Block('foo');
            var rect = new Rect(0, 0, 0, 0);
            var edge = new EdgeSize(10, 10, 10, 10);
            var dimensions = new Dimensions(rect, edge, edge, edge);

            var layoutBox = new LayoutBox(boxType, dimensions, []);

            expect(layoutBox.getStyleNode()).to.eql('foo');
        });
    });

    describe('#getInlineContainer', function () {
        it('should return the layout box for inline box', function () {
            var boxType = BoxType.Inline('foo');
            var layoutBox = new LayoutBox(boxType);

            expect(layoutBox.getInlineContainer()).to.eql(layoutBox);
        });

        it('should return the layout box for anonymous box', function () {
            var boxType = BoxType.Anonymous();
            var layoutBox = new LayoutBox(boxType);

            expect(layoutBox.getInlineContainer()).to.eql(layoutBox);
        });

        it('should create and return an anonymous block if there is none for a block box', function () {
            var boxType = BoxType.Block('foo');
            var layoutBox = new LayoutBox(boxType);

            var inlineContainer = layoutBox.getInlineContainer();
            expect(inlineContainer.boxType.type === 'anonymous');
        });

        it('should return the last anonymous box for a block box', function () {
            var boxType = BoxType.Block('foo');
            var children = [createLayoutBox(), createLayoutBox()];
            var layoutBox = new LayoutBox(boxType, undefined, children);

            var inlineContainer = layoutBox.getInlineContainer();
            expect(layoutBox.children[2]).to.eql(inlineContainer);
        });
    });

    describe('#calculateBlockHeight', function () {
        it('should set the actual block height if provided', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {
                display: 'block',
                height: new Value().Length(50, Unit.Px())
            }, []);
            var boxType = BoxType.Block(styledNode);
            var layoutBox = createLayoutBox(boxType);

            layoutBox.calculateBlockHeight();
            expect(layoutBox.dimensions.content.height).to.eql(50);
        });

        it('should do nothing if height is not explicit');
    });

    describe('#calculateBlockPosition', function () {
        it('should set the block position', function () {
            var edgeSize = new EdgeSize(0, 0, 0, 0);
            var dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            var layoutBox = createLayoutBox(undefined, dimensions);

            var containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            var containingDimensions = new Dimensions(
                new Rect(10, 20, 0, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            var containingLayoutBox = createLayoutBox(undefined, containingDimensions);
            layoutBox.calculateBlockPosition(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.x).to.eql(10);
            expect(layoutBox.dimensions.content.y).to.eql(20);
        });
        it('should set the block position with paddings');
        it('should set the block position with margins');
        it('should set the block position with borders');
    });

    describe('#calculateBlockWidth', function () {
        it('should set the block width with an explicit width', function () {
            var edgeSize = new EdgeSize(0, 0, 0, 0);
            var dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(50, Unit.Px())
            }, []);
            var boxType = BoxType.Block(styledNode);
            var layoutBox = createLayoutBox(boxType, dimensions);

            var containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            var containingDimensions = new Dimensions(
                new Rect(0, 0, 0, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            var containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(50);
        });

        it('should set the block width with auto width', function () {
            var edgeSize = new EdgeSize(0, 0, 0, 0);
            var dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {
                display: 'block'
            }, []);
            var boxType = BoxType.Block(styledNode);
            var layoutBox = createLayoutBox(boxType, dimensions);

            var containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            var containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            var containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(200);
        });
        it('should set the margins width with auto margins and explicit width', function () {
            var edgeSize = new EdgeSize(0, 0, 0, 0);
            var dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(100, Unit.Px()),
                'margin-left': new Value().Keyword('auto'),
                'margin-right': new Value().Keyword('auto')
            }, []);
            var boxType = BoxType.Block(styledNode);
            var layoutBox = createLayoutBox(boxType, dimensions);

            var containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            var containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            var containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(100);
            expect(layoutBox.dimensions.margin.left).to.eql(50);
            expect(layoutBox.dimensions.margin.right).to.eql(50);
        });
    });

    describe('#layoutBlockChildren', function () {
        it('should layout all its children and set its height from it');
    });

    describe('#layout', function () {
        it('should layout itself', function () {

            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {
                display: 'block',
                height: new Value().Length(50, Unit.Px())
            }, []);
            var boxType = BoxType.Block(styledNode);
            var layoutBox = createLayoutBox(boxType);

            var containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            var containingDimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            var containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.layout(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.height).to.eql(50);
        });
    });
});

function createLayoutBox (boxType, dimensions, children) {
    children = children || [];
    var element = new ElementNode('div', {foo: 'bar'}, []);
    var styledNode = new StyledNode(element, {
        display: new Value().Keyword('block')
    }, []);
    boxType = boxType || BoxType.Block(styledNode);
    var rect = new Rect(0, 0, 0, 0);
    var edge = new EdgeSize(10, 10, 10, 10);
    dimensions = dimensions || new Dimensions(rect, edge, edge, edge);

    return new LayoutBox(boxType, dimensions, children);
}
