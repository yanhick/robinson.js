var Display = require('./display');

// A node with associated style data
module.exports = function (node, specifiedValues, children) {

        // Return the specified value of a property if it exists,
        // otherwise `null`
    var value = function (name) {
            return specifiedValues[name] ? specifiedValues[name] : null;
        },

        // Return the specified value of property `name` or property `fallbackName`
        // if that doesn't exist or value default `defaultValue` if neither does.
        lookup = function (name, fallbackName, defaultValue) {
            if (specifiedValues[name]) {
                return specifiedValues[name];
            }

            if (specifiedValues[fallbackName]) {
                return specifiedValues[fallbackName];
            }

            return defaultValue;
        },

        // The value of the `display` property (defaults to inline)
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
