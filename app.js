var Hapi = require('hapi'),
    gm = require('gm').subClass({ imageMagick: true });

var server = new Hapi.Server('localhost', 8000);

var icons = {
    statusEndpoint: ['S', 'x']
}

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        //var hasStatusEndpoint = request.query.hasStatusEndpoint !== undefined;

        var image = gm(200, 400, "#ddff99f3")
            .fontSize(40)
            .stroke("#efe", 2)
            .fill("#888")
            .font("Arial")
            .drawLine(20, 10, 50, 40)
            .drawText(0, 100, "Hello")
            .drawLine(40, 10, 50, 40);
        //image.drawText(0, 0, icons.statusEndpoint[hasStatusEndpoint ? 0 : 1]);

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
