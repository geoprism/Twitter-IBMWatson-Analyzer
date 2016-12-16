//Methods go here.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '30363b01-94ab-43ff-9852-e81718959aaa',
  password: 'hI47WE4A3eEv',
  version_date: '2016-05-19'
});


var T = new Twit({
    consumer_key:'PwgR7iTbJxSYUxLREaQ9k4aG3',
    consumer_secret:'Z1Ro921uD1cR9JjVZ6k9xZikcRyOMIbgkNaeycHsdLPVqPxx0o',
    access_token:'809174676605833217-0u0zEOOaXwDzHbnAf2p6V6pPObL74z3',
    access_token_secret:'jiNkfYYJotPQ35WfbpaIU3ALgW2LqBndRAcoLfCqg4Y92'
})


function getTweets(text, callback){
    var allTweets = ""
    T.get('search/tweets', { q: text, count: 100, lang:'en', result_type:'recent' }, function(err, data, response) {
        if (err)
          console.log(err);
        else{
            console.log(data.statuses.length);
            for(var i = 0; i<data.statuses.length; i++)
                allTweets = allTweets + " " + data.statuses[i].text;

            tone_analyzer.tone({ text: allTweets },function(err, tone) {
                if (err)
                  console.log(err);
                else
                  callback(null, tone);
            });
        }
    });


}





var tweetTones = Async.wrap(getTweets);

Meteor.methods({
  getTones:function(text){
      var response = tweetTones(text);
      return response;
  }

});
