module.exports = {
    'api': {
        'map': {
            "movies": {
                "login": { "method": "POST", "url": "/api/movies/login" },
                "change": { "method": "POST", "url": "/api/movies/change" },
                "list": { "method": "GET", "url": "/api/movies" },
                "create": { "method": "POST", "url": "/api/movies" },
                "update": { "method": "PUT", "url": "/api/movies/<uuid>" },
                "delete": { "method": "DELETE", "url": "/api/movies/<uuid>" },
                "exist": { "method": "POST", "url": "/api/movies/exist" },
                "search": { "method": "POST", "url": "/api/movies/search" }
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