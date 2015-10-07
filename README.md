# NVD3 Wrapper

## Description
A [Meteor Autopublish](http://meteor.autopublish.com) 
wrapper for [NVD3](http://nvd3.org).

## Documentation
For the most up-to-date NVD3 usage documentation, see the
[NVD3 Homepage](http://nvd3.org).  To use NVD3 within
Meteor via this package run `meteor add nvd3:nvd3-wrapper`.

**Note: This package will replace nvd3:nvd3 in the future.  There will be no
difference in behavior if you are already using nvd3 within a Meteor app.**

This project merely serves to automatically publish a new version of the NVD3
Meteor package every time a new version of NVD3 proper is released.

## Gulp Autopublish Sequence
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

