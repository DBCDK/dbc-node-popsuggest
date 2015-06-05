# dbc-node-opensuggest
Client for the DBC suggestion service

Implements the suggest method that based on query parameters gives suggestions
for continued search.

Example parameters:
```
path: {
  method: 'suggest'
},
  parameters: {
      index: query.index,
      fields: query.fields.toString()
  }
};```

Returns a Promise object
