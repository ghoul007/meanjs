
/**
 * middleware list
 */
exports.list = function(api, uuid, data) {
  api.setHeaders("list", "list");
  console.log("Post list");
};

/**
 * middleware create
 */
exports.create = function(api, uuid, data) {
  api.setHeaders("create", "create");
  console.log(" Post create");
};

/**
 * middleware update
 */
exports.update = function(api, uuid, data) {
  api.setHeaders("update", "update");
  console.log("Post update");
};

/**
 * middleware filter
 */
exports.filter = function(api, uuid, data) {
  api.setHeaders("filter", "filter");
  console.log("Post filter");
};

/**
 * middleware delete
 */
exports.delete = function(api, uuid, data) {
  api.setHeaders("delete", "delete");
  console.log("Post delete");
};



exports.test = function(api, uuid, data) {
};

exports.test2 = function(api, uuid, data) {
};

