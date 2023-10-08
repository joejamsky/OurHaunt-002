// Import dependencies using ESM syntax
import pkg from 'gulp';
const { src, dest, series, watch } = pkg;
import replace from 'gulp-replace';
import fs from 'fs';
import dotenv from 'dotenv';

import sass from 'gulp-sass';
import sassCompiler from 'sass';
const scss = sass(sassCompiler);
import autoprefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-clean-css';

import jsMinify from 'gulp-terser';

import browserSyncPackage from 'browser-sync';
const browserSync = browserSyncPackage.create();

// Load environment variables
dotenv.config();

// env task
function env(done) {
  const dir = 'public';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
  const envConfig = {
    MY_VARIABLE: process.env.MY_VARIABLE,
    // ... other environment variables you want to expose
  };
  
  const configStr = `window._envConfig = ${JSON.stringify(envConfig)};`;
  fs.writeFileSync(`${dir}/env-config.js`, configStr);
  done();
}

function injectEnvVars() {
  return src('./frontend/src/scripts/**/*.js')  // Source path of your scripts
    .pipe(replace('__GPT_API_KEY__', process.env.GPT_API_KEY))  // Replace placeholder with actual value
    .pipe(dest('./frontend/dist/scripts'))  // Destination path of your scripts
    .pipe(dest('./frontend/src/scripts'));  // Destination path of your scripts
}

// styles task
function styles() {
  return src('./frontend/src/styles/**/*.scss')
    .pipe(scss())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssMinify())
    .pipe(dest('./frontend/dist/styles/'));
}

// scripts task
function scripts() {
  return src('./frontend/src/scripts/**/*.js')
    .pipe(replace('src/textures/', 'textures/')) // Update style file paths
    .pipe(replace('src/assets/', 'assets/')) // Update asset file paths
    .pipe(jsMinify())
    .pipe(dest('./frontend/dist/scripts/'));
}

// copyHTML task
function copyHTML() {
  return src('./frontend/index.html')
    .pipe(replace('dist/styles/', 'styles/')) // Update style file paths. Need to use dist folder for styles because sass is compiled
    .pipe(replace('src/scripts/', 'scripts/')) // Update script file paths
    .pipe(replace('src/assets/', 'assets/')) // Update script file paths
    .pipe(dest('./frontend/dist/'));
}

// images task
function images() {
  return src('./frontend/src/textures/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(dest('./frontend/dist/textures/'));
}

// assets task
function assets() {
  return src('./frontend/src/assets/**')
    .pipe(dest('./frontend/dist/assets/'))
}

// browsersyncServer task
function browsersyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: './frontend'
    }
  });
  cb();
}

// browserSyncReload task
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// watchTask task
function watchTask() {
  watch('./frontend/*.html', series(copyHTML, browserSyncReload));
  watch(['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js', './frontend/src/assets/**'], series(styles, scripts, assets, browserSyncReload));
  watch('./frontend/src/textures/**/*.{jpg,jpeg,png,gif,svg}', series(images, browserSyncReload));
}

// Exporting the default task using ESM syntax
export default series(injectEnvVars, env, styles, scripts, assets, copyHTML, images, browsersyncServer, watchTask);
