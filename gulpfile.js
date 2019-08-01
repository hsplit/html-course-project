const gulp 					= require('gulp');
const sass 					= require('gulp-sass');
const autoprefixer 	= require('gulp-autoprefixer');
const cssnano 			= require('gulp-cssnano');
const pug 					= require('gulp-pug');
const image 				= require('gulp-image');
const concat 				= require('gulp-concat');
const uglify 				= require('gulp-uglify-es').default;
const browserSync 	= require('browser-sync');
const del 				 	= require('del');

/*-----------------------------------------------tasks-----------------------------------------------*/
gulp.task('sass', function () {
  return gulp.src('./src/styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 2 versions'], { cascade: true }))
		.pipe(cssnano())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('pug', function () {
  return gulp.src('./src/pages/*.pug')
	  .pipe(pug({
		// pretty: true
	  }).on('error', function(error) {
	  	console.log(' --------------------------------------');
	  	console.log(' ERROR gulp-pug');
	  	console.log(' ' + error.message.slice(0,error.message.indexOf("\n    at ")));
	  	console.log(' --------------------------------------');
	  	this.end();
	  	}))
	  .pipe(gulp.dest('./build'));
});

gulp.task('image', function () {
  return gulp.src('./src/images/*')
		.pipe(image())
		.pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./build/fonts'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/scripts/**/*')
		.pipe(uglify().on('error', function(error) {
			console.log(' --------------------------------------');
	  	console.log(' ERROR gulp-uglify-es');
	  	console.log(' filename: ' + error.filename);
	  	console.log(' line: ' + error.line);
	  	console.log(' column: ' + error.col);
	  	console.log(' ' + error.stack.slice(0,error.stack.indexOf("\n    at ")));
	  	console.log(' --------------------------------------');
	  	this.end();
	  	}))
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('browserSync', function () {
  browserSync({
  	server: {
    	baseDir: './build/'
    },
    notify: false
  })
});

gulp.task('clean', function() {
	return del.sync('build');
});

gulp.task('once', ['pug', 'sass', 'scripts'], function () {
  console.log("\nonce: [pug, sass with autoprefixer, scripts]\n");
});

gulp.task('build', ['clean', 'once', 'image', 'fonts'], function () {
  console.log("\nbuild: [clean, once, image, fonts]\n");
});

/*-----------------------------------------------watch-----------------------------------------------*/
gulp.task('watch', ['pug', 'sass', 'scripts', 'browserSync'], function () {
	gulp.watch('src/pages/*.pug', ['pug']);
	gulp.watch('src/styles/*.scss', ['sass']);
	gulp.watch('src/scripts/*.js', ['scripts']);
	gulp.watch('src/images/*', ['image']);
	gulp.watch('src/fonts/*', ['fonts']);
	gulp.watch('build/*.html', browserSync.reload);
	gulp.watch('build/css/**/*.css').on("change", browserSync.reload);
	gulp.watch('build/js/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['watch']);