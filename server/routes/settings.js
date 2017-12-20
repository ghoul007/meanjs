module.exports = {
    'api': {
        'map': {
            "movies": {
                "get_by_id": { "method": "GET", "url": "/movies/<uuid>" },
                "list": { "method": "GET", "url": "/movies" },
                "create": { "method": "POST", "url": "/movies" },
                "update": { "method": "PUT", "url": "/movies/<uuid>" },
                "delete": { "method": "DELETE", "url": "/movies/<uuid>" },
                "filter": { "method": "GET", "url": "/movies/<filter>" },
                "search": { "method": "POST", "url": "/movies/search" }
            }

        }
    },
    'transporter': {
        'host': 'smtp.gmail.com',
        'port': 465,
        'email': 'example@host.com',
        'password': 'my_password'
    }
};