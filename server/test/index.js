var tap = require("tap");
var request = require("supertest");
var app = require("../app.js");
// var express = require("express");

tap.test("List Resources", function(assert) {
    debugger;
    request(app)
        .post("/list_resource")
        .send({ resource: "movies" })
        .expect(200)
        .expect("Content-Type", /json/)
        .end(function(err, res) {
            var expectedThings = [{
                    name: "test1",
                    description: "description",
                    id: "k6yFkxv"
                },
                {
                    name: "test1",
                    description: "description",
                    id: "SYO7WPl"
                }
            ];
            var actualThings = res.body;

            assert.error(err, "No error");
            assert.same(actualThings, expectedThings, "Retrieve list of things");
            assert.end();
        });
});