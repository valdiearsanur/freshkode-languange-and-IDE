var gulp = require('gulp');
var config = require('./gulpconfig')();
var es = require('event-stream');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('build', ['single_page', 'stylesheet', 'js', 'fonts', 'images']);

gulp.task('sass', function() {
	return gulp.src(config.development.sass)
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(config.build.stylesheet));
});

gulp.task('single_page', function() {
	return (gulp.src('index.html'))
		.pipe(gulp.dest('../dist/'));
});

gulp.task('stylesheet', function() {
	return es.merge(
		gulp.src(config.development.stylesheet).pipe($.concat('stylesheet.min.css')),

		gulp.src([
			'bower_components/bootstrap/dist/css/bootstrap.min.css',
			'bower_components/fontawesome/css/font-awesome.min.css',
			'bower_components/datatables-bootstrap3/BS3/assets/css/datatables.css',
			'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css'
		]).pipe($.concat('vendor.min.css'))
	)
	.pipe($.minifier({ minify: true, minifyCSS: true }))
	.pipe(gulp.dest(config.build.stylesheet));
});

gulp.task('js', function() {
	return es.merge(
		gulp.src([
			'scripts/app.js',
			'scripts/models/project_model.js',
			'scripts/collections/project_collection.js',
			'scripts/views/Intro.js',
			'scripts/views/Project/ProjectsView.js',
			'scripts/views/Project/ProjectWorkspace.js',
			'scripts/router.js'
		]).pipe($.concat('app.min.js')),

		gulp.src([
			config.build.assets + 'global/js/PageDefault.js',
			config.build.assets + 'global/js/tourCore.js',
			config.build.assets + 'global/js/ratingCore.js',
			config.build.assets + 'pages/js/PageWorkspace/ArraysAndVariables.js',
			config.build.assets + 'pages/js/PageWorkspace/CoreWorkspace.js',
			config.build.assets + 'pages/js/PageWorkspace/GuiManager.js',
			config.build.assets + 'pages/js/PageIntro.js',
			config.build.assets + 'pages/js/PageProgram.js'
		]).pipe($.concat('script.min.js')),

		gulp.src([
			// core components
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/underscore/underscore-min.js',
			'bower_components/backbone/backbone.js',
			'bower_components/backbone.localStorage/backbone.localStorage-min.js',

			// additional
			'bower_components/moment/min/moment.min.js',
			'bower_components/moment/locale/id.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/jquery-sortable/source/js/jquery-sortable.js',
			'bower_components/interact.js/dist/interact.min.js',
			'bower_components/datatables/media/js/jquery.dataTables.min.js',
			'bower_components/datatables-bootstrap3/BS3/assets/js/datatables.js',
			'bower_components/jQuery-menu-aim/jquery.menu-aim.js',
			'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
			'bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
			'bower_components/html2canvas/build/html2canvas.js'
		]).pipe($.concat('vendor.min.js'))
	)
	.pipe($.minifier({ minify: true, minifyJS: true }))
	.pipe(gulp.dest(config.build.js));
});

gulp.task('fonts', function() {
	return es.merge(
		gulp.src(config.development.fonts).pipe($.rename({dirname: ''})),

		gulp.src([
			'bower_components/fontawesome/fonts/*.*',
		])
	)
	.pipe(gulp.dest(config.build.fonts));
});

gulp.task('images', function() {
	return (gulp.src(config.development.images))
		.pipe(gulp.dest(config.build.images));
});
