/* eslint-disable no-undef */
const { src, dest, series, watch } = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const { argv } = require('yargs');
const browserSync = require('browser-sync');

const pug = require('gulp-pug');
const htmlMin = require('gulp-htmlmin');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');

const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');

const clean = () => {
  return del(['dist']);
};

const pug2html = () => {
  return src('./src/pages/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(
      gulpif(
        argv.build,
        htmlMin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest('dist'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const styles = () => {
  return src('src/styles/style.scss')
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      gulpif(
        argv.build,
        cleanCSS({
          level: 2,
        })
      )
    )
    .pipe(gulpif(argv.dev, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const scripts = () => {
  return src('src/js/**/*.js')
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('main.js'))
    .pipe(
      gulpif(
        argv.build,
        uglify({
          toplevel: true,
        }).on('error', notify.onError())
      )
    )
    .pipe(gulpif(argv.dev, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const fonts = () => {
  return src(['src/fonts/*.woff', 'src/fonts/*.woff2'])
    .pipe(dest('dist/fonts'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const svg = () => {
  return src('src/images/**/*.svg')
    .pipe(
      imageMin([
        imageMin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/images'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const images2webp = () => {
  return src('src/images/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(dest('dist/images'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const watchFiles = () => {
  if (argv.build) return console.log('Сборка завершена');

  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
};

watch('src/pages/**/*.pug', pug2html);
watch('src/styles/**/*.scss', styles);
watch('src/images/*.svg', svg);
watch('src/images/**/*.{jpg,jpeg,png}', images2webp);
watch('src/js/**/*.js', scripts);
watch(['src/fonts/*.woff', 'src/fonts/*.woff2'], fonts);

exports.default = series(
  clean,
  pug2html,
  styles,
  scripts,
  fonts,
  svg,
  images2webp,
  watchFiles
);
