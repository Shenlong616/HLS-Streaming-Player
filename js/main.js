class Main {
  constructor() {
    this.default = {
      localStorage: {
        array: [],
        key: "HLS url",
        value: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      },
    };
  }

  // https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq
  _uniq = (parameter) => {
    return [...new Set(parameter)];
  };

  // https://github.com/validatorjs/validator.js/blob/master/src/index.js
  validator_isUrl = (parameter) => {
    return (
      validator.isURL(parameter) &&
      !validator.isEmail(parameter) &&
      !validator.isEmpty(parameter)
    );
  };

  getInputValue = () => {
    return document.getElementById("input1").value;
  };

  addArrayToLocalStorage = (parameter) => {
    this.default.localStorage.array.push(parameter);
    localStorage.setItem(
      this.default.localStorage.key,
      JSON.stringify(this._uniq(this.default.localStorage.array))
    );
  };

  getDataFromLocalStorage = () => {
    if (localStorage.getItem(this.default.localStorage.key) === null) {
      this.addArrayToLocalStorage(this.default.localStorage.value);
    } else {
      return (this.default.localStorage.array = JSON.parse(
        localStorage.getItem(this.default.localStorage.key)
      ));
    }
  };

  handleInputValueOnChange = () => {
    document.getElementById("input1").addEventListener("change", () => {
      if (this.validator_isUrl(this.getInputValue())) {
        this.addArrayToLocalStorage(this.getInputValue());
        this.hlsPlayer(this.getInputValue());
        this.modifyHtml();
      }
    });
  };

  handleInputTypeRadioOnChange = () => {
    for (const item of document.querySelectorAll(
      `input[name="fieldset-example2"]`
    )) {
      item.addEventListener("change", () => {
        this.hlsPlayer(item.value);
      });
    }
  };

  modifyHtml = () => {
    this.getDataFromLocalStorage();

    // https://stackoverflow.com/a/65413839
    document.querySelectorAll("#modifyHtml")[0].replaceChildren();

    for (const item of this.default.localStorage.array) {
      document.getElementById("modifyHtml").innerHTML += `
        <div class="Box-row">
        <input
        id=${this.default.localStorage.array.indexOf(item)}
        value="${item}"
        type="radio"
        name="fieldset-example2" />
        <label
        for=${this.default.localStorage.array.indexOf(item)}>${item}</label>
        </div>`;
    }

    document.querySelectorAll("div .Box-row").forEach((item) => {
      item.classList.add("Box-row--hover-gray");
      // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
      item.style.cssText = `overflow-wrap: break-word;`;
    });

    this.handleInputTypeRadioOnChange();
  };

  hlsPlayer = (parameter) => {
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

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        video.muted = true;
        video.play();
      });
    }

    /**
     * hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
     * When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
     * his is using the built-in support of the plain video element, without using hls.js.
     */

    //
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = parameter;
      video.addEventListener("canplay", () => {
        video.play();
      });
    }
  };
}

const main = new Main();

window.onload = () => {
  document
    .getElementsByClassName("branch-name")[0]
    .addEventListener("click", () => {
      location.href = "https://github.com/Shenlong616/HLS-Streaming-Player";
    });

  main.modifyHtml();
  main.handleInputValueOnChange();
};
