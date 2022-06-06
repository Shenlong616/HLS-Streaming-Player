class Main {
  //
  constructor() {
    this.Id_ArrayList = ["floatingInputGrid"];
    this.ClassName_ArrayList = ["floatingInputGrid"];
    this.localStorage_Array = [];
    this.localStorage_keyName = "HLS url";
    this.localStorage_value =
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  }

  //
  getElementById = (i) => {
    return document.getElementById(i);
  };

  getElementsByClassName = (i) => {
    return document.getElementsByClassName(i);
  };

  //
  customHTML = () => {
    for (const i of document.querySelectorAll(".bi")) {
      i.classList.add("px-1", "user-select-none");
    }

    //
    for (const i of document.querySelectorAll("a")) {
      i.setAttribute("rel", "noopener noreferrer");
      i.setAttribute("target", "_blank");
    }
  };

  //
  NProgress = () => {
    NProgress.start();
    NProgress.done();
  };

  //
  fakeLoading = () => {
    baffle(".baffle_elm")
      .set({
        characters: ["█", "▓", "▒", "░", "<", ">", "/"],
        speed: 50,
      })
      .reveal(300);

    //
    this.NProgress();
  };

  //
  MomentJS = () => {
    for (const i of document.querySelectorAll("#last_updated")) {
      i.innerHTML = moment(i.title.replaceAll("/", ""), "DDMMYYYY").fromNow();
    }
  };

  //
  Menu = () => {
    const a = document.getElementById("floatingSelectGrid");
    let b = a.value;

    //
    if (b == "1") {
      togglePictureInPicture();
    } else if (b == "2") {
      localStorage.clear();
      document.location.reload(true);
    }

    //
    function togglePictureInPicture() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
        a.selectedOptions[0].classList.remove("text-bg-success");
      } else {
        if (document.pictureInPictureEnabled) {
          document.getElementById("video").requestPictureInPicture();
          a.selectedOptions[0].classList.add("text-bg-success");
        }
      }
    }
    this.fakeLoading();
  };

  // https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq
  _uniq = (i) => {
    return [...new Set(i)];
  };

  /**
   * Add an item to a localStorage() array
   * https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript
   * https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
   */

  //
  addToLocalStorageArray = (key, value) => {
    this.localStorage_Array.push(value);
    localStorage.setItem(
      key,
      JSON.stringify(this._uniq(this.localStorage_Array))
    );
    // console.log(this.localStorage_Array.length, typeof this.localStorage_Array);
  };

  //
  getDataLocalStorage = () => {
    if (localStorage.getItem(this.localStorage_keyName) === null) {
      this.addToLocalStorageArray(
        this.localStorage_keyName,
        this.localStorage_value
      );
    } else {
      return (this.localStorage_Array = JSON.parse(
        localStorage.getItem(this.localStorage_keyName)
      ));
    }
  };

  //
  datalistOptionsGenerator = () => {
    for (const i of document.querySelectorAll("#yy")) {
      i.remove();
    }

    //
    for (const i of this.getDataLocalStorage()) {
      document.getElementById(
        "datalistOptions"
      ).innerHTML += `<option value=${i} id="yy"></option>`;
    }
  };

  //
  ListenInputOnChange = () => {
    this.getElementById(this.Id_ArrayList[0]).addEventListener("change", () => {
      if (
        !validator.isEmpty(this.getElementById(this.Id_ArrayList[0]).value) &&
        !validator.isEmail(this.getElementById(this.Id_ArrayList[0]).value) &&
        validator.isURL(this.getElementById(this.Id_ArrayList[0]).value)
      ) {
        this.addToLocalStorageArray(
          this.localStorage_keyName,
          this.getElementById(this.Id_ArrayList[0]).value
        );
        this.datalistOptionsGenerator();
        this.HLSplayer();
      }
    });
  };

  //
  getInputValue = () => {
    if (this.getElementById(this.Id_ArrayList[0]).value === "") {
      return (this.getElementById(this.Id_ArrayList[0]).value =
        this.getDataLocalStorage().at(-1));
    } else {
      return this.getElementById(this.Id_ArrayList[0]).value;
    }
  };

  //
  HLSplayer = () => {
    var video = document.getElementById("video");
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
      hls.loadSource(this.getInputValue());
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
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
      video.src = this.getInputValue();
      video.addEventListener("canplay", function () {
        video.play();
      });
    }
    this.fakeLoading();
  };
}

//
const main = new Main();

//
main.customHTML();
main.getDataLocalStorage();
main.datalistOptionsGenerator();
main.ListenInputOnChange();
main.getInputValue();
main.HLSplayer();
