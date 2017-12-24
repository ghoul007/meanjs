module.exports = {
    'api': {
        'map': {
            "movie": {
                "get_by_id": { "method": "GET", "url": "/movies/<uuid>" },
                "list": { "method": "GET", "url": "/movies" },
                "create": { "method": "POST", "url": "/movies" },
                "update": { "method": "PUT", "url": "/movies/<uuid>" },
                "delete": { "method": "DELETE", "url": "/movies/<uuid>" },
                "filter": { "method": "GET", "url": "/movies?<filter>" },
                "test": { "method": "GET", "url": "/movies/CgmKkN9" },
                "test2": { "method": "GET", "url": "/movies/pfXP8UV" }
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
