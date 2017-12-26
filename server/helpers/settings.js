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
                "test": { "method": "GET", "url": "/movies/5de6ce56-6834-4115-8b70-f8a1be2ed978" },
                "test2": { "method": "GET", "url": "/movies/beadf613-7f90-4017-9438-0435625d12cc" }
            },
            "post": {
                "get_by_id": { "method": "GET", "url": "/post/<uuid>" },
                "list": { "method": "GET", "url": "/post" },
                "create": { "method": "POST", "url": "/post" },
                "update": { "method": "PUT", "url": "/post/<uuid>" },
                "delete": { "method": "DELETE", "url": "/post/<uuid>" },
                "filter": { "method": "GET", "url": "/post?<filter>" },
                "test": { "method": "GET", "url": "/post/5de6ce56-6834-4115-8b70-f8a1be2ed978" },
                "test2": { "method": "GET", "url": "/post/beadf613-7f90-4017-9438-0435625d12cc" }
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