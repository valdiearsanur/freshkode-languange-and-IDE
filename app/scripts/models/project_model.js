
"use strict";
APP.ProjectModel = Backbone.Model.extend({
  defaults: {
    cid: "",
    name: "Tanpa Judul Program",
    dateCreated: "",
    dateModified: moment().format("MM/Do/YYYY HH:mm:ss"),
    code: {}
  },
  getDateCreated: function() {
    return moment(this.get("dateCreated"),"MM/Do/YYYY HH:mm:ss").fromNow();
  },
  getDateModified: function() {
    return moment(this.get("dateModified"),"MM/Do/YYYY HH:mm:ss").fromNow();
  },
  validate: function (attrs) {
    var errors = {};
    if (!attrs.name) errors.cid = "Kesalahan pada project, silahkan tutup dan buka kembali project";
    if (!attrs.name) errors.name = "Nama project tidak boleh kosong";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});
