// const messageError = "your url is not valid";

const messageHighlight = (parameter) => {
  if (parameter === 0) {
    document.getElementById("input1").classList.add("color-fg-danger");
  } else if (parameter === 1) {
    document.getElementById("input1").classList.remove("color-fg-danger");
  }
};

document.getElementById("input1").addEventListener("input", () => {
  if (document.getElementById("input1").value === "reset") {
    localStorage.removeItem("HLS url");
    document.location.reload(true);
  }
});

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

    // https://github.com/video-dev/hls.js/blob/master/docs/API.md#runtime-events
    // https://github.com/video-dev/hls.js/issues/4590
    // https://github.com/TTitanUA/videojs-hlsjs-live-record
    // hls.on(Hls.Events.FRAG_PARSED, (...rest) => {
    //   console.log(rest);
    // });
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
  let array = JSON.parse(localStorage.getItem("HLS url")) || [];
  array.push(parameter.trim()); // validatore parameter
  // const uniqueArray = [...new Set(array)].filter(
  //   (element) => element !== messageError
  // );
  const uniqueArray = [...new Set(array)];

  //
  localStorage.setItem(
    "HLS url" || localStorage.setItem("HLS url", ""),
    JSON.stringify(uniqueArray)
  );

  // https://stackoverflow.com/a/65413839
  document.querySelector(".ul1").replaceChildren();

  //
  for (const item in uniqueArray) {
    document.querySelector(".ul1").innerHTML += `
    <li class="Box-row Box-row--hover-gray" style="overflow-wrap: break-word;">
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

  //-----------------------------------------------------------------
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap")</style>`
  );

  document.body.style.fontFamily = "Noto Sans, sans-serif";

  // L144
  // document.querySelectorAll("div .Box-row").forEach((element) => {
  //   element.classList.add("Box-row--hover-gray");

  //   // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
  //   element.style.cssText = `overflow-wrap: break-word;`;
  // });

  document.querySelector(".span1").style.cssText = `cursor: pointer;`;

  document.querySelector(".span1").addEventListener("click", () => {
    location.href = "https://github.com/Shenlong616/HLS-Streaming-Player";
  });

  // https://primer.style/css/support/theming#set-a-theme

  const iconColorTheme = (parameter) => {
    document
      .querySelectorAll(".blankslate-icon path, .span1 path")
      .forEach((element) => {
        element.setAttribute("fill", parameter);
      });
  };

  const textColorTheme = (parameter) => {
    document
      .querySelectorAll("#characterCount, #wordCount")
      .forEach((element) => {
        element.style.cssText = `color: ${parameter}`;
      });
  };

  const resetThemeAttribute = (parameter) => {
    parameter.removeAttribute("data-color-mode");
    parameter.removeAttribute("data-light-theme");
    parameter.removeAttribute("data-dark-theme");
    return true;
  };

  const lightTheme = () => {
    if (resetThemeAttribute(document.body)) {
      document.body.setAttribute("data-color-mode", "light");
      document.body.setAttribute("data-light-theme", "light");
      document.getElementById("themeToggleButton").textContent = "Dark mode";
      iconColorTheme("red");
      // textColorTheme("red");
    }
  };

  const darkTheme = () => {
    if (resetThemeAttribute(document.body)) {
      document.body.setAttribute("data-color-mode", "dark");
      document.body.setAttribute("data-dark-theme", "dark");
      document.getElementById("themeToggleButton").textContent =
        "Dark Dimmed mode";
      iconColorTheme("lime");
      // textColorTheme("lime");
    }
  };

  const darkDimmedTheme = () => {
    if (resetThemeAttribute(document.body)) {
      document.body.setAttribute("data-color-mode", "dark");
      document.body.setAttribute("data-dark-theme", "dark_dimmed");
      document.getElementById("themeToggleButton").textContent =
        "Dark High Contrast mode";
      iconColorTheme("cyan");
      // textColorTheme("cyan");
    }
  };

  const darkHighContrastTheme = () => {
    if (resetThemeAttribute(document.body)) {
      document.body.setAttribute("data-color-mode", "dark");
      document.body.setAttribute("data-dark-theme", "dark_high_contrast");
      document.getElementById("themeToggleButton").textContent = "Light mode";
      iconColorTheme("yellow");
      // textColorTheme("yellow");
    }
  };

  const initTheme = () => {
    if (!("theme" in localStorage)) {
      localStorage.setItem("theme", "light");
      lightTheme();
    } else if (localStorage.getItem("theme") === "light") {
      lightTheme();
    } else if (localStorage.getItem("theme") === "dark") {
      darkTheme();
    } else if (localStorage.getItem("theme") === "dark_dimmed") {
      darkDimmedTheme();
    } else if (localStorage.getItem("theme") === "dark_high_contrast") {
      darkHighContrastTheme();
    }
  };

  initTheme();

  const themeToggle = () => {
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
      darkTheme();
    } else if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "dark_dimmed");
      darkDimmedTheme();
    } else if (localStorage.getItem("theme") === "dark_dimmed") {
      localStorage.setItem("theme", "dark_high_contrast");
      darkHighContrastTheme();
    } else if (localStorage.getItem("theme") === "dark_high_contrast") {
      localStorage.setItem("theme", "light");
      lightTheme();
    }
  };

  document.getElementById("themeToggleButton").addEventListener("click", () => {
    themeToggle();
  });
});
