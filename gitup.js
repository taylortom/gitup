var async = require('async');
var exec = require('child_process').exec;
var fse = require('fs-extra');
var path = require('path');

var data = require('./data.json');

var BACKUP_DIR = path.join(__dirname,'backup');
var remaining = data.repositories.length;

function main() {
  log('gitup: Starting backup of ' + remaining + ' repositories');
  fse.remove(BACKUP_DIR, function() {
    async.each(data.repositories, function(repo, callback) {
      backupRepo(repo, callback);
    }, function(error) {
      if(error) console.log(error);
      else log('gitup: All repos backed up successfully!');
    });
  });
};

function backupRepo(repo, callback) {
  log('gitup: Backing up ' + repo, 'debug');
  fse.ensureDir(BACKUP_DIR, function(error) {
    if(error) return callback(error);
    clone(repo, function(error) {
      if(error) return callback(error);
      log('gitup: Done backup of ' + repo + ' (' + (--remaining) + ' remaining)', 'debug');
      callback();
    });
  });
};

function clone(repo, callback) {
  var cmd = 'git clone ' + data.repoBaseURL.replace('{{REPO}}', repo);
  execute(cmd, { cwd: BACKUP_DIR }, callback);
};

function execute(command, options, callback) {
  if(!callback) {
    callback = options;
    options = {};
  }
  exec(command, options, callback);
};

function log(text, level) {
  if(!level) level = "std";
  var dataLevel = data.logging || "std";
  // valid levels
  var levels = {
    none: 0,
    error: 1,
    std: 2,
    debug: 3
  };
  if(!levels[dataLevel]) {
    console.log('Invalid logging level specified in data.json: ' + data.logging);
    process.exit();
  }
  if(levels[dataLevel] >= levels[level]) console.log(text);
};

main();
