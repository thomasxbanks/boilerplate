// REQUIRE PACKAGES
// For Gulp
let gulp = require('gulp')
let runSequence = require('run-sequence')
let clean = require('gulp-clean')
let browserSync = require('browser-sync').create()
let strip = require('gulp-strip-comments')
let stripDebug = require('gulp-config-strip-debug')
let noop = require('gulp-noop')

// For Css
let sass = require('gulp-sass')
let nano = require('gulp-cssnano')
let sourcemaps = require('gulp-sourcemaps')
let autoprefixer = require('gulp-autoprefixer')
let purify = require('gulp-purifycss')

// For Js
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')

// For Json
let jsonminify = require('gulp-jsonminify')

// For Images
let imagemin = require('gulp-imagemin')

// For HTML
let htmlmin = require('gulp-htmlmin')

// Define I/O paths
let path = {
	css: {
		i: './src/scss/**/*.scss',
		o: './dist/css/'
	},
	html: {
		i: './src/**/*.html',
		o: './dist/'
	},
	js: {
		i: './src/js/**/*.js',
		o: './dist/js'
	},
	img: {
		i: './src/img/**/*',
		o: './dist/img'
	},
	data: {
		i: './src/data/**/*.json',
		o: './dist/data'
	},
	include: {
		i: './src/include/**/*',
		o: './dist/include'
	},
    txt: {
        i: './src/*.txt',
		o: './dist'
    }
}

// Define options
let envProd = false
let sassOptions = {
	errLogToConsole: (envProd) ? false : true
}
let autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

// TASKS

gulp.task('default', function(callback) {
	envProd = false
	runSequence('clean', 'sass', 'html', 'js', 'img', 'data', 'include', 'txt', callback)
})

// Watching for changes
gulp.task('watch', function(callback) {
	runSequence('clean', 'default', function() {
		browserSync.init({
			server: 'dist'
		})
		gulp.watch(path.js.i, ['js', browserSync.reload])
		gulp.watch(path.css.i, ['sass', browserSync.reload])
		gulp.watch(path.html.i, ['html', browserSync.reload])
		gulp.watch(path.img.i, ['img', browserSync.reload])
		gulp.watch(path.data.i, ['data', browserSync.reload])
		gulp.watch(path.include.i, ['include', browserSync.reload])
	})
})

// Bundle everything up ready for dropping onto the server
// Destroy comments, remove console.logging, minify
gulp.task('production', function(callback) {
	console.log('production build started')
	envProd = true
	runSequence('clean', 'sass', 'html', 'js', 'img', 'data', 'include', 'txt', () => {
		console.log('production build finished')
	})
})

// Delete the distribution folder
gulp.task('clean', function() {
	return gulp.src('./dist', {read: false})
		.pipe(clean())
})

// HTML files
gulp.task('html', function() {
	gulp.src([path.html.i])
		.pipe((envProd) ? htmlmin({collapseWhitespace: true}) : noop())
		.pipe(gulp.dest(path.html.o))
})

// Images
gulp.task('img', function() {
	gulp.src([path.img.i])
		.pipe((envProd) ? imagemin({progressive: true}) : noop())
		.pipe(gulp.dest(path.img.o))
})

// Data files
gulp.task('data', function() {
	gulp.src([path.data.i])
		.pipe((envProd) ? jsonminify() : noop())
		.pipe(gulp.dest(path.data.o))
})

// 3rd party plugins
gulp.task('include', function() {
	gulp.src([path.include.i])
		.pipe(gulp.dest(path.include.o))
})

// .txt files (Robots and Humans)
gulp.task('txt', function() {
	gulp.src([path.txt.i])
		// Perform minification tasks, etc here
		.pipe(gulp.dest(path.txt.o))
})

// Scss
gulp.task('sass', function() {
	return gulp.src(path.css.i)
		.pipe((envProd) ? noop() : sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe((envProd) ? purify([path.js.i, path.html.i]) : noop())
    .pipe((envProd) ? autoprefixer(autoprefixerOptions) : noop())
		.pipe((envProd) ? nano() : noop())
		.pipe((envProd) ? noop() : sourcemaps.write('.'))
		.pipe(gulp.dest(path.css.o))
})

// Javascript
gulp.task('js', function() {
	gulp.src(path.js.i)
		.pipe((envProd) ? noop() : sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(babel({minified: envProd}))
		.pipe((envProd) ? stripDebug() : noop())
		.pipe((envProd) ? strip() : noop())
		.pipe((envProd) ? noop() : sourcemaps.write('.'))
		.pipe(gulp.dest(path.js.o))
  if (envProd){
    gulp.src(path.js.i)
  		.pipe(concat('app-legacy.js'))
  		.pipe(babel({presets: ['es2015'], minified: true}))
  		.pipe(stripDebug())
  		.pipe(strip())
  		.pipe(gulp.dest(path.js.o))
  }
})
