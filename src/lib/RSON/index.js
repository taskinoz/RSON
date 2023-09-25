function parseFile(fileContent) {
    const sections = fileContent.split(/\n\n+/);
    const parsedData = [];

    sections.forEach(section => {
        const conditionMatch = section.match(/When: "(.*?)"/);
        if (conditionMatch) {
            const condition = conditionMatch[1];
            const scripts = Array.from(section.matchAll(/\t(.*\.gnut|.*\.nut)/g)).map(match => match[1]);
            parsedData.push({
                condition: condition,
                scripts: scripts
            });
        }
    });

    return parsedData;
}

function encodeToFile(parsedData) {
    return parsedData.map(section => {
        const condition = section.condition;
        const scripts = section.scripts.map(script => `\t${script}`).join('\n');
        return `When: "${condition}"\nScripts:\n${scripts}`;
    }).join('\n\n');
}

// Example usage:
const fileContent = `
... [your file content here] ...
`;

const parsedData = parseFile(fileContent);
console.log(parsedData);

const encodedContent = encodeToFile(parsedData);
console.log(encodedContent);


// module.exports = {
//     encode,
//     parse,
//     strip,
//     comments,
// };