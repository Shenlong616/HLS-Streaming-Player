const initHLS = (
  parameter = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
) => {
  var video = document.getElementById("video1");
  if (Hls.isSupported()) {
    var hls = new Hls({
      debug: false,
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

initHLS();

const initMain = (
  parameter = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
) => {
  let array = JSON.parse(localStorage.getItem("hls")) || [];
  array.push(parameter.trim()); // validatore parameter
  const uniqueArray = [...new Set(array)];

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
    });
  }
};

initMain();

document.querySelectorAll("div .Box-row").forEach((item) => {
  item.classList.add("Box-row--hover-gray");
  // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
  item.style.cssText = `overflow-wrap: break-word;`;
});

document
  .getElementsByClassName("branch-name")[0]
  .addEventListener("click", () => {
    location.href = "https://github.com/Shenlong616/HLS-Streaming-Player";
  });
