module.exports = function (children, nodeType) {
    return {
        // data common to all nodes
        children: children,
        nodeType: nodeType
    };
};
