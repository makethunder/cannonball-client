/* jshint asi:true */
(function defineMetrics (global, factory) {
  if (typeof exports === 'object' && exports) {
    factory(exports) // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory) // AMD
  } else {
    Metrics = {} // Adds a global var to the window
    factory(Metrics) // script, wsh, asp
  }
}(this, function metricsFactory (exports) {
  return function Metrics (server) {
    var output

    function _send (metric) {
      return output(metric)
    }

    function _sendStdout (metric) {
      return console.log(metric)
    }

    function _sendXHR (metric) {
      var xhr = new XMLHttpRequest()

      xhr.open('POST', 'http://localhost:3000/statsd')
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

      xhr.send(JSON.stringify(metric))
      return true
    }

    // Main Methods
    // ============
    this.count = function (name, value) {
      var metric = {};
      metric[name] = value+ '|c'
      return _send(metric)
    }

    this.gauge = function (name, value) {
      var metric = {};
      metric[name] = value+ '|g'
      return _send(metric)
    }

    this.timer = function (name, value) {
      var metric = {};
      metric[name] = value+ '|ms'
      return _send(metric)
    }

    // Helper Methods
    // ==============
    this.increment = function (name) {
      return count(name, +1)
    }

    this.decrement = function (name) {
      return count(name, -1)
    }

    output = _sendXHR

    if (!server){
      console.log('Whoops need to pass in a server address')
      console.log('All requests will be written to stdout instead of an aggregator')
      output = _sendStdout
    }
  }
  exports = Metrics;
}))
