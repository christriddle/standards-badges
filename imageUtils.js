var gm = require('gm').subClass({ imageMagick: true }),
    _ = require('underscore');

var getBadgeImage = function(badges, horizontalWrapCount){
    var imageRows = [];
    var rowCount = Math.floor(badges.length / horizontalWrapCount) + 1;
    for(var row = 0; row < rowCount; row++){
        var badgesInThisRow = _.chain(badges).rest(row * horizontalWrapCount).first(horizontalWrapCount).value();
        var imageRow = horizontallyAppendBadges(badgesInThisRow);
        imageRows.push(imageRow);
    }
    return verticallyAppendImages(imageRows, 0);
};

var horizontallyAppendBadges = function(badges){
    var result;
    _.each(badges, function (badge) {
        if (!result) {
            result = gm('images/' + badge.localFile);
        } else {
            result.append('images/' + badge.localFile, true);
        }
    });
    return result;
};

var verticallyAppendImages = function(images, margin){
    var result;
    _.each(images, function (image) {
        if (!result) {
            result = image;
        } else {
            result.append(image, false);
        }
    });
    return result;
};

var buildBadgesImage = function(badgePartitions, horizontalWrapCount, callback) {
    var successBadgesImage = getBadgeImage(badgePartitions.success, horizontalWrapCount);
    var versionFailedBadgesImage = getBadgeImage(badgePartitions.versionFailed, horizontalWrapCount);
    var failedBadgesImage = getBadgeImage(badgePartitions.failed, horizontalWrapCount);

    var result = verticallyAppendImages([successBadgesImage, versionFailedBadgesImage, failedBadgesImage], 10);

    if (!result) {
        callback(new Error('Unable to create badge image'));
    }

    result.toBuffer('PNG', callback);
};

module.exports = {
    buildBadgesImage: buildBadgesImage
};