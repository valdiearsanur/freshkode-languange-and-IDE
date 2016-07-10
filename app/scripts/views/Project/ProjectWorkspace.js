"use strict";
APP.ProjectWorkspace = Backbone.View.extend({
	el:       $('#page'),
	template: $('#template--workspace'),
	sec:      $('#navbar'),
	section:  $('#section--navbar'),
	importFile: null,
	mainMenu : [/*
		{
			'type' : 'submenu',
			'text' : '<i class="icon-fa-new context-new"/>Edit',
			'child' : [
				{
					'type' : 'button',
					'text' : '<i class="icon-fa-new context-new"/>Undo',
					'event' : 'action-undo inactive'
				},
				{
					'type' : 'button',
					'text' : '<i class="icon-fa-new context-new"/>Redo',
					'event' : 'action-redo inactive'
				},
			]
		},*/
		{
			'type' : 'button',
			'text' : '<i class="icon-fa-new context-new"/>Ekspor Menjadi Gambar',
			'event' : 'action-exportToImg'
		},
		{
			'type' : 'button',
			'text' : '<i class="icon-fa-new context-new"/>Simpan',
			'event' : 'action-save'
		},
		{
			'type' : 'button',
			'text' : '<i class="icon-fa-new context-new"/>Jalankan Program',
			'event' : 'action-run'
		},
		{
			'type' : 'link',
			'text' : '<i class="icon-fa-new context-new"/>Kembali',
			'url' : '#/home'
		},
	],
	initCode: {},
	exec: undefined,
	isRunning: false,
	attrSelector: {
		name: ''
	},
	initialize: function(importFile) {
		this.importFile = importFile;
		window.initializeMainMenu(this.mainMenu);
		this.collection = new APP.ProjectCollection();
	},
	initImportedProject: function() {
		this.project = new APP.ProjectModel();
		this.project.set('code', this.importFile);
	},
	initNewProject: function() {
		this.project = new APP.ProjectModel();
		this.project.set('code', JSON.stringify(Workspace.buildRawCode(), null, ''));
	},
	initExitingProject: function(options) {
		this.collection.fetch();
		this.project = this.collection.selectByCid(options.cid);
	},
	handleEvents: function() {
		var that = this;
		$('.action-viewSelectedDiagram li > ul > li a:eq(0)').on('click', function(e) {
			scrollToSelectedDiagram();
			e.preventDefault();
		});
		$('.action-viewSelectedDiagram li > ul > li > a:eq(1)').on('click', function(e) {
			deleteSelectedDiagram();
			e.preventDefault();
		});
		$('.action-save').on('click', function() {
			that.saveProject();
		});
		$('.action-run').on('click', function() {
			that.runProject();
		});
		$('.action-exportToImg').on('click', function() {
			that.exportProjectToImage();
		});
		$('.action-viewMessage').on('click', function() {
			window.dd2.changeTab("PESANCOM", function() {
				window.dd2.spesificIndex("PESANCOM").tab('show');
			});
		});
	},
	checkHasPO: function() {
		var code  = Workspace.buildRawCode().rawCode.main;
		var process = false, output = false;
		for(var i=0;i<code.length;i++) {
			switch(code[i].token) {
				case "PRINT": 
				case "PRINTLINE": 
					output = true;
				break;
				default: 
					process = true;
				break;
			}
		}
		return process && output;
	},
	checkHasIPO: function() {
		var code  = Workspace.buildRawCode().rawCode.main;
		var input = false, process = false, output = false;
		for(var i=0;i<code.length;i++) {
			switch(code[i].token) {
				case "INPUT": 
					input = true;
				break;
				case "PRINT": 
				case "PRINTLINE": 
					output = true;
				break;
				default: 
					process = true;
				break;
			}
		}
		return input && process && output;
	},
	firstRunning: true,
	runProject: function() {
		if(this.firstRunning) {
			this.firstRunning = false;
		} else {
			window.rating.restoreScore();
		}

		if(!this.isRunning) {
			this.isRunning = true;
			var that = this;
			$('figure.text-effect #pageName').removeClass('active');
			$('figure.text-effect #response').text('program sedang dieksekusi...').addClass('active');
			window.dd2.changeTab("OUTPUT", function() {
				window.dd2.spesificIndex("OUTPUT").tab('show');
			});
			$('.header-nav').addClass('running');
			$('.action-run', this.sec).html('<i class="fa fa-stop"></i> Berhenti');

			this.exec = new Workspace.execute(function() {
				$('figure.text-effect #pageName').addClass('active');
				$('figure.text-effect #response').removeClass('active').text('');
				$('.header-nav').removeClass('running');
				$('.action-run', that.sec).html('<i class="fa fa-play"></i> Jalankan');
				that.isRunning = false;
			});
			this.exec.start();

		} else {
			this.isRunning = false;
			this.exec.stop(true);
			//afterRunProject();
		}

		if(this.checkHasIPO() && parseInt($('#compilerMessage').html()) == 0) {
			window.rating.addScore(10);
		} else if(this.checkHasPO() && parseInt($('#compilerMessage').html()) == 0) {
			window.rating.addScore(5);
		} else {
			window.rating.addScore(0);
		}
	},
	firstSave: true,
	saveProject: function() {
		if(this.firstSave) {
			this.firstSave = false;
		} else {
			window.rating.restoreScore();
		}

		$('figure.text-effect #pageName').removeClass('active');

		//new project
		if(!this.project.get('cid')) {
			this.project.set('cid', this.project.cid);
			this.project.set('dateCreated', moment().format("MM/Do/YYYY HH:mm:ss"));
		}

		//new project + exiting project
		this.project.set('name', this.attrSelector.name.val());
		this.project.set('code', JSON.stringify(Workspace.buildRawCode(), null, ' '));
		this.project.set('dateModified', moment().format("MM/Do/YYYY HH:mm:ss"));

		//save project
		this.collection.add(this.project);
		this.project.save([], {
			success: function(){
				$('figure.text-effect #response').text('berhasil disimpan!').addClass('active');
				$('.header-nav').addClass('notif').delay(2000).queue(function(nxt) {
					$('figure.text-effect #pageName').addClass('active');
					$('figure.text-effect #response').removeClass('active').text('');
					$(this).removeClass('notif');
					nxt();
				});
			},
			error: function() {
				$('.header-nav').addClass('error').delay(2000).queue(function(nxt) {
					$('figcaption#pageName').addClass('active');
					$(this).removeClass('error');
					nxt();
				});
			}
		});

		if(this.checkHasIPO() && parseInt($('#compilerMessage').html()) == 0) {
			window.rating.addScore(12);
		} else if(this.checkHasPO() && parseInt($('#compilerMessage').html()) == 0) {
			window.rating.addScore(7);
		} else {
			window.rating.addScore(0);
		}
	},
	exportProjectToImage : function() {
		$('figure.text-effect #pageName').removeClass('active');
		$('figure.text-effect #response').text('sedang me-render gambar...').addClass('active');

		var that = this;
		var data_sc = $('#workspace').clone().addClass('__data_sc');
		$('body').append(data_sc);

		var saveDialog = $("<input/>", {
			"style":"display:none;",
			"id":"saveFileDialogImg",
			"type":"file",
			"nwsaveas":"codename.png",
		});
		$('body').append(saveDialog);

        html2canvas(data_sc, {
            onrendered: function(canvas) {
				data_sc.remove();
				data_sc = null;

				var file = canvas.toDataURL();
				file = file.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

		        editor.chooseFile("#saveFileDialogImg", function(filename){
		            var fs = require('fs');
					saveDialog.remove();

		            fs.writeFile(filename, file, 'base64', function() {
						$('figure.text-effect #pageName').addClass('active');
						$('figure.text-effect #response').removeClass('active').text('');
		            }); 
		        });
            }
        });
	},
	render: function (options) {
		var contextMenu = [
			{
				'type' : 'separator',
			},
			{
				'type' : 'submenu',
				'text' : '<label class="label label-default" title="statement">s</label>&nbsp;&nbsp; IF',
				'child' : [
					{
						'type' : 'button',
						'text' : '<i class="fa fa-sort"></i> Scroll pada posisi diagram',
						'event' : ''
					},
					{
						'type' : 'separator',
					},
					{
						'type' : 'button',
						'text' : '<i class="fa fa-times"></i> Hapus Diagram',
						'event' : ''
					}
				]
			}
		];
		var contextMenuElm = $("<ul/>", {
			class : "dropdown-menu ddiagram",
			id : "main-navigation"
		}).append(
			$("<li/>", {
				style : "color: #000;font-weight: 700;padding: 5px 10px 5px;"
			}).text("Diagram yang dipilih : ")
		);
		window.ContextMenu(contextMenuElm, contextMenu, 1);

		this.leftSection = '<span><a class="btn" href="#/projects" title="kembali"><i class="fa fa-arrow-left"></i></a></span> <span class="action-viewSelectedDiagram" style="position:relative;float:right;text-transform:initial"><a class="btn no-bg dropdown-toggle disabled" href="#" title="diagram yang dipilih" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#FFD348;"><i class="fa fa-hand-pointer-o"/></a>' + contextMenuElm.get(0).outerHTML +'</span>';
		this.centerSection = 'loading';
		this.rightSection = '<button class="btn no-bg action-viewMessage" style="color: #FFD348"><i class="fa fa-exclamation-triangle"></i> <span id="compilerMessage">0</span></button><button class="btn no-bg action-save"><i class="fa fa-floppy-o"></i> Simpan</button> <span><button class="btn action-run"><i class="fa fa-play"></i> Jalankan</button></span>';

		var section = _.template(this.section.html(), {variable: 'data'})({leftSection: this.leftSection, centerSection: this.centerSection, rightSection: this.rightSection});
		this.sec.html(section);

		this.attrSelector.name = $('<input type="text" class="form-control view-programName" placeholder="Nama program"/>');

		$(".windowControl.page-help").removeClass("disabled");
		$(".windowControl.page-help").removeClass("no-intro");

		var that = this;
		if(options && options.cid) {
			that.initExitingProject({cid: options.cid});

			this.attrSelector.name.val(that.project.get("name"));
			$("figcaption#pageName", this.$sec).html(this.attrSelector.name);
			var template = _.template(that.template.html(), {variable: 'data'})({project: that.project});
			that.$el.html(template);

		} else {
			if(this.importFile != null) {
				that.initImportedProject();
			} else {
				that.initNewProject();
			}

			this.attrSelector.name.val("Program baru");
			$("figcaption#pageName", this.$sec).html(this.attrSelector.name);
			var template = _.template(that.template.html(), {project: null});
			that.$el.html(template);
		}

		this.afterRender();
	},
	afterRender: function (options) {
		this.handleEvents();
		PageDefault.init();

		this.tour = new TourCore();
		this.tour.init(true);


		$('.action-undo').on('click', undoCommand_);
		$('.action-redo').on('click', redoCommand_);

		Gui.init(this.project.get('code'));
		window.dd1 = new PageDefault.DropDown($('.nav-options#tbox-menu-ddown'));
		window.dd2 = new PageDefault.DropDown($('.nav-options#output-menu-ddown'));
		$("figcaption#pageName", this.$sec).toggleClass("active");

		$('.cd-side-navigation').children('ul').menuAim({
	        activate: function(row) {
	        	$(row).addClass('hover');
	        	if($(".cd-tour-wrapper").hasClass("active") && $(".cd-tour-wrapper.active > .cd-single-step.is-selected").css("left") == "90px") {
	        		$(".cd-tour-wrapper.active > .cd-single-step.is-selected")
	        		.children(".cd-more-info")
	        		.attr("style","transform:translate3d(300px,-50%,0);transition:.2s;")
	        	}
	        },
	        deactivate: function(row) {
	        	$(row).removeClass('hover');
	        	if($(".cd-tour-wrapper").hasClass("active") && $(".cd-tour-wrapper.active > .cd-single-step.is-selected").css("left") == "90px") {
	        		$(".cd-tour-wrapper.active > .cd-single-step.is-selected")
	        		.children(".cd-more-info")
	        		.attr("style","transform:translate3d(0,-50%,0);transition:.2s;")
	        	}
	        },
	        exitMenu: function() {
	        	$('.cd-side-navigation').find('.hover').removeClass('hover');
	        	return true;
	        },
	    });

		$('#ddopr-type').change(function() {
		  if($(this).val() == '0') {
		  	$('.nav-opr-type a[href="#tabint"]').tab('show');
		  } else {
		  	$('.nav-opr-type a[href="#tabreal"]').tab('show');
		  }
		});
	},
	close: function() {
		//this.remove();
		//this.unbind();
		this.tour.destroy();
		window.dd1.destroy();
		window.dd2.destroy();
		Gui.destroy();
	}
});