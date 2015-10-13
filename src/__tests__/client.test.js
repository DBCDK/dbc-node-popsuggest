'use strict';

import * as PopSuggest from '../client.js';
import {assert, expect} from 'chai';

describe('Test methods in client.js', () => {
  /* eslint-disable */
  it('Test init method', () => {
    expect(PopSuggest.init).is.not.null;

    const init = PopSuggest.init;
    assert.isFunction(init, 'init is a function');

    expect(init).to.throw('Expected config object but got null or no endpoint provided');

    let config = {};
    expect(() => init(config)).to.throw('Expected config object but got null or no endpoint provided');

    config = {endpoint: 'test'};
    expect(() => init(config)).to.not.throw(Error);

    assert.property(init(config), 'getPopSuggestions');
    assert.property(init(config), 'getEntitySuggestions');
  });

  it('Test getPopSuggestions Method on good URL', () => {
    let methods = PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://xp-p02.dbc.dk',
      popsuggestPort: 8016
    });

    const Promise = PopSuggest.getPopSuggestions({index: 'display.title', query: 'Rowl', fields: ['display.title']});
    return Promise.then((data) => {
      assert.isObject(data, 'got object');
    });
  });

  it('Test getPopSuggestions Method on bad URL', () => {
    PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://xp-p01.dbc.dk',
      popsuggestPort: 8017
    });

    const Promise = PopSuggest.getPopSuggestions({index: 'display.title', query: 'Rowl', fields: ['display.title']});

    return Promise.then((data) => {
    }).catch((err) => {
      assert.isObject(err, 'got error object');

      assert.isDefined(err.type, 'Type is defined');
      assert.strictEqual(err.type, 'Error', 'Type equals Error');

      assert.isDefined(err.statusCode, 'statusCode is defined');
      assert.strictEqual(err.statusCode, 404, 'statusCode is 404');

      assert.isDefined(err.response, 'response is defined');
      assert.isObject(err.response, 'response is of type object');
    });
  });
  /* eslint-enable */
});
