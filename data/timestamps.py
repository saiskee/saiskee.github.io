import re, json
# read out/agab.json

with open('out/agab.json') as f:
  # load json
  out = []
  playlist_data = json.load(f)
  counter = 0
  for item in playlist_data['items']:
    # get the description
    description = item['snippet']['description']
    videoId = item['snippet']['resourceId']['videoId']
    url = 'https://youtu.be/' + videoId 
    # search description for HH:MM:SS regex
    matches = re.findall(r'(\d{0,2}:\d{1,2}:\d{1,2})\s+([\w\.\-\' ]+)', description)
    if matches:
      # print the first match
      for match in matches:
        counter += 1
        bhajan_name = match[1].strip()
        # trim whitespace from match[1]
        # print(match[0], match[1].strip())
        a = match[0]
        # HH:MM:SS to seconds
        seconds = sum(int(x) * 60 ** i for i,x in enumerate(reversed(a.split(":"))))
        out.append([bhajan_name, url + '?t=' + str(seconds)])
  # print out as json object
  print(json.dumps(out))