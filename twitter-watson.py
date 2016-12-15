import json
from watson_developer_cloud import ToneAnalyzerV3
import twitter

tone_analyzer = ToneAnalyzerV3(
  password = "hI47WE4A3eEv",
  username = "30363b01-94ab-43ff-9852-e81718959aaa",
  version='2016-05-19 '
)

api = twitter.Api(consumer_key='PwgR7iTbJxSYUxLREaQ9k4aG3',
                      consumer_secret='Z1Ro921uD1cR9JjVZ6k9xZikcRyOMIbgkNaeycHsdLPVqPxx0o',
                      access_token_key='809174676605833217-0u0zEOOaXwDzHbnAf2p6V6pPObL74z3',
                      access_token_secret='jiNkfYYJotPQ35WfbpaIU3ALgW2LqBndRAcoLfCqg4Y92')





#print(api.VerifyCredentials())

search = api.GetSearch(term="clinton", lang='en', result_type='recent', count = 10, max_id='')
for tweet in search:
    #print(tweet.text.encode('utf-8'))
    data = json.dumps(tone_analyzer.tone(
    text=tweet.text),
    indent=2)
    #print(data)

    print(tweet.text)
    actual = tone_analyzer.tone(text=tweet.text)
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
