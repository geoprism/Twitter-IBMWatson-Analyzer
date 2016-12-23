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
});

function getTweets(text, callback){
    var allTweets = "";
    var result = [];
    T.get('search/tweets', { q: text, count: 100, lang:'en', result_type:'recent' }, function(err, data, response) {
        if (err){
          console.log(err);
        }
        else{
            for(var i = 0; i<data.statuses.length; i++){
              allTweets = allTweets + " " + data.statuses[i].text;
            }
            tone_analyzer.tone({ text: allTweets },function(err, tone) {
                if (err){
                  console.log(err);
                  callback(null, 0);
                }
                else{
                  result.push(tone, data);
                }
                  callback(null, result);
            });
        }
    });
}


var tweetTones = Async.wrap(getTweets);
var embed = Async.wrap(function(tweetdata, callback){
  var httplist = [];
  for(var i=0; i<tweetdata.statuses.length; i++){
    httplist.push(HTTP.call('GET','https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/507185938620219395', {}).data.html);
  }
  callback(null, httplist);
});


Meteor.methods({
  getTones:function(text){
      text = text.toLowerCase().trim();
      if(Searches.findOne({'search': text})){
          console.log("THIS WAS SEARCHED BEFORE")
          var searchid = Searches.findOne({'search':text})._id;
          Searches.update(searchid, {$inc: {count: 1},
                                     $set: {submitted: new Date()}
                                 });
      }
      else{
          Searches.insert({submitted: new Date(),
                           search: text,
                           count: 1});
      }

      var response = tweetTones(text);
      return response;
  },

  getPopularSearches: function(){
      var tempArray = [];
      var dayOld = new Date();
      dayOld.setDate(dayOld.getDate() - 1);  //date object that is a day old

      console.log(dayOld);
      console.log(new Date());
      Searches.find({}, {sort: {count: -1}}).forEach(function(obj){
          if(obj.submitted < dayOld){   //if the hashtag is less than a day old get rid of it
              Searches.remove(obj)
          }
          else if(tempArray.length <5 && obj.search.length<15){
              tempArray.push(obj.search);
              console.log(obj.search);
          }
      });

      console.log(tempArray);
      return tempArray;
  },

  embedTweet: function(tweetdata){
    var response = embed(tweetdata);
    console.log(response);
    return response;
  }


});
