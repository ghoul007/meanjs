
/**
 * middleware list
 */
exports.list = function(api, uuid, data) {
  api.setHeaders("list", "list");
  console.log("Movie list");
};

/**
 * middleware create
 */
exports.create = function(api, uuid, data) {
  api.setHeaders("create", "create");
  console.log("Movie create");
};

/**
 * middleware update
 */
exports.update = function(api, uuid, data) {
  api.setHeaders("update", "update");
  console.log("Movie update");
};

/**
 * middleware filter
 */
exports.filter = function(api, uuid, data) {
  api.setHeaders("filter", "filter");
  console.log("Movie filter");
};

/**
 * middleware delete
 */
exports.delete = function(api, uuid, data) {
  api.setHeaders("delete", "delete");
  console.log("Movie delete");
};



exports.test = function(api, uuid, data) {
  api.setHeaders("ahmed", "ghoul");
};

exports.test2 = function(api, uuid, data) {
  api.setHeaders("ahmed", "ghoul");
};
