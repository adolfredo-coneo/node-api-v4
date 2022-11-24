setTimeout(function () {
  throw new Error('error');
}, 1000);

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

process.on('unhandledRejection', function (reason, p) {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
