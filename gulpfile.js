const { src, dest, watch, series, parallel } = require('gulp');

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // --> Versiones de codigo
const sourcemaps = require('gulp-sourcemaps') // --> Búsqueda de codigo
const cssnano = require("cssnano")

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css( done ){
    // compilar sass
    // pasos: 1 - Identificar archivo, 
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done()
}



function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}


function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}


function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img'))
}



function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev  );



// Series -> De forma secuencial , una acaba y otra inicia
// Parallel -> Todas inician al mismo tiempo


