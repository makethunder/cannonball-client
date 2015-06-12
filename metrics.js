/* jshint asi:true */
(function defineMetrics (global, factory) {
  'strict mode';
  if (typeof exports === 'object' && exports) {
    factory(exports) // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory) // AMD
  } else {
    Metrics = {} // Adds a global var to the window
    factory(Metrics) // script, wsh, asp
  }
}(this, function metricsFactory (metrics) {
  'strict mode';
  function Metrics (server) {
    var _send

    function _sendStdout (metric) {
      return console.log(metric)
    }

    function _sendXHR (metric) {
      var xhr = new XMLHttpRequest()

      xhr.open('POST', server)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

      xhr.send(JSON.stringify(metric))
      return true
    }

    // Main Methods
    // ============
    function count(name, value) {
      var metric = {}
      metric[name] = value+ '|c'
      return _send(metric)
    }

    function gauge(name, value) {
      var metric = {}
      metric[name] = value+ '|g'
      return _send(metric)
    }

    function timer(name, value) {
      var metric = {}
      metric[name] = value+ '|ms'
      return _send(metric)
    }

    // Helper Methods
    // ==============
    function increment(name) {
      return count(name, +1)
    }

    function decrement(name) {
      return count(name, -1)
    }

    _send = _sendXHR

    if (!server){
      console.log('Whoops need to pass in a server address')
      console.log('All requests will be written to stdout instead of an aggregator')
      _send = _sendStdout
    }

    return {
      count: count,
      gauge: gauge,
      timer: timer,
      increment: increment,
      decrement: decrement
    }
  }

  metrics = Metrics
  return metrics
}))
