module.exports = {
    Block: function (styledNode) {
        return {
            type: 'block',
            value: styledNode
        };
    },

    Inline: function (styledNode) {
        return {
            type: 'inline',
            value: styledNode
        };
    },

    Anonymous: function () {
        return {
            type: 'anonymous'
        };
    }
};
