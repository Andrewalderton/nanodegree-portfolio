(function ($) {
    const Vimeo = require('vimeo').Vimeo;

    const CLIENT_SECRET = 'psPebW92g+fC2vu4gfa2FXu7IkwD50kJNSDiAQmViRM6SUBIRLwLMyMJ+r/piu+JskaAt+urvFA59Skw5n7tLFN5mDYBuo2QHt7Xvjc3icGWlEBEDmaCV9QesMA0q4EN';

    const CLIENT_ID = '84cd4bec9409ae6e1727e49a1e1341f64238ea5c';

    const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET);

    // scope is an array of permissions your token needs to access. You can read more at https://developer.vimeo.com/api/authentication#supported-scopes
    lib.generateClientCredentials('public', function (err, access_token) {
        if (err) {
                throw err;
        }

        var token = access_token.access_token;

        // Other useful information is included alongside the access token
        // We include the final scopes granted to the token. This is important because the user (or api) might revoke scopes during the authentication process
        var scopes = access_token.scope;
    });

    lib.request(/*options*/{
        // This is the path for the videos in the portfolio album
        path: '/users/andrewalderton/albums/2707460/videos'
    }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
            console.log('error');
            console.log(error);
        } else {
            const vimeo = document.getElementById('vimeo');
            const results = body.data;
            results.forEach(function(result) {
                let element = document.createElement('div');
                element.setAttribute("class", "vimeo col-md-6");
                let name = result.name;
                let embed = result.embed.html;
                element.innerHTML = '<h2>' + name + '</h2><br>' + embed;
                vimeo.appendChild(element);
            });
        }
    });
}(jQuery));