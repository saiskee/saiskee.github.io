
const { fetch: originalFetch } = window;
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
  
  return rmsInDB
}

window.fetch = async (...args) => {
  let [resource, config] = args;
  if (resource.url && resource.url.includes("mime=audio")) {
    if (test === null) {
      test = new URL(resource.url);
      test.searchParams.set('range', '0-10000000')
      let result = await (await fetch(test.origin+test.pathname+"?"+test.searchParams.toString())).arrayBuffer();
      let audioBuffer = await audioContext.decodeAudioData(result)
      console.log(audioBuffer);
      
      
      var $progressList = $(".ytp-progress-list");
      console.log($progressList);

      var container = document.createElement("div")
      container.style.position = "absolute"
      // set container style to row
      container.style.display = "flex"
      let width = $progressList.clientWidth
      let frameSize = 22000
      for (var i = 0; i < audioBuffer.length; i+=frameSize) {
          var bar = document.createElement("div")
          console.log(`volume from ${i} to ${i+frameSize}: ${calculateVolume(audioBuffer, i, i+frameSize)}`);
          let color = Math.abs(Math.round(255 * ((calculateVolume(audioBuffer, i, i+frameSize)*2)/-100)))
          let hexColor = color.toString(16)

          bar.classList.add("ytp-progress-marker")
          bar.style.width = (frameSize/audioBuffer.length)*width + "px"
          bar.style.height = "6px"
          bar.style.top  = "0px"
          bar.style.left = (i/audioBuffer.length)*width + "px"
          bar.style.backgroundColor = `#${hexColor}${hexColor}${hexColor}`;
          console.log("setting color to  " + `#${hexColor}${hexColor}${hexColor}`)
          bar.style.position = "absolute"


          container.appendChild(bar);
      }

      $progressList.append(container)
    }
  }

  const response = await originalFetch(resource, config);
  return response;
};

$('video').load()
