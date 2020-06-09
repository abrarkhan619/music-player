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

// let myArray = ['Dan', 'Stuart', 'Ben'];
  
module.exports = songList;