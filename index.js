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
                // If there's no key before an opening brace, 
                // we should merge the new object into the last key-value pair in the current object.
                const lastKey = Object.keys(currentObject).pop();
                currentObject[lastKey] = newObject;
            }

            stack.push(currentObject);
            currentObject = newObject;
        } else if (trimmedLine === '}') {
            currentObject = stack.pop();
        } else if (trimmedLine && !trimmedLine.endsWith('}')) {
            const [key, value = '{}'] = trimmedLine.split(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(str => str.trim());
            currentObject[key] = isNaN(value) ? (value === '{}' ? {} : value.replace(/['"]+/g, '')) : parseInt(value);
        }
    });

    return root;
}

function stripComments(text) {
    return text.split('\n').map(line => {
        const commentIndex = line.indexOf('//');
        if (commentIndex !== -1) {
            return line.substring(0, commentIndex).trim();
        }
        return line;
    }).filter(line => line.trim() !== '').join('\n');
}

function extractComments(text) {
    return text.split('\n').reduce((acc, line) => {
        const commentIndex = line.indexOf('//');
        if (commentIndex !== -1) {
            acc.push(line.substring(commentIndex + 2).trim());
        }
        return acc;
    }, []);
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

// const rsonObj = parseRSON(playlist);
// console.log(JSON.stringify(rsonObj));

// fs.writeFileSync('./testfiles/testRsonExport.txt', JSON.stringify(rsonObj, true, 2));

// const rsonObj = parseRSON(testRSON);
// console.log(JSON.stringify(rsonObj, true, 2));

const comments = extractComments(playlist);
console.log(comments);