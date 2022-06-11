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
  _uniq = (i) => {
    return [...new Set(i)];
  };

  // https://github.com/validatorjs/validator.js/blob/master/src/index.js
  _validator__URL = (i) => {
    return validator.isURL(i) && !validator.isEmail(i) && !validator.isEmpty(i);
  };

  _innerText__byId = (i1, i2) => {
    return (document.getElementById(i1).innerText = i2);
  };

  _innerText__byId__2 = (i1, i2) => {
    return (document.getElementById(i1).innerText += i2);
  };

  _get__inputValue__byId = (i) => {
    return document.getElementById(i).value;
  };

  /////////////////////////

  addToLocalStorageArray = (value) => {
    this.default.localStorage.array.push(value);
    localStorage.setItem(
      this.default.localStorage.key,
      JSON.stringify(this._uniq(this.default.localStorage.array))
    );
  };

  getDataLocalStorage = () => {
    if (localStorage.getItem(this.default.localStorage.key) === null) {
      this.addToLocalStorageArray(this.default.localStorage.value);
    } else {
      return (this.default.localStorage.array = JSON.parse(
        localStorage.getItem(this.default.localStorage.key)
      ));
    }
  };

  /////////////////////////

  _inputValue__onChange = () => {
    document.getElementById("text17").addEventListener("change", () => {
      this.addToLocalStorageArray(this._get__inputValue__byId("text17"));
      this._HLS__player(this._get__inputValue__byId("text17"));
      this._modify__HTML__2();
    });
  };

  _inputTypeRadio__onChange = () => {
    for (const i of document.querySelectorAll(
      `input[name="fieldset-example2"]`
    )) {
      i.addEventListener("change", () => {
        this._HLS__player(i.value);
      });
    }
  };

  _modify__HTML = () => {
    for (const i of document.querySelectorAll("a")) {
      i.setAttribute("rel", "noopener noreferrer");
      i.setAttribute("target", "_blank");
    }

    for (const i of document.querySelectorAll("#momen1")) {
      i.innerHTML = moment(i.title.replaceAll("/", ""), "DDMMYYYY").fromNow();
    }

    // https://stackoverflow.com/a/222847
    // for(const e of[...document.getElementsByTagName("details")].slice(0,3));
    for (let i = 0; i < 4; i++) {
      document.getElementsByTagName("details").item(i).setAttribute("open", "");
    }
  };

  _modify__HTML__2 = () => {
    this.getDataLocalStorage();

    for (const i of document.querySelectorAll(".gg2")) {
      i.remove();
    }

    for (const i of this.default.localStorage.array) {
      document.getElementById(
        "eeeeeeeeeeeeeeeeeeeeeee"
      ).innerHTML += ` <div class="field-row gg2">
      <input
        id=${this.default.localStorage.array.indexOf(i)}
        type="radio"
        name="fieldset-example2"
        value="${i}"
      />
      <label for=${this.default.localStorage.array.indexOf(i)}>${i}</label>
    </div>`;
    }
  };

  _Menu = () => {
    if (document.getElementById("menu1").value == "1") {
      _toggle__PictureInPicture();
    } else if (document.getElementById("menu1").value == "2") {
      localStorage.clear();
      document.location.reload(true);
    }

    function _toggle__PictureInPicture() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        if (document.pictureInPictureEnabled) {
          document.getElementById("video1").requestPictureInPicture();
        }
      }
    }
  };

  _HLS__player = (i) => {
    //
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

      hls.loadSource(i);
      hls.attachMedia(video);

      //
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
      video.src = i;
      video.addEventListener("canplay", () => {
        video.play();
      });
    }

    this._innerText__byId(
      "notification",
      `${moment().format("LLL")} - HlS load successfull`
    );
  };
}

const main = new Main();

window.onload = () => {
  main._innerText__byId__2(
    "title",
    ` ${document.getElementsByTagName("summary").item(0).textContent}`
  );
  main.getDataLocalStorage();
  main._modify__HTML();
  main._modify__HTML__2();
  main._inputValue__onChange();
  main._inputTypeRadio__onChange();
};
