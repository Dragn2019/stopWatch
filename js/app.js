(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const displayTime = document.querySelector(".page__stopwatch");
    const playButton = document.querySelector(".page__buttons-play");
    const stopButton = document.querySelector(".page__buttons-stop");
    const resetButton = document.querySelector(".page__buttons-reset");
    let timer = null;
    let [hours, min, sec] = [ 0, 0, 0 ];
    function stopwatch() {
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
            if (min == 60) {
                min = 0;
                hours++;
            }
        }
        let h = hours < 10 ? "0" + hours : hours;
        let m = min < 10 ? "0" + min : min;
        let s = sec < 10 ? "0" + sec : sec;
        displayTime.innerHTML = h + ":" + m + ":" + s;
    }
    function watchStart() {
        if (timer !== null) clearInterval(timer);
        timer = setInterval(stopwatch, 1e3);
    }
    function watchReset() {
        [hours, min, sec] = [ 0, 0, 0 ];
        displayTime.innerHTML = "00:00:00";
        clearInterval(timer);
        timer = null;
        playButton.disabled = false;
    }
    function watchStop() {
        clearInterval(timer);
    }
    playButton.addEventListener("click", (() => {
        if (timer == null) {
            watchStart();
            playButton.disabled = true;
        }
    }));
    resetButton.addEventListener("click", (() => {
        watchReset();
    }));
    stopButton.addEventListener("click", (() => {
        watchStop();
    }));
    window["FLS"] = true;
    isWebp();
})();