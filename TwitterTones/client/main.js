Meteor.startup(function(){
  Session.set("submitted", false);
})

Template.searchBar.events({
  'submit .searchForm'(event) {
      event.preventDefault();
      var text = event.target.searchbar.value;
      if(text != ""){
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

            Meteor.call('getTones', text, function(error, result){
              Session.set('tone', result);
              console.log(result);
            });
            Tracker.autorun(function(){
              if(Session.get('tone') != undefined){
                Session.set('loading', false);
              }
              else if(Session.get('tone') == 0){
                Session.set("loading", false);
              }
            });
      }
  },

  'click .popular'() {
    $('.searchBar').val(this);
    $('.searchForm').submit();
  },



});

Template.barGraph.onRendered(function(){
  var ctx = $("#barGraph");
  var tone = Session.get('tone');
  if(tone == 0){
    Chart.defaults.global.defaultFontColor="#cccccc";
    Chart.defaults.global.maintainAspectRatio = false;
    var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      fontColor:"white",
      data: {
          labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
          datasets: [{
              label: 'Percentage',
              data: [0, 0, 0, 0, 0],
              backgroundColor: [
                  '#ed4100',
                  '#00a17d',
                  '#8565c4',
                  '#edb800',
                  '#65a3c4',
              ],
              borderColor: [
                  '#ed4100',
                  '#00a17d',
                  '#8565c4',
                  '#edb800',
                  '#65a3c4',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
              }],
              xAxes: [{
                  ticks: {
                    max:100,
                    min:0,
                    stepSize:10,
                    beginAtZero:true
                  },
              }]
          }
      }
    });
    return;
  }
  var anger = tone.document_tone.tone_categories[0].tones[0].score * 100;
  var disgust = tone.document_tone.tone_categories[0].tones[1].score * 100;
  var fear = tone.document_tone.tone_categories[0].tones[2].score * 100;
  var joy = tone.document_tone.tone_categories[0].tones[3].score * 100;
  var sadness = tone.document_tone.tone_categories[0].tones[4].score * 100;
  Chart.defaults.global.defaultFontColor="#cccccc";
  Chart.defaults.global.maintainAspectRatio = false;
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    fontColor:"white",
    data: {
        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        datasets: [{
            label: 'Percentage',
            data: [anger, disgust, fear, joy, sadness],
            backgroundColor: [
                '#ed4100',
                '#00a17d',
                '#8565c4',
                '#edb800',
                '#65a3c4',
            ],
            borderColor: [
                '#ed4100',
                '#00a17d',
                '#8565c4',
                '#edb800',
                '#65a3c4',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
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

Template.searchBar.helpers({
  popsearch: function(){
      return ReactiveMethod.call("getPopularSearches");
  }
});
