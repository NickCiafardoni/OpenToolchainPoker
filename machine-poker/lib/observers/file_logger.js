// Generated by CoffeeScript 1.6.3
(function() {
  var fs;

  fs = require('fs');

  module.exports = function(filename) {
    var buffers, finished, finishedCallback, gameCount, observerFinished, ready, stream, write;
    buffers = [];
    ready = false;
    finished = false;
    finishedCallback = false;
    gameCount = 0;
    stream = fs.createWriteStream("" + (process.cwd()) + "/" + filename);
    stream.once('open', function() {
      ready = true;
      return write("[\n");
    });
    stream.once('close', function() {
      return observerFinished();
    });
    write = function(data, end) {
      var buffer, _i, _len;
      if (ready) {
        for (_i = 0, _len = buffers.length; _i < _len; _i++) {
          buffer = buffers[_i];
          stream.write(buffer);
        }
        if (end) {
          return stream.end(data);
        } else {
          return stream.write(data);
        }
      } else {
        return buffers.push(data);
      }
    };
    observerFinished = function() {
      finished = true;
      return typeof finishedCallback === "function" ? finishedCallback() : void 0;
    };
    return {
      complete: function(game) {
        if (gameCount > 0) {
          write(",\n" + (JSON.stringify(game)));
        } else {
          write("" + (JSON.stringify(game)));
        }
        return gameCount++;
      },
      tournamentComplete: function(players) {
        return write("]", true);
      },
      onObserverComplete: function(callback) {
        if (finished) {
          return setImmediate(callback);
        } else {
          return finishedCallback = callback;
        }
      }
    };
  };

}).call(this);
