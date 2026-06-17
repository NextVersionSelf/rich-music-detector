//Buttons
const btnNext = document.getElementById("btn-Next");
const btnPlay = document.getElementById("btn-Play");
const btnPrev = document.getElementById("btn-Prev");
//Other Elements
const songInfo = document.getElementById("song-El");
//Future Warning: Static elements may break, need mutationobserver at some point 

chrome.tabs.query({audible: true}, (tabs) => { //Audible T/F
    const target = "YouTube Music"; //Target Window 
    const tab = tabs.find(tb => tb.title?.includes(target)); //find exact match including target
    
    chrome.tabs.onUpdated.addListener(handleUpdated);

    btnNext.addEventListener("click", () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: goNextTrack,
        });
    });

    btnPlay.addEventListener("click", () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: goPlayTrack,
        });
    });

    btnPrev.addEventListener("click", () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: goPrevTrack,
        });
    });
});

// Functions here until I figure out how to properly import/inject with the Chrome API
function goNextTrack() {
    const nextButton = document.querySelector('ytmusic-player-bar .next-button');
    if (nextButton) {
        nextButton.click();
    };
};

function goPlayTrack() {
    const playButton = document.querySelector('ytmusic-player-bar .play-pause-button');
    if (playButton) {
        playButton.click();
    };
};

function goPrevTrack() {
    const previousButton = document.querySelector('ytmusic-player-bar .previous-button');
    if (previousButton) {
        previousButton.click();
    };
};

function handleUpdated(tabId, changeInfo, tabInfo) {
    const tabTitleStr = `Now Playing: ${tabInfo.title}`;
    songInfo.textContent = tabTitleStr
};

