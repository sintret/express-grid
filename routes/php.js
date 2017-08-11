var path = require('path');
var php = require('php-embed');
php.request({
    file: path.join(__dirname, 'hello.php'),
    stream: process.stdout
}).then(function(v) {
    console.log('php is done and stream flushed.');
});

module.exports = router;