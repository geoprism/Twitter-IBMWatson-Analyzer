Meteor.startup(function(){
  Session.set("submitted", false);
  Session.set('tweetdata', undefined);
  var toneMap = {
    0:'#ed4100',
    1:'#00a17d',
    2:'#8565c4',
    3:'#edb800',
    4:'#65a3c4'
  };
  Session.set('toneMap', toneMap);
});

Template.searchBar.events({
  'submit .searchForm'(event) {
      event.preventDefault();
      var text = event.target.searchbar.value;
      if(text != ""){
            setTimeout(function(){
              Session.set('submitted', true);
            }, 400);
            Session.set('text', undefined);
            Session.set('tone', undefined);
            Session.set('tweetdata', undefined);
            Session.set('loading', true);
            event.preventDefault();
            $('.main-title').animate({
              marginTop:'2%'
            });
            $('.search-container').animate({
              marginTop:'20px'
            });
            Session.set('text', text);
            Meteor.call('getTones', text, function(error, result){
              Session.set('tone', result[0]);
              Meteor.call('embedTweet', result[1], function(error2,result2){
                Session.set('tweetdata', result2);
              });
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
  Chart.defaults.global.defaultFontColor="#cccccc";
  Chart.defaults.global.maintainAspectRatio = false;
  Chart.defaults.global.title.text = "#" + Session.get('text').toLowerCase();
  Chart.defaults.global.title.fontFamily = 'Varela Round';
  Chart.defaults.global.title.display = true;
  Chart.defaults.global.title.fontSize = 25;
  if(tone == 0){
    Chart.defaults.global.title.fontColor = 'white';
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
          legend: {
            display:false
          },
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
  Chart.defaults.global.title.fontColor = Session.get('toneMap')[getMaxIndex([anger, disgust, fear, joy, sadness])];
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
      legend: {
        display:false
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
            }]
        }
    }
  });
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
  },

});

Template.embeds.onRendered(function(){
  ! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = "//platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  }(document, "script", "twitter-wjs");
});

Template.embeds.helpers({
  hasTweetData:function(){
    if(Session.get('tweetdata') == undefined || Session.get('tweetdata') == [] || Session.get('tweetdata') == null)
      return false;
    return true;
  },

  tweetdata:function(){
    return Session.get('tweetdata');
  }
});

Template.searchBar.helpers({
  popsearch: function(){
    return ReactiveMethod.call("getPopularSearches");
  }
});

function getMaxIndex(list){
  maxindex = -1;
  max = -1;
  for(var i=0; i<list.length; i++){
    if(list[i] > max){
      max = list[i];
      maxindex = i;
    }
  }
  return maxindex;
}
