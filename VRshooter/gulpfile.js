const { src, dest, series, watch } = require('gulp');
const replace = require('gulp-replace');

// styles
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');

function styles() {
  return src('./frontend/src/styles/**/*.scss')
    .pipe(scss())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssMinify())
    .pipe(dest('./frontend/dist/styles/'));
}

// scripts
const jsMinify = require('gulp-terser');

function scripts() {
  return src('./frontend/src/scripts/**/*.js')
    .pipe(replace('src/textures/', 'textures/')) // Update style file paths
    .pipe(replace('src/assets/', 'assets/')) // Update asset file paths
    .pipe(jsMinify())
    .pipe(dest('./frontend/dist/scripts/'));
}

// Copy index.html to dist folder
function copyHTML() {
  return src('./frontend/index.html')
    .pipe(replace('dist/styles/', 'styles/')) // Update style file paths. Need to use dist folder for styles because sass is compiled
    .pipe(replace('src/scripts/', 'scripts/')) // Update script file paths
    .pipe(replace('src/assets/', 'assets/')) // Update script file paths
    .pipe(dest('./frontend/dist/'));
}

// Copy and compress images
function images() {
    return src('./frontend/src/textures/**/*.{jpg,jpeg,png,gif,svg}')
      .pipe(dest('./frontend/dist/textures/'));
}

function assets() {
  return src('./frontend/src/assets/**')
    .pipe(dest('./frontend/dist/assets/'))
}

// Server
const browserSync = require('browser-sync').create();

function browsersyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: './frontend'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch('./frontend/*.html', series(copyHTML, browserSyncReload));
  watch(['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js', './frontend/src/assets/**'], series(styles, scripts, assets, browserSyncReload));
  watch('./frontend/src/textures/**/*.{jpg,jpeg,png,gif,svg}', series(images, browserSyncReload));
}

exports.default = series(styles, scripts, assets, copyHTML, images, browsersyncServer, watchTask);
