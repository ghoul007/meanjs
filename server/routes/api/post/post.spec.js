require("dotenv").config();
const casual = require("casual");
const request = require("supertest");
const express = require("express");
const test = require("tap-only");
const app = express();
const axios = require("axios");
const _ = require("lodash");

const API_test = process.env.API_TEST_URL
const LIST = process.env.API_TEST_LIST
const CREATE = process.env.API_TEST_CREATE
const FILTER = process.env.API_TEST_FILTER
const UPDATE = process.env.API_TEST_UPDATE
const DELETE = process.env.API_TEST_DELETE
const TOKEN_TEST = process.env.TOKEN_TEST


var total_Data = 0;
const token = TOKEN_TEST
const dataList = "5de6ce56-6834-4115-8b70-f8a1be2ed978";
const Resource_Name = "post";


var dataCreate = {
    "name": casual.title,
    "description": casual.description
};

/**
 * List Resources
 */
test("List Resources", (assert) => {


    request(API_test)
        .post(LIST)
        .send({ resource: Resource_Name })
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) return done(err);
            let id = dataList;
            let list = res.body;
            total_Data = res.body.length;
            let keys = _.map(list, "id");
            let index = keys.indexOf(id);
            assert.isNotEqual(index, -1);
            //  assert.deepEqual
            assert.end();
        });
});

// /**
//  * Create Resources
//  */
test("Create Resources", (assert) => {
    request(API_test)
        .post(CREATE)
        .send({
            resource: Resource_Name,
            data: dataCreate
        })
        .expect(200)
        .set("Accept", "application/json")
        .set(
            "Authorization",
            "Bearer " + token
        )
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) return done(err);

            if (res.status == 200) {
                dataCreate = res.body
                getAllData().then(
                    (res1) => {
                        getAllData().then(
                            (r) => {
                                assert.isEqual(r.data.length, ++total_Data)
                                assert.end();
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                    },
                    (err) => {
                        console.log(err);
                        assert.end();
                    }
                );

            } else {
                throw new Error(err.message);
            }
        });
});

/**
 * Filter Resources
 */
test("Filter Resources", (assert) => {
    request(API_test)
        .post(FILTER)
        .send({
            resource: Resource_Name,
            "data": {
                "name": dataCreate.name,
                "_page": "1",
                "_limit": "1000",
                "_order": "asc",
                "_sort": "id"
            }
        })
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) return done(err);
            let id = dataCreate.id;
            let list = res.body;
            let keys = _.map(list, "id");
            let index = keys.indexOf(id);
            assert.isNotEqual(index, -1);
            //  assert.deepEqual
            assert.end();
        });
});

// /**
//  * Update Resources
//  */
test("Update Resources", (assert) => {
    request(API_test)
        .post(UPDATE)
        .send({
            resource: Resource_Name,
            uuid: dataCreate.id,
            data: dataCreate
        })
        .expect(200)
        .set("Accept", "application/json")
        .set(
            "Authorization",
            "Bearer " + token
        )
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) return done(err);
            if (res.status == 200) {
                getAllData().then(
                    (res1) => {
                        getAllData(dataCreate.id).then(
                            (r) => {
                                assert.isEqual(r.data.id, dataCreate.id);
                                assert.end();
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                    },
                    (err) => {
                        console.log(err);
                        assert.end();
                    }
                );
            } else {
                throw new Error(err.message);
            }
        });
});

/**
 * Delete Resources
 */
test("Delete Resources", (assert) => {
    request(API_test)
        .post(DELETE)
        .send({
            resource: Resource_Name,
            uuid: dataCreate.id
        })
        .expect(200)
        .set("Accept", "application/json")
        .set(
            "Authorization",
            "Bearer " + token
        )
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) return done(err);
            if (res.status == 200) {
                getAllData().then(
                    (res1) => {
                        getAllData().then(
                            (r) => {
                                --total_Data;
                                assert.isEqual(r.data.length, total_Data);
                                assert.end();
                            },
                            (err) => {
                                console.log(err);
                                assert.end();
                            }
                        );
                    },
                    (err) => {
                        console.log(err);
                        assert.end();
                    }
                );
            } else {
                throw new Error(err.message);
            }
        });
});



/**
 *  fetch data
 */
var fetchData = (uuid = null) => {
    return getAllData(uuid).then(
        (res) => res.data.length,
        (err) => console.log(err)

    );
}

/**
 * fetch All data
 */
var getAllData = (uuid = null) => {
    return new Promise((resolve, reject) => {
        var data = { resource: Resource_Name };
        if (uuid) {
            var data = { resource: Resource_Name, uuid: uuid };
        }
        var url = API_test + LIST;
        axios.post(url, data).then(
            (val) => resolve(val),
            (err) => reject(err)

        )
    });
}