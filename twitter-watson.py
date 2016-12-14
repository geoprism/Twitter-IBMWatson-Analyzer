import json
from watson_developer_cloud import ToneAnalyzerV3

tone_analyzer = ToneAnalyzerV3(
  password = "hI47WE4A3eEv",
  username = "30363b01-94ab-43ff-9852-e81718959aaa",
  version='2016-05-19 '
)



print(json.dumps(tone_analyzer.tone(
text='A word is dead when it is said, some say. Emily Dickinson'),
indent=2))
