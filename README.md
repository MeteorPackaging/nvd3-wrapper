# NVD3 Wrapper

## Description
A [Meteor Autopublish](http://meteor.autopublish.com) 
wrapper for [NVD3](http://nvd3.org).

## Gulp Publish Sequence
This package is designed to suit the following
Meteor Autopublish workflow:
* npm install
* gulp getUpstream --tag _newtag_
* gulp test
* gulp updateVersion --tag _newtag_
* gulp updateRelease --tag _newtag_
* git commit -am "Bump to version _newtag_"
* git push
* meteor publish

