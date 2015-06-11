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
    PopSuggest.getSuggestions([{index:'', fields:['']}])
  });
});
