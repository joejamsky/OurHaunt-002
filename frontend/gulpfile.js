// Import dependencies using ESM syntax
import pkg from 'gulp';
import { exec } from 'child_process';
const { src, dest, series, watch } = pkg;
import replace from 'gulp-replace';
import fs from 'fs';
import dotenv from 'dotenv';

import sass from 'gulp-sass';
import * as sassCompiler from 'sass';
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
  return src('./src/scripts/**/*.js')  // Source path of your scripts
    .pipe(replace('__GPT_API_KEY__', process.env.GPT_API_KEY))  // Replace placeholder with actual value
    .pipe(dest('./public/scripts'))  // Destination path of your scripts
    .pipe(dest('./src/scripts'));  // Destination path of your scripts
}

function netlifyDev(cb) {
  const netlify = exec('netlify dev', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
  
  netlify.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  netlify.stderr.on('data', (data) => {
    console.error(data.toString());
  });
}



// styles task
function styles() {
  return src('./src/styles/**/*.scss')
    .pipe(scss())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssMinify())
    .pipe(dest('./public/styles/'));
}

// scripts task
function scripts() {
  return src('./src/scripts/**/*.js')
    .pipe(replace('src/textures/', 'textures/')) // Update style file paths
    .pipe(replace('src/assets/', 'assets/')) // Update asset file paths
    .pipe(jsMinify())
    .pipe(dest('./public/scripts/'));
}

// copyHTML task
function copyHTML() {
  return src('./index.html')
    .pipe(replace('public/styles/', 'styles/')) // Update style file paths. Need to use public folder for styles because sass is compiled
    .pipe(replace('src/scripts/', 'scripts/')) // Update script file paths
    .pipe(replace('src/assets/', 'assets/')) // Update script file paths
    .pipe(dest('./public/'));
}

// images task
function images() {
  return src('./src/textures/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(dest('./public/textures/'));
}

// assets task
function assets() {
  return src('./src/assets/**')
    .pipe(dest('./public/assets/'))
}

// browsersyncServer task
function browsersyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: './'
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
  watch('./*.html', series(copyHTML, browserSyncReload));
  watch(['./src/styles/**/*.scss', './src/scripts/**/*.js', './src/assets/**'], series(styles, scripts, assets, browserSyncReload));
  watch('./src/textures/**/*.{jpg,jpeg,png,gif,svg}', series(images, browserSyncReload));
}

// Exporting the default task using ESM syntax
// export default series(injectEnvVars, env, styles, scripts, assets, copyHTML, images, browsersyncServer, watchTask);
export default series(injectEnvVars, env, styles, scripts, assets, copyHTML, images, netlifyDev);
