/* jshint asi:true */
(function defineMetrics (global, factory) {
  if (typeof exports === 'object' && exports) {
    factory(exports) // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory) // AMD
  } else {
    Metrics = {}
    factory(Metrics) // script, wsh, asp
  }
}(this, function metricsFactory (metrics) {

  var config = require('./config')
  var server = config.server
  var output

  function _send (metric) {
    return output(metric)
  }

  function sendStdout (metric) {
    return console.log(metric)
  }

  function _sendXHR (metric) {
    var xhr = new XMLHttpRequest()
    var statType = Object.keys(data)[0]

    xhr.open('POST', 'http://localhost:3000/statsd')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    xhr.send(JSON.stringify(metric))
    return true
  }

  // Main Methods
  // ============
  function count (name, value) {
    var metric = {};
    metric[name] = value+ '|c'
    return _send(metric)
  }

  function gauge (name, value) {
    var metric = {};
    metric[name] = value+ '|g'
    return _send(metric)
  }

  function timer (name, value) {
    var metric = {};
    metric[name] = value+ '|ms'
    return _send(metric)
  }

  // Helper Methods
  // ==============
  function increment (name) {
    return count(name, +1)
  }

  function decrement (name) {
    return count(name, -1)
  }

  output = _sendXHR

  if (!server){
    console.log('Whoops need to set a server in the environment.')
    console.log('All requests will be written to stdout instead of an aggregator')
    output = sendStdout
  }

  metrics.count = count
  metrics.gauge = gauge
  metrics.timer = timer
  metrics.increment = increment
  metrics.decrement = decrement
}))
