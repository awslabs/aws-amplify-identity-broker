function handlePKCE(event) {
    return {
        statusCode: 200,
        body: JSON.stringify("PKCE Flow"),
    };
}

function handleImplicit(event) {
    var client_id = event.queryStringParameters.client_id
    var redirect_url = event.queryStringParameters.redirect_url
    if (client_id === undefined || redirect_url === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing"),
        };
    }
    // Can validate client_id and redirect_url agaisnt db here

    return { //redirect to login page
        statusCode: 301,
        headers: {
            Location: '/?client_id=' + client_id + '&redirect_url=' + redirect_url,
        }
    };
}

exports.handler = async (event) => {
    if (!(event && event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify("Required parameters are missing")
        };
    }

    switch (event.queryStringParameters.response_type) {
        case ('code'):
            return handlePKCE(event);

        case ('id_token'):
            return handleImplicit(event);

        default:
            return {
                statusCode: 400,
                body: JSON.stringify("Response type is missing or invalid"),
            };
    }
};