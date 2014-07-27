'use strict';

var test = require('tap').test;

var whenDone = require('../');

function success(){
  return 2;
}

function failure(){
  throw new Error('Callback Error');
}

test('handle a successful call', function(t){
  whenDone(success, function(err, result){
    t.ok(err == null, 'error should be null or undefined');
    t.equal(result, 2, 'result should be 2');
    t.end();
  });
});

test('handle an errored call', function(t){
  whenDone(failure, function(err){
    t.ok(err instanceof Error, 'error should be instance of Error');
    t.end();
  });
});
