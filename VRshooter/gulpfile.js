const { src, dest, series, watch} = require('gulp');


// styles
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');

function styles() {
    return src('./frontend/src/styles/**/*.scss')
    .pipe( scss() )
    .pipe( autoprefixer('last 2 versions') )
    .pipe( cssMinify() )
    .pipe( dest('./frontend/dist/styles/'))
}


// scripts
const jsMinify = require('gulp-terser');

function scripts() {
    return src('./frontend/src/scripts/**/*.js')
    .pipe( jsMinify() )
    .pipe( dest('./frontend/dist/scripts/'))
}




// Server
const browserSync = require('browser-sync').create();

function browsersyncServer(cb){
    browserSync.init({
        server: {
            baseDir: "./frontend"
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}


function watchTask() {
    watch('./frontend/*.html', browserSyncReload);
    watch(['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js'], series(styles, scripts, browserSyncReload));
}


exports.default = series(styles, scripts, browsersyncServer, watchTask);