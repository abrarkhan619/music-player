const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const range = document.getElementById("range");
const playImage = document.getElementById("playImage");
const audio = document.getElementById("audio");
const listContainer = document.getElementById("listContainer");
const playlistContainer = document.getElementById("playlistContainer")
const songTitle = document.getElementById("songTitle");
const search = document.getElementById("search");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const savePlaylistBtn = document.getElementById("savePlaylistBtn");
const liAllSongs = document.getElementsByClassName("liAllSongs")



let currentTime = 0;
let songIndex = 0;
let isPlaying = true;

// Class object constructor

class song {
    constructor(id, songName, thumbnail) {
        this.id = id
        this.songName = songName;
        this.thumbnail = thumbnail;
    }
    id() {
        return this.id
    }
    songName() {
        return this.songName
    }
    thumbnail() {
        return this.thumbnail
    }
}

const songList = [
    anything = new song(0, "Anything - Jay Z", "anything"),
    shutup = new song(1, "Shut Up - Stormzy", "shutup"),
    energy = new song(2, "Energy - Drake", "energy"),
    goCrazy = new song(3, "Go Crazy - Chris Brown", "goCrazy"),
    lifeIsGood = new song(4, "Life is Good - Future", "lifeIsGood"),
    ownIt = new song(5, "Own it - Stormzy", "ownIt"),
    heat = new song(6, "Heat - Chris Brown", "heat"),
    hello = new song(7, "Hello - Adele", "hello"),
    loyal = new song(8, "Loyal - Chris Brown", "loyal"),
    memories = new song(9, "Memories - Maroon 5", "memories"),
]

/// Creating visible songlist from above

const createSongList = () => {
    const list = document.createElement('ul');
    list.id = "ulAllSongs";

    for (let i = 0; i < songList.length; i++) {
        const item = document.createElement('li');
        const inputItem = document.createElement('input')

        inputItem.className = "checkboxItems"
        inputItem.setAttribute('type', 'checkbox')
        inputItem.setAttribute('value', songList[i].songName)

        item.className = "liAllSongs";
        item.appendChild(document.createTextNode(songList[i].songName))
        list.appendChild(item)
        item.appendChild(inputItem)
    }
    return list
}

listContainer.appendChild(createSongList());

/////////// Clicking song to play from list

listContainer.onclick = (e) => {
    // console.log(e);
    const clickedItem = e.target;
    audio.src = '/music/' + clickedItem.innerText + '.mp3';
    songTitle.innerText = clickedItem.innerText;
    playImage.src = "icons/pause.png";

    for (let i = 0; i < songList.length; i++) {
        if (clickedItem.innerText == songList[i].songName) {
            songIndex = i;  // changing song index based on song selected
        } else {
            console.log("no match");
        }
    }
    // console.log(songIndex);

    audio.play();
}

////// Play song

function playSong() {
    if (isPlaying) {
        audio.play();
        playImage.src = "icons/pause.png";
        isPlaying = false;
    } else {
        playImage.src = "icons/play.png";
        audio.pause();
        isPlaying = true;
    }
}

playBtn.addEventListener('click', playSong);

audio.addEventListener('ended', nextSong);


///// Next + previous song functions

function nextSong() {
    songIndex++;
    if (songIndex > songList.length - 1) { songIndex = 0 };
    audio.src = `music/${songList[songIndex].songName}.mp3`;
    songTitle.innerText = songList[songIndex].songName;
    isPlaying = true;
    playSong();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) { songIndex = songList.length - 1 };
    audio.src = `music/${songList[songIndex].songName}.mp3`;
    songTitle.innerText = songList[songIndex].songName;
    isPlaying = true;
    playSong();
}

nextBtn.addEventListener('click', function () {
    nextSong()
    // audio.play()
    playImage.src = "icons/pause.png";
})

prevBtn.addEventListener('click', function () {
    previousSong()
    // audio.play()
    playImage.src = "icons/pause.png";
})

///// Update progress value

function updateProgressValue() {

    range.max = audio.duration;
    range.value = audio.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));

    // if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
    //     document.querySelector('.durationTime').style.visibility = "hidden";
    // } else {
    //     document.querySelector('.durationTime').style.visibility = "visible";
    //     document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
    // }
    document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));

    if (document.querySelector('.durationTime').innerHTML === "undefined") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } 

};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };

    if (isNaN(seconds)) {
        return undefined
    } else {
       return `${min}:${sec}`; 
    }
};

// run updateProgressValue ever 500 ms
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio

range.addEventListener('change', function () {
    audio.currentTime = range.value;

})

///// Shuffle songs

let arrayShuffle = function (arr) {
    let newPos;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1))
        temp = arr[i];
        arr[i] = arr[newPos]
        arr[newPos] = temp;
    }
    return arr
}

shuffleBtn.addEventListener('click', function () {

    arrayShuffle(songList);
    audio.src = `music/${songList[songIndex].songName}.mp3`;
    songTitle.innerText = songList[songIndex].songName;
    // audio.play()
    playImage.src = "icons/play.png";
})

//// Filter search list

const filter = () => {
    // const liAllSongs = document.getElementsByClassName("liAllSongs")
    let listElements = [...liAllSongs] // created new array

    const searchValue = search.value.toLowerCase();
    listElements.forEach(listElement => {
        const stringFound = listElement.innerText.toLowerCase().indexOf(searchValue) !== -1;
        if (stringFound) {
            //Make list item visible//
            listElement.style.display = "";
        } else {
            //Make list item invisible
            listElement.style.display = "none";
        }
    });
};

search.addEventListener('input', filter)

//////////// Creating a new playlist //////////////////

let playlistIndex = 0;
savePlaylistBtn.style.display = "none";

let playlistArray = []

createPlaylistBtn.addEventListener('click', function () {
    console.log("clicked");

    // const liAllSongs = document.getElementsByClassName("liAllSongs")

    // liAllSongs.style.justifyContent = "space-between";

    document.querySelector(".liAllSongs").style.justifyContent = "space-between";



    const checkboxItems = document.querySelectorAll(".checkboxItems");

    for (let i = 0; i < checkboxItems.length; i++) {
        checkboxItems[i].style.display = 'block';
    }

    createPlaylistBtn.style.display = "none";
    savePlaylistBtn.style.display = "";

})


///////


const createPlaylist = () => {
    const list = document.createElement('ul');
    list.id = "ulPlaylist";

    for (let i = 0; i < playlistArray.length; i++) {
        let item = document.createElement('li');
        item.className = "liPlaylist";
        item.appendChild(document.createTextNode(playlistArray[i]))
        list.appendChild(item)
    }
    return list
}

savePlaylistBtn.addEventListener('click', function () {


    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        playlistArray.push(checkboxes[i].value)
    }

    console.log(playlistArray);

    createPlaylist();

    if (playlistArray.length > 0) {

        console.log('clicked');
        playlistContainer.appendChild(createPlaylist());
        playlistContainer.style.display = "block";
    }


    const checkboxItems = document.querySelectorAll(".checkboxItems");
    for (let i = 0; i < checkboxItems.length; i++) {
        checkboxItems[i].style.display = 'none';
    }


    createPlaylistBtn.style.display = "";
    savePlaylistBtn.style.display = "none";

})

playlistContainer.onclick = (e) => {
    console.log(e);
    const clickedItem = e.target;
    audio.src = '/music/' + clickedItem.innerText + '.mp3';
    songTitle.innerText = clickedItem.innerText;
    // console.log('/music/' + clickedItem.innerText + '.mp3');
    playImage.src = "icons/pause.png";

    // This would require a lot repeat code from play, next, previous functions above
    // for (let i = 0; i < playlistArray.length; i++) {
    //     if (clickedItem.innerText == playlistArray[i]) {
    //         playlistIndex = i  // changing song index based on song selected
    //         console.log(i);
            
    //     } else {
    //         console.log("no match");
    //     }
    // }

    audio.play();
}

///// Idle mode

let inactivityTime = function () {
    let time;
    window.onload = resetTimer();

    const popup = document.getElementById('popup');
    const closePopup = document.getElementById("closePopup")

    function showPopup() {
        popup.classList.toggle('active');
    }

    closePopup.addEventListener('click', function () {
        popup.classList.toggle('active');
        console.log("clicked popup");
        resetTimer()
    })
    

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(showPopup, 3000)
        // 1000 milliseconds = 1 second
    }
};

////////// key press events //////////

function checkKeyPress(key){
    if (key.keyCode == "37") {
        previousSong()
        // audio.play()
        playImage.src = "icons/pause.png";
    } 
    else if (key.keyCode == "39") {
        nextSong()
        // audio.play()
        playImage.src = "icons/pause.png";
    }
}

window.addEventListener("keydown", checkKeyPress, false);

window.onload = function () {
    audio.src = `/music/${songList[songIndex].songName}.mp3`;
    songTitle.innerText = songList[songIndex].songName;

    inactivityTime();
}

// // module.exports = songList;
// nextBtn.addEventListener('click', function () {
//     nextSong()
//     // audio.play()
//     playImage.src = "icons/pause.png";
// })

// prevBtn.addEventListener('click', function () {
//     previousSong()
//     // audio.play()
//     playImage.src = "icons/pause.png";
// })