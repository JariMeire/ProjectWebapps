var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

/*alle modules die beginnen met gulp worden automatisch geconverteerd naar camelcase*/

var plugins = gulpLoadPlugins();

//subfolder test aanspreken
var testFolder = './test';

//eigen task aanmaken, 1e param is naam voor in cmd, 2e param is callback functie
gulp.task('runTests', function(){
	return gulp.src(testFolder + '/*.js')
		.pipe(plugins.mocha());
});