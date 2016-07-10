exports.loadFile = function(file){
	var fs = require('fs');
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		(new global.window.APP.ProjectWorkspace(data)).render();
	});
};

exports.chooseFile = function(name, callback) {
	var chooser = global.$(name);
	chooser.unbind('change');
	chooser.change(function(e) {
		callback(global.$(this).val());
	});

	chooser.trigger('click');
};