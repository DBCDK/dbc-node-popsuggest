'use strict';

import * as Client from '../client.js';
import {assert, expect} from 'chai';

describe('Test methods in client.js', () => {

  it('Test init method', () => {
    expect(Client.init).is.not.null;

    const init = Client.init;
    assert.isFunction(init, 'init is a function');

    expect(init).to.throw('Expected config object but got null or no endpoint provided');

    let config = {};
    expect(() => init(config)).to.throw('Expected config object but got null or no endpoint provided');

    config = {endpoint: 'test'};
    expect(() => init(config)).to.not.throw(Error);
  });

  it('Test getSuggestions Method', () => {
    assert.isNotNull(Client.getSuggestions());
    assert.isArray(Client.getSuggestions(), 'Got array');
    assert.lengthOf(Client.getSuggestions(), 0, 'Array is empty');
  });
});
