# Ledgr Data Model Documentation

## Overview

The Ledgr data model has been redesigned to use Decentralized Identifiers (DIDs) with a structured JSON format that provides better extensibility and standardization for nostr-based ledger systems.

## Data Structure

### Root Object

The ledger data is stored as a JSON object with the following top-level structure:

```json
{
  "entries": [
    // Array of Entry objects
  ]
}
```

### Entry Object

Each entry in the ledger represents a balance record for a specific DID:

```json
{
  "type": "Entry",
  "url": "did:nostr:<pubkey>",
  "amount": "100000"
}
```

#### Fields

| Field    | Type   | Description                | Required | Format               |
| -------- | ------ | -------------------------- | -------- | -------------------- |
| `type`   | String | Record type identifier     | Yes      | Always "Entry"       |
| `url`    | String | DID identifier             | Yes      | `did:nostr:<pubkey>` |
| `amount` | String | Balance amount in satoshis | Yes      | Numeric string       |

## DID Format Specification

### Structure

The DID format used in Ledgr follows this pattern:

```
did:nostr:<pubkey>
```

Where:

- `did:` - DID scheme prefix
- `nostr:` - Method name indicating this is a Nostr-based identifier
- `<pubkey>` - The actual public key (can be npub format or hex)

### Examples

```
did:nostr:npub1example1234567890abcdef
did:nostr:02a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345
```

## Complete Example

Here's a complete example of a ledger file with multiple entries:

```json
{
  "entries": [
    {
      "type": "Entry",
      "url": "did:nostr:npub1alice123456789",
      "amount": "100000"
    },
    {
      "type": "Entry",
      "url": "did:nostr:npub1bob987654321",
      "amount": "250000"
    },
    {
      "type": "Entry",
      "url": "did:nostr:npub1charlie111222333",
      "amount": "75000"
    }
  ]
}
```

## Data Model Benefits

### 1. Extensibility

The structured format allows for easy addition of new fields to entries without breaking existing functionality.

### 2. Standardization

Using DIDs provides a standardized way to identify entities across different systems and protocols.

### 3. Type Safety

The explicit `type` field allows for future extension with different entry types while maintaining backward compatibility.

### 4. String-based Amounts

Storing amounts as strings prevents floating-point precision issues and supports arbitrary precision arithmetic.

## Migration from Legacy Format

### Legacy Format (v0.0.12 and earlier)

```json
{
  "npub1alice": 100000,
  "npub1bob": 250000,
  "npub1charlie": 75000
}
```

### New Format (v0.1.0+)

```json
{
  "entries": [
    {
      "type": "Entry",
      "url": "did:nostr:npub1alice",
      "amount": "100000"
    },
    {
      "type": "Entry",
      "url": "did:nostr:npub1bob",
      "amount": "250000"
    },
    {
      "type": "Entry",
      "url": "did:nostr:npub1charlie",
      "amount": "75000"
    }
  ]
}
```

## Validation Rules

### DID Validation

- Must start with `did:nostr:`
- Must contain a valid public key after the prefix
- Case-sensitive

### Amount Validation

- Must be a numeric string
- Must represent a non-negative integer
- No decimal points (satoshi precision)

### Entry Validation

- Must contain all required fields
- `type` must be exactly "Entry"
- `url` must be a valid DID
- `amount` must be a valid amount string

## Implementation Notes

### File Handling

- Default filename: `webledger.json`
- UTF-8 encoding
- Pretty-printed with 2-space indentation
- Automatic backup on modification (implementation-dependent)

### Error Handling

- Invalid DID format results in operation rejection
- Missing entries are treated as zero balance
- Malformed JSON results in empty ledger initialization

### Performance Considerations

- Linear search for entries (suitable for typical ledger sizes)
- Consider indexing for large ledgers (1000+ entries)
- JSON parsing overhead minimal for typical use cases

## Future Extensions

The data model is designed to support future enhancements such as:

- Transaction history entries
- Metadata fields per entry
- Different entry types (e.g., "Transaction", "Metadata")
- Cryptographic signatures
- Multi-currency support

## API Compatibility

The new data model maintains backward compatibility through:

- `balances` getter property that returns the legacy key-value format
- Automatic migration from legacy format on first load
- Consistent method signatures with parameter name changes only
