const DEFAULT_LINE_ENDING = '\r\n';

function splitLines(text) {
    return String(text).split(/\r\n|\n|\r/);
}

function encode(obj, indent = '') {
    let rson = '';

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            rson += `${indent}${key}${DEFAULT_LINE_ENDING}${indent}{${DEFAULT_LINE_ENDING}`;
            rson += encode(value, indent + '\t');
            rson += `${indent}}${DEFAULT_LINE_ENDING}`;
        } else {
            rson += `${indent}${key} ${value}${DEFAULT_LINE_ENDING}`;
        }
    }

    return rson;
}

function parse(text) {
    const noComments = strip(text);
    const lines = splitLines(noComments);
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

function strip(text) {
    return splitLines(text).map(line => {
        let inQuotes = false;
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] === '"') inQuotes = !inQuotes;
            if (!inQuotes && line[i] === '/' && line[i + 1] === '/') {
                return line.substring(0, i).trim();
            }
        }
        return line;
    }).filter(line => line.trim() !== '').join(DEFAULT_LINE_ENDING);
}

function comments(text) {
    return splitLines(text).reduce((acc, line) => {
        let inQuotes = false;
        for (let i = 0; i < line.length - 1; i++) {
            if (line[i] === '"') inQuotes = !inQuotes;
            if (!inQuotes && line[i] === '/' && line[i + 1] === '/') {
                acc.push(line.substring(i + 2).trim());
                break;
            }
        }
        return acc;
    }, []);
}

module.exports = {
    encode,
    parse,
    strip,
    comments,
};
