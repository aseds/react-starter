var gulp = require('gulp'),
	// jshint = require('gulp-jshint'),
	browserify = require('browserify')
	source = require('vinyl-source-stream'),
	babelify = require('babelify');

const exec = require('child_process').exec;

gulp.task('default', ['js', 'watch'], function() {
	const supervisorChild = exec('supervisor -e "js,jade,styl" server.js',
		(error, stdout, stderr) => {
			 if (error !== null) {
	      		console.log(`exec error: ${error}`);
	    	}
		});

	supervisorChild.stdout.on('data', function(data) {
		process.stdout.write('supervisor stdout: ' + data);
	});

	supervisorChild.stderr.on('data', function(data) {
		process.stdout.write('supervisor stderr: ' + data);
	});

	supervisorChild.on('close', function(code) {
		process.stdout.write('supervisor closing code: ' + code);
	});

});

// browserify ./client/app.jsx -o ./public/js/app.js -t [ babelify --presets [es2015 react] ]

gulp.task('js', function() {
	browserify('./client/app.jsx')
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('./bundle.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
	gulp.watch('client/*.jsx', ['js']);
});









































































/*
gutil = require('gulp-util'),

gulp.task('default', function() {
	return gutil.log('Gulp is running!');
});

gulp.task('default', ['watch']);

gulp.task('browserify', function() {
	return browserify('./src/javascript/app.js')
		.bundle()
		// pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// start piping stream to tasks!
		.pipe(gulp.dest('./build/'));

});


gulp.task('jshint', function() {
	return gulp.src('source/javascript/**//*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
	gulp.watch('source/javascript/**//*.js', ['jshint']);
});

	return browserify({
			entries: 'client/app.jsx', 
			extensions: ['.jsx'],
			debug: true
		})
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.transform(babelify)
		.bundle()
		.pipe(source('./public/js/source_maps/bundle.js'))
		.pipe(gulp.dest('./public/js/app.js'));
});

gulp.task('browserify-client', function() {
	var production = gutil.env.type === 'production';

	gulp.src('client/app.jsx', {read: false})
		.pipe(browserify({
			debug: !production,
			transform: ['babelify'],
			extensions: ['.jsx']
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.bundle()
		.pipe(source('./public/js/source_maps/bundle.js'))
		.pipe(gulp.dest('./public/js/app.js'));

});
*/



