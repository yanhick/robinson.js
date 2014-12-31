var fs = require('fs');
var Png = require('png').Png;

// Parse command line options
var argv = require('yargs').argv;

var Rect = require('./layout/rect');
var EdgeSize = require('./layout/edge-size');
var Dimensions = require('./layout/dimensions');
var HTMLParser = require('./html');
var CSSParser = require('./css');
var style = require('./style');
var layout = require('./layout');
var paint = require('./painting/paint');

var readSource = function (filename, defaultFileName) {
    filename = filename || defaultFileName;

    return fs.readFileSync(filename, 'utf8');
};

// Read input files:
var html = readSource(argv.html || argv.h, 'examples/test.html');
var css = readSource(argv.css || argv.c, 'examples/test.css');

// Since we don't have an actual window, hard-code the "viewport" size.
var createInitialContainingBlock = function () {
    return new Dimensions(
        new Rect(0, 0, 800, 600),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0)
    );
};

// Parsing and rendering:
var rootNode = new HTMLParser().parse(html);
var stylesheet = new CSSParser().parse(css);
var styleRoot = style(rootNode, stylesheet);
var layoutRoot = layout(styleRoot, createInitialContainingBlock());
var canvas = paint(layoutRoot, createInitialContainingBlock().content);

var data = [],
    pixels = canvas.pixels,
    pixel = null;

for (var i = 0; i < pixels.length; i++) {
    pixel = pixels[i];
    data.push(pixel.r);
    data.push(pixel.g);
    data.push(pixel.b);
    data.push(255 - pixel.a);
}

var buffer = new Buffer(data);

// Create the output file:
var png = new Png(
    buffer,
    createInitialContainingBlock().content.width,
    createInitialContainingBlock().content.height,
    'rgba'
);

// Save an image:
var img = png.encodeSync();
fs.writeFileSync(argv.output || argv.o || './output.png', img.toString('binary'), 'binary');

