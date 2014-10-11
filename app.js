var Hapi = require('hapi'),
    gm = require('gm').subClass({ imageMagick: true }),
    _ = require('underscore');

var server = new Hapi.Server('localhost', 8000);

var badges = {
    statusEndpoint: { pass: 'S', versionFail: 's', fail: 'x', version: 1 },
    loggingSchema: { pass: 'L', versionFail: 'l', fail: 'x', version: 1 }
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var result = _
            .chain(badges)
            .map(function(name, config){
                if (_.has(request.query, name)){
                    var queryVersion = request.query[name];
                    //is int?
                    return queryVersion >= config.version ? config.pass : config.versionFail
                } else {
                    return config.fail;
                }
            })
            .reduce(function(memo, letter){ return memo + letter; }, '')
            .value();


        var image = gm(200, 400, "#ddff99f3")
            .fontSize(40)
            .stroke("#efe", 2)
            .fill("#888")
            .font("Arial")
            .drawText(0, 100, result);

        image.toBuffer('PNG',function (err, buffer) {
            if (err) {
                console.log(err);
                return;
            }

            reply(buffer).type('image/png');
        });
    }
});

server.start();
