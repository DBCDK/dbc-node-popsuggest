# dbc-node-opensuggest

[![David](https://img.shields.io/david/DBCDK/dbc-node-opensuggest.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-opensuggest#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-opensuggest.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-opensuggest#info=devDependencies)

Client for the DBC suggestion service

Implements the suggest method that based on query parameters gives suggestions
for continued search.

Example parameters:
```javascript
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
but can be overwritten by setting the `POPSUGGEST_ENDPOINT` environment variable. 
