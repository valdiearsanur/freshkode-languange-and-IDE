
"use strict";
APP.ProjectCollection = Backbone.Collection.extend({
	model: APP.ProjectModel,
	localStorage: new Backbone.LocalStorage("fkd"),
	selectByCid: function (cid) {
			return this.filter(function (model) {
					return model.get('cid') === cid;
			})[0];
	},
});