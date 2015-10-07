// gulpfile.js
// Borrowing heavily from 
// https://github.com/MeteorPackaging/numeraljs-core-wrapper

var
  autopublish = require('./autopublish.json'),
  del = require('del'),
  download = require("gulp-download"),
  fs = require('fs'),
  git = require('gulp-git'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  replace = require('gulp-replace'),
  runSequence = require('run-sequence')
;

// Clone the upstream repo
// optional parameter: --tag <tag_name>
gulp.task('getUpstream', function(){
  return del(['upstream'], function(err){
    if (err) throw err;
    console.log("cloning " + autopublish.upstream.git);
    git.clone(autopublish.upstream.git, {args: ' --recursive upstream'}, function (err) {
      if (err) throw err;
      var
        release = autopublish.upstream.release,
        tag = gutil.env.tag || release,
        path = __dirname + '/upstream/'
      ;
      console.log('checking out ' + tag);
      return git.checkout(tag, {cwd: path}, function (err) {
        if (err) throw err;
        git.status({cwd: path}, function (err) {
          if (err) throw err;
        });
      });
    });
  });
});

// Picks up current version of upstream repo and updates
// 'package.js' and 'autopublish.json' accordingly
gulp.task('updateVersion', function() {
  var
    versionFile = autopublish.upstream.versionFile,
    path = './upstream/' + versionFile
  ;

  return fs.readFile(path, 'utf8', function (err, content) {
    if (err) throw err;

    var
      versionRegexp = /(version?\"?\s?=?\:?\s[\'\"])([\d\.]*)([\'\"])/gi,
      match = versionRegexp.exec(content),
      version
    ;
    if (match && match.length === 4) {
      version = match[2];
    }
    else if (gutil.env.tag) {
      version = gutil.env.tag;
    }
    else {
      throw 'Unable to extract current version!';
    }
    console.log('Version: ' + version);
    gulp.src(['package.js', 'autopublish.json', 'package.json'])
      .pipe(replace(versionRegexp, '$1' + version + '$3'))
      .pipe(gulp.dest('./'));
  });
});

// Stores latest published release into 'autopublish.json'
gulp.task('updateRelease', function() {
  var tag = gutil.env.tag;
  if (!tag) throw 'no tag parameter provided!';
  console.log('Release: ' + tag);

  var versionRegexp = /(release?\"?\s?=?\:?\s[\'\"])(.*)([\'\"])/gi;
  return gulp.src(['autopublish.json'])
        .pipe(replace(versionRegexp, '$1' + tag + '$3'))
        .pipe(gulp.dest('./'));
});

// Actually run tests
gulp.task('test', function(){
  var
    spawn = require('child_process').spawn,
    tests = spawn('node_modules/.bin/spacejam', ['test-packages', './']);
  ;

  tests.stdout.pipe(process.stdout);
  tests.stderr.pipe(process.stderr);
  tests.on('close', function(code) {
    process.exit(code);
  });

  return tests;
});

// Task that cleans up workspace
gulp.task('clean', function() {
  var cleanable = ['upstream'];
  console.log("Cleaning " + cleanable.join(','));
  return del(cleanable, function(err) {
    if(err) throw err;
  });
});

