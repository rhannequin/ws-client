var gulpUtil = require('gulp-util')
  , connect = require('connect')
  , connectLivereload = require('connect-livereload')
  , livereload = require('gulp-livereload')
  , livereloadServer
  , opn = require('opn')
  , paths = require('./paths')
  , ports = {
      web: 4242,
      livereload: 4243
    }


module.exports = {
  start: function(){
    livereloadServer = livereload(ports.livereload)

    var app = connect()
      .use(connectLivereload({port : ports.livereload}))
      .use(connect.static(paths.dist.root))

    require('http').createServer(app)
      .listen(ports.web)
      .on('listening', function(){
        gulpUtil.log('Started connect web server on http://localhost:' + ports.web + ' and livereload server on http://localhost:' + ports.livereload)
      })

    opn('http://localhost:' + ports.web)
  },
  livereload: function(file){
    livereloadServer.changed(file.path)
  }
}
