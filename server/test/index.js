const request = require("supertest");
const express = require("express");
var tap = require("tap");
const app = express();
const axios = require("axios");
var _ = require("lodash");
var total_Data = 0;

/**
 * List Resources
 */
tap.test("List Resources", function(assert) {
    request("http://localhost:3000")
        .post("/api/list_resource")
        .send({ resource: "movie" })
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function(err, res) {
            var id = "5de6ce56-6834-4115-8b70-f8a1be2ed978";
            var list = res.body;
            total_Data = res.body.length;
            var keys = _.map(list, "id");
            var index = keys.indexOf(id);
            assert.isNotEqual(index, -1);
            //  assert.deepEqual
            assert.end();
        });
});

// /**
//  * Create Resources
//  */
// tap.test("Create Resources", function(assert) {
//     request("http://localhost:3000")
//         .post("/api/create_resource")
//         .send({
//             resource: "movie",
//             data: {
//                 name: "test3",
//                 description: "description"
//             }
//         })
//         .expect(200)
//         .set("Accept", "application/json")
//         .set(
//             "Authorization",
//             "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiJTZWNyZXQiLCJleHAiOjE1MTM1MzA0MTk0NDcsInN0YWxlcyI6MTUxMzUzMTMxODg0NywiaWF0IjoxNTEzNTMwNDE4fQ.izFIT2tpSJETC0pSC_VGmpA2NKSRcB6YiJXOrkyTJLE"
//         )
//         .expect("Content-Type", /json/)
//         .end(function(err, res) {
//             getAllData().then(


//                 function(res1) {
//                     getAllData().then(
//                         function(r) {
//                             assert.isEqual(r.data.length, ++total_Data)
//                             assert.end();
//                         },
//                         function(err) {
//                             console.log(err);
//                         }
//                     );
//                 },
//                 function(err) {
//                     console.log(err);
//                     assert.end();
//                 }
//             );
//         });
// });

// /**
//  * Update Resources
//  */
// tap.test("Update Resources", function(assert) {
//     request("http://localhost:3000")
//         .post("/api/update_resource")
//         .send({
//             resource: "movie",
//             data: {
//                 uuid: "TSeFR7a",
//                 name: "test3",
//                 description: "description"
//             }
//         })
//         .expect(200)
//         .set("Accept", "application/json")
//         .set(
//             "Authorization",
//             "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiJTZWNyZXQiLCJleHAiOjE1MTM1MzA0MTk0NDcsInN0YWxlcyI6MTUxMzUzMTMxODg0NywiaWF0IjoxNTEzNTMwNDE4fQ.izFIT2tpSJETC0pSC_VGmpA2NKSRcB6YiJXOrkyTJLE"
//         )
//         .expect("Content-Type", /json/)
//         .end(function(err, res) {
//             getAllData().then(
//                 function(res1) {
//                     getAllData("pfXP8UV").then(
//                         function(r) {
//                             assert.isEqual(r.data.id, "TSeFR7a");
//                             assert.end();
//                         },
//                         function(err) {
//                             console.log(err);
//                         }
//                     );
//                 },
//                 function(err) {
//                     console.log(err);
//                     assert.end();
//                 }
//             );
//         });
// });

/**
 * Delete Resources
 */
tap.test("Delete Resources", function(assert) {
    request("http://localhost:3000")
        .post("/api/delete_resource")
        .send({
            resource: "movie",
            uuid: "Xp0jeR3"
        })
        .expect(200)
        .set("Accept", "application/json")
        .set(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiJTZWNyZXQiLCJleHAiOjE1MTM1MzA0MTk0NDcsInN0YWxlcyI6MTUxMzUzMTMxODg0NywiaWF0IjoxNTEzNTMwNDE4fQ.izFIT2tpSJETC0pSC_VGmpA2NKSRcB6YiJXOrkyTJLE"
        )
        .expect("Content-Type", /json/)
        .end(function(err, res) {
            debugger;
            getAllData().then(
                function(res1) {
                    getAllData().then(
                        function(r) {
                            --total_Data;
                            console.log(r.data.length, total_Data);
                            assert.isEqual(r.data.length, total_Data);
                            assert.end();
                            total_Data--;
                        },
                        function(err) {
                            console.log(err);
                            assert.end();
                        }
                    );
                },
                function(err) {
                    console.log(err);
                    assert.end();
                }
            );
        });
});

/**
 *  fetch data
 */
function fetchData(uuid = null) {
    return getAllData(uuid).then(
        function(res) {
            return res.data.length;
        },
        function(err) {
            console.log(err);
        }
    );
}

/**
 * fetch All data
 */
function getAllData(uuid = null) {
    return new Promise(function(resolve, reject) {
        var url = "http://localhost:8000/movies";
        if (uuid) {
            var url = "http://localhost:8000/movies" + "/" + uuid;
        }
        axios.get(url).then(
            function(val) {
                resolve(val);
            },
            function(err) {
                reject(err);
            }
        );
    });
}