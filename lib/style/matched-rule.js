// A single CSS rule and the specificity of its most specific
// matching selector.
module.exports = function (specificity, rule) {
    return {
        specificity: specificity,
        rule: rule
    };
};
