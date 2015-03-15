/**
 * Code for applying CSS styles to the DOM.
 *
 * This is not very interesting at the moment. It will get much more
 * complicated if I add support for compound selectors.
 */

var _ = require('lodash');

var StyledNode = require('./styled-node');
var MatchedRule = require('./matched-rule');

module.exports = styleTree;

// Apply a stylesheet to an entire DOM tree, returning a StyledNode tree.
//
// This finds only the specified values at the moment. Eventually it should
// be extended to find the computed values too, including inherited values.
function styleTree (root, stylesheet) {
}
