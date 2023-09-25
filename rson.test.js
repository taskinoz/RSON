const {RSON} = require('./src/lib');
const fs = require('fs');
const rsonParse = fs.readFileSync('./testRSON/banks.rson', 'utf8');
const rsonEncode = fs.readFileSync('./testRSON/banksEncode.rson', 'utf8');
const rsonJSON = fs.readFileSync('./testRSON/banksEncode.json', 'utf8');

const x = fs.readFileSync('./testRSON/entitlementsEncode.rson', 'utf8')
fs.writeFileSync('./testRSON/entitlementsEncode.json', JSON.stringify(RSON.parse(x), null, '\t'))

describe('RSON', () => {
    test('Parse the RSON file and compare it to the JSON', () => {
        const rson = RSON.parse(rsonParse);
        const rsonObj = JSON.parse(rsonJSON);
        expect(rson).toEqual(rsonObj);
    });
    test('Encode the RSON file and compare it to the RSON', () => {
        const rson = RSON.encode(JSON.parse(rsonJSON));
        expect(rson).toEqual(rsonEncode);
    });
});