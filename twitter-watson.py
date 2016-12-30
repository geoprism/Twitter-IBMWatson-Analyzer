import json
from watson_developer_cloud import ToneAnalyzerV3
import twitter

tone_analyzer = ToneAnalyzerV3(
  password = "INSERT_OWN_KEY",
  username = "INSERT_OWN_KEY",
  version='2016-05-19 '
)

api = twitter.Api(consumer_key='INSERT_OWN_KEY',
                      consumer_secret='INSERT_OWN_KEY',
                      access_token_key='INSERT_OWN_KEY',
                      access_token_secret='INSERT_OWN_KEY')





#print(api.VerifyCredentials())


allSearch = ""
search = api.GetSearch(term="angry", lang='en', result_type='recent', count = 1000, max_id='')
for tweet in search:
    #print(tweet.text.encode('utf-8'))
    # data = json.dumps(tone_analyzer.tone(
    # text=tweet.text),
    # indent=2)
    #print(data)

    allSearch = allSearch + tweet.text



#print(allSearch)
actual = tone_analyzer.tone(text=allSearch)
anger = actual["document_tone"]["tone_categories"][0]["tones"][0]
disgust = actual["document_tone"]["tone_categories"][0]["tones"][1]
fear = actual["document_tone"]["tone_categories"][0]["tones"][2]
joy = actual["document_tone"]["tone_categories"][0]["tones"][3]
sadness = actual["document_tone"]["tone_categories"][0]["tones"][4]




print("{:8}     Score: {}".format(anger["tone_name"], str(anger["score"])))
print("{:8}     Score: {}".format(disgust["tone_name"], str(disgust["score"])))
print("{:8}     Score: {}".format(fear["tone_name"], str(fear["score"])))
print("{:8}     Score: {}".format(joy["tone_name"], str(joy["score"])))
print("{:8}     Score: {}".format(sadness["tone_name"], str(sadness["score"])))
