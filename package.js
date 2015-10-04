// package.js
// The Meteor package file.

Package.describe({
  name: 'jdlubrano:nvd3-wrapper', // this name will be changed once the autopublish workflow is confirmed to be working
  summary: 'NVD3 (not yet official) - Reusable charts for d3.js',
  version: '0.0.1',
  git: 'https://github.com/MeteorPackaging/nvd3-wrapper.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles([
    'meteor-pre.js',
    'upstream/build/nv.d3.js',
    'upstream/build/nv.d3.css',
    'meteor-post.js'
  ]);
  api.export('nv');
});

Package.onTest(function(api) {
  api.use('jdlubrano:nvd3-wrapper');

  api.use([
    'tinytest',
    'test-helpers'
  ]);

  api.addFiles([
    'tests/nv-is-defined-test.js'
  ]);
});

