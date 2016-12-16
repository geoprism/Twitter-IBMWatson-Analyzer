


Template.searchBar.events({
  'submit .searchForm'(event) {
    event.preventDefault();
    console.log(event.target.searchbar.value);
  },
});


Template.tweetTest.helpers({
    tester: function(){
        Meteor.call('tweetsRequest', 'happy', function(err, result){
            if (err)
              console.log(err);

            Session.set('q', result);
        });



        // return ReactiveMethod.call("tweetsRequest", "lol");
        // //var x = ReactiveMethod.call("tweetsRequest", "happy");
        // //console.log(x);
        // //return x;
    },

    getter: function(){
        console.log(Session.get('q'));
        return Session.get('q');

    }


});
