var async = require('async'),
	keystone = require('keystone'),
	restUtils = require('./restUtils');

var ResourceTag = keystone.list("ResourceTag");
var model = ResourceTag.model;

// lists all resource tags
exports.list = function(req, res) {
	restUtils.list(model, req, res);
}

// get a resource tag by id
exports.get = function(req, res) {
	restUtils.get(model, req, res);
}

// comment
exports.find = function(req, res) {
	restUtils.find(model, req, res);
}

//create a resource tag
exports.create = function(req, res) {
	restUtils.create(model, req, res);
}

//updates a resource tag
exports.update = function(req, res) {
    restUtils.update(model, req, res);
}
