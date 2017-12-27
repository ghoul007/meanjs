/**
 * middleware list
 */
exports.list = (api, uuid, data) => {
    api.setHeaders("list", "list");
    console.log("Post list");
};

/**
 * middleware create
 */
exports.create = (api, uuid, data) => {
    api.setHeaders("create", "create");
    console.log(" Post create");
};

/**
 * middleware update
 */
exports.update = (api, uuid, data) => {
    api.setHeaders("update", "update");
    console.log("Post update");
};

/**
 * middleware filter
 */
exports.filter = (api, uuid, data) => {
    api.setHeaders("filter", "filter");
    console.log("Post filter");
};

/**
 * middleware delete
 */
exports.delete = (api, uuid, data) => {
    api.setHeaders("delete", "delete");
    console.log("Post delete");
};




exports.test = (api, uuid, data) => {
    api.setHeaders("ahmed", "ghoul");
    console.log("brav ahmed");
};

exports.test2 = (api, uuid, data) => {
    api.setHeaders("ahmed", "ghoul");
    console.log("brav ahmed");
};