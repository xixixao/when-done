when-done
==========

Handles completion and errors for promises, observables, streams and plain sync functions.

Will call the function on `nextTick`. This will cause all functions to be async.

## Usage

### Successful completion

```js
var whenDone = require('when-done');

whenDone(function(){
  // do sync things
}, function(error, result){
  // `error` will be undefined on successful execution of the first function.
  // `result` will be the result from the first function.
});
```

### Failed completion

```js
var whenDone = require('when-done');

whenDone(function(done){
  // do sync things
  throw new Error('Some Error Occurred');
}, function(error, result){
  // `error` will be an error from the first function.
  // `result` will be undefined on failed execution of the first function.
});
```

## API

### `whenDone(fn, callback)`

Takes a function to execute (`fn`) and a function to call on completion (`callback`).

#### `fn()`

The sync function that should be called.

#### Completion and Error Resolution

* `Stream` or `EventEmitter` returned
  - Completion: [end-of-stream](https://www.npmjs.org/package/end-of-stream) module
  - Error: ??????
* `Promise` returned
  - Completion: [onFulfilled](http://promisesaplus.com/#point-26) method called
  - Error: [onRejected](http://promisesaplus.com/#point-30) method called
* `Observable` returned
  - Completion: [onCompleted](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md#rxobservableprototypesubscribeobserver--onnext-onerror-oncompleted) method called
  - Error: [onError](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md#rxobservableprototypesubscribeobserver--onnext-onerror-oncompleted) method called

__Warning:__ Node style async tasks (taking in a callback) are __not supported__.

#### `callback(error, result)`

If an error doesn't occur in the execution of the `fn` function, the `callback` method will receive the results as its second argument. Note: Observable and some streams don't received any results.

If an error occurred in the execution of the `fn` function, The `callback` method will receive an error as its first argument.

Errors can be caused by:

* A thrown error
* An `error` event emitted on a returned `Stream` or `EventEmitter`
* A rejection of a returned `Promise`
* The `onError` handler being called on an `Observable`

## License

MIT
