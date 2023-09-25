function parse(text) {
    // Remove JavaScript-style comments
    const cleanText = text.replace(/\/\/.*$/gm, '').trim();

    const objectStrings = cleanText.split(/\}\s*\{/);
    const parsedObjects = objectStrings.map((objectStr, index) => {
        // Add double quotes around keys
        let jsonObject = objectStr.replace(/(\w+)\s*:/g, '"$1":');

        // Wrap string literals in double quotes, accounting for multiple dots
        jsonObject = jsonObject.replace(/:(\s*)(\w+(\.\w+)+)/g, ': "$2"');

        // Wrap any other non-quoted value in double quotes
        jsonObject = jsonObject.replace(/:(\s*)([^"\{\}\[\],\s]+)/g, (match, p1, p2) => {
            // Check if p2 is a number
            if (/^\d+$/.test(p2)) {
                return `:${p2}`;  // return as is for numbers
            } else {
                return `: "${p2}"`;  // wrap in quotes for other literals
            }
        });

        // Insert commas between properties within each object
        jsonObject = jsonObject.replace(/\"\s+\"/g, '", "');

        // Ensure each object is wrapped in curly braces
        if (!jsonObject.startsWith('{')) {
            jsonObject = '{' + jsonObject;
        }
        if (!jsonObject.endsWith('}')) {
            jsonObject += '}';
        }

        console.log(jsonObject);

        // Parse the processed JSON string
        return JSON.parse(jsonObject);
    });

    return parsedObjects;
}



function encode(obj) {
    // Pull the opbjects from the array and convert them to strings
    const strings = obj.map(o => JSON.stringify(o, null, '\t'));
    // Join the strings together with newlines between them
    const text = strings.join('\n');
    // Remove the quotes around the keys but not the values
    return text.replace(/"(\w+)":/g, '$1:') + '\n';
}

function strip(text) {
    return text.replace(/\/\/.*$/gm, '').trim();
}

function comments(text) {
    const comments = [];
    const regex = /\/\/(.*$)/gm;
    let match;

    while ((match = regex.exec(text)) !== null) {
        comments.push(match[1].trim());
    }

    return comments;
}

module.exports = {
    encode,
    parse,
    strip,
    comments,
};