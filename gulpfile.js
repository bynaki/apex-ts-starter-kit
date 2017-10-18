/**
 * gulpfile.js
 */

const gulp = require('gulp')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-spawn-mocha')
const newer = require('gulp-newer')
const logger = require('gulp-logger')
const merge = require('merge2')
const {exec} = require('child_process')
const {readFile, remove} = require('fs-extra')
const {join} = require('path')


/**
 * get `package.json`
 */
function packageJson(callback) {
  readFile(join(__dirname, 'package.json'), (err, data) => {
    callback(err, JSON.parse(data.toString()))
  })
}

/**
 * get main in `package.json`
 */
// let main = './dev/app.js'
let main = null
function entryPoint(callback) {
  if(main) {
    process.nextTick(() => {
      callback(undefined, main)
    })
  } else {
    packageJson((err, package) => {
      if(err) {
        callback(err)
        return
      }
      if(package.main) {
        callback(undefined, package.main)
      } else {
        callback(new Error('not exist main in "package.json"'))
      }
    })
  }
}

function getSrc(glob) {
  const gb = glob || '**/**'
  if(process.argv[3] === '--f' && process.argv[4]) {
    return join('src', process.argv[4], gb)
  }
  return join('src', gb)
}

function getDest() {
  if(process.argv[3] === '--f' && process.argv[4]) {
    return join('functions', process.argv[4])
  }
  return 'functions'
}

/**
 * compile typescript
 */
function compileTypescript(tsProject, src, dest) {
  const tsResult = gulp.src(src)
    .pipe(newer(dest))
    .pipe(logger({
      before: 'compiled typescript .....',
      after: '.....',
    }))
    .pipe(sourcemaps.init())
    .pipe(tsProject())
  return merge([
    tsResult.dts,
    tsResult.js
    .pipe(sourcemaps.write('.', 
      // sourcemap을 제대로 생성하기위해 꼭 필요한 옵션
      {
        includeContent: false,
        sourceRoot: '../',
        mapSources: sourcePath => join('functions', sourcePath),
      }
    )),
  ])
}

/**
 * compile typescript
 */
const tsProject = ts.createProject('tsconfig.json')
gulp.task('scripts', () => {
  return compileTypescript(tsProject, getSrc('**/**.ts'), getDest())
    .pipe(gulp.dest(getDest()))
})

/**
 * compile ts & copy file
 */
gulp.task('build', ['scripts'], () => {
  return gulp.src([
    getSrc(),
    '!src/**/node_modules',
    '!src/**/node_modules/**',
    '!src/**/yarn.lock'
  ])
  .pipe(newer(getDest()))
  .pipe(logger({
    before: 'changed files ......',
    after: '......',
  }))
  .pipe(gulp.dest(getDest()))
})

/**
 * clean build folder
 */
gulp.task('clean', done => {
  remove(join(__dirname, getDest()), err => {
    if(err) {
      console.error(err.stack)
    } else {
      console.log('success cleaning build')
    }
    done()
  })
})

/**
 * test all
 */
gulp.task('test', ['build'], () => {
  let src = 'functions/test/**/**.js'
  if(process.argv[3] === '--t' && process.argv[4]) {
    src = join('functions/test', process.argv[4])
  }
  return gulp.src(src, {read: false})
  .pipe(mocha({
    // report 종류
    R: 'spec',
  }))
})
