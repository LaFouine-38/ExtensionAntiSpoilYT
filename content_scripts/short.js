let intervalId;

function runInterval() {
    intervalId = setInterval(interval, delay)
}


function interval() {
    console.log("short")
    let shortElements = document.querySelectorAll("ytd-reel-video-renderer[class='reel-video-in-sequence style-scope ytd-shorts']:not(.anti-spoil-checked)")
    shortElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("yt-formatted-string[class='style-scope ytd-reel-player-header-renderer']")
        if (arrayMatches(bannedExpressions, title.innerText)) {
            e.style.display = 'none'
        }
    })
}

window.addEventListener("load", runInterval);

window.addEventListener("change", (e) => {
    console.log("unloaded")
    if(intervalId) clearInterval(intervalId)
});

document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState == "visible") {
        if (!intervalId) runInterval()
    } else {
        if (intervalId) clearInterval(intervalId)
        intervalId = null
    }
})