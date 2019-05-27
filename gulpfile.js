const gulp = require('gulp');
const fs = require('fs');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const webpack = require('webpack-stream');
const webpackConf = require('./webpack.config.js');

const DEFAULT_APP_NAME = 'MyApp';

function build() {
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('bin/js/'));

    return tsResult;
};

function pack() {
    return gulp.src('bin/js/**/*.js')
        .pipe(webpack(webpackConf))
        .pipe(gulp.dest('bin/'));
};

function clean(done) {
    rimraf.sync('./bin/Canvity');
    rimraf.sync('./bin/pack');
    done();
}

function init(done) {
    let args = parseArgs();
    let appName = DEFAULT_APP_NAME;
    if (args[0]) appName = args[0];
    else {
        console.log("No app name given, defaulting to '" + DEFAULT_APP_NAME + "'");
        console.log("To fix this, please specify an app name with the following syntax:");
        console.log("gulp init <appName>");
    }

    fs.mkdirSync("src/" + appName);

    let appCode = `import { App } from "../Canvity/App";
import { InputManager } from "../Canvity/InputManager";
import { SceneManager } from "../Canvity/SceneManager";

export class ${appName} extends App {
    public constructor(canvas: HTMLCanvasElement) {
        super(
            canvas,
            new InputManager(),
            new SceneManager()
        );
    }

    public PreInit(opts: any): void {
        super.PreInit(opts);
        console.log("PreInit");
        // TODO: Add PreInit logic
    }

    public Init(drawDeltaTime: number, updateDeltaTime: number): void {
        super.Init(drawDeltaTime, updateDeltaTime);
        console.log("Init");
        // TODO: Add Init logic
    }

    public PostInit(): void {
        super.PostInit();
        console.log("PostInit");
        // TODO: Add PostInit logic
    }
}`;
    fs.writeFileSync(`src/${appName}/${appName}.ts`, appCode);

    let runCode = `import { App } from "../Canvity/App";
import { StartApp } from "../Canvity/Main";
import { ${appName} } from "./${appName}";

window.addEventListener('load', function(ev: Event) {
    let canvas: HTMLElement | null = document.getElementById('canvity-canvas');
    if (canvas === null) {
        console.error("Could not find canvas element with id 'canvity-canvas'!");
        return;
    }
    if (!(canvas instanceof HTMLCanvasElement)) {
        console.error("Element with id 'canvity-canvas' is not a HTML Canvas!");
        return;
    }
    
    let app: App = new ${appName}(canvas);
    StartApp(app);
});`;
    fs.writeFileSync(`src/${appName}/Run${appName}.ts`, runCode);

    done();
}

function parseArgs() {
    let args = process.argv;
    args.splice(0, 3);
    return args;
}

exports.build = build;
exports.pack = pack;
exports.clean = clean;
exports.init = init;
exports.default = gulp.series(clean, build, pack);