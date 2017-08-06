"use strict";

window.distributionMode = true;
try {
	window.nw = require('nw.gui');
	window.win = nw.Window.get();
	window.win.setPosition("center");
	//window.editor = require('./assets/global/js/editor.js');
	window.loadFile = function(file){
		var fs = require('fs');
		fs.readFile(file, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			(new global.window.APP.ProjectWorkspace(data)).render();
		});
	};

	window.chooseFile = function(name, callback) {
		var chooser = global.$(name);
		chooser.unbind('change');
		chooser.change(function(e) {
			callback(global.$(this).val());
		});

		chooser.trigger('click');
	};

	global.$ = $;
	global.window = window;
}
catch(err) {
    window.distributionMode = false;
}


window.changeUrl = function(href) {
	var newFragment = Backbone.history.getFragment(href);
	if (Backbone.history.fragment == newFragment) {
		Backbone.history.fragment = null;
	}
	Backbone.history.navigate(newFragment, true);
}

window.MomentFormat = "MM/Do/YYYY HH:mm:ss";

window.ContextMenu = function($targetElm, menus, deleteArg) {
	$targetElm.children('li').slice(deleteArg).remove();

	for(var i=0;i<menus.length;i++) {
		if(menus[i].type == "link") {
			$targetElm.append(
				$("<li/>").append(
					$("<a/>", {'href':menus[i].url}).html(menus[i].text)
				)
			);
		} else if(menus[i].type == "button") {
			$targetElm.append(
				$("<li/>").append(
					$("<a/>", {'href':'javascript:void(0)','class':menus[i].event}).html(menus[i].text)
				)
			);
		} else if(menus[i].type == "submenu") {
			$targetElm.append(
				$("<li/>", {'class' : 'dropdown-submenu'}).append(
					$("<a/>", {'href':'javascript:void(0)','tabindex':'-1'}).html(menus[i].text)
				).append(
					window.fillContextMenu($("<ul/>",{'class' : 'dropdown-menu'}), menus[i].child)
				)
			);
		} else if(menus[i].type == "separator") {
			$targetElm.append(
				$("<li/>", {
					'class' : 'divider',
					'role' : 'separator'
				})
			);
		}
	}
}
window.fillContextMenu = function(elm, menus) {
	if(elm.length && menus.length) {
		for(var i=0;i<menus.length;i++) {
			if(menus[i].type == "link") {
				elm.append(
					$("<li/>").append(
						$("<a/>", {'href':menus[i].url}).html(menus[i].text)
					)
				);
			} else if(menus[i].type == "button") {
				elm.append(
					$("<li/>").append(
						$("<a/>", {'href':'javascript:void(0)','class':menus[i].event}).html(menus[i].text)
					)
				);
			} else if(menus[i].type == "submenu") {
				elm.append(
					$("<li/>", {'class' : 'dropdown-submenu'}).append(
						$("<a/>", {'href':'javascript:void(0)','tabindex':'-1'}).html(menus[i].text).append(
							window.fillMainMenu($("<ul/>",{'class' : 'dropdown-menu'}), menus[i].children)
						)
					)
				);
			}
		}
	}

	return elm;
}


window.initializeMainMenu = function(menus) {
	$('#main-navigation').children('li:lt(-2)').remove();

	for(var i=menus.length-1;i>=0;i--) {
		if(menus[i].type == "link") {
			$('#main-navigation').prepend(
				$("<li/>").append(
					$("<a/>", {'href':menus[i].url}).html(menus[i].text)
				)
			);
		} else if(menus[i].type == "button") {
			$('#main-navigation').prepend(
				$("<li/>").append(
					$("<a/>", {'href':'javascript:void(0)','class':menus[i].event}).html(menus[i].text)
				)
			);
		} else if(menus[i].type == "submenu") {
			$('#main-navigation').prepend(
				$("<li/>", {'class' : 'dropdown-submenu'}).append(
					$("<a/>", {'href':'javascript:void(0)','tabindex':'-1'}).html(menus[i].text)
				).append(
					window.fillMainMenu($("<ul/>",{'class' : 'dropdown-menu'}), menus[i].child)
				)
			);
		}
	}
}
window.fillMainMenu = function(elm, menus) {
	if(elm.length && menus.length) {
		for(var i=menus.length-1;i>=0;i--) {
			if(menus[i].type == "link") {
				elm.prepend(
					$("<li/>").append(
						$("<a/>", {'href':menus[i].url}).html(menus[i].text)
					)
				);
			} else if(menus[i].type == "button") {
				elm.prepend(
					$("<li/>").append(
						$("<a/>", {'href':'javascript:void(0)','class':menus[i].event}).html(menus[i].text)
					)
				);
			} else if(menus[i].type == "submenu") {
				elm.prepend(
					$("<li/>", {'class' : 'dropdown-submenu'}).append(
						$("<a/>", {'href':'javascript:void(0)','tabindex':'-1'}).html(menus[i].text).append(
							window.fillMainMenu($("<ul/>",{'class' : 'dropdown-menu'}), menus[i].children)
						)
					)
				);
			}
		}
	}

	return elm;
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

window.rating = new RatingCore();
window.rating.getStarsElmUpdate($('.programmerRating'));

window.APP = window.APP || {};
_.templateSettings = { 
    evaluate:    /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape:      /\{\{-(.+?)\}\}/g
};

