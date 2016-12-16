// var T = new Twit({
//     consumer_key:'PwgR7iTbJxSYUxLREaQ9k4aG3',
//     consumer_secret:'Z1Ro921uD1cR9JjVZ6k9xZikcRyOMIbgkNaeycHsdLPVqPxx0o',
//     access_token:'809174676605833217-0u0zEOOaXwDzHbnAf2p6V6pPObL74z3',
//     access_token_secret:'jiNkfYYJotPQ35WfbpaIU3ALgW2LqBndRAcoLfCqg4Y92'
// })
//
//
//
// Meteor.methods({
//     tweetsRequest: function(hashTag){
//       //check(hashTag, String);
//       var allTweets = ""
//       T.get('search/tweets', { q: hashTag, count: 2, lang:'en', result_type:'recent' }, function(err, data, response) {
//
//           for(var i = 0; i<data.statuses.length; i++){
//               //console.log(data.statuses[i].text)
//               allTweets = allTweets + " " + data.statuses[i].text;
//           }
//           console.log(allTweets)
//           return allTweets;
//
//       })
//     }
// })
