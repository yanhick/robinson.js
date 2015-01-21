var fs = require('fs');
var PNG = require('node-png').PNG;

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

pixels.forEach(function(pixel) {
    data.push(pixel.r, pixel.g, pixel.b, pixel.a);
});

var png = new PNG({
    width: createInitialContainingBlock().content.width,
    height: createInitialContainingBlock().content.height,
    filterType: -1
});

png.data = new Buffer(data);

// Save an image:
png.pack().pipe(fs.createWriteStream(argv.output || argv.o || './output.png', 'binary'));
