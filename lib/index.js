var fs = require('fs');

var Rect = require('./layout/rect');
var EdgeSize = require('./layout/edge-size');
var Dimensions = require('./layout/dimensions');
var HTMLParser = require('./html/parser');
var CSSParser = require('./css/parser');
var styleTree = require('./style/style-tree');
var layoutTree = require('./layout/layout-tree');
var paint = require('./painting/paint');

var readSource = function (filename, defaultFileName) {
    filename = filename || defaultFileName;

    return fs.readFileSync(filename, 'utf8');
};

var html = readSource(undefined, 'examples/test.html');
var css = readSource(undefined, 'examples/test.css');

var initialContainingBlock = new Dimensions(
    new Rect(0, 0, 800, 600),
    new EdgeSize(0, 0, 0, 0),
    new EdgeSize(0, 0, 0, 0),
    new EdgeSize(0, 0, 0, 0)
);

var rootNode = new HTMLParser().parse(html);
var stylesheet = new CSSParser().parse(css);
var styleRoot = styleTree(rootNode, stylesheet);
var layoutRoot = layoutTree(styleRoot, initialContainingBlock);
var canvas = paint(layoutRoot, initialContainingBlock.content);
