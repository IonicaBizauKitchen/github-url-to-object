var mocha = require("mocha")
var assert = require("assert")
var gh = require("../index")

describe("github-url-to-object", function() {

  describe("shorthand", function(){

    it("supports user/repo style", function(){
      var obj = gh("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
    })

    it("supports user/repo#branch style", function(){
      var obj = gh("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'branch')
    })

    it("defaults to master branch", function(){
      var obj = gh("user/repo")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'master')
    })

  })

  describe("oldschool", function(){

    it("supports git@ URLs", function() {
      var obj = gh("git@github.com:heroku/heroku-flags.git")
      assert.equal(obj.user, 'heroku')
      assert.equal(obj.repo, 'heroku-flags')
    })

    it("defaults to master branch", function() {
      var obj = gh("git@github.com:heroku/heroku-flags.git")
      assert.equal(obj.branch, 'master')
    })

    it("supports git:// URLs", function() {
      var obj = gh("git://github.com/foo/bar.git")
      assert.equal(obj.user, 'foo')
      assert.equal(obj.repo, 'bar')
    })

    it("defaults to master branch", function() {
      var obj = gh("git://github.com/foo/bar.git")
      assert.equal(obj.branch, 'master')
    })

  })

  describe("http", function(){

    it("supports http URLs", function() {
      var obj = gh("http://github.com/zeke/outlet.git")
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it("supports https URLs", function() {
      var obj = gh("https://github.com/zeke/outlet.git")
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it("supports deep URLs", function() {
      var obj = gh("https://github.com/zeke/ruby-rails-sample/blob/b1e1000fedb6ca448dd78702de4fc78dedfee48c/app.json")
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'ruby-rails-sample')
    })

    it("doesn't require .git extension", function() {
      var obj = gh("https://github.com/zeke/outlet")
      assert.equal(obj.user, 'zeke')
      assert.equal(obj.repo, 'outlet')
    })

    it("defaults to master branch", function() {
      var obj = gh("https://github.com/zeke/outlet")
      assert.equal(obj.branch, 'master')
    })

  })

  describe("properties", function() {
    var obj

    before(function(){
      obj = gh("zeke/ord")
    })

    it("user", function() {
      assert.equal(obj.user, "zeke")
    })

    it("repo", function() {
      assert.equal(obj.repo, "ord")
    })

    it("branch", function() {
      assert.equal(obj.branch, "master")
    })

    it("tarball_url", function() {
      assert.equal(obj.tarball_url, "https://api.github.com/repos/zeke/ord/tarball")
    })

    it("https_url", function() {
      assert.equal(obj.https_url, "https://github.com/zeke/ord")
    })

    it("travis_url", function() {
      assert.equal(obj.travis_url, "https://travis-ci.org/zeke/ord")
    })

  })

  describe("failure", function(){

    it("returns null if url is falsy", function() {
      assert.equal(gh(), null)
      assert.equal(gh(null), null)
      assert.equal(gh(undefined), null)
      assert.equal(gh(""), null)
    })

    it("returns null for non-github URLs", function() {
      var obj = gh("https://bitbucket.com/other/thing")
      assert.equal(obj, null)
    })

  })

})
