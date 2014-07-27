'use strict'

eos = require 'end-of-stream'
tick = require 'next-tick'
once = require 'once'

noop = ->

whenDone = (fn, cb) ->
  done = once cb

  onSuccess = (result) ->
    done null, result

  onError = (error) ->
    done error

  runner = ->
    try
      result = fn()
    catch e
      onError e

    if result and typeof result.on is 'function'
      # assume node stream
      result.on 'error', onError
      eos result
        error: false
      , onSuccess
      return

    if result and typeof result.then is 'function'
      # assume promise
      result.then onSuccess, onError
      return

    if result and typeof result.subscribe is 'function'
      # assume RxJS observable
      result.subscribe noop, onError, onSuccess
      return

    # assume succesful sync
    onSuccess result

  tick runner
  return

module.exports = whenDone