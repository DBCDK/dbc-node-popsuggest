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

Endpoint is expected to be set through a configuration object at initialization,
but can be overwritten by setting the ```POPSUGGEST_ENDPOINT``` environment variable. 
