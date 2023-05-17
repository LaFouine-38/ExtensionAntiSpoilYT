import { arrayMatches } from "./utils"
import { delay, bannedExpressions } from "./config";

let intervalId;

function runInterval() {
    intervalId = setInterval(interval, delay)
}


function interval() {
    console.log("checked")
    let videoElements = document.querySelectorAll("ytd-rich-item-renderer[class='style-scope ytd-rich-grid-row']:not(.anti-spoil-checked)")
    videoElements.forEach(e => {
        e.classList.add('anti-spoil-checked')
        let title = e.querySelector("yt-formatted-string#video-title.style-scope.ytd-rich-grid-media")
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
        console.log("tab is active")
        if (!intervalId) runInterval()
    } else {
        console.log("tab is inactive")
        if (intervalId) clearInterval(intervalId)
        intervalId = null
    }
})