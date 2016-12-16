
Meteor.startup(function(){
  Session.set("submitted", false);
})

Template.searchBar.events({
  'submit .searchForm'(event) {
    setTimeout(function(){
      Session.set('submitted', true);
    }, 400);
    Session.set('tone', undefined);
    Session.set('loading', true);
    event.preventDefault();
    $('.main-title').animate({
      marginTop:'2%'
    });
    $('.search-container').animate({
      marginTop:'20px'
    });

    var text = event.target.searchbar.value;
    Meteor.call('analyzeTone', text, function(error, result){
      Session.set('tone', result);
    });
    Tracker.autorun(function(){
      if(Session.get('tone') != undefined){
        Session.set('loading', false);
      }
      else{

      }
    });
  },
});

Template.graph.helpers({
  submitted:function(){
    return Session.get('submitted');
  },

  loading:function(){
    return Session.get('loading');
  },
  tone:function(){
    return "Graph goes here.";
  }
});
