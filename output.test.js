const songList = require('./output');

test('Number of songs in the list', () => {
    
    expect(songList.length).toBe(10);
});

test('Should contain Anything - Jay Z at index 0', () => {
    
    expect(songList[0].songName).toBe("Anything - Jay Z");
});

test('Should contain Hello - Adele at index 7', () => {
    
    expect(songList[7].songName).toBe("Hello - Adele");
});


