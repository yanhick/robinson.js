module.exports = {
    Inline: function () {
        return {
            type: 'display',
            value: 'inline'
        };
    },

    Block: function () {
        return {
            type: 'display',
            value: 'block'
        };
    },

    None: function () {
        return {
            type: 'display',
            value: 'none'
        };
    }
};
