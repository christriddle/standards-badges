var _ = require('underscore'),
    config = require('../badge-config'),
    fs = require('fs'),
    util = require('util'),
    http = require('http');


var downloadImage = function(text, status, colour){
    var passFilename = util.format(config.badgeFilenameTemplate, text, status, colour);
    var passUrl = util.format(config.badgeUrlTemplate, text, status, colour, 'png');
    var passFileStream = fs.createWriteStream(passFilename);
    http.get(passUrl, function (response) {
        response.pipe(passFileStream);
    });
}

_.each(config.badges, function(badge){
    downloadImage(badge.text, badge.passStatus, config.passColour);
    downloadImage(badge.text, badge.versionFailStatus, config.versionFailColour);
    downloadImage(badge.text, badge.failStatus, config.failColour);
});
