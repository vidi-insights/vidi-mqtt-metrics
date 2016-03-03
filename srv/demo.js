'use strict'

var opts = {
  port: 6011,
  metrics: {
    collector: {enabled: true}
  },
  mqtt_metrics: {}
}

require('seneca')()
  .use('vidi-metrics', opts.metrics)
  .use(require('..'), opts.mqtt_metrics)
  .use(sink_logger)
  .listen({port: opts.port})

function sink_logger (opts) {
  this.add({role: 'metrics', hook: 'sink'}, function (msg, done) {
    console.log(JSON.stringify(msg.metric, null, 2))
    done()
  })

  return 'sink-logger'
}
