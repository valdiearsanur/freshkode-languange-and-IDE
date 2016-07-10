var PageDefault = (function() {

	var initWindow = function() {
		if(!window.distributionMode) return false;

		var isMaximized = false;
		window.win.on("maximize", 		function() {window.win.isMaximized = true;});
		window.win.on("unmaximize", 	function() {window.win.isMaximized = false;});

		document.getElementById("WindowControlMinimize").onclick = function() {
			window.win.minimize();
		}
		document.getElementById("WindowControlResize").onclick = function() {
			if(isMaximized) {
				window.win.unmaximize();
				isMaximized = false;
			} else {
	  			window.win.maximize();
	  			isMaximized = true
			}
		}
		document.getElementById("menu_WindowControlClose").onclick = function() {
			window.win.close();
		}
		document.getElementById("WindowControlClose").onclick = function() {
			window.win.close();
		}
	};

	var initToolTip = function() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	function DDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('label.option-toggle');
		this.optionalPlaceHolder = {};
		this.optsList = this.dd.find('.options > ul > li');
		this.opts = this.dd.find('.options > ul > li > a');
		this.title = this.dd.data('title');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				obj.dd.toggleClass('active');
				return false;
			});

			obj.opts.on('click', function(event){
				var opt = $(this);
				obj.val = opt.parent().attr('class').split(" ")[0];

				obj.index = opt.index();

				obj.placeholder.html(
					obj.spesificIndex(obj.val).text() +
					(
						obj.optionalPlaceHolder.hasOwnProperty(obj.val) ? 
						" " + obj.optionalPlaceHolder[obj.val] : 
						""
					)
				);
			});
			document.onclick = function(e) {
				obj.dd.removeClass('active');
			};
		},
		changeTab : function(value, callback) {
			var obj = this;
			if(obj.optsList.hasClass(value)) {
				obj.val = value;
				obj.placeholder.html(
					obj.spesificIndex(value).text() + 
					(
						obj.optionalPlaceHolder.hasOwnProperty(value) ? 
						" " + obj.optionalPlaceHolder[value] : 
						""
					)
				);
			}
			callback();
		},
		spesificIndex : function(value) {
			var obj = this;
			return obj.dd.find("> .options ul li."+value+" a");
		},
		changeOptionalPlaceholder : function(target, value) {
			var obj = this;
			if(obj.optsList.hasClass(target)) {
				obj.optionalPlaceHolder[target] = value;
				obj.placeholder.html(
					obj.spesificIndex(target).text() + 
					(
						obj.optionalPlaceHolder.hasOwnProperty(target) ? 
						" " + obj.optionalPlaceHolder[target] : 
						""
					)
				);
			}
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		},
		destroy: function() {
			this.dd.remove();
		}
	}

	var handleTboxTab = function() {
		$('#toolbox a[data-toggle="tab"]').on('click', function(e) {
			$(this).tab('show');
		});
	}

	var handleOutpTab = function() {
		$('#output a[data-toggle="tab"]').on('click', function(e) {
			$(this).tab('show');
		});
	}

	var handleFirstLoad = function() {
		//$('.finishLoad').click(function() {
			$('.loading-anim').hide();
		//});
	}
	var handleNav = function() {
		var buttonNavMenu = $(".toggleNavMenu");
		buttonNavMenu.click(function() {
			var xMenu = $(".nav-menu");
			var xBody = $(".hl-nav");
			xMenu.toggleClass("nav-push");
			xBody.toggleClass("nav-push");
		});
	};

	return {
		init: function() {
			initWindow();
			initToolTip();
			handleFirstLoad();
			handleNav();
			handleTboxTab();
			handleOutpTab();
		},
		DropDown : DDown
	}
})();