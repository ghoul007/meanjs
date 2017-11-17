var express = require("express");
var morgan = require("morgan");
var router = express.Router();
var auth = require('../middleware/auth')
var rest = require('../middleware/rest');
var login = require('./api/login')
var users = require("./api/login");
var axios = require("axios");
var api = require('../map/api')


router.get("/", function(req, res, next) {
    res.send("api ..");
});

var url = "http://127.0.0.1:8000/api";
router.get("/posts", rest.list("posts"))
    // router.get("/movies", rest.list("posts"))
router.get("/movies", function(req, res, next) {
    const AuthStr = 'Bearer '.concat(req.session.tokenApi);
    console.log("=>AuthStr", AuthStr)
    return axios.get(`${url}/user`, { headers: { Authorization: AuthStr } })
        .then(function(data) {
            res.status(200).json(data.data);
        })
        // ,

    // function(err) {
    //     res.status(500).send(err);
    // });
});
// router.use('/admin', auth.logger(morgan, "admin.log"), auth.setRole('admin'));

router.get('/crash', function(req, res, next) {
        process.exit(1);
    })
    // router.get("/:param", function(req, res, next) {
    //     var params = req.params;
    //     var query = req.query;
    //     Object.assign(params, query);
    //     res.json(params);
    // });



/**
 * Get list of resource
 */
router.post('/list_resource', function(req, res, next) {

    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var action = 'list';


    const AuthStr = 'Bearer '.concat(req.session.tokenApi);
    console.log("AuthStr", AuthStr)
    // var dat = { 'login': req.user.email };
    // api.setToken(req.user.token);
    api.setHeaders('Authorization', AuthStr );
    // console.log('ghoul dat', dat)
console.log(resource);
    if (uuid) {
        action = 'get_by_id';
        api.findResource(res, resource).call(action, null, uuid).then(function(data) {
            res.status(200).send(values(data));
        });
    } else {
        api.findResource(res, resource).call(action).then(function(data) {
          console.log('data',data)
            res.status(200).send(data);
        });
    }
});





module.exports = router;




// /**
//  * Get list of resource
//  */
// router.post('/list_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var action = 'list';


//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */


//       var dat = {'login':req.user.email} ;
//       api.setToken(req.user.token);
//       api.setHeaders('login',req.user.email);


//       console.log('ghoul dat', dat)
//       if (uuid) {
//         action = 'get_by_id';
//         api.findResource(res, resource).call(action, null, uuid).then(function(data) {
//           res.status(200).send(values(data));
//         });
//       } else {
//         api.findResource(res, resource).call(action).then(function(data) {
//           res.status(200).send(values(data));
//         });
//       }
//     });


//     /**
//      * Creates a new resource
//      */
//     router.post('/create_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var data = req.body.data;
//       var action = 'create';
//       console.log(req.body);
//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);

//       api.findResource(res, resource).call(action, data).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Update resource
//      */
//     router.post('/update_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var data = req.body.data;
//       var action = 'update';
//       var obj = {};

//         obj[uuid] = data;

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);
//       api.findResource(res, resource).call(action, uuid).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Update resource
//      */
//     router.post('/update_resourceMass', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var data = req.body.data;
//       var action = 'updateMass';
//       var obj = {};

//         obj[uuid] = data;

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);
//       api.findResource(res, resource).call(action, uuid).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });



//     /**
//      * Update resource
//      */
//     router.post('/status_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var data = req.body.data;
//       var action = 'status';
//       var obj = {};

//         obj[uuid] = data;

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);
//       api.findResource(res, resource).call(action, uuid).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Update resource
//      */
//     router.post('/update_resourceSt', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var data = req.body.data;
//       var action = 'updateSt';
//       var obj = {};

//       obj[uuid] = data;


//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);

//       api.findResource(res, resource).call(action, obj).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Search resource
//      */
//     router.post('/search_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var data = req.body.data;
//       var action = 'search';

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);

//       api.findResource(res, resource).call(action, data, null).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });


//     /**
//      * exist resource
//      */
//     router.post('/exist_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var data = req.body.data;
//       var action = 'exist';

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);

//       api.findResource(res, resource).call(action, data, null).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Delete resource
//      */
//     router.post('/delete_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;
//       var action = 'delete';

//       /*
//        * delete this comment
//        * you can set headers by using
//        * api.setHeaders('key','value')
//        * */
//       api.setToken(req.user.token);

//       api.findResource(res, resource).call(action, null, uuid).then(function(data) {
//         res.status(200).send(values(data));
//       });
//     });

//     /**
//      * Get list of resource
//      */
//     router.post('/detail_resource', function(req, res, next) {

//       var resource = req.body.resource;
//       var uuid = req.body.uuid;

//       var action = 'detail';
//       api.setToken(req.user.token);

//         api.findResource(res, resource).call(action, uuid).then(function(data) {
//           res.status(200).send(values(data));
//         });
//     });

//     /**
//      * Get current user
//      */
//     router.post('/get_account', function(req, res, next) {
//         delete req.user.token
//       res.json(req.user)
//     });


//     module.exports = router;
