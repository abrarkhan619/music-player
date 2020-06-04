const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const range = document.getElementById("range");
const playImage = document.getElementById("playImage");
const audio = document.getElementById("audio");
const listContainer = document.getElementById("listContainer");
const songTitle = document.getElementById("songTitle");
const search = document.getElementById("search");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");

let totalTime = 0;
let currentTime = 0;
let songIndex = 0;
let isPlaying = true;

// Class object constructor (I think its called)
 
class song {
    constructor(id, songName, artist, thumbnail) {
        this.id = id
        this.songName = songName;
        this.artist = artist;
        this.thumbnail = thumbnail;
    }
    id() {
        return this.id
    }
    songName() {
        return this.songName
    }
    artist() {
        return this.artist
    }
    thumbnail() {
        return this.thumbnail
    }
}

const songList = [
    anything = new song(0, "Anything", "Jay Z", "anything"),
    shutup = new song(1, "Shut Up", "Stormzy", "shutup"),
    energy = new song(2, "Energy", "Drake", "energy"),
    goCrazy = new song(3, "Go Crazy", "Chris Brown", "goCrazy"),
    lifeIsGood = new song(4, "Life is Good", "Future", "lifeIsGood"),
    ownIt = new song(5, "Own it", "Stormzy", "ownIt"),
    heat = new song(6, "Heat", "Chris Brown", "heat"),
    hello = new song(7, "Hello", "Adele", "hello"),
    loyal = new song(8, "Loyal", "Chris Brown", "loyal"),
    memories = new song(9, "Memories", "Maroon 5", "memories"),
]

/// Creating visible songlist from above

const createSongList = () => {
    const list = document.createElement('ul');
    list.id = "ulAllSongs";

    for (let i = 0; i < songList.length; i++) {
        const item = document.createElement('li');
        item.className = "liAllSongs";
        item.appendChild(document.createTextNode(songList[i].songName + " - " + songList[i].artist))
        list.appendChild(item)
    }
    return list
}

listContainer.appendChild(createSongList());

listContainer.onclick = (e) => {
    console.log(e);
    const clickedItem = e.target;
    audio.src = '/music/' + clickedItem.innerText + '.mp3';
    songTitle.innerText = clickedItem.innerText;
    // console.log('/music/' + clickedItem.innerText + '.mp3');
    songIndex = songList
    playImage.src = "icons/pause.png";

    audio.play();
}

////// Play song

function playSong() {
    if(isPlaying){
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
    audio.src = `music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`;
    isPlaying = true;
    playSong();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0 ) { songIndex = songList.length - 1 };
    audio.src = `music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`
    isPlaying = true;
    playSong();
}

nextBtn.addEventListener('click',function(){
    nextSong()
    // audio.play()
    playImage.src = "icons/pause.png";
})

prevBtn.addEventListener('click',function(){
    previousSong()
    // audio.play()
    playImage.src = "icons/pause.png";
})

///// Update progress value

function updateProgressValue() {
    range.max = audio.duration;
    range.value = audio.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue ever 500 ms
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio

range.addEventListener('change', function(){
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

shuffleBtn.addEventListener('click', function(){

    arrayShuffle(songList);
    audio.src = `music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`;
    // audio.play()
    playImage.src = "icons/play.png";
})

//// Filter search list

const filter = () => {
    const liAllSongs = document.getElementsByClassName("liAllSongs")
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





///// Idle mode

// let inactivityTime = function () {
//     let time;
//     window.onload = resetTimer;
//     // DOM Events
//     document.onmousemove = resetTimer;
//     document.onkeypress = resetTimer;
//     document.onclick = resetTimer;

//     function logout() {
//         alert("You are now logged out.")
//         //location.href = 'logout.html'
//     }

//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(logout, 5000)
//         // 1000 milliseconds = 1 second
//     }
// };

////////

window.onload = function() {
    audio.src = `/music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`
    // inactivityTime();
}