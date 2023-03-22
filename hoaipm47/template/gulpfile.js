// const { src, dest, series, watch } = require(`gulp`),
//     CSSLinter = require(`gulp-stylelint`),
//     del = require(`del`),
//     babel = require(`gulp-babel`),
//     htmlCompressor = require(`gulp-htmlmin`),
//     fileinclude = require('gulp-file-include'),
//     htmlValidator = require(`gulp-html`),
//     imageCompressor = require(`gulp-image`),
//     jsCompressor = require(`gulp-uglify`),
//     jsLinter = require(`gulp-eslint`),
//     sass = require(`gulp-sass`)(require(`sass`)),
//     browserSync = require(`browser-sync`),
//     sassGlob = require('gulp-sass-glob'),
//     reload = browserSync.reload;
import pkg from 'gulp';
import CSSLinter from 'gulp-stylelint';
import del from 'del';
import babel from 'gulp-babel';
import htmlCompressor from 'gulp-htmlmin';
import fileinclude from 'gulp-file-include';
import htmlValidator from 'gulp-html';
import imageCompressor from 'gulp-image';
import jsCompressor from 'gulp-uglify';
import jsLinter from 'gulp-eslint'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync'
import sassGlob from 'gulp-sass-glob'

const { src, dest, series, watch } = pkg;
const sass = gulpSass(dartSass);

const reload = browserSync.reload;

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    // In Windows, the value might need to be “microsoft-edge”. Note the dash.
    browserChoice = `microsoft edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let validateHTML = () => {
    return src([`prod/html/*.html`, `prod/html/**/*.html`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlValidator(undefined));
};

let compileCSSForDev = () => {
    return src(`dev/scss/scss/main.scss`)
        .pipe(sassGlob())
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`dev/temp/styles`));
};

let lintJS = () => {
    return src(`dev/scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let compressHTML = () => {
    return src([`dev/html/*.html`, '!dev/html/includes/*.html' , `dev/html/**/*.html`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`dev/scss/scss/main.scss`)
        .pipe(sassGlob())
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};

let transpileJSForProd = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let compressImages = () => {
    return src(`dev/img/**/*`)
        .pipe(imageCompressor({
            optipng: [`-i 1`, `-strip all`, `-fix`, `-o7`, `-force`],
            pngquant: [`--speed=1`, `--force`, 256],
            zopflipng: [`-y`, `--lossy_8bit`, `--lossy_transparent`],
            jpegRecompress: [`--strip`, `--quality`, `medium`, `--min`, 40,
                `--max`, 80],
            mozjpeg: [`-optimize`, `-progressive`],
            gifsicle: [`--optimize`],
            svgo: [`--enable`, `cleanupIDs`, `--disable`, `convertColors`],
            quiet: false
        }))
        .pipe(dest(`prod/img`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/img/`,     // ignore images;
        `!dev/**/*.js`,  // ignore JS;
        `!dev/scss/**` // and, ignore Sass/CSS.
    ], {dot: true})
        .pipe(dest(`prod`));
};

let serve = () => {
    compressHTML()
    validateHTML()
    compileCSSForProd()
    transpileJSForProd()
    // compileCSSForDev()
    compressImages()
    copyUnprocessedAssetsForProd()

    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `./prod`,
            ]
        }
    });

    watch(`dev/scripts/*.js`, series(lintJS, transpileJSForDev, transpileJSForProd,
        ))
        .on(`change`, reload);

    watch(`dev/scss/scss/**/*.scss`, series(
        compileCSSForProd,))
        .on(`change`, reload);

    watch(`dev/html/**/*.html`, series(
        compressHTML,
        validateHTML,))
        .on(`change`, reload);

    watch(`dev/img/**/*`, series(
        compressImages,
        ))
        .on(`change`, reload);
};

async function clean() {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`, `prod`];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
}

async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}

let lintCSS = () => {
    return src(`dev/scss/css/**/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let list = {}
list.brave = series(brave, serve);
list.chrome = series(chrome, serve);
list.edge = series(edge, serve);
list.firefox = series(firefox, serve);
list.opera = series(opera, serve);
list.safari = series(safari, serve);
list.vivaldi = series(vivaldi, serve);
list.allBrowsers = series(allBrowsers, serve);
list.validateHTML = validateHTML;
list.compileCSSForDev = compileCSSForDev;
list.lintJS = lintJS;
list.transpileJSForDev = transpileJSForDev;
list.compressHTML = compressHTML;
list.compileCSSForProd = compileCSSForProd;
list.transpileJSForProd = transpileJSForProd;
list.compressImages = compressImages;
list.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
list.clean = clean;
list.default = listTasks;
list.lintCSS = lintCSS;
list.serve = series(
    validateHTML,
    compileCSSForDev,
    lintJS,
    transpileJSForDev,
    serve
);
list.build = series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd,
    compressImages,
    copyUnprocessedAssetsForProd
);
export {serve}