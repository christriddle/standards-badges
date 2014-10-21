var _ = require('underscore'),
    util = require('util'),
    config = require('./badge-config');

var getPartitionedBadges = function(query) {
    var result = {
        success: [],
        versionFailed: [],
        failed: [],
        ignored: []
    };

    var sortedBadgesWithName = _
        .chain(config.badges)
        .map(function(badge, name){
            return _.extend(badge, { name: name });
        })
        .sortBy('text')
        .value();

    _.each(sortedBadgesWithName, function(badge){
        if (_.has(query, badge.name)){
            var queryVersion = query[badge.name];

            if (queryVersion === '0') {
                result.ignored.push(badge);
            } else if (queryVersion >= badge.version){
                result.success.push(badge);
            } else {
                result.versionFailed.push(badge);
            }
        } else {
            result.failed.push(badge);
        }
    });
    return result;
};

var getPartitionedBadgesInformation = function(query, imageFormat){
    var badgePartitions = getPartitionedBadges(query);
    return {
        success: _.map(badgePartitions.success, function(badge) { return getSuccessBadge(badge, imageFormat); }),
        versionFailed: _.map(badgePartitions.versionFailed, function(badge) { return getVersionFailedBadge(badge, imageFormat); }),
        failed: _.map(badgePartitions.failed, function(badge) { return getFailedBadge(badge, imageFormat); }),
        ignored: _.map(badgePartitions.ignored, function(badge) { return getIgnoredBadge(badge, imageFormat); })
    };
};

var getBadges = function(query, imageFormat, includeIgnored){
    var badges = getPartitionedBadgesInformation(query, imageFormat);
    return {
        badgesFlattened: _.union(badges.success, badges.versionFailed, badges.failed, includeIgnored ? badges.ignored : []),
        stats: {
            successCount: badges.success.length,
            versionFailedCount: badges.versionFailed.length,
            failedCount: badges.failed.length,
            ignoredCount: badges.ignored.length
        }
    };
};

var getSuccessBadge = function(badge, imageFormat) {
    return getSingleBadge(badge, badge.passStatus, config.passColour, imageFormat);
};

var getVersionFailedBadge = function(badge, imageFormat) {
    return getSingleBadge(badge, badge.versionFailStatus, config.versionFailColour, imageFormat);
};

var getFailedBadge = function(badge, imageFormat) {
    return getSingleBadge(badge, badge.failStatus, config.failColour, imageFormat);
};

var getIgnoredBadge = function(badge, imageFormat) {
    return getSingleBadge(badge, config.ignoreStatus, config.ignoreColour, imageFormat);
};

var getSingleBadge = function(badge, status, colour, imageFormat) {
    return {
        name: badge.name,
        currentVersion: badge.version,
        url: util.format(config.badgeUrlTemplate, badge.text, status, colour, imageFormat),
        description: badge.description,
        alt: util.format(config.badgeAltTemplate, badge.text, status, colour),
        localFile: util.format(config.badgeFilenameTemplate, badge.text, status, colour)
    };
};

module.exports = {
    getBadges: getBadges
};