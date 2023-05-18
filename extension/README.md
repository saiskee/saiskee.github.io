Sairam folks,
We were able to develop a tool which will help us timestamp bhajans on BhajanBliss moving forward. Right now, the tool is still being developed but is usable in a crude form. In order to use this tool, open your chrome developer tools `(Cmd + Shift + I or F12)` and paste the following code into the `Console` tab:

```js
const {
  fetch: originalFetch
} = window;
let test = null;

let $ = window.$;

let audioContext = new AudioContext();

function calculateVolume(audioBuffer, startFrame, endFrame) {
  const numChannels = audioBuffer.numberOfChannels;
  const numFrames = audioBuffer.length;

  let totalPower = 0;

  // Iterate over each channel
  for (let channel = 0; channel < numChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);

      // Iterate over each frame
      for (let frame = startFrame; frame < endFrame; frame++) {
          const sample = channelData[frame];

          // Calculate the amplitude and power of the sample
          const amplitude = Math.abs(sample);
          const power = amplitude * amplitude;

          // Accumulate the power value
          totalPower += power;
      }
  }

  // Calculate the average power
  const averagePower = totalPower / (numChannels * numFrames);

  // Calculate the RMS value
  const rmsValue = Math.sqrt(averagePower);

  // Optionally, convert RMS to decibels (dB)
  const rmsInDB = 20 * Math.log10(rmsValue);

  return rmsValue
}

function smoothBooleanArray(arr, window = 1) {
  const smoothedArr = [...arr]; // Create a copy of the input array

  for (let i = 1; i < arr.length - 1; i++) {
      // set current element to the majority of it's window neighbors
      let sum = 0;
      for (let j = i - window; j <= i + window; j++) {
          sum += arr[j];
      }
      smoothedArr[i] = sum > window ? true : false;
  }
  arr = smoothedArr;


  return smoothedArr;
}

async function testA(start, end) {
  test.searchParams.set('range', `${start}-${end}`)
  let response = await fetch(test.origin + test.pathname + "?" + test.searchParams.toString());
  console.log(response.status)
  return response;
}

let responses = new Array();



window.fetch = async (...args) => {
  let [resource, config] = args;

  try {
      if (test === null && resource.url && resource.url.includes("mime=audio")) {
          test = new URL(resource.url);

          // find the biggest smallest start value that gives us a 400 response
          let left = 0;
          let right = 100000000;
          while (left < right) {
              let mid = left + Math.floor((right - left) / 2)
              test.searchParams.set('range', `${mid}-${right}`)
              let response = await fetch(test.origin + test.pathname + "?" + test.searchParams.toString());
              // console.log(left, right, response.status)
              if (response.status == 400) {
                  right = mid
              } else {
                  left = mid + 1
              }
              // sleep for 1 second
          }
          console.log(left);
          let percentage = 1;
          let totalBytes = Math.floor(percentage * left);
          console.log(totalBytes);

          let videoPercent = totalBytes / left;
          console.log(`only analyzing first ${videoPercent} of video`)


          // get slices of the audio file till they are all loaded
          let responseCounter = 0;
          let chunks = 40;
          let loadSize = Math.floor(totalBytes / chunks);
          let responsePromises = []

          for (var i = 0; i < totalBytes; i += loadSize) {
              test.searchParams.set('range', `${i}-${i + loadSize}`)
              let res = responseCounter;
              responsePromises.push(fetch(test.origin + test.pathname + "?" + test.searchParams.toString()).then(async (response) => {
                  if (response.status != 200) {
                      console.log("error: ", response.status)
                      return;
                  }
                  let result_ = await response.blob();
                  responses[res] = result_;
              }));
              responseCounter++;
          }
          await Promise.all(responsePromises);

          // trim last element in all blobs in responses
          for (let i = 0; i < responses.length; i++) {
              // if (i == responses.length-1) {
              //   break;
              // }
              let blob = responses[i];
              let newBlob = blob.slice(0, blob.size - 1);
              responses[i] = newBlob;
          }

          // return length of all blobs combined
          console.log("responses bytes size: ", responses.reduce((acc, cur) => {
              acc += cur.size;
              return acc;
          }, 0));


          let audioBuffer = await audioContext.decodeAudioData(await new Blob(responses).arrayBuffer())
          console.log(audioBuffer)


          var $progressList = $(".ytp-progress-list");

          var container = document.createElement("div")
          container.style.position = "absolute"
          // set container style to row
          container.style.display = "flex"
          let width = $progressList.clientWidth
          let frameSize = 44100

          // store the volumes in an array
          let volumeMax = -Infinity;
          let volumeMin = Infinity;

          for (var i = 0; i < audioBuffer.length; i += frameSize) {
              let volume = calculateVolume(audioBuffer, i, i + frameSize)
              // check volume is a number
              if (isNaN(volume) || !isFinite(volume)) {
                  continue;
              }
              if (volume > volumeMax) {
                  volumeMax = volume
              }
              if (volume < volumeMin) {
                  volumeMin = volume
              }
          }
          let framesOn = []

          for (let i = 0; i < audioBuffer.length; i += frameSize) {
              let volume = (calculateVolume(audioBuffer, i, i + frameSize) * 2)
              let percentile = (volumeMax - volumeMin) * 0.3

              framesOn.push(volume > percentile)
          }
          console.log("smoothing timestamps")
          let smoothedFramesOn = smoothBooleanArray(framesOn, 7)
          let counter = 0;
          console.log("displaying timestamps")
          for (var i = 0; i < audioBuffer.length; i += frameSize) {
              var bar = document.createElement("div")

              let color = smoothedFramesOn[counter++] ? 255 : 0
              // console.log(color, volume + "db ", normalized)
              let hexColor = color.toString(16)

              bar.classList.add("ytp-progress-marker")
              bar.style.width = (frameSize / audioBuffer.length) * width * videoPercent + "px"
              bar.style.height = "16px"
              bar.style.top = "0px"
              bar.style.left = (i / audioBuffer.length) * width * videoPercent + "px"
              bar.style.backgroundColor = `#${hexColor}${hexColor}${hexColor}`;
              // console.log("setting color to  " + `#${hexColor}${hexColor}${hexColor}`)
              bar.style.position = "absolute"


              container.appendChild(bar);
          }

          $progressList.append(container)
      }

  } catch (e) {
      console.log(e)
  }
  const response = await originalFetch(resource, config);

  return response;
};

$('video').load()

let prompt = window.prompt;
$('#placeholder-area').click()

document.addEventListener('keydown', function(event) {

  if (event.key === 'c' || event.key === 'C') {
      let timestampName = prompt("Enter timestamp name")
      if (timestampName == null) {
          return;
      }
      let currentSeconds = Math.floor($('video').currentTime)
      let hhmmssTimestamp = new Date(currentSeconds * 1000).toISOString().slice(11, 19);
      $('#contenteditable-root').textContent += `${hhmmssTimestamp} ${timestampName} \n`

  }
});
```

once this is done, give the script about a minte to run, especially on videos longer than an hour.
Your youtube player should look like this: 
<img width="1039" alt="image" src="https://github.com/saiskee/saiskee.github.io/assets/1731122/67361987-155f-4e31-addf-58b2a2304ca3">

The black areas of the bar correspond to areas where the bhajans have ended, and so if you scrub to those areas, you should find that it is the silence between bhajans. This should help tremendously in timestamping bhajans in longer videos.

Once you're at a timestamp which you believe is a good starting point for a bhajan, click 'c' and a prompt will show up. In this prompt, enter the name of the bhajan and hit "OK" or press enter. Alternatively, if you think the timestamp is not a good one, hit Esc or "Cancel".

<img width="657" alt="image" src="https://github.com/saiskee/saiskee.github.io/assets/1731122/c3f0b6be-d972-4644-b501-7943d8c9e9fd">

<img width="1010" alt="image" src="https://github.com/saiskee/saiskee.github.io/assets/1731122/f3156da2-af90-4381-a79a-7aeea5491ade">

The timestamps  you've been working on should now be available in the "Comment" box. Do not click on this box and continue to timestamp the video. You can then click the "Comment" buttom (wwhich may be grayed out still but it will still work") To post the comment, or copy the timestamps elsewhere.

<img width="1001" alt="image" src="https://github.com/saiskee/saiskee.github.io/assets/1731122/308cb431-3473-43b6-ae00-45e32651c048">
