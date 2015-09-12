// Require and initialize the Twilio module with your credentials
var client = require('twilio')('AC9e4d86219a51a1388ac28c903cbe3c0f', 'fc7af13108a73d358bb69e7404d92c12');

// Use Parse.Cloud.define to define as many cloud functions as you want.
Parse.Cloud.define("sendMms", function (request, response) {

    var to = request.params.to;
    var from = '+12404534212';
    var body = 'Proof of Delivery powered by POD Chief - ' + request.params.mediaUrl;
    var mediaUrl = request.params.mediaUrl;

    // Send an SMS message
    client.sms.messages.create({
            to: to,
            from: from,
            body: body,
            mediaUrl: mediaUrl
        },
        function (err, responseData) {
            if (err) {
                console.log(err);

                response.error(err);
            }
            else {
                console.log(responseData.from);
                console.log(responseData.body);
                console.log(responseData.mediaUrl);

                response.success();
            }
        }
    );
});

Parse.Cloud.define("sendFax", function (request, response) {

    var pdfUrl = request.params.pdfUrl;

    Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'https://api.phaxio.com/v1/send',
        body: {
            to: '3018545007',
            string_data: pdfUrl,
            string_data_type: 'url',
            api_key: '75fb3c0670521a927de046d8ff49d2643503e4f7',
            api_secret: '9fdc52c3297d5be934f59b8a9c14d01c9dc40bd7'
        },
        success: function(httpResponse) {

            response.success(httpResponse.text);
        },
        error: function(httpResponse) {

            response.error(httpResponse.text);
        }
    });
});

