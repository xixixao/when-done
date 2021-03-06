// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  var eos, noop, once, tick, whenDone;

  eos = require('end-of-stream');

  tick = require('next-tick');

  once = require('once');

  noop = function() {};

  whenDone = function(fn, cb) {
    var done, onError, onSuccess, runner;
    done = once(cb);
    onSuccess = function(result) {
      return done(null, result);
    };
    onError = function(error) {
      return done(error);
    };
    runner = function() {
      var e, result;
      try {
        result = fn();
      } catch (_error) {
        e = _error;
        onError(e);
      }
      if (result && typeof result.on === 'function') {
        eos(result, onSuccess);
        return;
      }
      if (result && typeof result.then === 'function') {
        result.then(onSuccess, onError);
        return;
      }
      if (result && typeof result.subscribe === 'function') {
        result.subscribe(noop, onError, onSuccess);
        return;
      }
      return onSuccess(result);
    };
    tick(runner);
  };

  module.exports = whenDone;

}).call(this);
