const intervals = {
    home: () => {
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
    },
    video: () => {
        console.log("video")
        let videoElements = document.querySelectorAll("ytd-compact-video-renderer[class='style-scope ytd-item-section-renderer']:not(.anti-spoil-checked)")
        videoElements.forEach(e => {
            e.classList.add('anti-spoil-checked')
            let title = e.querySelector("span#video-title.style-scope.ytd-compact-video-renderer")
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
    },
    short: () => {
        console.log("short")
        let shortElement = document.querySelector("ytd-reel-video-renderer[class*='reel-video-in-sequence style-scope ytd-shorts']:has(yt-formatted-string.style-scope.ytd-reel-player-header-renderer)")
        if (!shortElement) return;
        let title = shortElement.querySelector("yt-formatted-string.style-scope.ytd-reel-player-header-renderer")
        if (arrayMatches(bannedExpressions, title.innerText)) {
            shortElement.style.display = 'none'
        }
        shortElement.classList.add('anti-spoil-checked')
        setTimeout(()=>{}, 500)
    }
}

function runInterval(type) {
    intervalId = setInterval(intervals[type], delay)
}

function getCurrentPageType(url){
    /*if (url.startsWith("https://www.youtube.com/shorts")) {
        _type = "short"
    }
    else*/ if (url.startsWith("https://www.youtube.com/watch")) {
        _type = "video"
    }
    else if (url.startsWith("https://www.youtube.com")) {
        _type = "home"
    }
    return _type
}

let intervalId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'url_changed') {
        if (!request.pageType) return;
        if (intervalId) clearInterval(intervalId)
        runInterval(request.pageType)
    }
});


window.addEventListener("load", () => {
    if (!intervalId) runInterval(getCurrentPageType(document.location.href))
});

document.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState == "visible") {
        console.log("visible")
        if (!intervalId) runInterval(getCurrentPageType(document.location.href))
    } else {
        console.log("invisible")
        if (intervalId) clearInterval(intervalId)
        intervalId = null
    }
})
