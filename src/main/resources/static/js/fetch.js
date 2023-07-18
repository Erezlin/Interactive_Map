function jsonOrError(response) {
    if (response.ok) {
        return response.text()
            .then(txt => {
                return txt ? JSON.parse(txt) : null;
            })
    } else {
        return Promise.reject(response);
    }
}

function GET(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        credentials: "same-origin"
    }).then(jsonOrError);
};

function POST(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        credentials: "same-origin",
        body: body
    }).then(jsonOrError);
};

function PUT(url, body) {
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        },
        credentials: "same-origin",
        body: body
    }).then(jsonOrError);
};

function DELETE(url, body) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        },
        credentials: "same-origin",
        body: body
    }).then(jsonOrError);
};
