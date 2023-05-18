let intervalId;

function runInterval() {
    intervalId = setInterval(interval, delay)
}


function interval() {
    console.log("home")
    let videoElements = document.querySelectorAll("ytd-rich-item-renderer[class='style-scope ytd-rich-grid-row']:not(.anti-spoil-checked)")
    videoElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("yt-formatted-string#video-title[class='style-scope ytd-rich-grid-media']")
        if (arrayMatches(bannedExpressions, title.innerText)) {
            e.style.display = 'none'
        }
    })
    let shortElements = document.querySelectorAll("ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']:not(.anti-spoil-checked)")
    shortElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("span#video-title[class='style-scope ytd-rich-grid-slim-media']")
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