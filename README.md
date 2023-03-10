# ledgr
nostr ledgers

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
