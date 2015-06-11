'use strict';

import * as PopSuggest from '../client.js';
import {assert, expect} from 'chai';

describe('Test methods in client.js', () => {

  it('Test init method', () => {
    expect(PopSuggest.init).is.not.null;

    const init = PopSuggest.init;
    assert.isFunction(init, 'init is a function');

    expect(init).to.throw('Expected config object but got null or no endpoint provided');

    let config = {};
    expect(() => init(config)).to.throw('Expected config object but got null or no endpoint provided');

    config = {endpoint: 'test'};
    expect(() => init(config)).to.not.throw(Error);
  });

  it('Test getSuggestions Method', () => {
    assert.isNotNull(PopSuggest.getSuggestions());
    assert.isArray(PopSuggest.getSuggestions(), 'Got array');
    assert.lengthOf(PopSuggest.getSuggestions(), 0, 'Array is empty');

    PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://devel7:8888/'
    });

    let Promise = PopSuggest.getSuggestions([{index: 'term.creator', query: 'Rowl', fields: ['term.creator']}]);

    assert.isArray(Promise, 'Got array');
    return Promise[0].then((data) => {
      assert.isObject(data, 'got object');
    });
  });

  it('Test bad URL', () => {
    PopSuggest.init({
      name: 'popsuggest',
      endpoint: 'http://devel7:8888/nonexistingurl/'
    });

    Promise = PopSuggest.getSuggestions([{index: 'term.creator', query: 'Rowl', fields: ['term.creator']}]);

    assert.isArray(Promise, 'Got array');
    return Promise[0].then((data) => {
    }).catch((err) => {
      assert.isObject(err, 'got error object');

      assert.isDefined(err.type, 'Type is defined');
      assert.strictEqual(err.type, 'Error', 'Type equals Error');

      assert.isDefined(err.statusCode, 'statusCode is defined');
      assert.strictEqual(err.statusCode, 404, 'statusCode is 404');

      assert.isDefined(err.statusMessage, 'statusMessage is defined');
      assert.strictEqual(err.statusMessage, 'Not Found', 'statusMessage is "Nor Found"');

      assert.isDefined(err.response, 'response is defined');
      assert.isObject(err.response, 'response is of type object');
    });
  });
});
