var beefy = require('beefy')
var http = require('http')

http.createServer(beefy({
    entries: ['scripts/index.js']
  , cwd: __dirname
  , live: true
  , quiet: false
  , bundlerFlags: ['-t', 'brfs']
  , unhandled: on404
})).listen(9966)

function on404(req, resp) {
  resp.writeHead(404, {})
  resp.end('sorry folks!')
}