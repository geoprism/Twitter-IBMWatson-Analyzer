//Methods go here.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '30363b01-94ab-43ff-9852-e81718959aaa',
  password: 'hI47WE4A3eEv',
  version_date: '2016-05-19'
});

function analyze(text, callback){
  tone_analyzer.tone({ text: text },
    function(err, tone) {
      if (err)
        console.log(err);
      else{
        callback(null, tone);
      }
  });
}

var analyze = Async.wrap(analyze);

Meteor.methods({
  analyzeTone:function(text){
    var response = analyze(text);
    return response;
  }
});
