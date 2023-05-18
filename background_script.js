chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) return;
    if (!tab.url.startsWith("https://www.youtube.com/")) return;
    // if (changeInfo.url.startsWith("https://www.youtube.com/shorts")) {
    //     _pageType = "short"
    // }
    else if (changeInfo.url.startsWith("https://www.youtube.com/watch")) {
        _pageType = "video"
    }
    else if (changeInfo.url.startsWith("https://www.youtube.com")) {
        _pageType = "home"
    }
    else return
    chrome.tabs.sendMessage(tabId, {
        action: 'url_changed',
        url: changeInfo.url,
        pageType: _pageType
    })
});