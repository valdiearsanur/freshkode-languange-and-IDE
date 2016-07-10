"use strict";

APP.ProjectsView = Backbone.View.extend({
	el:       $('#page'),
	template: $('#template--projectlist'),
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
			'text' : '<i class="icon-fa-new context-new"/>Kembali',
			'url' : '#/home'
		},
	],
	initialize: function() {
		window.initializeMainMenu(this.mainMenu);
		this.collection = new APP.ProjectCollection();
	},
	handleEvents: function() {
		var that = this;
		$('.action-import').on('click', function() {
			that.importProject();
		});
	},
	deleteProject: function (arg) {
		var that = this;
		this.collection.fetch();
		this.project = this.collection.selectByCid(arg.cid);
		this.project.destroy({
			success: function () {
				that.render({'message':'Berhasil Dihapus','type':'notif'});
			},
			error: function () {
				that.render({'message':'Gagal Dihapus','type':'error'});
			},
		});
	},
	importProject: function() {
		var that = this;

		if(window.distributionMode) {
			var saveDialog = $("<input/>", {
				"style":"display:none;",
				"id":"openFileDialog",
				"type":"file"
			});
			$('body').append(saveDialog);

	        editor.chooseFile("#openFileDialog", function(filename){
				saveDialog.remove();
	            editor.loadFile(filename);
	        });
		} else {
            that.render({'message':'Gagal Membuka File','type':'error'});
        }
	},
	exportProject: function(arg) {
		var that = this;
		this.collection.fetch();
		this.project = this.collection.selectByCid(arg.cid);

		if(window.distributionMode) {

			var saveDialog = $("<input/>", {
				"style":"display:none;",
				"id":"saveFileDialog",
				"type":"file",
				"nwsaveas":"codename.freshkode",
			});
			$('body').append(saveDialog);

	        editor.chooseFile("#saveFileDialog", function(filename){
				saveDialog.remove();
	            var fs = require('fs');
	            var file = that.project.get('code');
	            fs.writeFile(filename, file, function(err) {
	                if(err) {
	                    that.render({'message':'Gagal Disimpan','type':'error'});
	                } else {
	                    that.render({'message':'Berhasil Disimpan','type':'notif'});
	                }
	            }); 
	        });
		} else {
            that.render({'message':'Gagal Disimpan','type':'error'});
        }
	},
	render: function (options) {
		this.leftSection = '<span><a class="btn" href="#/home"><i class="fa fa-arrow-left"></i> Kembali</a></span>';
		this.centerSection = 'Daftar Program';
		this.rightSection = '<span><button class="btn no-bg action-import"><i class="fa fa-download"></i> Impor file</button> <a class="btn" href="#/new">Program baru <i class="fa fa-asterisk"></i></a></span>';

		var section = _.template(this.section.html(), {variable: 'data'})({leftSection: this.leftSection, centerSection: this.centerSection, rightSection: this.rightSection});
		this.sec.html(section);
		$("figcaption#pageName", this.$sec).toggleClass("active");
		$(".windowControl.page-help").addClass("disabled");
		$(".windowControl.page-help").addClass("no-intro");

		var that = this;

		this.collection.fetch({
			success: function(collection) {
				if(options != null && options.message != null && options.type != null) {
					$('figure.text-effect #pageName').removeClass('active');
					$('figure.text-effect #response').text(options.message).addClass('active');
					$('.header-nav').addClass(options.type).delay(2000).queue(function(nxt) {
						$('figure.text-effect #pageName').addClass('active');
						$('figure.text-effect #response').removeClass('active').text('');
						$(this).removeClass(options.type);
						nxt();
					});
				}
				var template = _.template(that.template.html(), {variable: 'data'})({projects: collection.models});
				that.$el.html(template);
			}
		});

		//page scripts
		this.afterRender();
	},
	afterRender: function (options) {
		this.handleEvents();
		PageDefault.init();
		PageProgram.init();
	},
	close: function() {
		//this.remove();
		//this.unbind();
	}
});