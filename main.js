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
let isPlaying = false;

window.onload = playSong;

function playSong(){
    // audio.src = "music.mp3";
    console.log(audio)
    
    
    playBtn.addEventListener('click',function(){
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
    anything = new song("anything", "Anything", "Jay Z", "anything"),
    shutup = new song("shutup", "Shut Up", "Stormzy", "shutup"),
    energy = new song("energy", "Energy", "Drake", "energy"),
    goCrazy = new song("goCrazy", "Go Crazy", "Chris Brown", "goCrazy"),
    lifeIsGood = new song("lifeIsGood", "Life is Good", "Future", "lifeIsGood"),
    ownIt = new song("ownIt", "Own it", "Stormzy", "ownIt"),
    heat = new song("heat", "Heat", "Chris Brown", "heat"),
    hello = new song("hello", "Hello", "Adele", "hello"),
    loyal = new song("loyal", "Loyal", "Chris Brown", "loyal"),
    memories = new song("memories", "Memories", "Maroon 5", "memories"),
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
    // console.log(e);
    const clickedItem = e.target;
    
    audio.src = '/music/' + clickedItem.innerText + '.mp3';
    songTitle.innerText = clickedItem.innerText;
    console.log('/music/' + clickedItem.innerText + '.mp3');
    
}