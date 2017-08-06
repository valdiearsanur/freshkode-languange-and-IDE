module.exports = function() {
	var root = '../';

	var build = root + 'dist/';
	var build_assets = build + 'assets/';

	var dev = root + 'app/';
	var dev_assets = dev + 'assets/';

	var config = {
		build: {
			assets: build_assets,
			stylesheet: build_assets + 'css/',
			js: build_assets + 'js/',
			fonts: build_assets + 'fonts/',
			images: build_assets + 'images/'
		},
		development: {
			assets: dev_assets,
			stylesheet: dev_assets + '**/css/*.css',
			fonts: dev_assets + '**/fonts/*.*',
			images: dev_assets + '**/img/*.*'
		}
	};

	return config;
};