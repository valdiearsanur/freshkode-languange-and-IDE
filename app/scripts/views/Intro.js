"use strict";
APP.IntroView = Backbone.View.extend({
  el:       $('#page'),
  template: $('#template--intro'),
  sec:      $('#navbar'),
  section:  $('#section--navbar'),
  mainMenu : [
    {
      'type' : 'link',
      'text' : '<i class="icon-fa-new context-new"/>Program Baru',
      'url' : '#/new'
    },
    {
      'type' : 'link',
      'text' : '<i class="icon-fa-new context-new"/>Daftar Program',
      'url' : '#/projects'
    },
  ],
  initialize: function() {
    window.initializeMainMenu(this.mainMenu);
  },
  render: function (options) {
    var template = _.template(this.template.html());
    $("body").addClass("intro");
    $(".windowControl.page-help").addClass("disabled");
    $(".windowControl.page-help").addClass("no-intro");
    this.$el.html(template);
    this.sec.html("");

    //page scripts
    this.afterRender();
  },
  afterRender: function (options) {
    PageDefault.init();
    PageIntro.init();
  },
  close: function() {
    $("body").removeClass("intro");
    //this.remove();
    //this.unbind();
  }
});