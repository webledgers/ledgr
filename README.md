<div align="center">
  <h1>ledgr</h1>
</div>

<div align="center">  
Generate nostr keys from command line
</div>

---

<div align="center">
<h4>Getting Started</h4>
</div>
  
---
  

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/ledgr)](https://npmjs.com/package/ledgr)
[![npm](https://img.shields.io/npm/dw/ledgr.svg)](https://npmjs.com/package/ledgr)
[![Github Stars](https://img.shields.io/github/stars/webledger/ledgr.svg)](https://github.com/webledger/ledgr/)


## spec

### data

ledgr is kept in a single JSON file
```json
{
   "pubkey1": 1,
   "pubkey2": 2,
   "pubkey3": 3
}
```

### functions

- **deposit**: deposits satoshis to a public key
- **withdraw**: withdraws satoshis to a public key
- **transfer**: transfers satoshis from one key to another
