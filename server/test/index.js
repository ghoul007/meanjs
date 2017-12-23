 const request = require('supertest');
 const express = require('express');
 var tap = require("tap");
 const app = express();
 var _ = require('lodash');
 // var express = require("express");

 /**
  * List Resources
  */
 tap.test("List Resources", function(assert) {
     request("http://localhost:3000")
         .post("/api/list_resource")
         .send({ resource: "movies" })
         .expect(200)
         .set('Accept', 'application/json')
         .expect("Content-Type", /json/)
         .end(function(err, res) {
             var id = "R43ws8j"
             var list = res.body;
             var keys = _.map(list, 'id');
             var index = keys.indexOf(id);
             assert.isNotEqual(index, -1);
             //  assert.deepEqual
             assert.end();
         });
 });

 /**
  * Create Resources
  */
 tap.test("Create Resources", function(assert) {
     debugger;
     request("http://localhost:3000")
         .post("/api/create_resource")
         .send({
             "resource": "movies",
             "data": {
                 "name": "test3",
                 "description": "description"
             }
         })
         .expect(200)
         .set('Accept', 'application/json')
         .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFobWVkIiwicGFzc3dvcmQiOiJTZWNyZXQiLCJleHAiOjE1MTM1MzA0MTk0NDcsInN0YWxlcyI6MTUxMzUzMTMxODg0NywiaWF0IjoxNTEzNTMwNDE4fQ.izFIT2tpSJETC0pSC_VGmpA2NKSRcB6YiJXOrkyTJLE')
         .expect("Content-Type", /json/)
         .end(function(err, res) {
            //  var id = "R43ws8j"
            //  var list = res.body;
            //  var keys = _.map(list, 'id');
            //  var index = keys.indexOf(id);
            //  assert.isNotEqual(index, -1);
             //  assert.deepEqual
             assert.end();
         });
 });
