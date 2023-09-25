const {RSON} = require('./src/lib');
const fs = require('fs');

// Files
const rsonParse = fs.readFileSync('./testRSON/banks.rson', 'utf8');
const rsonEncode = fs.readFileSync('./testRSON/banksEncode.rson', 'utf8');
const rsonJSON = fs.readFileSync('./testRSON/banksEncode.json', 'utf8');
const rsonEntitlements = fs.readFileSync('./testRSON/entitlements.rson', 'utf8');
const rsonEntitlementsEncode = fs.readFileSync('./testRSON/entitlementsEncode.rson', 'utf8');
const rsonEntitlementsJSON = fs.readFileSync('./testRSON/entitlementsEncode.json', 'utf8');
const rsonEnvironments = fs.readFileSync('./testRSON/environments.rson', 'utf8');
const rsonMpMap = fs.readFileSync('./testRSON/mp_complex3.rson', 'utf8');
const rsonSpMap = fs.readFileSync('./testRSON/sp_crashsite.rson', 'utf8');

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
    test('Parse the RSON file and compare it to the RSON', () => {
        const rson = RSON.parse(rsonEncode);
        expect(rson).toEqual(JSON.parse(rsonJSON));
    });
    test('Encode the RSON file and compare it to the JSON', () => {
        const rson = RSON.encode(JSON.parse(rsonJSON));
        const rsonObj = JSON.parse(rsonJSON);
        expect(rson).toEqual(rsonEncode);
    });
    test('Parse the RSON file and compare it to the JSON', () => {
        const rson = RSON.parse(rsonEntitlements);
        const rsonObj = JSON.parse(rsonEntitlementsJSON);
        expect(rson).toEqual(rsonObj);
    });
    test('Encode the RSON file and compare it to the RSON', () => {
        const rson = RSON.encode(JSON.parse(rsonEntitlementsJSON));
        expect(rson).toEqual(rsonEntitlementsEncode); // Fails
    });
});