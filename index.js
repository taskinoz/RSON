const fs = require('fs')
const playlist = fs.readFileSync('./testfiles/playlist.txt', 'utf-8')
const testRSON = fs.readFileSync('./testfiles/testRson.txt', 'utf-8')
const testRSONComment = fs.readFileSync('./testfiles/testRsonComment.txt', 'utf-8')

const Titanfall2Playlist = 'https://r2-pc.s3.amazonaws.com/playlists_v2.txt';

function encodeRSON(obj, indent = '') {
    let rson = '';

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            rson += `${indent}${key}\n${indent}{\n`;
            rson += encodeRSON(value, indent + '\t');
            rson += `${indent}}\n`;
        } else {
            rson += `${indent}${key} ${value}\n`;
        }
    }

    return rson;
}

function parseRSON(text) {
    const lines = text.split('\n');
    const stack = [];
    let currentObject = {};
    const root = currentObject;

    lines.forEach(line => {
        const trimmedLine = line.trim();

        if (trimmedLine.endsWith('{')) {
            const key = trimmedLine.slice(0, -1).trim();
            const newObject = {};
            if (key) {
                currentObject[key] = newObject;
            } else {
                const lastKey = Object.keys(currentObject).pop();
                currentObject[lastKey] = newObject;
            }
            stack.push(currentObject);
            currentObject = newObject;
        } else if (trimmedLine === '}') {
            currentObject = stack.pop();
        } else if (trimmedLine) {
            const [key, value = ''] = trimmedLine.split(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(str => str.trim());
            currentObject[key] = isNaN(value) ? value.replace(/['"]+/g, '') : parseInt(value);
        }
    });

    return root;
}

const data = {
    playlists: {
        version: 'stable',
        versionNum: 3284,
        Gamemodes: {
            defaults: {
                vars: {
                    pve_menu: 0,
                    enable_emotes: 0,
                    boost_store_mode: 'off',
                }
            }
        }
    }
};

// const rsonText = encodeRSON(data);
// console.log(rsonText);

const rsonObj = parseRSON(testRSON);
console.log(JSON.stringify(rsonObj));

