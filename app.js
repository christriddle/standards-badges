var Hapi = require('hapi'),
    Good = require('good'),
    gm = require('gm').subClass({ imageMagick: true }),
    _ = require('underscore'),
    util = require('util'),
    config = require('./badge-config');

var server = new Hapi.Server('localhost', 8000, {

    debug: { 'request': ['error', 'uncaught'] },
    views: {
        engines: {
            jade: require('jade')
        },
        path: './templates'
    }
});

var getBadgeUrls = function(query, imageFormat){
    return _
        .chain(config.badges)
        .map(function(badge, name){
            var status, colour;

            if (_.has(query, name)){
                var queryVersion = query[name];

                if (queryVersion === '0') {
                    return null;
                }

                if (queryVersion >= badge.version){
                    status = badge.passStatus;
                    colour = config.passColour;
                } else {
                    status = badge.versionFailStatus;
                    colour = config.versionFailColour;
                }

            } else {
                status = badge.failStatus;
                colour = config.failColour;
            }

            return {
                url: util.format(config.badgeUrlTemplate, badge.text, status, colour, imageFormat),
                description: badge.description,
                alt: util.format(config.badgeAltTemplate, badge.text, status, colour),
                localFile: util.format(config.badgeFilenameTemplate, badge.text, status, colour)
            };
        })
        .filter(function(val){
            return val !== null;
        })
        .value();
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var badges = getBadgeUrls(request.query, 'svg');
        reply.view('badges', {
            badges: badges
        });
    }
});

server.route({
    method: 'GET',
    path: '/image',
    handler: function (request, reply) {

        var badges = getBadgeUrls(request.query, 'png');

        var image;
        _.each(badges, function(badge) {
            if (!image){
                image = gm('images/' + badge.localFile);
            } else {
                image
                    .background('white').gravity('East').splice(20)
                    .append('images/' + badge.localFile, true);
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


server.pack.register(Good, function (err) {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});