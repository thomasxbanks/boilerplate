// REQUIRE PACKAGES
// For Gulp
var gulp = require('gulp')
let runSequence = require('run-sequence')
var clean = require('gulp-clean')
let browserSync = require('browser-sync').create()
var strip = require('gulp-strip-comments')
var stripDebug = require('gulp-config-strip-debug')
var noop = require('gulp-noop')

// For CSS
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')

// For JS
var babel = require("gulp-babel")
var uglify = require("gulp-uglify")
var concat = require("gulp-concat")

// For Images
var imagemin = require('gulp-imagemin')

// Define I/O paths
var path = {
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
    vendor: {
      i: './src/vendor/**/*',
      o: './dist/vendor'
    }
}

// Define options
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
}

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

var envProd = false

// TASKS

gulp.task('default', function(callback) {
    runSequence('sass', 'html', 'js', 'img', 'data', 'vendor', callback)
})

// Watching for changes
gulp.task('watch', function(callback) {
    runSequence('clean:dist', 'default', function() {
        browserSync.init({server: "dist"})
        gulp.watch(path.js.i, ['js', browserSync.reload])
        gulp.watch(path.css.i, ['sass', browserSync.reload])
        gulp.watch(path.html.i, ['html', browserSync.reload])
        gulp.watch(path.img.i, ['img', browserSync.reload])
        gulp.watch(path.data.i, ['data', browserSync.reload])
        gulp.watch(path.vendor.i, ['vendor', browserSync.reload])
    })
})

// Bundle everything up ready for dropping onto the server
// Destroy comments, remove console.logging, minify
gulp.task('production', function(callback) {
    console.log('production build started')
    sassOptions = {
        errLogToConsole: false,
        outputStyle: 'compressed'
    }
    envProd = true
    runSequence('clean:dist', 'sass', 'html', 'js', 'img', 'data', 'vendor', () => {
      console.log('production build finished')
    })
})

// Delete the distribution folder
gulp.task('clean:dist', function() {
    return gulp.src('./dist', {read: false})
	   .pipe(clean())
})

// HTML files
gulp.task('html', function() {
    gulp.src([path.html.i])
    // Perform minification tasks, etc here
	   .pipe(gulp.dest(path.html.o))
})

// Images
gulp.task('img', function() {
    gulp.src([path.img.i])
    .pipe((envProd) ? imagemin({ progressive: true }) : noop())
	  .pipe(gulp.dest(path.img.o))
})

// Data files
gulp.task('data', function() {
    gulp.src([path.data.i])
    // Perform minification tasks, etc here
	   .pipe(gulp.dest(path.data.o))
})

// 3rd party plugins
gulp.task('vendor', function() {
    gulp.src([path.vendor.i])
	   .pipe(gulp.dest(path.vendor.o))
})

// Scss
gulp.task('sass', function() {
    return gulp.src(path.css.i)
  	.pipe(sourcemaps.init())
  	.pipe(sass(sassOptions).on('error', sass.logError))
  	.pipe(sourcemaps.write())
  	.pipe(autoprefixer((envProd) ? autoprefixerOptions : noop()))
  	.pipe(gulp.dest(path.css.o))
})

// Javascript
gulp.task('js', function() {
    gulp.src(path.js.i)
    	.pipe(sourcemaps.init())
    	.pipe(concat('app.js'))
    	.pipe(babel({presets: ['es2015'], minified: envProd}))
      .pipe((envProd) ? stripDebug() : noop())
      .pipe((envProd) ? strip() : noop())
    	.pipe(sourcemaps.write('.'))
    	.pipe(gulp.dest(path.js.o))
})
