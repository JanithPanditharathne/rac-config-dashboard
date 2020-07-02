const PROXY_CONFIG = {
  '**': {
    target: 'http://localhost:3334',
    secure: false,
    bypass: function(req) {
      if (req && req.headers && req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
      }
      return null;
    }
  }
};

module.exports = PROXY_CONFIG;
