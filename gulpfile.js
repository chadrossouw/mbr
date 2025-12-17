var gulp = require('gulp'),
	cleanCss = require('gulp-clean-css'),
	sass = require("gulp-sass")(require('sass')),
	gutil = require('gulp-util'),
	sourcemaps = require("gulp-sourcemaps"),
	postcss = require("gulp-postcss"),
	rename = require("gulp-rename"),
	autoprefixer = require("gulp-autoprefixer")


	browserify =require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	streamify = require('gulp-streamify'),
	terser = require('gulp-terser');


const paths = {
	scss: {
	  src:[ "./src/sass/style.scss","./src/sass/editor-style.scss"],
	  dest: "./build/",
	  watch: "./src/sass/**/*.scss",
	},
	js: {
	  src: "./src/static/js/*.js",
	  bundleSrc: "./src/scripts.js",
	  dest: "./build/",
	  bundleDest: "./build/",
	},
  };

/* SITE STYLES */
function styles() {
	return gulp
	  .src(paths.scss.src)
	  .pipe(sourcemaps.init())
	  .pipe(sass().on("error", sass.logError))
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(paths.scss.dest))
  }

  function js() {
	return  browserify({ debug: true })
			.transform(babelify,{
				presets: ["@babel/preset-env"], 
				sourceMaps: true, 
				global: true, 
				ignore: [/\/node_modules\/(?!your module folder\/)/]
			})
			.require(paths.js.bundleSrc, { entry: true })  
			.bundle()
			.pipe(source('scripts.js'))
			.pipe(buffer())
    		.pipe(sourcemaps.init())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.js.dest))
  }
  
  function js_static(){
	return gulp
	  .src([paths.js.src])
	  .pipe(sourcemaps.init())
	  .pipe(terser())
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(paths.js.dest))
	  .pipe(browserSync.reload({ stream: true }));
  }

function watch() {
	gulp.watch([paths.scss.watch], styles);
	gulp.watch('./src/js/*', js);
	gulp.watch([paths.js.src], js_static);
  }

exports.watch = watch;
exports.default = watch; 
exports.styles = styles;