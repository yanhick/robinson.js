
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
        it('should allow to retrieve the styled node');
    });

    describe('#getInlineContainer', function () {
        it('should return the layout box for inline box');

        it('should return the layout box for anonymous box');

        it('should create and return an anonymous block if there is none for a block box');

        it('should return the last anonymous box for a block box');
    });

    describe('#calculateBlockHeight', function () {
        it('should set the actual block height if provided');

        it('should do nothing if height is not explicit');
    });

    describe('#calculateBlockPosition', function () {
        it('should set the block position');
        it('should set the block position with paddings');
        it('should set the block position with margins');
        it('should set the block position with borders');
    });

    describe('#calculateBlockWidth', function () {
        it('should set the block width with an explicit width');

        it('should set the block width with auto width');

        it('should set the margins width with auto margins and explicit width');

        it('should resize left auto margin when right margin and width length is explicit');

        it('should resize right auto margin when left margin and width length is explicit');

        it('should set auto margins to 0 if width is auto');

        it('should make right margin negative if the width was going to be negative');
    });

    describe('#layoutBlockChildren', function () {
        it('should layout all its children and set its height from it');
    });

    describe('#layout', function () {
        it('should layout itself');
    });
});
