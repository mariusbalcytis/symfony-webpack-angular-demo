(function() {
    'use strict';

    var buttons = [];

    // text to display and function to run when clicked
    // this is just an example - feel free to use something like this for your own extension mechanisms
    buttons.push({
        text: ['translator', function(translator) {
            return translator.trans('Generate random number', {}, 'buttons');
        }],
        click: ['numberGenerator', function(numberGenerator) {
            alert(numberGenerator.generate(9000));
        }]
    });

    module.exports = buttons;
})();