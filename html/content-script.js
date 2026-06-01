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

    if (tab) {
        const tabTitleStr = `Now Playing: ${tab.title}`;
        songInfo.textContent = tabTitleStr;
    }

    btnNext.addEventListener("click", () => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: goNextTrack,
        });
    });
});

function goNextTrack() {
    const nextButton = document.querySelector('ytmusic-player-bar .next-button');
    if (nextButton) {
        nextButton.click();
    };
};


