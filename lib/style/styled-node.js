var Display = require('./display');

module.exports = function (node, specifiedValues, children) {

    var value = function (name) {
            return specifiedValues[name] ? specifiedValues[name] : null;
        },

        lookup = function (name, fallback, defaultValue) {
            if (specifiedValues[name]) {
                return specifiedValues[name];
            }

            if (specifiedValues[fallback]) {
                return specifiedValues[fallback];
            }

            return defaultValue;
        },


        display = function () {
            if (value('display') === null) {
                return new Display().Inline();
            }

            switch (value('display').value) {
                case 'block':
                    return new Display().Block();

                case 'none':
                    return new Display().None();

                default:
                    return new Display().Inline();
            }
        };

    return {
        node: node,
        specifiedValues: specifiedValues,
        children: children,
        value: value,
        lookup: lookup,
        display: display
    };
};
