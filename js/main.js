const messageError = "your url is not valid";

const messageHighlight = (parameter) => {
  if (parameter === 0) {
    document.getElementById("input1").classList.add("color-fg-danger");
  } else if (parameter === 1) {
    document.getElementById("input1").classList.remove("color-fg-danger");
  }
};

const initHLS = (parameter) => {
  var video = document.getElementById("video1");
  if (Hls.isSupported()) {
    var hls = new Hls({
      // https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning
      // maxBufferSize, maxBufferLength
      autoStartLoad: true,
      startPosition: -1,
      debug: false,
      capLevelOnFPSDrop: false,
      capLevelToPlayerSize: false,
      defaultAudioCodec: undefined,
      initialLiveManifestSize: 1,
      maxBufferLength: 60,
      maxMaxBufferLength: 600,
      backBufferLength: Infinity,
      maxBufferSize: 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9,
      maxBufferHole: 0.5,
      highBufferWatchdogPeriod: 2,
      nudgeOffset: 0.1,
      nudgeMaxRetry: 3,
      maxFragLookUpTolerance: 0.25,
      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: Infinity,
      liveDurationInfinity: false,
      enableWorker: true,
      enableSoftwareAES: true,
      manifestLoadingTimeOut: 10000,
      manifestLoadingMaxRetry: 1,
      manifestLoadingRetryDelay: 1000,
      manifestLoadingMaxRetryTimeout: 64000,
      startLevel: undefined,
      levelLoadingTimeOut: 10000,
      levelLoadingMaxRetry: 4,
      levelLoadingRetryDelay: 1000,
      levelLoadingMaxRetryTimeout: 64000,
      fragLoadingTimeOut: 20000,
      fragLoadingMaxRetry: 6,
      fragLoadingRetryDelay: 1000,
      fragLoadingMaxRetryTimeout: 64000,
      startFragPrefetch: false,
      testBandwidth: true,
      progressive: false,
      lowLatencyMode: true,
      fpsDroppedMonitoringPeriod: 5000,
      fpsDroppedMonitoringThreshold: 0.2,
      appendErrorMaxRetry: 3,
      // loader: customLoader,
      // fLoader: customFragmentLoader,
      // pLoader: customPlaylistLoader,
      // xhrSetup: XMLHttpRequestSetupCallback,
      // fetchSetup: FetchSetupCallback,
      // abrController: AbrController,
      // bufferController: BufferController,
      // capLevelController: CapLevelController,
      // fpsController: FPSController,
      // timelineController: TimelineController,
      enableWebVTT: true,
      enableIMSC1: true,
      enableCEA708Captions: true,
      stretchShortVideoTrack: false,
      maxAudioFramesDrift: 1,
      forceKeyFrameOnDiscontinuity: true,
      abrEwmaFastLive: 3.0,
      abrEwmaSlowLive: 9.0,
      abrEwmaFastVoD: 3.0,
      abrEwmaSlowVoD: 9.0,
      abrEwmaDefaultEstimate: 500000,
      abrBandWidthFactor: 0.95,
      abrBandWidthUpFactor: 0.7,
      abrMaxWithRealBitrate: false,
      maxStarvationDelay: 4,
      maxLoadingDelay: 4,
      minAutoBitrate: 0,
      emeEnabled: false,
      widevineLicenseUrl: undefined,
      licenseXhrSetup: undefined,
      drmSystemOptions: {},
      // requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess,
      cmcd: undefined,
    });
    hls.loadSource(parameter);
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      video.muted = true;
      video.play();
    });
  }
  // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
  // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
  // This is using the built-in support of the plain video element, without using hls.js.
  else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = parameter;
    video.addEventListener("canplay", function () {
      video.play();
    });
  }
};

const initMain = (
  parameter = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
) => {
  let array = JSON.parse(localStorage.getItem("hls")) || [];
  array.push(parameter.trim()); // validatore parameter
  const uniqueArray = [...new Set(array)].filter(
    (element) => element !== messageError
  );

  //
  localStorage.setItem(
    "hls" || localStorage.setItem("hls", ""),
    JSON.stringify(uniqueArray)
  );

  // https://stackoverflow.com/a/65413839
  document.querySelector(".ul1").replaceChildren();

  //
  for (const item in uniqueArray) {
    document.querySelector(".ul1").innerHTML += `
    <li class="Box-row">
    <input type="radio" id="${item}" name="name" value="${uniqueArray[item]}" style="cursor: pointer;"/>
    <label for="${item}" style="cursor: pointer;">${uniqueArray[item]}</label>
  </li>`;
  }

  //
  for (const item of document.querySelectorAll(".ul1 li input")) {
    item.addEventListener("click", () => {
      initHLS(item.value);
      document.getElementById("input1").value = item.value;
      messageHighlight(1);
    });
  }
};

window.addEventListener("load", () => {
  initMain();

  document
    .querySelectorAll(".blankslate-icon path, .branch-name path")
    .forEach((element) => {
      element.setAttribute("fill", "lime");
    });

  document.querySelector(".branch-name").style.cssText = `color: peachpuff;
                                                        cursor: pointer;`;

  document.querySelectorAll("div .Box-row").forEach((element) => {
    element.classList.add("Box-row--hover-gray");
    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
    element.style.cssText = `overflow-wrap: break-word;`;
  });

  document
    .getElementsByClassName("branch-name")[0]
    .addEventListener("click", () => {
      location.href = "https://github.com/Shenlong616/HLS-Streaming-Player";
    });
});
