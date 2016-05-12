var $ = require('expose?$!expose?jQuery!jquery');
require("!bootstrap-webpack!vendor/bootstrap.config.js");
require("!font-awesome-webpack!vendor/font-awesome.config.js");

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});