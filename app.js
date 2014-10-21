var Hapi = require('hapi'),
    Good = require('good'),
    gm = require('gm').subClass({ imageMagick: true }),
    _ = require('underscore'),
    badgeUtils = require('./badgeUtils');

var server = new Hapi.Server('0.0.0.0', ~~process.env.PORT || 8000, {
    debug: { 'request': ['error', 'uncaught'] },
    views: {
        engines: {
            jade: require('jade')
        },
        path: './templates'
    }
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var badges = badgeUtils.getBadges(request.query, 'svg', true);
        reply.view('badges', {
            appName: request.query.appName || "AppName",
            badges: badges.badgesFlattened,
            passed: badges.stats.successCount,
            total: badges.stats.successCount + badges.stats.versionFailedCount + badges.stats.failedCount,
            ignored: badges.stats.ignoredCount
        });
    }
});

server.route({
    method: 'GET',
    path: '/image',
    handler: function (request, reply) {

        var badges = badgeUtils.getBadges(request.query, 'png', false);
        var flattenedBadges = badges.badgesFlattened;

        var image;
        _.each(flattenedBadges, function(badge) {
            if (!image){
                image = gm('images/' + badge.localFile);
            } else {
                image.append('images/' + badge.localFile, true);
            }
        });

        if (!image) {
            return; //error?
        }

        image.toBuffer('PNG', function (err, buffer) {
            if (err) {
                console.log(err);
                return;
            }

            reply(buffer).type('image/png');
        });
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.pack.register(Good, function (err) {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});