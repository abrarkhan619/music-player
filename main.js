let playBtn = document.getElementById("play");
let prevBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let range = document.querySelector("#range");
let playImage = document.getElementById("playImage")
let audio = document.getElementById("audio")
const listContainer = document.getElementById("listContainer")
const songTitle = document.getElementById("songTitle")
let totalTime = 0;
let currentTime = 0;
let songIndex = 0;
let isPlaying = false;

window.onload = playSong;

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

const createSongList = () => {
    const list = document.createElement('ul')

    for (let i = 0; i < songList.length; i++) {
        const item = document.createElement('li');
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
    audio.play();
}

function playSong(){
    audio.src = `/music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`
    
    playBtn.addEventListener('click',function(){
        console.log("clicked");
        
        if(!isPlaying){
            audio.play();
            isPlaying = true;
            totalTime = audio.duration;
            range.max = totalTime;
            playImage.src = "icons/pause.png";
        }else{
            audio.pause();
            isPlaying = false;
            playImage.src = "icons/play.png";
        }
       audio.addEventListener('ended',function(){
            audio.currentTime = 0
            audio.pause();
            isPlaying = false;
            range.value = 0;
            playImage.src = "icons/play.png";
        })
        audio.addEventListener('timeupdate',function(){
            range.value = audio.currentTime;
        })
        range.addEventListener('change',function(){
            audio.currentTime = range.value;
        })
       
    })
}

function nextSong() {
    songIndex++;
    if (songIndex > songList.length - 1) { songIndex = 0 };
    audio.src = `music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`
}

function previousSong() {
    songIndex--;
    if (songIndex < 0 ) { songIndex = songList.length - 1 };
    audio.src = `music/${songList[songIndex].songName} - ${songList[songIndex].artist}.mp3`;
    songTitle.innerText = `${songList[songIndex].songName} - ${songList[songIndex].artist}`
}

nextBtn.addEventListener('click',function(){
    nextSong()
    audio.play()
    playImage.src = "icons/pause.png";
})

prevBtn.addEventListener('click',function(){
    previousSong()
    audio.play()
    playImage.src = "icons/pause.png";
})

/// Shuffle songs
