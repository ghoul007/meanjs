/**
 * middleware list
 */
exports.list = (api, uuid, data) => {
    api.setHeaders("list", "list");
    console.log("Movie list");
};

/**
 * middleware create
 */
exports.create = (api, uuid, data) => {
    api.setHeaders("create", "create");
    console.log("Movie create");
};

/**
 * middleware update
 */
exports.update = (api, uuid, data) => {
    api.setHeaders("update", "update");
    console.log("Movie update");
};

/**
 * middleware filter
 */
exports.filter = (api, uuid, data) => {
    api.setHeaders("filter", "filter");
    console.log("Movie filter");
};

/**
 * middleware delete
 */
exports.delete = (api, uuid, data) => {
    api.setHeaders("delete", "delete");
    console.log("Movie delete");
};


exports.test = (api, uuid, data) => {
    api.setHeaders("test", "test");
    console.log("Movie test");
};

exports.test2 = (api, uuid, data) => {
    api.setHeaders("test2", "test2");
    console.log("Movie test2");
};


exports.example = (api, uuid, data) => {
    api.setHeaders("test2", "test2");
    console.log("Movie test2");
};