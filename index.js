const fs = require('fs')
const playlist = fs.readFileSync('./testKV/playlist.txt', 'utf-8')
const testRSON = fs.readFileSync('./testKV/testPlaylist.txt', 'utf-8')
const testRSONComment = fs.readFileSync('./testKV/testPlaylistComment.txt', 'utf-8')

const {RSON, KV} = require('./src/lib');

const Titanfall2Playlist = 'https://r2-pc.s3.amazonaws.com/playlists_v2.txt';

const kvEncode = encodeRSON(data);
console.log(kvEncode);

const kvParse = KV.parse(playlist);
fs.writeFileSync('./testKV/testRsonExport.json', JSON.stringify(kvParse, true, 2));

const kvParse2 = parseRSON(testRSON);
console.log(JSON.stringify(kvParse2, true, 2));

const kvComments = extractComments(playlist);
console.log(kvComments);