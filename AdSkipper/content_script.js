var interval_id = 0;

function init(){
    console.log("[AdSkipper] AdSkipper start success");
    chrome.storage.sync.get(['scanFreq'], function(items) {
        console.log("[AdSkipper] Scan period : "+items.scanFreq+" second"+((items.scanFreq!=1)?"s":""));
        interval_id = setInterval(function(){checkAdExist();},items.scanFreq*1000);
    });
}

function checkAdExist(){
    var ad_close = document.getElementsByClassName("ytp-ad-overlay-close-container");
    var ad_skip = document.getElementsByClassName("ytp-ad-skip-button ytp-button");
    var play_state = document.getElementsByClassName("playing-mode");
    
    if(ad_close.length > 0 && play_state.length > 0)
    {
        var ad_height = document.getElementsByClassName("ytp-ad-overlay-image")[0].style.height;
        if(ad_height != "0px")
        {
            document.getElementsByClassName("ytp-ad-overlay-close-button")[0].click();
            var ad_close_time = document.getElementsByClassName("ytp-time-current")[0].innerHTML;
            console.log("[AdSkipper] Close ad at "+ad_close_time);
        }
    }
    if(ad_skip.length > 0)
    {
        document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0].click();
        var ad_close_time = document.getElementsByClassName("ytp-time-current")[0].innerHTML;
        console.log("[AdSkipper] Skip ad at "+ad_close_time);
    }
    
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.action == 'new_page') {
        init();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    init();
});