# dbc-node-opensuggest

[![David](https://img.shields.io/david/DBCDK/dbc-node-popsuggest.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-popsuggest#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-popsuggest.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-popsuggest#info=devDependencies)

Client for the DBC suggestion service

Implements the suggest method that based on query parameters gives suggestions
for continued search.

##How to use:
```javascript
import * as PopSuggest from 'dbc-node-popsuggest';
       

// Initialize service with required paramters. Returns methods on client
const popSuggest = PopSuggest.init({
  endpoint: 'http://xp-p02.dbc.dk',
  port: 8016
});

// make a query. This returns a promise.
popSuggest.getPopSuggestions({index: 'display.title', query: 'Rowl', fields: ['display.title']})
.then((result) => {
  console.log(result)
});
};
```

##Methods:

### entitySuggest.getPopSuggestions({query, index, fields, start, row, filter})

* **query:** The solr query to execute **[REQUIRED]**
* **index:** The solr index to search
* **fields:** The fields to return from search hits. Each wanted field can be specified in separate fields arguments, or as a comma-seperated list
* **start:** pagination - pagenumber
* **row:** pagination - number of rows per page _(Defaults to 100)_
* **filter:** The solr filters to apply to suggest search. Each wanted field can be specified in separate fields arguments, or as a comma-seperated list. The format is field:value for example filter="phrase.type:bog"
