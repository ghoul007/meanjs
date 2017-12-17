module.exports = {
    'api': {
        'map': {
            "movies": {
                "login": { "method": "POST", "url": "/movies/login" },
                "change": { "method": "POST", "url": "/movies/change" },
                "list": { "method": "GET", "url": "/movies" },
                "create": { "method": "POST", "url": "/movies" },
                "update": { "method": "PUT", "url": "/movies/<uuid>" },
                "delete": { "method": "DELETE", "url": "/movies/<uuid>" },
                "exist": { "method": "POST", "url": "/movies/exist" },
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
