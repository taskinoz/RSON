# RSON
![Tests](https://github.com/taskinoz/RSON/actions/workflows/tests.yml/badge.svg)
A Javascript RSON parser and encode

## Install
```bash
npm install rspn-rson
```

## Usage

### RSON
```js
const { RSON } = require('rspn-rson');

const rsonText = `
{
	script_const:	ET_PREORDER
  	pc:				TITANFALL2_PREORDER_CONTENT
  	ps4:			PREORDER01000000
  	xb1:			Titanfall2.PreOrder
    pc_offer: ""
    xb1_offer: "b7b57115-08eb-4332-98dc-bca86566cdc8"
}

{
  script_const: ET_DELUXE_EDITION
    pc:       TITANFALL2_DELUXE_CONTENT
    ps4:      DELUXEED01000000
    xb1:      Titanfall2.Deluxe.Edition
    pc_offer: ""
    xb1_offer: "6326a33b-1e5a-42c0-8597-8ede1b2bb2a4"
}

{
  script_const: ET_ULTIMATE_EDITION
    pc:       TITANFALL2_ULTIMATE_CONTENT
    ps4:      ULTIMA0000000000
    xb1:      Titanfall2.Ultimate.Edition
    pc_offer: "Origin.OFR.50.0002304"
    xb1_offer: "8d88ac7f-af53-4df2-a846-7f1181b2c91c"
}
`;

const parsed = RSON.parse(rsonText);
console.log(parsed);
```

```js
const testObj = {
  script_const: 'ET_PREORDER',
  pc: 'TITANFALL2_PREORDER_CONTENT',
  ps4: 'PREORDER01000000',
  xb1: 'Titanfall2.PreOrder',
  pc_offer: '',
  xb1_offer: 'b7b57115-08eb-4332-98dc-bca86566cdc8'
};

const encoded = RSON.encode(testObj);
console.log(encoded);
```

### KV
```js
const { KV } = require('rspn-rson');

const kvText = `
playlists
{
        version stable
        versionNum 3284
        Gamemodes
        {
                defaults
                {
                        vars
                        {
                                pve_menu 0
                                enable_emotes 0
                                boost_store_mode off
                        }
                }
                test
                {}
        }
}
`;

const parsed = KV.parse(kvText);
console.log(parsed);
```

```js
const testObj = {
  playlists: {
    version: 'stable',
    versionNum: 3284,
    Gamemodes: {
      defaults: {
        vars: {
          pve_menu: 0,
          enable_emotes: 0,
          boost_store_mode: 'off'
        }
      },
      test: {}
    }
  }
};

const encoded = KV.encode(testObj);
console.log(encoded);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)


