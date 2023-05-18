let intervalId;

function runInterval() {
    intervalId = setInterval(interval, delay)
}


function interval() {
    console.log("video")
    let videoElements = document.querySelectorAll("ytd-compact-video-renderer[class='style-scope ytd-item-section-renderer']:not(.anti-spoil-checked)")
    videoElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("span#video-title[class='style-scope ytd-compact-video-renderer']")
        if (arrayMatches(bannedExpressions, title.innerText)) {
            e.style.display = 'none'
        }
    })

    let shortElements = document.querySelectorAll("ytd-reel-item-renderer[class='style-scope yt-horizontal-list-renderer']:not(.anti-spoil-checked)")
    shortElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("span#video-title[class='style-scope ytd-reel-item-renderer']")
        if (arrayMatches(bannedExpressions, title.innerText)) {
            e.style.display = 'none'
        }
    })
}

window.addEventListener("load", runInterval);

window.addEventListener("beforeunload", (e) => {
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