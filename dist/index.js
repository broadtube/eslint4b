'use strict';

var index = require('./index-f2d14b8f.js');

var coreRules = require('./core-rules.js');

class Linter extends index.linter_1 {
  constructor() {
    super();
    this.defineRules(coreRules);
  }

}

module.exports = Linter;
//# sourceMappingURL=index.js.map