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
    Meteor.call('getTones', text, function(error, result){
      Session.set('tone', result);
    });
    Tracker.autorun(function(){
      if(Session.get('tone') != undefined){
        Session.set('loading', false);
      }
    });
  },
});

Template.barGraph.onRendered(function(){
  var ctx = $("#barGraph");
  var tone = Session.get('tone');
  var anger = tone.document_tone.tone_categories[0].tones[0].score * 100;
  var disgust = tone.document_tone.tone_categories[0].tones[1].score * 100;
  var fear = tone.document_tone.tone_categories[0].tones[2].score * 100;
  var joy = tone.document_tone.tone_categories[0].tones[3].score * 100;
  var sadness = tone.document_tone.tone_categories[0].tones[4].score * 100;
  Chart.defaults.global.defaultFontColor="#cccccc";
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    fontColor:"white",
    data: {
        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        datasets: [{
            label: 'Percentage',
            data: [anger, disgust, fear, joy, sadness],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
})

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
