const fs = require('fs')
const playlist = fs.readFileSync('./testKV/playlist.txt', 'utf-8')
const testPlaylist = fs.readFileSync('./testKV/testPlaylist.txt', 'utf-8')
const testPlaylistComments = fs.readFileSync('./testKV/testPlaylistComment.txt', 'utf-8')
const testJSON = JSON.parse(fs.readFileSync('./testKV/testPlaylist.json', 'utf-8'))

const {KV} = require('./src/lib');

const Titanfall2Playlist = 'https://r2-pc.s3.amazonaws.com/playlists_v2.txt';

// Test Files and Functions
// const kvEncode = encodeRSON(data);
// console.log(kvEncode);

// const kvParse = KV.parse(playlist);
// fs.writeFileSync('./testKV/testRsonExport.json', JSON.stringify(kvParse, true, 2));

// const kvParse2 = parseRSON(testPlaylist);
// console.log(JSON.stringify(kvParse2, true, 2));

// const kvComments = extractComments(playlist);
// console.log(kvComments);

describe('KV', () => {
    test('Parse the test playlist and compare it to test JSON', () => {
        const kvPlaylist = KV.parse(testPlaylist);
        expect(kvPlaylist).toEqual(testJSON);
    });
});