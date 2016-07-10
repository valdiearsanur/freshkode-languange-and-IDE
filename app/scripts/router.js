"use strict";
APP.Router = Backbone.Router.extend({
    routes: {
      "projects":             "projects",
      "project/:id":          "getProject",
      "delete/:id":           "deleteProject",
      "export/:id":           "exportProject",
      "new":                  "newProject",
      "*other":               "intro", 
    },
    renderView: function(view, arg) {
      if(this.currentView) {
        this.currentView.close();
      }
      this.currentView = view;
      if(arg)
        this.currentView.render(arg);
      else
        this.currentView.render();
    },
    intro: function () {
      this.renderView(new APP.IntroView());
    },
    projects: function () {
      this.renderView(new APP.ProjectsView());
    },
    newProject: function () {
      this.renderView(new APP.ProjectWorkspace());
    },
    getProject: function (id) {
      this.renderView(new APP.ProjectWorkspace(), {cid: id});
    },
    deleteProject: function (id) {
      var projectsView = new APP.ProjectsView();
      projectsView.deleteProject({cid: id});
    },
    exportProject: function (id) {
      var projectsView = new APP.ProjectsView();
      projectsView.exportProject({cid: id});
    },
    filter: function (type) {
        var projectsView = new APP.ProjectsView();
        projectsView.filterType = type;
        projectsView.trigger("change:filterType");
    }
});

var router = new APP.Router;

Backbone.history.start();