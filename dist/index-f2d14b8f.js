'use strict';

var path = require('path');

var eslintScope = require('eslint-scope');

var eslintVisitorKeys = require('eslint-visitor-keys');

var espree = require('espree');

var lodash = require('lodash');

var environments = require('@eslint/eslintrc/conf/environments');

var _commonjsHelpers = require('./_commonjsHelpers-11cbc178.js');

var configOps = require('@eslint/eslintrc/lib/shared/config-ops');

var configValidator = require('@eslint/eslintrc/lib/shared/config-validator');

var eslintUtils = require('eslint-utils');

var assert = require('assert');

var debug$4 = require('debug');

var levn = require('levn');

var esquery = require('esquery');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var path__default = _interopDefaultLegacy(path);

var eslintScope__default = _interopDefaultLegacy(eslintScope);

var eslintVisitorKeys__default = _interopDefaultLegacy(eslintVisitorKeys);

var espree__default = _interopDefaultLegacy(espree);

var lodash__default = _interopDefaultLegacy(lodash);

var environments__default = _interopDefaultLegacy(environments);

var configOps__default = _interopDefaultLegacy(configOps);

var configValidator__default = _interopDefaultLegacy(configValidator);

var eslintUtils__default = _interopDefaultLegacy(eslintUtils);

var assert__default = _interopDefaultLegacy(assert);

var debug__default = _interopDefaultLegacy(debug$4);

var levn__default = _interopDefaultLegacy(levn);

var esquery__default = _interopDefaultLegacy(esquery);

const name = "eslint";
const version = "7.23.0";
const author = "Nicholas C. Zakas <nicholas+npm@nczconsulting.com>";
const description = "An AST-based pattern checker for JavaScript.";
const bin = {
  eslint: "./bin/eslint.js"
};
const main = "./lib/api.js";
const scripts = {
  test: "node Makefile.js test",
  "test:cli": "mocha",
  lint: "node Makefile.js lint",
  fix: "node Makefile.js lint -- fix",
  fuzz: "node Makefile.js fuzz",
  "generate-release": "node Makefile.js generateRelease",
  "generate-alpharelease": "node Makefile.js generatePrerelease -- alpha",
  "generate-betarelease": "node Makefile.js generatePrerelease -- beta",
  "generate-rcrelease": "node Makefile.js generatePrerelease -- rc",
  "publish-release": "node Makefile.js publishRelease",
  docs: "node Makefile.js docs",
  gensite: "node Makefile.js gensite",
  webpack: "node Makefile.js webpack",
  perf: "node Makefile.js perf"
};
const gitHooks = {
  "pre-commit": "lint-staged"
};
const files = ["LICENSE", "README.md", "bin", "conf", "lib", "messages"];
const repository = "eslint/eslint";
const funding = "https://opencollective.com/eslint";
const homepage = "https://eslint.org";
const bugs = "https://github.com/eslint/eslint/issues/";
const dependencies = {
  "@babel/code-frame": "7.12.11",
  "@eslint/eslintrc": "^0.4.0",
  ajv: "^6.10.0",
  chalk: "^4.0.0",
  "cross-spawn": "^7.0.2",
  debug: "^4.0.1",
  doctrine: "^3.0.0",
  enquirer: "^2.3.5",
  "eslint-scope": "^5.1.1",
  "eslint-utils": "^2.1.0",
  "eslint-visitor-keys": "^2.0.0",
  espree: "^7.3.1",
  esquery: "^1.4.0",
  esutils: "^2.0.2",
  "file-entry-cache": "^6.0.1",
  "functional-red-black-tree": "^1.0.1",
  "glob-parent": "^5.0.0",
  globals: "^13.6.0",
  ignore: "^4.0.6",
  "import-fresh": "^3.0.0",
  imurmurhash: "^0.1.4",
  "is-glob": "^4.0.0",
  "js-yaml": "^3.13.1",
  "json-stable-stringify-without-jsonify": "^1.0.1",
  levn: "^0.4.1",
  lodash: "^4.17.21",
  minimatch: "^3.0.4",
  "natural-compare": "^1.4.0",
  optionator: "^0.9.1",
  progress: "^2.0.0",
  regexpp: "^3.1.0",
  semver: "^7.2.1",
  "strip-ansi": "^6.0.0",
  "strip-json-comments": "^3.1.0",
  table: "^6.0.4",
  "text-table": "^0.2.0",
  "v8-compile-cache": "^2.0.3"
};
const devDependencies = {
  "@babel/core": "^7.4.3",
  "@babel/preset-env": "^7.4.3",
  acorn: "^7.2.0",
  "babel-loader": "^8.0.5",
  chai: "^4.0.1",
  cheerio: "^0.22.0",
  "common-tags": "^1.8.0",
  "core-js": "^3.1.3",
  dateformat: "^3.0.3",
  ejs: "^3.0.2",
  "escape-string-regexp": "^3.0.0",
  eslint: "file:.",
  "eslint-config-eslint": "file:packages/eslint-config-eslint",
  "eslint-plugin-eslint-plugin": "^2.2.1",
  "eslint-plugin-internal-rules": "file:tools/internal-rules",
  "eslint-plugin-jsdoc": "^25.4.3",
  "eslint-plugin-node": "^11.1.0",
  "eslint-release": "^2.0.0",
  eslump: "^2.0.0",
  esprima: "^4.0.1",
  "fs-teardown": "^0.1.0",
  glob: "^7.1.6",
  jsdoc: "^3.5.5",
  karma: "^6.1.1",
  "karma-chrome-launcher": "^3.1.0",
  "karma-mocha": "^2.0.1",
  "karma-mocha-reporter": "^2.2.5",
  "karma-webpack": "^5.0.0",
  "lint-staged": "^10.1.2",
  "load-perf": "^0.2.0",
  markdownlint: "^0.19.0",
  "markdownlint-cli": "^0.22.0",
  memfs: "^3.0.1",
  mocha: "^7.1.1",
  "mocha-junit-reporter": "^1.23.0",
  "node-polyfill-webpack-plugin": "^1.0.3",
  "npm-license": "^0.3.3",
  nyc: "^15.0.1",
  proxyquire: "^2.0.1",
  puppeteer: "^7.1.0",
  recast: "^0.19.0",
  "regenerator-runtime": "^0.13.2",
  shelljs: "^0.8.2",
  sinon: "^9.0.1",
  temp: "^0.9.0",
  webpack: "^5.23.0",
  "webpack-cli": "^4.5.0",
  yorkie: "^2.0.0"
};
const keywords = ["ast", "lint", "javascript", "ecmascript", "espree"];
const license = "MIT";
const engines = {
  node: "^10.12.0 || >=12.0.0"
};
var _package = {
  name: "eslint",
  version: "7.23.0",
  author: "Nicholas C. Zakas <nicholas+npm@nczconsulting.com>",
  description: "An AST-based pattern checker for JavaScript.",
  bin: bin,
  main: "./lib/api.js",
  scripts: scripts,
  gitHooks: gitHooks,
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"],
    "*.md": "markdownlint"
  },
  files: files,
  repository: "eslint/eslint",
  funding: "https://opencollective.com/eslint",
  homepage: "https://eslint.org",
  bugs: "https://github.com/eslint/eslint/issues/",
  dependencies: dependencies,
  devDependencies: devDependencies,
  keywords: keywords,
  license: "MIT",
  engines: engines
};

var _package$1 = Object.freeze({
  __proto__: null,
  name: "eslint",
  version: "7.23.0",
  author: "Nicholas C. Zakas <nicholas+npm@nczconsulting.com>",
  description: "An AST-based pattern checker for JavaScript.",
  bin: bin,
  main: "./lib/api.js",
  scripts: scripts,
  gitHooks: gitHooks,
  files: files,
  repository: "eslint/eslint",
  funding: "https://opencollective.com/eslint",
  homepage: "https://eslint.org",
  bugs: "https://github.com/eslint/eslint/issues/",
  dependencies: dependencies,
  devDependencies: devDependencies,
  keywords: keywords,
  license: "MIT",
  engines: engines,
  'default': _package
});

var cursor = class {
  constructor() {
    this.current = null;
  }

  getOneToken() {
    return this.moveNext() ? this.current : null;
  }

  getAllTokens() {
    const tokens = [];

    while (this.moveNext()) {
      tokens.push(this.current);
    }

    return tokens;
  }

  moveNext() {
    throw new Error("Not implemented.");
  }

};

function getStartLocation(token) {
  return token.range[0];
}

var search = function (tokens, location) {
  return lodash__default['default'].sortedIndexBy(tokens, {
    range: [location]
  }, getStartLocation);
};

var getFirstIndex = function (tokens, indexMap, startLoc) {
  if (startLoc in indexMap) {
    return indexMap[startLoc];
  }

  if (startLoc - 1 in indexMap) {
    const index = indexMap[startLoc - 1];
    const token = index >= 0 && index < tokens.length ? tokens[index] : null;

    if (token && token.range[0] >= startLoc) {
      return index;
    }

    return index + 1;
  }

  return 0;
};

var getLastIndex = function (tokens, indexMap, endLoc) {
  if (endLoc in indexMap) {
    return indexMap[endLoc] - 1;
  }

  if (endLoc - 1 in indexMap) {
    const index = indexMap[endLoc - 1];
    const token = index >= 0 && index < tokens.length ? tokens[index] : null;

    if (token && token.range[1] > endLoc) {
      return index - 1;
    }

    return index;
  }

  return tokens.length - 1;
};

var utils = {
  search: search,
  getFirstIndex: getFirstIndex,
  getLastIndex: getLastIndex
};
var backwardTokenCommentCursor = class extends cursor {
  constructor(tokens, comments, indexMap, startLoc, endLoc) {
    super();
    this.tokens = tokens;
    this.comments = comments;
    this.tokenIndex = utils.getLastIndex(tokens, indexMap, endLoc);
    this.commentIndex = utils.search(comments, endLoc) - 1;
    this.border = startLoc;
  }

  moveNext() {
    const token = this.tokenIndex >= 0 ? this.tokens[this.tokenIndex] : null;
    const comment = this.commentIndex >= 0 ? this.comments[this.commentIndex] : null;

    if (token && (!comment || token.range[1] > comment.range[1])) {
      this.current = token;
      this.tokenIndex -= 1;
    } else if (comment) {
      this.current = comment;
      this.commentIndex -= 1;
    } else {
      this.current = null;
    }

    return Boolean(this.current) && (this.border === -1 || this.current.range[0] >= this.border);
  }

};
var backwardTokenCursor = class extends cursor {
  constructor(tokens, comments, indexMap, startLoc, endLoc) {
    super();
    this.tokens = tokens;
    this.index = utils.getLastIndex(tokens, indexMap, endLoc);
    this.indexEnd = utils.getFirstIndex(tokens, indexMap, startLoc);
  }

  moveNext() {
    if (this.index >= this.indexEnd) {
      this.current = this.tokens[this.index];
      this.index -= 1;
      return true;
    }

    return false;
  }

  getOneToken() {
    return this.index >= this.indexEnd ? this.tokens[this.index] : null;
  }

};
var decorativeCursor = class extends cursor {
  constructor(cursor) {
    super();
    this.cursor = cursor;
  }

  moveNext() {
    const retv = this.cursor.moveNext();
    this.current = this.cursor.current;
    return retv;
  }

};
var filterCursor = class extends decorativeCursor {
  constructor(cursor, predicate) {
    super(cursor);
    this.predicate = predicate;
  }

  moveNext() {
    const predicate = this.predicate;

    while (super.moveNext()) {
      if (predicate(this.current)) {
        return true;
      }
    }

    return false;
  }

};
var forwardTokenCommentCursor = class extends cursor {
  constructor(tokens, comments, indexMap, startLoc, endLoc) {
    super();
    this.tokens = tokens;
    this.comments = comments;
    this.tokenIndex = utils.getFirstIndex(tokens, indexMap, startLoc);
    this.commentIndex = utils.search(comments, startLoc);
    this.border = endLoc;
  }

  moveNext() {
    const token = this.tokenIndex < this.tokens.length ? this.tokens[this.tokenIndex] : null;
    const comment = this.commentIndex < this.comments.length ? this.comments[this.commentIndex] : null;

    if (token && (!comment || token.range[0] < comment.range[0])) {
      this.current = token;
      this.tokenIndex += 1;
    } else if (comment) {
      this.current = comment;
      this.commentIndex += 1;
    } else {
      this.current = null;
    }

    return Boolean(this.current) && (this.border === -1 || this.current.range[1] <= this.border);
  }

};
var forwardTokenCursor = class extends cursor {
  constructor(tokens, comments, indexMap, startLoc, endLoc) {
    super();
    this.tokens = tokens;
    this.index = utils.getFirstIndex(tokens, indexMap, startLoc);
    this.indexEnd = utils.getLastIndex(tokens, indexMap, endLoc);
  }

  moveNext() {
    if (this.index <= this.indexEnd) {
      this.current = this.tokens[this.index];
      this.index += 1;
      return true;
    }

    return false;
  }

  getOneToken() {
    return this.index <= this.indexEnd ? this.tokens[this.index] : null;
  }

  getAllTokens() {
    return this.tokens.slice(this.index, this.indexEnd + 1);
  }

};
var limitCursor = class extends decorativeCursor {
  constructor(cursor, count) {
    super(cursor);
    this.count = count;
  }

  moveNext() {
    if (this.count > 0) {
      this.count -= 1;
      return super.moveNext();
    }

    return false;
  }

};
var skipCursor = class extends decorativeCursor {
  constructor(cursor, count) {
    super(cursor);
    this.count = count;
  }

  moveNext() {
    while (this.count > 0) {
      this.count -= 1;

      if (!super.moveNext()) {
        return false;
      }
    }

    return super.moveNext();
  }

};

class CursorFactory {
  constructor(TokenCursor, TokenCommentCursor) {
    this.TokenCursor = TokenCursor;
    this.TokenCommentCursor = TokenCommentCursor;
  }

  createBaseCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments) {
    const Cursor = includeComments ? this.TokenCommentCursor : this.TokenCursor;
    return new Cursor(tokens, comments, indexMap, startLoc, endLoc);
  }

  createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, skip, count) {
    let cursor = this.createBaseCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments);

    if (filter) {
      cursor = new filterCursor(cursor, filter);
    }

    if (skip >= 1) {
      cursor = new skipCursor(cursor, skip);
    }

    if (count >= 0) {
      cursor = new limitCursor(cursor, count);
    }

    return cursor;
  }

}

var forward = new CursorFactory(forwardTokenCursor, forwardTokenCommentCursor);
var backward = new CursorFactory(backwardTokenCursor, backwardTokenCommentCursor);
var cursors = {
  forward: forward,
  backward: backward
};
var paddedTokenCursor = class extends forwardTokenCursor {
  constructor(tokens, comments, indexMap, startLoc, endLoc, beforeCount, afterCount) {
    super(tokens, comments, indexMap, startLoc, endLoc);
    this.index = Math.max(0, this.index - beforeCount);
    this.indexEnd = Math.min(tokens.length - 1, this.indexEnd + afterCount);
  }

};
const {
  isCommentToken: isCommentToken$1
} = eslintUtils__default['default'];
const TOKENS = Symbol("tokens");
const COMMENTS = Symbol("comments");
const INDEX_MAP = Symbol("indexMap");

function createIndexMap(tokens, comments) {
  const map = Object.create(null);
  let tokenIndex = 0;
  let commentIndex = 0;
  let nextStart = 0;
  let range = null;

  while (tokenIndex < tokens.length || commentIndex < comments.length) {
    nextStart = commentIndex < comments.length ? comments[commentIndex].range[0] : Number.MAX_SAFE_INTEGER;

    while (tokenIndex < tokens.length && (range = tokens[tokenIndex].range)[0] < nextStart) {
      map[range[0]] = tokenIndex;
      map[range[1] - 1] = tokenIndex;
      tokenIndex += 1;
    }

    nextStart = tokenIndex < tokens.length ? tokens[tokenIndex].range[0] : Number.MAX_SAFE_INTEGER;

    while (commentIndex < comments.length && (range = comments[commentIndex].range)[0] < nextStart) {
      map[range[0]] = tokenIndex;
      map[range[1] - 1] = tokenIndex;
      commentIndex += 1;
    }
  }

  return map;
}

function createCursorWithSkip(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
  let includeComments = false;
  let skip = 0;
  let filter = null;

  if (typeof opts === "number") {
    skip = opts | 0;
  } else if (typeof opts === "function") {
    filter = opts;
  } else if (opts) {
    includeComments = !!opts.includeComments;
    skip = opts.skip | 0;
    filter = opts.filter || null;
  }

  assert__default['default'](skip >= 0, "options.skip should be zero or a positive integer.");
  assert__default['default'](!filter || typeof filter === "function", "options.filter should be a function.");
  return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, skip, -1);
}

function createCursorWithCount(factory, tokens, comments, indexMap, startLoc, endLoc, opts) {
  let includeComments = false;
  let count = 0;
  let countExists = false;
  let filter = null;

  if (typeof opts === "number") {
    count = opts | 0;
    countExists = true;
  } else if (typeof opts === "function") {
    filter = opts;
  } else if (opts) {
    includeComments = !!opts.includeComments;
    count = opts.count | 0;
    countExists = typeof opts.count === "number";
    filter = opts.filter || null;
  }

  assert__default['default'](count >= 0, "options.count should be zero or a positive integer.");
  assert__default['default'](!filter || typeof filter === "function", "options.filter should be a function.");
  return factory.createCursor(tokens, comments, indexMap, startLoc, endLoc, includeComments, filter, 0, countExists ? count : -1);
}

function createCursorWithPadding(tokens, comments, indexMap, startLoc, endLoc, beforeCount, afterCount) {
  if (typeof beforeCount === "undefined" && typeof afterCount === "undefined") {
    return new forwardTokenCursor(tokens, comments, indexMap, startLoc, endLoc);
  }

  if (typeof beforeCount === "number" || typeof beforeCount === "undefined") {
    return new paddedTokenCursor(tokens, comments, indexMap, startLoc, endLoc, beforeCount | 0, afterCount | 0);
  }

  return createCursorWithCount(cursors.forward, tokens, comments, indexMap, startLoc, endLoc, beforeCount);
}

function getAdjacentCommentTokensFromCursor(cursor) {
  const tokens = [];
  let currentToken = cursor.getOneToken();

  while (currentToken && isCommentToken$1(currentToken)) {
    tokens.push(currentToken);
    currentToken = cursor.getOneToken();
  }

  return tokens;
}

var tokenStore = class {
  constructor(tokens, comments) {
    this[TOKENS] = tokens;
    this[COMMENTS] = comments;
    this[INDEX_MAP] = createIndexMap(tokens, comments);
  }

  getTokenByRangeStart(offset, options) {
    const includeComments = options && options.includeComments;
    const token = cursors.forward.createBaseCursor(this[TOKENS], this[COMMENTS], this[INDEX_MAP], offset, -1, includeComments).getOneToken();

    if (token && token.range[0] === offset) {
      return token;
    }

    return null;
  }

  getFirstToken(node, options) {
    return createCursorWithSkip(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[0], node.range[1], options).getOneToken();
  }

  getLastToken(node, options) {
    return createCursorWithSkip(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[0], node.range[1], options).getOneToken();
  }

  getTokenBefore(node, options) {
    return createCursorWithSkip(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], -1, node.range[0], options).getOneToken();
  }

  getTokenAfter(node, options) {
    return createCursorWithSkip(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[1], -1, options).getOneToken();
  }

  getFirstTokenBetween(left, right, options) {
    return createCursorWithSkip(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], left.range[1], right.range[0], options).getOneToken();
  }

  getLastTokenBetween(left, right, options) {
    return createCursorWithSkip(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], left.range[1], right.range[0], options).getOneToken();
  }

  getTokenOrCommentBefore(node, skip) {
    return this.getTokenBefore(node, {
      includeComments: true,
      skip
    });
  }

  getTokenOrCommentAfter(node, skip) {
    return this.getTokenAfter(node, {
      includeComments: true,
      skip
    });
  }

  getFirstTokens(node, options) {
    return createCursorWithCount(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[0], node.range[1], options).getAllTokens();
  }

  getLastTokens(node, options) {
    return createCursorWithCount(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[0], node.range[1], options).getAllTokens().reverse();
  }

  getTokensBefore(node, options) {
    return createCursorWithCount(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], -1, node.range[0], options).getAllTokens().reverse();
  }

  getTokensAfter(node, options) {
    return createCursorWithCount(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[1], -1, options).getAllTokens();
  }

  getFirstTokensBetween(left, right, options) {
    return createCursorWithCount(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], left.range[1], right.range[0], options).getAllTokens();
  }

  getLastTokensBetween(left, right, options) {
    return createCursorWithCount(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], left.range[1], right.range[0], options).getAllTokens().reverse();
  }

  getTokens(node, beforeCount, afterCount) {
    return createCursorWithPadding(this[TOKENS], this[COMMENTS], this[INDEX_MAP], node.range[0], node.range[1], beforeCount, afterCount).getAllTokens();
  }

  getTokensBetween(left, right, padding) {
    return createCursorWithPadding(this[TOKENS], this[COMMENTS], this[INDEX_MAP], left.range[1], right.range[0], padding, padding).getAllTokens();
  }

  commentsExistBetween(left, right) {
    const index = utils.search(this[COMMENTS], left.range[1]);
    return index < this[COMMENTS].length && this[COMMENTS][index].range[1] <= right.range[0];
  }

  getCommentsBefore(nodeOrToken) {
    const cursor = createCursorWithCount(cursors.backward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], -1, nodeOrToken.range[0], {
      includeComments: true
    });
    return getAdjacentCommentTokensFromCursor(cursor).reverse();
  }

  getCommentsAfter(nodeOrToken) {
    const cursor = createCursorWithCount(cursors.forward, this[TOKENS], this[COMMENTS], this[INDEX_MAP], nodeOrToken.range[1], -1, {
      includeComments: true
    });
    return getAdjacentCommentTokensFromCursor(cursor);
  }

  getCommentsInside(node) {
    return this.getTokens(node, {
      includeComments: true,
      filter: isCommentToken$1
    });
  }

};
const {
  isCommentToken
} = eslintUtils__default['default'];

function validate(ast) {
  if (!ast.tokens) {
    throw new Error("AST is missing the tokens array.");
  }

  if (!ast.comments) {
    throw new Error("AST is missing the comments array.");
  }

  if (!ast.loc) {
    throw new Error("AST is missing location information.");
  }

  if (!ast.range) {
    throw new Error("AST is missing range information");
  }
}

function looksLikeExport(astNode) {
  return astNode.type === "ExportDefaultDeclaration" || astNode.type === "ExportNamedDeclaration" || astNode.type === "ExportAllDeclaration" || astNode.type === "ExportSpecifier";
}

function sortedMerge(tokens, comments) {
  const result = [];
  let tokenIndex = 0;
  let commentIndex = 0;

  while (tokenIndex < tokens.length || commentIndex < comments.length) {
    if (commentIndex >= comments.length || tokenIndex < tokens.length && tokens[tokenIndex].range[0] < comments[commentIndex].range[0]) {
      result.push(tokens[tokenIndex++]);
    } else {
      result.push(comments[commentIndex++]);
    }
  }

  return result;
}

function nodesOrTokensOverlap(first, second) {
  return first.range[0] <= second.range[0] && first.range[1] >= second.range[0] || second.range[0] <= first.range[0] && second.range[1] >= first.range[0];
}

function isSpaceBetween(sourceCode, first, second, checkInsideOfJSXText) {
  if (nodesOrTokensOverlap(first, second)) {
    return false;
  }

  const [startingNodeOrToken, endingNodeOrToken] = first.range[1] <= second.range[0] ? [first, second] : [second, first];
  const firstToken = sourceCode.getLastToken(startingNodeOrToken) || startingNodeOrToken;
  const finalToken = sourceCode.getFirstToken(endingNodeOrToken) || endingNodeOrToken;
  let currentToken = firstToken;

  while (currentToken !== finalToken) {
    const nextToken = sourceCode.getTokenAfter(currentToken, {
      includeComments: true
    });

    if (currentToken.range[1] !== nextToken.range[0] || checkInsideOfJSXText && nextToken !== finalToken && nextToken.type === "JSXText" && /\s/u.test(nextToken.value)) {
      return true;
    }

    currentToken = nextToken;
  }

  return false;
}

class SourceCode$1 extends tokenStore {
  constructor(textOrConfig, astIfNoConfig) {
    let text, ast, parserServices, scopeManager, visitorKeys;

    if (typeof textOrConfig === "string") {
      text = textOrConfig;
      ast = astIfNoConfig;
    } else if (typeof textOrConfig === "object" && textOrConfig !== null) {
      text = textOrConfig.text;
      ast = textOrConfig.ast;
      parserServices = textOrConfig.parserServices;
      scopeManager = textOrConfig.scopeManager;
      visitorKeys = textOrConfig.visitorKeys;
    }

    validate(ast);
    super(ast.tokens, ast.comments);
    this.hasBOM = text.charCodeAt(0) === 0xFEFF;
    this.text = this.hasBOM ? text.slice(1) : text;
    this.ast = ast;
    this.parserServices = parserServices || {};
    this.scopeManager = scopeManager || null;
    this.visitorKeys = visitorKeys || _commonjsHelpers.traverser.DEFAULT_VISITOR_KEYS;
    const shebangMatched = this.text.match(_commonjsHelpers.astUtils.shebangPattern);
    const hasShebang = shebangMatched && ast.comments.length && ast.comments[0].value === shebangMatched[1];

    if (hasShebang) {
      ast.comments[0].type = "Shebang";
    }

    this.tokensAndComments = sortedMerge(ast.tokens, ast.comments);
    this.lines = [];
    this.lineStartIndices = [0];

    const lineEndingPattern = _commonjsHelpers.astUtils.createGlobalLinebreakMatcher();

    let match;

    while (match = lineEndingPattern.exec(this.text)) {
      this.lines.push(this.text.slice(this.lineStartIndices[this.lineStartIndices.length - 1], match.index));
      this.lineStartIndices.push(match.index + match[0].length);
    }

    this.lines.push(this.text.slice(this.lineStartIndices[this.lineStartIndices.length - 1]));
    this._commentCache = new WeakMap();
    Object.freeze(this);
    Object.freeze(this.lines);
  }

  static splitLines(text) {
    return text.split(_commonjsHelpers.astUtils.createGlobalLinebreakMatcher());
  }

  getText(node, beforeCount, afterCount) {
    if (node) {
      return this.text.slice(Math.max(node.range[0] - (beforeCount || 0), 0), node.range[1] + (afterCount || 0));
    }

    return this.text;
  }

  getLines() {
    return this.lines;
  }

  getAllComments() {
    return this.ast.comments;
  }

  getComments(node) {
    if (this._commentCache.has(node)) {
      return this._commentCache.get(node);
    }

    const comments = {
      leading: [],
      trailing: []
    };

    if (node.type === "Program") {
      if (node.body.length === 0) {
        comments.leading = node.comments;
      }
    } else {
      if ((node.type === "BlockStatement" || node.type === "ClassBody") && node.body.length === 0 || node.type === "ObjectExpression" && node.properties.length === 0 || node.type === "ArrayExpression" && node.elements.length === 0 || node.type === "SwitchStatement" && node.cases.length === 0) {
        comments.trailing = this.getTokens(node, {
          includeComments: true,
          filter: isCommentToken
        });
      }

      let currentToken = this.getTokenBefore(node, {
        includeComments: true
      });

      while (currentToken && isCommentToken(currentToken)) {
        if (node.parent && currentToken.start < node.parent.start) {
          break;
        }

        comments.leading.push(currentToken);
        currentToken = this.getTokenBefore(currentToken, {
          includeComments: true
        });
      }

      comments.leading.reverse();
      currentToken = this.getTokenAfter(node, {
        includeComments: true
      });

      while (currentToken && isCommentToken(currentToken)) {
        if (node.parent && currentToken.end > node.parent.end) {
          break;
        }

        comments.trailing.push(currentToken);
        currentToken = this.getTokenAfter(currentToken, {
          includeComments: true
        });
      }
    }

    this._commentCache.set(node, comments);

    return comments;
  }

  getJSDocComment(node) {
    const findJSDocComment = astNode => {
      const tokenBefore = this.getTokenBefore(astNode, {
        includeComments: true
      });

      if (tokenBefore && isCommentToken(tokenBefore) && tokenBefore.type === "Block" && tokenBefore.value.charAt(0) === "*" && astNode.loc.start.line - tokenBefore.loc.end.line <= 1) {
        return tokenBefore;
      }

      return null;
    };

    let parent = node.parent;

    switch (node.type) {
      case "ClassDeclaration":
      case "FunctionDeclaration":
        return findJSDocComment(looksLikeExport(parent) ? parent : node);

      case "ClassExpression":
        return findJSDocComment(parent.parent);

      case "ArrowFunctionExpression":
      case "FunctionExpression":
        if (parent.type !== "CallExpression" && parent.type !== "NewExpression") {
          while (!this.getCommentsBefore(parent).length && !/Function/u.test(parent.type) && parent.type !== "MethodDefinition" && parent.type !== "Property") {
            parent = parent.parent;

            if (!parent) {
              break;
            }
          }

          if (parent && parent.type !== "FunctionDeclaration" && parent.type !== "Program") {
            return findJSDocComment(parent);
          }
        }

        return findJSDocComment(node);

      default:
        return null;
    }
  }

  getNodeByRangeIndex(index) {
    let result = null;

    _commonjsHelpers.traverser.traverse(this.ast, {
      visitorKeys: this.visitorKeys,

      enter(node) {
        if (node.range[0] <= index && index < node.range[1]) {
          result = node;
        } else {
          this.skip();
        }
      },

      leave(node) {
        if (node === result) {
          this.break();
        }
      }

    });

    return result;
  }

  isSpaceBetween(first, second) {
    return isSpaceBetween(this, first, second, false);
  }

  isSpaceBetweenTokens(first, second) {
    return isSpaceBetween(this, first, second, true);
  }

  getLocFromIndex(index) {
    if (typeof index !== "number") {
      throw new TypeError("Expected `index` to be a number.");
    }

    if (index < 0 || index > this.text.length) {
      throw new RangeError(`Index out of range (requested index ${index}, but source text has length ${this.text.length}).`);
    }

    if (index === this.text.length) {
      return {
        line: this.lines.length,
        column: this.lines[this.lines.length - 1].length
      };
    }

    const lineNumber = lodash__default['default'].sortedLastIndex(this.lineStartIndices, index);
    return {
      line: lineNumber,
      column: index - this.lineStartIndices[lineNumber - 1]
    };
  }

  getIndexFromLoc(loc) {
    if (typeof loc !== "object" || typeof loc.line !== "number" || typeof loc.column !== "number") {
      throw new TypeError("Expected `loc` to be an object with numeric `line` and `column` properties.");
    }

    if (loc.line <= 0) {
      throw new RangeError(`Line number out of range (line ${loc.line} requested). Line numbers should be 1-based.`);
    }

    if (loc.line > this.lineStartIndices.length) {
      throw new RangeError(`Line number out of range (line ${loc.line} requested, but only ${this.lineStartIndices.length} lines present).`);
    }

    const lineStartIndex = this.lineStartIndices[loc.line - 1];
    const lineEndIndex = loc.line === this.lineStartIndices.length ? this.text.length : this.lineStartIndices[loc.line];
    const positionIndex = lineStartIndex + loc.column;

    if (loc.line === this.lineStartIndices.length && positionIndex > lineEndIndex || loc.line < this.lineStartIndices.length && positionIndex >= lineEndIndex) {
      throw new RangeError(`Column number out of range (column ${loc.column} requested, but the length of line ${loc.line} is ${lineEndIndex - lineStartIndex}).`);
    }

    return positionIndex;
  }

}

var sourceCode$1 = SourceCode$1;
var sourceCode = {
  SourceCode: sourceCode$1
};
const debug$3 = debug__default['default']("eslint:code-path");

function getId(segment) {
  return segment.id + (segment.reachable ? "" : "!");
}

function nodeToString(node, label) {
  const suffix = label ? `:${label}` : "";

  switch (node.type) {
    case "Identifier":
      return `${node.type}${suffix} (${node.name})`;

    case "Literal":
      return `${node.type}${suffix} (${node.value})`;

    default:
      return `${node.type}${suffix}`;
  }
}

var debugHelpers = {
  enabled: debug$3.enabled,
  dump: debug$3,
  dumpState: !debug$3.enabled ? debug$3 : function (node, state, leaving) {
    for (let i = 0; i < state.currentSegments.length; ++i) {
      const segInternal = state.currentSegments[i].internal;

      if (leaving) {
        const last = segInternal.nodes.length - 1;

        if (last >= 0 && segInternal.nodes[last] === nodeToString(node, "enter")) {
          segInternal.nodes[last] = nodeToString(node, void 0);
        } else {
          segInternal.nodes.push(nodeToString(node, "exit"));
        }
      } else {
        segInternal.nodes.push(nodeToString(node, "enter"));
      }
    }

    debug$3([`${state.currentSegments.map(getId).join(",")})`, `${node.type}${leaving ? ":exit" : ""}`].join(" "));
  },
  dumpDot: !debug$3.enabled ? debug$3 : function (codePath) {
    let text = "\ndigraph {\nnode[shape=box,style=\"rounded,filled\",fillcolor=white];\ninitial[label=\"\",shape=circle,style=filled,fillcolor=black,width=0.25,height=0.25];\n";

    if (codePath.returnedSegments.length > 0) {
      text += "final[label=\"\",shape=doublecircle,style=filled,fillcolor=black,width=0.25,height=0.25];\n";
    }

    if (codePath.thrownSegments.length > 0) {
      text += "thrown[label=\"✘\",shape=circle,width=0.3,height=0.3,fixedsize];\n";
    }

    const traceMap = Object.create(null);
    const arrows = this.makeDotArrows(codePath, traceMap);

    for (const id in traceMap) {
      const segment = traceMap[id];
      text += `${id}[`;

      if (segment.reachable) {
        text += "label=\"";
      } else {
        text += "style=\"rounded,dashed,filled\",fillcolor=\"#FF9800\",label=\"<<unreachable>>\\n";
      }

      if (segment.internal.nodes.length > 0) {
        text += segment.internal.nodes.join("\\n");
      } else {
        text += "????";
      }

      text += "\"];\n";
    }

    text += `${arrows}\n`;
    text += "}";
    debug$3("DOT", text);
  },

  makeDotArrows(codePath, traceMap) {
    const stack = [[codePath.initialSegment, 0]];
    const done = traceMap || Object.create(null);
    let lastId = codePath.initialSegment.id;
    let text = `initial->${codePath.initialSegment.id}`;

    while (stack.length > 0) {
      const item = stack.pop();
      const segment = item[0];
      const index = item[1];

      if (done[segment.id] && index === 0) {
        continue;
      }

      done[segment.id] = segment;
      const nextSegment = segment.allNextSegments[index];

      if (!nextSegment) {
        continue;
      }

      if (lastId === segment.id) {
        text += `->${nextSegment.id}`;
      } else {
        text += `;\n${segment.id}->${nextSegment.id}`;
      }

      lastId = nextSegment.id;
      stack.unshift([segment, 1 + index]);
      stack.push([nextSegment, 0]);
    }

    codePath.returnedSegments.forEach(finalSegment => {
      if (lastId === finalSegment.id) {
        text += "->final";
      } else {
        text += `;\n${finalSegment.id}->final`;
      }

      lastId = null;
    });
    codePath.thrownSegments.forEach(finalSegment => {
      if (lastId === finalSegment.id) {
        text += "->thrown";
      } else {
        text += `;\n${finalSegment.id}->thrown`;
      }

      lastId = null;
    });
    return `${text};`;
  }

};

function isReachable$1(segment) {
  return segment.reachable;
}

class CodePathSegment {
  constructor(id, allPrevSegments, reachable) {
    this.id = id;
    this.nextSegments = [];
    this.prevSegments = allPrevSegments.filter(isReachable$1);
    this.allNextSegments = [];
    this.allPrevSegments = allPrevSegments;
    this.reachable = reachable;
    Object.defineProperty(this, "internal", {
      value: {
        used: false,
        loopedPrevSegments: []
      }
    });

    if (debugHelpers.enabled) {
      this.internal.nodes = [];
    }
  }

  isLoopedPrevSegment(segment) {
    return this.internal.loopedPrevSegments.indexOf(segment) !== -1;
  }

  static newRoot(id) {
    return new CodePathSegment(id, [], true);
  }

  static newNext(id, allPrevSegments) {
    return new CodePathSegment(id, CodePathSegment.flattenUnusedSegments(allPrevSegments), allPrevSegments.some(isReachable$1));
  }

  static newUnreachable(id, allPrevSegments) {
    const segment = new CodePathSegment(id, CodePathSegment.flattenUnusedSegments(allPrevSegments), false);
    CodePathSegment.markUsed(segment);
    return segment;
  }

  static newDisconnected(id, allPrevSegments) {
    return new CodePathSegment(id, [], allPrevSegments.some(isReachable$1));
  }

  static markUsed(segment) {
    if (segment.internal.used) {
      return;
    }

    segment.internal.used = true;
    let i;

    if (segment.reachable) {
      for (i = 0; i < segment.allPrevSegments.length; ++i) {
        const prevSegment = segment.allPrevSegments[i];
        prevSegment.allNextSegments.push(segment);
        prevSegment.nextSegments.push(segment);
      }
    } else {
      for (i = 0; i < segment.allPrevSegments.length; ++i) {
        segment.allPrevSegments[i].allNextSegments.push(segment);
      }
    }
  }

  static markPrevSegmentAsLooped(segment, prevSegment) {
    segment.internal.loopedPrevSegments.push(prevSegment);
  }

  static flattenUnusedSegments(segments) {
    const done = Object.create(null);
    const retv = [];

    for (let i = 0; i < segments.length; ++i) {
      const segment = segments[i];

      if (done[segment.id]) {
        continue;
      }

      if (!segment.internal.used) {
        for (let j = 0; j < segment.allPrevSegments.length; ++j) {
          const prevSegment = segment.allPrevSegments[j];

          if (!done[prevSegment.id]) {
            done[prevSegment.id] = true;
            retv.push(prevSegment);
          }
        }
      } else {
        done[segment.id] = true;
        retv.push(segment);
      }
    }

    return retv;
  }

}

var codePathSegment = CodePathSegment;

function isReachable(segment) {
  return segment.reachable;
}

function makeSegments(context, begin, end, create) {
  const list = context.segmentsList;
  const normalizedBegin = begin >= 0 ? begin : list.length + begin;
  const normalizedEnd = end >= 0 ? end : list.length + end;
  const segments = [];

  for (let i = 0; i < context.count; ++i) {
    const allPrevSegments = [];

    for (let j = normalizedBegin; j <= normalizedEnd; ++j) {
      allPrevSegments.push(list[j][i]);
    }

    segments.push(create(context.idGenerator.next(), allPrevSegments));
  }

  return segments;
}

function mergeExtraSegments(context, segments) {
  let currentSegments = segments;

  while (currentSegments.length > context.count) {
    const merged = [];

    for (let i = 0, length = currentSegments.length / 2 | 0; i < length; ++i) {
      merged.push(codePathSegment.newNext(context.idGenerator.next(), [currentSegments[i], currentSegments[i + length]]));
    }

    currentSegments = merged;
  }

  return currentSegments;
}

class ForkContext {
  constructor(idGenerator, upper, count) {
    this.idGenerator = idGenerator;
    this.upper = upper;
    this.count = count;
    this.segmentsList = [];
  }

  get head() {
    const list = this.segmentsList;
    return list.length === 0 ? [] : list[list.length - 1];
  }

  get empty() {
    return this.segmentsList.length === 0;
  }

  get reachable() {
    const segments = this.head;
    return segments.length > 0 && segments.some(isReachable);
  }

  makeNext(begin, end) {
    return makeSegments(this, begin, end, codePathSegment.newNext);
  }

  makeUnreachable(begin, end) {
    return makeSegments(this, begin, end, codePathSegment.newUnreachable);
  }

  makeDisconnected(begin, end) {
    return makeSegments(this, begin, end, codePathSegment.newDisconnected);
  }

  add(segments) {
    assert__default['default'](segments.length >= this.count, `${segments.length} >= ${this.count}`);
    this.segmentsList.push(mergeExtraSegments(this, segments));
  }

  replaceHead(segments) {
    assert__default['default'](segments.length >= this.count, `${segments.length} >= ${this.count}`);
    this.segmentsList.splice(-1, 1, mergeExtraSegments(this, segments));
  }

  addAll(context) {
    assert__default['default'](context.count === this.count);
    const source = context.segmentsList;

    for (let i = 0; i < source.length; ++i) {
      this.segmentsList.push(source[i]);
    }
  }

  clear() {
    this.segmentsList = [];
  }

  static newRoot(idGenerator) {
    const context = new ForkContext(idGenerator, null, 1);
    context.add([codePathSegment.newRoot(idGenerator.next())]);
    return context;
  }

  static newEmpty(parentContext, forkLeavingPath) {
    return new ForkContext(parentContext.idGenerator, parentContext, (forkLeavingPath ? 2 : 1) * parentContext.count);
  }

}

var forkContext = ForkContext;

function addToReturnedOrThrown(dest, others, all, segments) {
  for (let i = 0; i < segments.length; ++i) {
    const segment = segments[i];
    dest.push(segment);

    if (others.indexOf(segment) === -1) {
      all.push(segment);
    }
  }
}

function getContinueContext(state, label) {
  if (!label) {
    return state.loopContext;
  }

  let context = state.loopContext;

  while (context) {
    if (context.label === label) {
      return context;
    }

    context = context.upper;
  }

  return null;
}

function getBreakContext(state, label) {
  let context = state.breakContext;

  while (context) {
    if (label ? context.label === label : context.breakable) {
      return context;
    }

    context = context.upper;
  }

  return null;
}

function getReturnContext(state) {
  let context = state.tryContext;

  while (context) {
    if (context.hasFinalizer && context.position !== "finally") {
      return context;
    }

    context = context.upper;
  }

  return state;
}

function getThrowContext(state) {
  let context = state.tryContext;

  while (context) {
    if (context.position === "try" || context.hasFinalizer && context.position === "catch") {
      return context;
    }

    context = context.upper;
  }

  return state;
}

function remove(xs, x) {
  xs.splice(xs.indexOf(x), 1);
}

function removeConnection(prevSegments, nextSegments) {
  for (let i = 0; i < prevSegments.length; ++i) {
    const prevSegment = prevSegments[i];
    const nextSegment = nextSegments[i];
    remove(prevSegment.nextSegments, nextSegment);
    remove(prevSegment.allNextSegments, nextSegment);
    remove(nextSegment.prevSegments, prevSegment);
    remove(nextSegment.allPrevSegments, prevSegment);
  }
}

function makeLooped(state, unflattenedFromSegments, unflattenedToSegments) {
  const fromSegments = codePathSegment.flattenUnusedSegments(unflattenedFromSegments);
  const toSegments = codePathSegment.flattenUnusedSegments(unflattenedToSegments);
  const end = Math.min(fromSegments.length, toSegments.length);

  for (let i = 0; i < end; ++i) {
    const fromSegment = fromSegments[i];
    const toSegment = toSegments[i];

    if (toSegment.reachable) {
      fromSegment.nextSegments.push(toSegment);
    }

    if (fromSegment.reachable) {
      toSegment.prevSegments.push(fromSegment);
    }

    fromSegment.allNextSegments.push(toSegment);
    toSegment.allPrevSegments.push(fromSegment);

    if (toSegment.allPrevSegments.length >= 2) {
      codePathSegment.markPrevSegmentAsLooped(toSegment, fromSegment);
    }

    state.notifyLooped(fromSegment, toSegment);
  }
}

function finalizeTestSegmentsOfFor(context, choiceContext, head) {
  if (!choiceContext.processed) {
    choiceContext.trueForkContext.add(head);
    choiceContext.falseForkContext.add(head);
    choiceContext.qqForkContext.add(head);
  }

  if (context.test !== true) {
    context.brokenForkContext.addAll(choiceContext.falseForkContext);
  }

  context.endOfTestSegments = choiceContext.trueForkContext.makeNext(0, -1);
}

class CodePathState {
  constructor(idGenerator, onLooped) {
    this.idGenerator = idGenerator;
    this.notifyLooped = onLooped;
    this.forkContext = forkContext.newRoot(idGenerator);
    this.choiceContext = null;
    this.switchContext = null;
    this.tryContext = null;
    this.loopContext = null;
    this.breakContext = null;
    this.chainContext = null;
    this.currentSegments = [];
    this.initialSegment = this.forkContext.head[0];
    const final = this.finalSegments = [];
    const returned = this.returnedForkContext = [];
    const thrown = this.thrownForkContext = [];
    returned.add = addToReturnedOrThrown.bind(null, returned, thrown, final);
    thrown.add = addToReturnedOrThrown.bind(null, thrown, returned, final);
  }

  get headSegments() {
    return this.forkContext.head;
  }

  get parentForkContext() {
    const current = this.forkContext;
    return current && current.upper;
  }

  pushForkContext(forkLeavingPath) {
    this.forkContext = forkContext.newEmpty(this.forkContext, forkLeavingPath);
    return this.forkContext;
  }

  popForkContext() {
    const lastContext = this.forkContext;
    this.forkContext = lastContext.upper;
    this.forkContext.replaceHead(lastContext.makeNext(0, -1));
    return lastContext;
  }

  forkPath() {
    this.forkContext.add(this.parentForkContext.makeNext(-1, -1));
  }

  forkBypassPath() {
    this.forkContext.add(this.parentForkContext.head);
  }

  pushChoiceContext(kind, isForkingAsResult) {
    this.choiceContext = {
      upper: this.choiceContext,
      kind,
      isForkingAsResult,
      trueForkContext: forkContext.newEmpty(this.forkContext),
      falseForkContext: forkContext.newEmpty(this.forkContext),
      qqForkContext: forkContext.newEmpty(this.forkContext),
      processed: false
    };
  }

  popChoiceContext() {
    const context = this.choiceContext;
    this.choiceContext = context.upper;
    const forkContext = this.forkContext;
    const headSegments = forkContext.head;

    switch (context.kind) {
      case "&&":
      case "||":
      case "??":
        if (!context.processed) {
          context.trueForkContext.add(headSegments);
          context.falseForkContext.add(headSegments);
          context.qqForkContext.add(headSegments);
        }

        if (context.isForkingAsResult) {
          const parentContext = this.choiceContext;
          parentContext.trueForkContext.addAll(context.trueForkContext);
          parentContext.falseForkContext.addAll(context.falseForkContext);
          parentContext.qqForkContext.addAll(context.qqForkContext);
          parentContext.processed = true;
          return context;
        }

        break;

      case "test":
        if (!context.processed) {
          context.trueForkContext.clear();
          context.trueForkContext.add(headSegments);
        } else {
          context.falseForkContext.clear();
          context.falseForkContext.add(headSegments);
        }

        break;

      case "loop":
        return context;

      default:
        throw new Error("unreachable");
    }

    const prevForkContext = context.trueForkContext;
    prevForkContext.addAll(context.falseForkContext);
    forkContext.replaceHead(prevForkContext.makeNext(0, -1));
    return context;
  }

  makeLogicalRight() {
    const context = this.choiceContext;
    const forkContext = this.forkContext;

    if (context.processed) {
      let prevForkContext;

      switch (context.kind) {
        case "&&":
          prevForkContext = context.trueForkContext;
          break;

        case "||":
          prevForkContext = context.falseForkContext;
          break;

        case "??":
          prevForkContext = context.qqForkContext;
          break;

        default:
          throw new Error("unreachable");
      }

      forkContext.replaceHead(prevForkContext.makeNext(0, -1));
      prevForkContext.clear();
      context.processed = false;
    } else {
      switch (context.kind) {
        case "&&":
          context.falseForkContext.add(forkContext.head);
          break;

        case "||":
          context.trueForkContext.add(forkContext.head);
          break;

        case "??":
          context.trueForkContext.add(forkContext.head);
          context.falseForkContext.add(forkContext.head);
          break;

        default:
          throw new Error("unreachable");
      }

      forkContext.replaceHead(forkContext.makeNext(-1, -1));
    }
  }

  makeIfConsequent() {
    const context = this.choiceContext;
    const forkContext = this.forkContext;

    if (!context.processed) {
      context.trueForkContext.add(forkContext.head);
      context.falseForkContext.add(forkContext.head);
      context.qqForkContext.add(forkContext.head);
    }

    context.processed = false;
    forkContext.replaceHead(context.trueForkContext.makeNext(0, -1));
  }

  makeIfAlternate() {
    const context = this.choiceContext;
    const forkContext = this.forkContext;
    context.trueForkContext.clear();
    context.trueForkContext.add(forkContext.head);
    context.processed = true;
    forkContext.replaceHead(context.falseForkContext.makeNext(0, -1));
  }

  pushChainContext() {
    this.chainContext = {
      upper: this.chainContext,
      countChoiceContexts: 0
    };
  }

  popChainContext() {
    const context = this.chainContext;
    this.chainContext = context.upper;

    for (let i = context.countChoiceContexts; i > 0; --i) {
      this.popChoiceContext();
    }
  }

  makeOptionalNode() {
    if (this.chainContext) {
      this.chainContext.countChoiceContexts += 1;
      this.pushChoiceContext("??", false);
    }
  }

  makeOptionalRight() {
    if (this.chainContext) {
      this.makeLogicalRight();
    }
  }

  pushSwitchContext(hasCase, label) {
    this.switchContext = {
      upper: this.switchContext,
      hasCase,
      defaultSegments: null,
      defaultBodySegments: null,
      foundDefault: false,
      lastIsDefault: false,
      countForks: 0
    };
    this.pushBreakContext(true, label);
  }

  popSwitchContext() {
    const context = this.switchContext;
    this.switchContext = context.upper;
    const forkContext = this.forkContext;
    const brokenForkContext = this.popBreakContext().brokenForkContext;

    if (context.countForks === 0) {
      if (!brokenForkContext.empty) {
        brokenForkContext.add(forkContext.makeNext(-1, -1));
        forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
      }

      return;
    }

    const lastSegments = forkContext.head;
    this.forkBypassPath();
    const lastCaseSegments = forkContext.head;
    brokenForkContext.add(lastSegments);

    if (!context.lastIsDefault) {
      if (context.defaultBodySegments) {
        removeConnection(context.defaultSegments, context.defaultBodySegments);
        makeLooped(this, lastCaseSegments, context.defaultBodySegments);
      } else {
        brokenForkContext.add(lastCaseSegments);
      }
    }

    for (let i = 0; i < context.countForks; ++i) {
      this.forkContext = this.forkContext.upper;
    }

    this.forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
  }

  makeSwitchCaseBody(isEmpty, isDefault) {
    const context = this.switchContext;

    if (!context.hasCase) {
      return;
    }

    const parentForkContext = this.forkContext;
    const forkContext = this.pushForkContext();
    forkContext.add(parentForkContext.makeNext(0, -1));

    if (isDefault) {
      context.defaultSegments = parentForkContext.head;

      if (isEmpty) {
        context.foundDefault = true;
      } else {
        context.defaultBodySegments = forkContext.head;
      }
    } else {
      if (!isEmpty && context.foundDefault) {
        context.foundDefault = false;
        context.defaultBodySegments = forkContext.head;
      }
    }

    context.lastIsDefault = isDefault;
    context.countForks += 1;
  }

  pushTryContext(hasFinalizer) {
    this.tryContext = {
      upper: this.tryContext,
      position: "try",
      hasFinalizer,
      returnedForkContext: hasFinalizer ? forkContext.newEmpty(this.forkContext) : null,
      thrownForkContext: forkContext.newEmpty(this.forkContext),
      lastOfTryIsReachable: false,
      lastOfCatchIsReachable: false
    };
  }

  popTryContext() {
    const context = this.tryContext;
    this.tryContext = context.upper;

    if (context.position === "catch") {
      this.popForkContext();
      return;
    }

    const returned = context.returnedForkContext;
    const thrown = context.thrownForkContext;

    if (returned.empty && thrown.empty) {
      return;
    }

    const headSegments = this.forkContext.head;
    this.forkContext = this.forkContext.upper;
    const normalSegments = headSegments.slice(0, headSegments.length / 2 | 0);
    const leavingSegments = headSegments.slice(headSegments.length / 2 | 0);

    if (!returned.empty) {
      getReturnContext(this).returnedForkContext.add(leavingSegments);
    }

    if (!thrown.empty) {
      getThrowContext(this).thrownForkContext.add(leavingSegments);
    }

    this.forkContext.replaceHead(normalSegments);

    if (!context.lastOfTryIsReachable && !context.lastOfCatchIsReachable) {
      this.forkContext.makeUnreachable();
    }
  }

  makeCatchBlock() {
    const context = this.tryContext;
    const forkContext$1 = this.forkContext;
    const thrown = context.thrownForkContext;
    context.position = "catch";
    context.thrownForkContext = forkContext.newEmpty(forkContext$1);
    context.lastOfTryIsReachable = forkContext$1.reachable;
    thrown.add(forkContext$1.head);
    const thrownSegments = thrown.makeNext(0, -1);
    this.pushForkContext();
    this.forkBypassPath();
    this.forkContext.add(thrownSegments);
  }

  makeFinallyBlock() {
    const context = this.tryContext;
    let forkContext = this.forkContext;
    const returned = context.returnedForkContext;
    const thrown = context.thrownForkContext;
    const headOfLeavingSegments = forkContext.head;

    if (context.position === "catch") {
      this.popForkContext();
      forkContext = this.forkContext;
      context.lastOfCatchIsReachable = forkContext.reachable;
    } else {
      context.lastOfTryIsReachable = forkContext.reachable;
    }

    context.position = "finally";

    if (returned.empty && thrown.empty) {
      return;
    }

    const segments = forkContext.makeNext(-1, -1);

    for (let i = 0; i < forkContext.count; ++i) {
      const prevSegsOfLeavingSegment = [headOfLeavingSegments[i]];

      for (let j = 0; j < returned.segmentsList.length; ++j) {
        prevSegsOfLeavingSegment.push(returned.segmentsList[j][i]);
      }

      for (let j = 0; j < thrown.segmentsList.length; ++j) {
        prevSegsOfLeavingSegment.push(thrown.segmentsList[j][i]);
      }

      segments.push(codePathSegment.newNext(this.idGenerator.next(), prevSegsOfLeavingSegment));
    }

    this.pushForkContext(true);
    this.forkContext.add(segments);
  }

  makeFirstThrowablePathInTryBlock() {
    const forkContext = this.forkContext;

    if (!forkContext.reachable) {
      return;
    }

    const context = getThrowContext(this);

    if (context === this || context.position !== "try" || !context.thrownForkContext.empty) {
      return;
    }

    context.thrownForkContext.add(forkContext.head);
    forkContext.replaceHead(forkContext.makeNext(-1, -1));
  }

  pushLoopContext(type, label) {
    const forkContext$1 = this.forkContext;
    const breakContext = this.pushBreakContext(true, label);

    switch (type) {
      case "WhileStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type,
          label,
          test: void 0,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext
        };
        break;

      case "DoWhileStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type,
          label,
          test: void 0,
          entrySegments: null,
          continueForkContext: forkContext.newEmpty(forkContext$1),
          brokenForkContext: breakContext.brokenForkContext
        };
        break;

      case "ForStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type,
          label,
          test: void 0,
          endOfInitSegments: null,
          testSegments: null,
          endOfTestSegments: null,
          updateSegments: null,
          endOfUpdateSegments: null,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext
        };
        break;

      case "ForInStatement":
      case "ForOfStatement":
        this.loopContext = {
          upper: this.loopContext,
          type,
          label,
          prevSegments: null,
          leftSegments: null,
          endOfLeftSegments: null,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext
        };
        break;

      default:
        throw new Error(`unknown type: "${type}"`);
    }
  }

  popLoopContext() {
    const context = this.loopContext;
    this.loopContext = context.upper;
    const forkContext = this.forkContext;
    const brokenForkContext = this.popBreakContext().brokenForkContext;

    switch (context.type) {
      case "WhileStatement":
      case "ForStatement":
        this.popChoiceContext();
        makeLooped(this, forkContext.head, context.continueDestSegments);
        break;

      case "DoWhileStatement":
        {
          const choiceContext = this.popChoiceContext();

          if (!choiceContext.processed) {
            choiceContext.trueForkContext.add(forkContext.head);
            choiceContext.falseForkContext.add(forkContext.head);
          }

          if (context.test !== true) {
            brokenForkContext.addAll(choiceContext.falseForkContext);
          }

          const segmentsList = choiceContext.trueForkContext.segmentsList;

          for (let i = 0; i < segmentsList.length; ++i) {
            makeLooped(this, segmentsList[i], context.entrySegments);
          }

          break;
        }

      case "ForInStatement":
      case "ForOfStatement":
        brokenForkContext.add(forkContext.head);
        makeLooped(this, forkContext.head, context.leftSegments);
        break;

      default:
        throw new Error("unreachable");
    }

    if (brokenForkContext.empty) {
      forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    } else {
      forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
    }
  }

  makeWhileTest(test) {
    const context = this.loopContext;
    const forkContext = this.forkContext;
    const testSegments = forkContext.makeNext(0, -1);
    context.test = test;
    context.continueDestSegments = testSegments;
    forkContext.replaceHead(testSegments);
  }

  makeWhileBody() {
    const context = this.loopContext;
    const choiceContext = this.choiceContext;
    const forkContext = this.forkContext;

    if (!choiceContext.processed) {
      choiceContext.trueForkContext.add(forkContext.head);
      choiceContext.falseForkContext.add(forkContext.head);
    }

    if (context.test !== true) {
      context.brokenForkContext.addAll(choiceContext.falseForkContext);
    }

    forkContext.replaceHead(choiceContext.trueForkContext.makeNext(0, -1));
  }

  makeDoWhileBody() {
    const context = this.loopContext;
    const forkContext = this.forkContext;
    const bodySegments = forkContext.makeNext(-1, -1);
    context.entrySegments = bodySegments;
    forkContext.replaceHead(bodySegments);
  }

  makeDoWhileTest(test) {
    const context = this.loopContext;
    const forkContext = this.forkContext;
    context.test = test;

    if (!context.continueForkContext.empty) {
      context.continueForkContext.add(forkContext.head);
      const testSegments = context.continueForkContext.makeNext(0, -1);
      forkContext.replaceHead(testSegments);
    }
  }

  makeForTest(test) {
    const context = this.loopContext;
    const forkContext = this.forkContext;
    const endOfInitSegments = forkContext.head;
    const testSegments = forkContext.makeNext(-1, -1);
    context.test = test;
    context.endOfInitSegments = endOfInitSegments;
    context.continueDestSegments = context.testSegments = testSegments;
    forkContext.replaceHead(testSegments);
  }

  makeForUpdate() {
    const context = this.loopContext;
    const choiceContext = this.choiceContext;
    const forkContext = this.forkContext;

    if (context.testSegments) {
      finalizeTestSegmentsOfFor(context, choiceContext, forkContext.head);
    } else {
      context.endOfInitSegments = forkContext.head;
    }

    const updateSegments = forkContext.makeDisconnected(-1, -1);
    context.continueDestSegments = context.updateSegments = updateSegments;
    forkContext.replaceHead(updateSegments);
  }

  makeForBody() {
    const context = this.loopContext;
    const choiceContext = this.choiceContext;
    const forkContext$1 = this.forkContext;

    if (context.updateSegments) {
      context.endOfUpdateSegments = forkContext$1.head;

      if (context.testSegments) {
        makeLooped(this, context.endOfUpdateSegments, context.testSegments);
      }
    } else if (context.testSegments) {
      finalizeTestSegmentsOfFor(context, choiceContext, forkContext$1.head);
    } else {
      context.endOfInitSegments = forkContext$1.head;
    }

    let bodySegments = context.endOfTestSegments;

    if (!bodySegments) {
      const prevForkContext = forkContext.newEmpty(forkContext$1);
      prevForkContext.add(context.endOfInitSegments);

      if (context.endOfUpdateSegments) {
        prevForkContext.add(context.endOfUpdateSegments);
      }

      bodySegments = prevForkContext.makeNext(0, -1);
    }

    context.continueDestSegments = context.continueDestSegments || bodySegments;
    forkContext$1.replaceHead(bodySegments);
  }

  makeForInOfLeft() {
    const context = this.loopContext;
    const forkContext = this.forkContext;
    const leftSegments = forkContext.makeDisconnected(-1, -1);
    context.prevSegments = forkContext.head;
    context.leftSegments = context.continueDestSegments = leftSegments;
    forkContext.replaceHead(leftSegments);
  }

  makeForInOfRight() {
    const context = this.loopContext;
    const forkContext$1 = this.forkContext;
    const temp = forkContext.newEmpty(forkContext$1);
    temp.add(context.prevSegments);
    const rightSegments = temp.makeNext(-1, -1);
    context.endOfLeftSegments = forkContext$1.head;
    forkContext$1.replaceHead(rightSegments);
  }

  makeForInOfBody() {
    const context = this.loopContext;
    const forkContext$1 = this.forkContext;
    const temp = forkContext.newEmpty(forkContext$1);
    temp.add(context.endOfLeftSegments);
    const bodySegments = temp.makeNext(-1, -1);
    makeLooped(this, forkContext$1.head, context.leftSegments);
    context.brokenForkContext.add(forkContext$1.head);
    forkContext$1.replaceHead(bodySegments);
  }

  pushBreakContext(breakable, label) {
    this.breakContext = {
      upper: this.breakContext,
      breakable,
      label,
      brokenForkContext: forkContext.newEmpty(this.forkContext)
    };
    return this.breakContext;
  }

  popBreakContext() {
    const context = this.breakContext;
    const forkContext = this.forkContext;
    this.breakContext = context.upper;

    if (!context.breakable) {
      const brokenForkContext = context.brokenForkContext;

      if (!brokenForkContext.empty) {
        brokenForkContext.add(forkContext.head);
        forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
      }
    }

    return context;
  }

  makeBreak(label) {
    const forkContext = this.forkContext;

    if (!forkContext.reachable) {
      return;
    }

    const context = getBreakContext(this, label);

    if (context) {
      context.brokenForkContext.add(forkContext.head);
    }

    forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
  }

  makeContinue(label) {
    const forkContext = this.forkContext;

    if (!forkContext.reachable) {
      return;
    }

    const context = getContinueContext(this, label);

    if (context) {
      if (context.continueDestSegments) {
        makeLooped(this, forkContext.head, context.continueDestSegments);

        if (context.type === "ForInStatement" || context.type === "ForOfStatement") {
          context.brokenForkContext.add(forkContext.head);
        }
      } else {
        context.continueForkContext.add(forkContext.head);
      }
    }

    forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
  }

  makeReturn() {
    const forkContext = this.forkContext;

    if (forkContext.reachable) {
      getReturnContext(this).returnedForkContext.add(forkContext.head);
      forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    }
  }

  makeThrow() {
    const forkContext = this.forkContext;

    if (forkContext.reachable) {
      getThrowContext(this).thrownForkContext.add(forkContext.head);
      forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    }
  }

  makeFinal() {
    const segments = this.currentSegments;

    if (segments.length > 0 && segments[0].reachable) {
      this.returnedForkContext.add(segments);
    }
  }

}

var codePathState = CodePathState;

class IdGenerator {
  constructor(prefix) {
    this.prefix = String(prefix);
    this.n = 0;
  }

  next() {
    this.n = 1 + this.n | 0;

    if (this.n < 0) {
      this.n = 1;
    }

    return this.prefix + this.n;
  }

}

var idGenerator = IdGenerator;

class CodePath {
  constructor(id, upper, onLooped) {
    this.id = id;
    this.upper = upper;
    this.childCodePaths = [];
    Object.defineProperty(this, "internal", {
      value: new codePathState(new idGenerator(`${id}_`), onLooped)
    });

    if (upper) {
      upper.childCodePaths.push(this);
    }
  }

  static getState(codePath) {
    return codePath.internal;
  }

  get initialSegment() {
    return this.internal.initialSegment;
  }

  get finalSegments() {
    return this.internal.finalSegments;
  }

  get returnedSegments() {
    return this.internal.returnedForkContext;
  }

  get thrownSegments() {
    return this.internal.thrownForkContext;
  }

  get currentSegments() {
    return this.internal.currentSegments;
  }

  traverseSegments(options, callback) {
    let resolvedOptions;
    let resolvedCallback;

    if (typeof options === "function") {
      resolvedCallback = options;
      resolvedOptions = {};
    } else {
      resolvedOptions = options || {};
      resolvedCallback = callback;
    }

    const startSegment = resolvedOptions.first || this.internal.initialSegment;
    const lastSegment = resolvedOptions.last;
    let item = null;
    let index = 0;
    let end = 0;
    let segment = null;
    const visited = Object.create(null);
    const stack = [[startSegment, 0]];
    let skippedSegment = null;
    let broken = false;
    const controller = {
      skip() {
        if (stack.length <= 1) {
          broken = true;
        } else {
          skippedSegment = stack[stack.length - 2][0];
        }
      },

      break() {
        broken = true;
      }

    };

    function isVisited(prevSegment) {
      return visited[prevSegment.id] || segment.isLoopedPrevSegment(prevSegment);
    }

    while (stack.length > 0) {
      item = stack[stack.length - 1];
      segment = item[0];
      index = item[1];

      if (index === 0) {
        if (visited[segment.id]) {
          stack.pop();
          continue;
        }

        if (segment !== startSegment && segment.prevSegments.length > 0 && !segment.prevSegments.every(isVisited)) {
          stack.pop();
          continue;
        }

        if (skippedSegment && segment.prevSegments.indexOf(skippedSegment) !== -1) {
          skippedSegment = null;
        }

        visited[segment.id] = true;

        if (!skippedSegment) {
          resolvedCallback.call(this, segment, controller);

          if (segment === lastSegment) {
            controller.skip();
          }

          if (broken) {
            break;
          }
        }
      }

      end = segment.nextSegments.length - 1;

      if (index < end) {
        item[1] += 1;
        stack.push([segment.nextSegments[index], 0]);
      } else if (index === end) {
        item[0] = segment.nextSegments[index];
        item[1] = 0;
      } else {
        stack.pop();
      }
    }
  }

}

var codePath = CodePath;
const {
  breakableTypePattern
} = _commonjsHelpers.astUtils;

function isCaseNode(node) {
  return Boolean(node.test);
}

function isHandledLogicalOperator(operator) {
  return operator === "&&" || operator === "||" || operator === "??";
}

function isLogicalAssignmentOperator(operator) {
  return operator === "&&=" || operator === "||=" || operator === "??=";
}

function getLabel(node) {
  if (node.parent.type === "LabeledStatement") {
    return node.parent.label.name;
  }

  return null;
}

function isForkingByTrueOrFalse(node) {
  const parent = node.parent;

  switch (parent.type) {
    case "ConditionalExpression":
    case "IfStatement":
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
      return parent.test === node;

    case "LogicalExpression":
      return isHandledLogicalOperator(parent.operator);

    case "AssignmentExpression":
      return isLogicalAssignmentOperator(parent.operator);

    default:
      return false;
  }
}

function getBooleanValueIfSimpleConstant(node) {
  if (node.type === "Literal") {
    return Boolean(node.value);
  }

  return void 0;
}

function isIdentifierReference(node) {
  const parent = node.parent;

  switch (parent.type) {
    case "LabeledStatement":
    case "BreakStatement":
    case "ContinueStatement":
    case "ArrayPattern":
    case "RestElement":
    case "ImportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "CatchClause":
      return false;

    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
    case "ClassDeclaration":
    case "ClassExpression":
    case "VariableDeclarator":
      return parent.id !== node;

    case "Property":
    case "MethodDefinition":
      return parent.key !== node || parent.computed || parent.shorthand;

    case "AssignmentPattern":
      return parent.key !== node;

    default:
      return true;
  }
}

function forwardCurrentToHead(analyzer, node) {
  const codePath$1 = analyzer.codePath;
  const state = codePath.getState(codePath$1);
  const currentSegments = state.currentSegments;
  const headSegments = state.headSegments;
  const end = Math.max(currentSegments.length, headSegments.length);
  let i, currentSegment, headSegment;

  for (i = 0; i < end; ++i) {
    currentSegment = currentSegments[i];
    headSegment = headSegments[i];

    if (currentSegment !== headSegment && currentSegment) {
      debugHelpers.dump(`onCodePathSegmentEnd ${currentSegment.id}`);

      if (currentSegment.reachable) {
        analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
      }
    }
  }

  state.currentSegments = headSegments;

  for (i = 0; i < end; ++i) {
    currentSegment = currentSegments[i];
    headSegment = headSegments[i];

    if (currentSegment !== headSegment && headSegment) {
      debugHelpers.dump(`onCodePathSegmentStart ${headSegment.id}`);
      codePathSegment.markUsed(headSegment);

      if (headSegment.reachable) {
        analyzer.emitter.emit("onCodePathSegmentStart", headSegment, node);
      }
    }
  }
}

function leaveFromCurrentSegment(analyzer, node) {
  const state = codePath.getState(analyzer.codePath);
  const currentSegments = state.currentSegments;

  for (let i = 0; i < currentSegments.length; ++i) {
    const currentSegment = currentSegments[i];
    debugHelpers.dump(`onCodePathSegmentEnd ${currentSegment.id}`);

    if (currentSegment.reachable) {
      analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
    }
  }

  state.currentSegments = [];
}

function preprocess(analyzer, node) {
  const codePath$1 = analyzer.codePath;
  const state = codePath.getState(codePath$1);
  const parent = node.parent;

  switch (parent.type) {
    case "CallExpression":
      if (parent.optional === true && parent.arguments.length >= 1 && parent.arguments[0] === node) {
        state.makeOptionalRight();
      }

      break;

    case "MemberExpression":
      if (parent.optional === true && parent.property === node) {
        state.makeOptionalRight();
      }

      break;

    case "LogicalExpression":
      if (parent.right === node && isHandledLogicalOperator(parent.operator)) {
        state.makeLogicalRight();
      }

      break;

    case "AssignmentExpression":
      if (parent.right === node && isLogicalAssignmentOperator(parent.operator)) {
        state.makeLogicalRight();
      }

      break;

    case "ConditionalExpression":
    case "IfStatement":
      if (parent.consequent === node) {
        state.makeIfConsequent();
      } else if (parent.alternate === node) {
        state.makeIfAlternate();
      }

      break;

    case "SwitchCase":
      if (parent.consequent[0] === node) {
        state.makeSwitchCaseBody(false, !parent.test);
      }

      break;

    case "TryStatement":
      if (parent.handler === node) {
        state.makeCatchBlock();
      } else if (parent.finalizer === node) {
        state.makeFinallyBlock();
      }

      break;

    case "WhileStatement":
      if (parent.test === node) {
        state.makeWhileTest(getBooleanValueIfSimpleConstant(node));
      } else {
        assert__default['default'](parent.body === node);
        state.makeWhileBody();
      }

      break;

    case "DoWhileStatement":
      if (parent.body === node) {
        state.makeDoWhileBody();
      } else {
        assert__default['default'](parent.test === node);
        state.makeDoWhileTest(getBooleanValueIfSimpleConstant(node));
      }

      break;

    case "ForStatement":
      if (parent.test === node) {
        state.makeForTest(getBooleanValueIfSimpleConstant(node));
      } else if (parent.update === node) {
        state.makeForUpdate();
      } else if (parent.body === node) {
        state.makeForBody();
      }

      break;

    case "ForInStatement":
    case "ForOfStatement":
      if (parent.left === node) {
        state.makeForInOfLeft();
      } else if (parent.right === node) {
        state.makeForInOfRight();
      } else {
        assert__default['default'](parent.body === node);
        state.makeForInOfBody();
      }

      break;

    case "AssignmentPattern":
      if (parent.right === node) {
        state.pushForkContext();
        state.forkBypassPath();
        state.forkPath();
      }

      break;
  }
}

function processCodePathToEnter(analyzer, node) {
  let codePath$1 = analyzer.codePath;
  let state = codePath$1 && codePath.getState(codePath$1);
  const parent = node.parent;

  switch (node.type) {
    case "Program":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      if (codePath$1) {
        forwardCurrentToHead(analyzer, node);
        debugHelpers.dumpState(node, state, false);
      }

      codePath$1 = analyzer.codePath = new codePath(analyzer.idGenerator.next(), codePath$1, analyzer.onLooped);
      state = codePath.getState(codePath$1);
      debugHelpers.dump(`onCodePathStart ${codePath$1.id}`);
      analyzer.emitter.emit("onCodePathStart", codePath$1, node);
      break;

    case "ChainExpression":
      state.pushChainContext();
      break;

    case "CallExpression":
      if (node.optional === true) {
        state.makeOptionalNode();
      }

      break;

    case "MemberExpression":
      if (node.optional === true) {
        state.makeOptionalNode();
      }

      break;

    case "LogicalExpression":
      if (isHandledLogicalOperator(node.operator)) {
        state.pushChoiceContext(node.operator, isForkingByTrueOrFalse(node));
      }

      break;

    case "AssignmentExpression":
      if (isLogicalAssignmentOperator(node.operator)) {
        state.pushChoiceContext(node.operator.slice(0, -1), isForkingByTrueOrFalse(node));
      }

      break;

    case "ConditionalExpression":
    case "IfStatement":
      state.pushChoiceContext("test", false);
      break;

    case "SwitchStatement":
      state.pushSwitchContext(node.cases.some(isCaseNode), getLabel(node));
      break;

    case "TryStatement":
      state.pushTryContext(Boolean(node.finalizer));
      break;

    case "SwitchCase":
      if (parent.discriminant !== node && parent.cases[0] !== node) {
        state.forkPath();
      }

      break;

    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      state.pushLoopContext(node.type, getLabel(node));
      break;

    case "LabeledStatement":
      if (!breakableTypePattern.test(node.body.type)) {
        state.pushBreakContext(false, node.label.name);
      }

      break;
  }

  forwardCurrentToHead(analyzer, node);
  debugHelpers.dumpState(node, state, false);
}

function processCodePathToExit(analyzer, node) {
  const codePath$1 = analyzer.codePath;
  const state = codePath.getState(codePath$1);
  let dontForward = false;

  switch (node.type) {
    case "ChainExpression":
      state.popChainContext();
      break;

    case "IfStatement":
    case "ConditionalExpression":
      state.popChoiceContext();
      break;

    case "LogicalExpression":
      if (isHandledLogicalOperator(node.operator)) {
        state.popChoiceContext();
      }

      break;

    case "AssignmentExpression":
      if (isLogicalAssignmentOperator(node.operator)) {
        state.popChoiceContext();
      }

      break;

    case "SwitchStatement":
      state.popSwitchContext();
      break;

    case "SwitchCase":
      if (node.consequent.length === 0) {
        state.makeSwitchCaseBody(true, !node.test);
      }

      if (state.forkContext.reachable) {
        dontForward = true;
      }

      break;

    case "TryStatement":
      state.popTryContext();
      break;

    case "BreakStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeBreak(node.label && node.label.name);
      dontForward = true;
      break;

    case "ContinueStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeContinue(node.label && node.label.name);
      dontForward = true;
      break;

    case "ReturnStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeReturn();
      dontForward = true;
      break;

    case "ThrowStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeThrow();
      dontForward = true;
      break;

    case "Identifier":
      if (isIdentifierReference(node)) {
        state.makeFirstThrowablePathInTryBlock();
        dontForward = true;
      }

      break;

    case "CallExpression":
    case "ImportExpression":
    case "MemberExpression":
    case "NewExpression":
    case "YieldExpression":
      state.makeFirstThrowablePathInTryBlock();
      break;

    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      state.popLoopContext();
      break;

    case "AssignmentPattern":
      state.popForkContext();
      break;

    case "LabeledStatement":
      if (!breakableTypePattern.test(node.body.type)) {
        state.popBreakContext();
      }

      break;
  }

  if (!dontForward) {
    forwardCurrentToHead(analyzer, node);
  }

  debugHelpers.dumpState(node, state, true);
}

function postprocess(analyzer, node) {
  switch (node.type) {
    case "Program":
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      {
        let codePath$1 = analyzer.codePath;
        codePath.getState(codePath$1).makeFinal();
        leaveFromCurrentSegment(analyzer, node);
        debugHelpers.dump(`onCodePathEnd ${codePath$1.id}`);
        analyzer.emitter.emit("onCodePathEnd", codePath$1, node);
        debugHelpers.dumpDot(codePath$1);
        codePath$1 = analyzer.codePath = analyzer.codePath.upper;

        if (codePath$1) {
          debugHelpers.dumpState(node, codePath.getState(codePath$1), true);
        }

        break;
      }

    case "CallExpression":
      if (node.optional === true && node.arguments.length === 0) {
        codePath.getState(analyzer.codePath).makeOptionalRight();
      }

      break;
  }
}

class CodePathAnalyzer {
  constructor(eventGenerator) {
    this.original = eventGenerator;
    this.emitter = eventGenerator.emitter;
    this.codePath = null;
    this.idGenerator = new idGenerator("s");
    this.currentNode = null;
    this.onLooped = this.onLooped.bind(this);
  }

  enterNode(node) {
    this.currentNode = node;

    if (node.parent) {
      preprocess(this, node);
    }

    processCodePathToEnter(this, node);
    this.original.enterNode(node);
    this.currentNode = null;
  }

  leaveNode(node) {
    this.currentNode = node;
    processCodePathToExit(this, node);
    this.original.leaveNode(node);
    postprocess(this, node);
    this.currentNode = null;
  }

  onLooped(fromSegment, toSegment) {
    if (fromSegment.reachable && toSegment.reachable) {
      debugHelpers.dump(`onCodePathSegmentLoop ${fromSegment.id} -> ${toSegment.id}`);
      this.emitter.emit("onCodePathSegmentLoop", fromSegment, toSegment, this.currentNode);
    }
  }

}

var codePathAnalyzer = CodePathAnalyzer;

function compareLocations(itemA, itemB) {
  return itemA.line - itemB.line || itemA.column - itemB.column;
}

function applyDirectives(options) {
  const problems = [];
  let nextDirectiveIndex = 0;
  let currentGlobalDisableDirective = null;
  const disabledRuleMap = new Map();
  const enabledRules = new Set();
  const usedDisableDirectives = new Set();

  for (const problem of options.problems) {
    while (nextDirectiveIndex < options.directives.length && compareLocations(options.directives[nextDirectiveIndex], problem) <= 0) {
      const directive = options.directives[nextDirectiveIndex++];

      switch (directive.type) {
        case "disable":
          if (directive.ruleId === null) {
            currentGlobalDisableDirective = directive;
            disabledRuleMap.clear();
            enabledRules.clear();
          } else if (currentGlobalDisableDirective) {
            enabledRules.delete(directive.ruleId);
            disabledRuleMap.set(directive.ruleId, directive);
          } else {
            disabledRuleMap.set(directive.ruleId, directive);
          }

          break;

        case "enable":
          if (directive.ruleId === null) {
            currentGlobalDisableDirective = null;
            disabledRuleMap.clear();
          } else if (currentGlobalDisableDirective) {
            enabledRules.add(directive.ruleId);
            disabledRuleMap.delete(directive.ruleId);
          } else {
            disabledRuleMap.delete(directive.ruleId);
          }

          break;
      }
    }

    if (disabledRuleMap.has(problem.ruleId)) {
      usedDisableDirectives.add(disabledRuleMap.get(problem.ruleId));
    } else if (currentGlobalDisableDirective && !enabledRules.has(problem.ruleId)) {
      usedDisableDirectives.add(currentGlobalDisableDirective);
    } else {
      problems.push(problem);
    }
  }

  const unusedDisableDirectives = options.directives.filter(directive => directive.type === "disable" && !usedDisableDirectives.has(directive)).map(directive => ({
    ruleId: null,
    message: directive.ruleId ? `Unused eslint-disable directive (no problems were reported from '${directive.ruleId}').` : "Unused eslint-disable directive (no problems were reported).",
    line: directive.unprocessedDirective.line,
    column: directive.unprocessedDirective.column,
    severity: options.reportUnusedDisableDirectives === "warn" ? 1 : 2,
    nodeType: null
  }));
  return {
    problems,
    unusedDisableDirectives
  };
}

var applyDisableDirectives = ({
  directives,
  problems,
  reportUnusedDisableDirectives = "off"
}) => {
  const blockDirectives = directives.filter(directive => directive.type === "disable" || directive.type === "enable").map(directive => Object.assign({}, directive, {
    unprocessedDirective: directive
  })).sort(compareLocations);
  const lineDirectives = lodash__default['default'].flatMap(directives, directive => {
    switch (directive.type) {
      case "disable":
      case "enable":
        return [];

      case "disable-line":
        return [{
          type: "disable",
          line: directive.line,
          column: 1,
          ruleId: directive.ruleId,
          unprocessedDirective: directive
        }, {
          type: "enable",
          line: directive.line + 1,
          column: 0,
          ruleId: directive.ruleId,
          unprocessedDirective: directive
        }];

      case "disable-next-line":
        return [{
          type: "disable",
          line: directive.line + 1,
          column: 1,
          ruleId: directive.ruleId,
          unprocessedDirective: directive
        }, {
          type: "enable",
          line: directive.line + 2,
          column: 0,
          ruleId: directive.ruleId,
          unprocessedDirective: directive
        }];

      default:
        throw new TypeError(`Unrecognized directive type '${directive.type}'`);
    }
  }).sort(compareLocations);
  const blockDirectivesResult = applyDirectives({
    problems,
    directives: blockDirectives,
    reportUnusedDisableDirectives
  });
  const lineDirectivesResult = applyDirectives({
    problems: blockDirectivesResult.problems,
    directives: lineDirectives,
    reportUnusedDisableDirectives
  });
  return reportUnusedDisableDirectives !== "off" ? lineDirectivesResult.problems.concat(blockDirectivesResult.unusedDisableDirectives).concat(lineDirectivesResult.unusedDisableDirectives).sort(compareLocations) : lineDirectivesResult.problems;
};

const debug$2 = debug__default['default']("eslint:config-comment-parser");
var configCommentParser = class {
  parseStringConfig(string, comment) {
    debug$2("Parsing String config");
    const items = {};
    const trimmedString = string.replace(/\s*([:,])\s*/gu, "$1");
    trimmedString.split(/\s|,+/u).forEach(name => {
      if (!name) {
        return;
      }

      const [key, value = null] = name.split(":");
      items[key] = {
        value,
        comment
      };
    });
    return items;
  }

  parseJsonConfig(string, location) {
    debug$2("Parsing JSON config");
    let items = {};

    try {
      items = levn__default['default'].parse("Object", string) || {};

      if (configOps__default['default'].isEverySeverityValid(items)) {
        return {
          success: true,
          config: items
        };
      }
    } catch {
      debug$2("Levn parsing failed; falling back to manual parsing.");
    }

    items = {};
    const normalizedString = string.replace(/([-a-zA-Z0-9/]+):/gu, "\"$1\":").replace(/(\]|[0-9])\s+(?=")/u, "$1,");

    try {
      items = JSON.parse(`{${normalizedString}}`);
    } catch (ex) {
      debug$2("Manual parsing failed.");
      return {
        success: false,
        error: {
          ruleId: null,
          fatal: true,
          severity: 2,
          message: `Failed to parse JSON from '${normalizedString}': ${ex.message}`,
          line: location.start.line,
          column: location.start.column + 1
        }
      };
    }

    return {
      success: true,
      config: items
    };
  }

  parseListConfig(string) {
    debug$2("Parsing list config");
    const items = {};
    string.replace(/\s*,\s*/gu, ",").split(/,+/u).forEach(name => {
      const trimmedName = name.trim();

      if (trimmedName) {
        items[trimmedName] = true;
      }
    });
    return items;
  }

};

function getPossibleTypes(parsedSelector) {
  switch (parsedSelector.type) {
    case "identifier":
      return [parsedSelector.value];

    case "matches":
      {
        const typesForComponents = parsedSelector.selectors.map(getPossibleTypes);

        if (typesForComponents.every(Boolean)) {
          return lodash__default['default'].union(...typesForComponents);
        }

        return null;
      }

    case "compound":
      {
        const typesForComponents = parsedSelector.selectors.map(getPossibleTypes).filter(typesForComponent => typesForComponent);

        if (!typesForComponents.length) {
          return null;
        }

        return lodash__default['default'].intersection(...typesForComponents);
      }

    case "child":
    case "descendant":
    case "sibling":
    case "adjacent":
      return getPossibleTypes(parsedSelector.right);

    default:
      return null;
  }
}

function countClassAttributes(parsedSelector) {
  switch (parsedSelector.type) {
    case "child":
    case "descendant":
    case "sibling":
    case "adjacent":
      return countClassAttributes(parsedSelector.left) + countClassAttributes(parsedSelector.right);

    case "compound":
    case "not":
    case "matches":
      return parsedSelector.selectors.reduce((sum, childSelector) => sum + countClassAttributes(childSelector), 0);

    case "attribute":
    case "field":
    case "nth-child":
    case "nth-last-child":
      return 1;

    default:
      return 0;
  }
}

function countIdentifiers(parsedSelector) {
  switch (parsedSelector.type) {
    case "child":
    case "descendant":
    case "sibling":
    case "adjacent":
      return countIdentifiers(parsedSelector.left) + countIdentifiers(parsedSelector.right);

    case "compound":
    case "not":
    case "matches":
      return parsedSelector.selectors.reduce((sum, childSelector) => sum + countIdentifiers(childSelector), 0);

    case "identifier":
      return 1;

    default:
      return 0;
  }
}

function compareSpecificity(selectorA, selectorB) {
  return selectorA.attributeCount - selectorB.attributeCount || selectorA.identifierCount - selectorB.identifierCount || (selectorA.rawSelector <= selectorB.rawSelector ? -1 : 1);
}

function tryParseSelector(rawSelector) {
  try {
    return esquery__default['default'].parse(rawSelector.replace(/:exit$/u, ""));
  } catch (err) {
    if (err.location && err.location.start && typeof err.location.start.offset === "number") {
      throw new SyntaxError(`Syntax error in selector "${rawSelector}" at position ${err.location.start.offset}: ${err.message}`);
    }

    throw err;
  }
}

const parseSelector = lodash__default['default'].memoize(rawSelector => {
  const parsedSelector = tryParseSelector(rawSelector);
  return {
    rawSelector,
    isExit: rawSelector.endsWith(":exit"),
    parsedSelector,
    listenerTypes: getPossibleTypes(parsedSelector),
    attributeCount: countClassAttributes(parsedSelector),
    identifierCount: countIdentifiers(parsedSelector)
  };
});

class NodeEventGenerator {
  constructor(emitter, esqueryOptions) {
    this.emitter = emitter;
    this.esqueryOptions = esqueryOptions;
    this.currentAncestry = [];
    this.enterSelectorsByNodeType = new Map();
    this.exitSelectorsByNodeType = new Map();
    this.anyTypeEnterSelectors = [];
    this.anyTypeExitSelectors = [];
    emitter.eventNames().forEach(rawSelector => {
      const selector = parseSelector(rawSelector);

      if (selector.listenerTypes) {
        const typeMap = selector.isExit ? this.exitSelectorsByNodeType : this.enterSelectorsByNodeType;
        selector.listenerTypes.forEach(nodeType => {
          if (!typeMap.has(nodeType)) {
            typeMap.set(nodeType, []);
          }

          typeMap.get(nodeType).push(selector);
        });
        return;
      }

      const selectors = selector.isExit ? this.anyTypeExitSelectors : this.anyTypeEnterSelectors;
      selectors.push(selector);
    });
    this.anyTypeEnterSelectors.sort(compareSpecificity);
    this.anyTypeExitSelectors.sort(compareSpecificity);
    this.enterSelectorsByNodeType.forEach(selectorList => selectorList.sort(compareSpecificity));
    this.exitSelectorsByNodeType.forEach(selectorList => selectorList.sort(compareSpecificity));
  }

  applySelector(node, selector) {
    if (esquery__default['default'].matches(node, selector.parsedSelector, this.currentAncestry, this.esqueryOptions)) {
      this.emitter.emit(selector.rawSelector, node);
    }
  }

  applySelectors(node, isExit) {
    const selectorsByNodeType = (isExit ? this.exitSelectorsByNodeType : this.enterSelectorsByNodeType).get(node.type) || [];
    const anyTypeSelectors = isExit ? this.anyTypeExitSelectors : this.anyTypeEnterSelectors;
    let selectorsByTypeIndex = 0;
    let anyTypeSelectorsIndex = 0;

    while (selectorsByTypeIndex < selectorsByNodeType.length || anyTypeSelectorsIndex < anyTypeSelectors.length) {
      if (selectorsByTypeIndex >= selectorsByNodeType.length || anyTypeSelectorsIndex < anyTypeSelectors.length && compareSpecificity(anyTypeSelectors[anyTypeSelectorsIndex], selectorsByNodeType[selectorsByTypeIndex]) < 0) {
        this.applySelector(node, anyTypeSelectors[anyTypeSelectorsIndex++]);
      } else {
        this.applySelector(node, selectorsByNodeType[selectorsByTypeIndex++]);
      }
    }
  }

  enterNode(node) {
    if (node.parent) {
      this.currentAncestry.unshift(node.parent);
    }

    this.applySelectors(node, false);
  }

  leaveNode(node) {
    this.applySelectors(node, true);
    this.currentAncestry.shift();
  }

}

var nodeEventGenerator = NodeEventGenerator;

function insertTextAt(index, text) {
  return {
    range: [index, index],
    text
  };
}

const ruleFixer = Object.freeze({
  insertTextAfter(nodeOrToken, text) {
    return this.insertTextAfterRange(nodeOrToken.range, text);
  },

  insertTextAfterRange(range, text) {
    return insertTextAt(range[1], text);
  },

  insertTextBefore(nodeOrToken, text) {
    return this.insertTextBeforeRange(nodeOrToken.range, text);
  },

  insertTextBeforeRange(range, text) {
    return insertTextAt(range[0], text);
  },

  replaceText(nodeOrToken, text) {
    return this.replaceTextRange(nodeOrToken.range, text);
  },

  replaceTextRange(range, text) {
    return {
      range,
      text
    };
  },

  remove(nodeOrToken) {
    return this.removeRange(nodeOrToken.range);
  },

  removeRange(range) {
    return {
      range,
      text: ""
    };
  }

});
var ruleFixer_1 = ruleFixer;

var interpolate = (text, data) => {
  if (!data) {
    return text;
  }

  return text.replace(/\{\{([^{}]+?)\}\}/gu, (fullMatch, termWithWhitespace) => {
    const term = termWithWhitespace.trim();

    if (term in data) {
      return data[term];
    }

    return fullMatch;
  });
};

function normalizeMultiArgReportCall(...args) {
  if (args.length === 1) {
    return Object.assign({}, args[0]);
  }

  if (typeof args[1] === "string") {
    return {
      node: args[0],
      message: args[1],
      data: args[2],
      fix: args[3]
    };
  }

  return {
    node: args[0],
    loc: args[1],
    message: args[2],
    data: args[3],
    fix: args[4]
  };
}

function assertValidNodeInfo(descriptor) {
  if (descriptor.node) {
    assert__default['default'](typeof descriptor.node === "object", "Node must be an object");
  } else {
    assert__default['default'](descriptor.loc, "Node must be provided when reporting error if location is not provided");
  }
}

function normalizeReportLoc(descriptor) {
  if (descriptor.loc) {
    if (descriptor.loc.start) {
      return descriptor.loc;
    }

    return {
      start: descriptor.loc,
      end: null
    };
  }

  return descriptor.node.loc;
}

function assertValidFix(fix) {
  if (fix) {
    assert__default['default'](fix.range && typeof fix.range[0] === "number" && typeof fix.range[1] === "number", `Fix has invalid range: ${JSON.stringify(fix, null, 2)}`);
  }
}

function compareFixesByRange(a, b) {
  return a.range[0] - b.range[0] || a.range[1] - b.range[1];
}

function mergeFixes(fixes, sourceCode) {
  for (const fix of fixes) {
    assertValidFix(fix);
  }

  if (fixes.length === 0) {
    return null;
  }

  if (fixes.length === 1) {
    return fixes[0];
  }

  fixes.sort(compareFixesByRange);
  const originalText = sourceCode.text;
  const start = fixes[0].range[0];
  const end = fixes[fixes.length - 1].range[1];
  let text = "";
  let lastPos = Number.MIN_SAFE_INTEGER;

  for (const fix of fixes) {
    assert__default['default'](fix.range[0] >= lastPos, "Fix objects must not be overlapped in a report.");

    if (fix.range[0] >= 0) {
      text += originalText.slice(Math.max(0, start, lastPos), fix.range[0]);
    }

    text += fix.text;
    lastPos = fix.range[1];
  }

  text += originalText.slice(Math.max(0, start, lastPos), end);
  return {
    range: [start, end],
    text
  };
}

function normalizeFixes(descriptor, sourceCode) {
  if (typeof descriptor.fix !== "function") {
    return null;
  }

  const fix = descriptor.fix(ruleFixer_1);

  if (fix && Symbol.iterator in fix) {
    return mergeFixes(Array.from(fix), sourceCode);
  }

  assertValidFix(fix);
  return fix;
}

function mapSuggestions(descriptor, sourceCode, messages) {
  if (!descriptor.suggest || !Array.isArray(descriptor.suggest)) {
    return [];
  }

  return descriptor.suggest.map(suggestInfo => {
    const computedDesc = suggestInfo.desc || messages[suggestInfo.messageId];
    return { ...suggestInfo,
      desc: interpolate(computedDesc, suggestInfo.data),
      fix: normalizeFixes(suggestInfo, sourceCode)
    };
  }).filter(({
    fix
  }) => fix);
}

function createProblem(options) {
  const problem = {
    ruleId: options.ruleId,
    severity: options.severity,
    message: options.message,
    line: options.loc.start.line,
    column: options.loc.start.column + 1,
    nodeType: options.node && options.node.type || null
  };

  if (options.messageId) {
    problem.messageId = options.messageId;
  }

  if (options.loc.end) {
    problem.endLine = options.loc.end.line;
    problem.endColumn = options.loc.end.column + 1;
  }

  if (options.fix) {
    problem.fix = options.fix;
  }

  if (options.suggestions && options.suggestions.length > 0) {
    problem.suggestions = options.suggestions;
  }

  return problem;
}

function validateSuggestions(suggest, messages) {
  if (suggest && Array.isArray(suggest)) {
    suggest.forEach(suggestion => {
      if (suggestion.messageId) {
        const {
          messageId
        } = suggestion;

        if (!messages) {
          throw new TypeError(`context.report() called with a suggest option with a messageId '${messageId}', but no messages were present in the rule metadata.`);
        }

        if (!messages[messageId]) {
          throw new TypeError(`context.report() called with a suggest option with a messageId '${messageId}' which is not present in the 'messages' config: ${JSON.stringify(messages, null, 2)}`);
        }

        if (suggestion.desc) {
          throw new TypeError("context.report() called with a suggest option that defines both a 'messageId' and an 'desc'. Please only pass one.");
        }
      } else if (!suggestion.desc) {
        throw new TypeError("context.report() called with a suggest option that doesn't have either a `desc` or `messageId`");
      }

      if (typeof suggestion.fix !== "function") {
        throw new TypeError(`context.report() called with a suggest option without a fix function. See: ${suggestion}`);
      }
    });
  }
}

var reportTranslator = function (metadata) {
  return (...args) => {
    const descriptor = normalizeMultiArgReportCall(...args);
    const messages = metadata.messageIds;
    assertValidNodeInfo(descriptor);
    let computedMessage;

    if (descriptor.messageId) {
      if (!messages) {
        throw new TypeError("context.report() called with a messageId, but no messages were present in the rule metadata.");
      }

      const id = descriptor.messageId;

      if (descriptor.message) {
        throw new TypeError("context.report() called with a message and a messageId. Please only pass one.");
      }

      if (!messages || !Object.prototype.hasOwnProperty.call(messages, id)) {
        throw new TypeError(`context.report() called with a messageId of '${id}' which is not present in the 'messages' config: ${JSON.stringify(messages, null, 2)}`);
      }

      computedMessage = messages[id];
    } else if (descriptor.message) {
      computedMessage = descriptor.message;
    } else {
      throw new TypeError("Missing `message` property in report() call; add a message that describes the linting problem.");
    }

    validateSuggestions(descriptor.suggest, messages);
    return createProblem({
      ruleId: metadata.ruleId,
      severity: metadata.severity,
      node: descriptor.node,
      message: interpolate(computedMessage, descriptor.data),
      messageId: descriptor.messageId,
      loc: normalizeReportLoc(descriptor),
      fix: metadata.disableFixes ? null : normalizeFixes(descriptor, metadata.sourceCode),
      suggestions: metadata.disableFixes ? [] : mapSuggestions(descriptor, metadata.sourceCode, messages)
    });
  };
};

var rulesIndex = new Map();

function normalizeRule(rule) {
  return typeof rule === "function" ? Object.assign({
    create: rule
  }, rule) : rule;
}

class Rules {
  constructor() {
    this._rules = Object.create(null);
  }

  define(ruleId, ruleModule) {
    this._rules[ruleId] = normalizeRule(ruleModule);
  }

  get(ruleId) {
    if (typeof this._rules[ruleId] === "string") {
      this.define(ruleId, null);
    }

    if (this._rules[ruleId]) {
      return this._rules[ruleId];
    }

    if (rulesIndex.has(ruleId)) {
      return rulesIndex.get(ruleId);
    }

    return null;
  }

  *[Symbol.iterator]() {
    yield* rulesIndex;

    for (const ruleId of Object.keys(this._rules)) {
      yield [ruleId, this.get(ruleId)];
    }
  }

}

var rules$1 = Rules;

var safeEmitter = () => {
  const listeners = Object.create(null);
  return Object.freeze({
    on(eventName, listener) {
      if (eventName in listeners) {
        listeners[eventName].push(listener);
      } else {
        listeners[eventName] = [listener];
      }
    },

    emit(eventName, ...args) {
      if (eventName in listeners) {
        listeners[eventName].forEach(listener => listener(...args));
      }
    },

    eventNames() {
      return Object.keys(listeners);
    }

  });
};

const debug$1 = debug__default['default']("eslint:source-code-fixer");
const BOM = "\uFEFF";

function compareMessagesByFixRange(a, b) {
  return a.fix.range[0] - b.fix.range[0] || a.fix.range[1] - b.fix.range[1];
}

function compareMessagesByLocation(a, b) {
  return a.line - b.line || a.column - b.column;
}

function SourceCodeFixer() {
  Object.freeze(this);
}

SourceCodeFixer.applyFixes = function (sourceText, messages, shouldFix) {
  debug$1("Applying fixes");

  if (shouldFix === false) {
    debug$1("shouldFix parameter was false, not attempting fixes");
    return {
      fixed: false,
      messages,
      output: sourceText
    };
  }

  const remainingMessages = [],
        fixes = [],
        bom = sourceText.startsWith(BOM) ? BOM : "",
        text = bom ? sourceText.slice(1) : sourceText;
  let lastPos = Number.NEGATIVE_INFINITY,
      output = bom;

  function attemptFix(problem) {
    const fix = problem.fix;
    const start = fix.range[0];
    const end = fix.range[1];

    if (lastPos >= start || start > end) {
      remainingMessages.push(problem);
      return false;
    }

    if (start < 0 && end >= 0 || start === 0 && fix.text.startsWith(BOM)) {
      output = "";
    }

    output += text.slice(Math.max(0, lastPos), Math.max(0, start));
    output += fix.text;
    lastPos = end;
    return true;
  }

  messages.forEach(problem => {
    if (Object.prototype.hasOwnProperty.call(problem, "fix")) {
      fixes.push(problem);
    } else {
      remainingMessages.push(problem);
    }
  });

  if (fixes.length) {
    debug$1("Found fixes to apply");
    let fixesWereApplied = false;

    for (const problem of fixes.sort(compareMessagesByFixRange)) {
      if (typeof shouldFix !== "function" || shouldFix(problem)) {
        attemptFix(problem);
        fixesWereApplied = true;
      } else {
        remainingMessages.push(problem);
      }
    }

    output += text.slice(Math.max(0, lastPos));
    return {
      fixed: fixesWereApplied,
      messages: remainingMessages.sort(compareMessagesByLocation),
      output
    };
  }

  debug$1("No fixes to apply");
  return {
    fixed: false,
    messages,
    output: bom + text
  };
};

var sourceCodeFixer = SourceCodeFixer;

function alignLeft(str, len, ch) {
  return str + new Array(len - str.length + 1).join(ch || " ");
}

function alignRight(str, len, ch) {
  return new Array(len - str.length + 1).join(ch || " ") + str;
}

const enabled = false;
const HEADERS = ["Rule", "Time (ms)", "Relative"];
const ALIGN = [alignLeft, alignRight, alignRight];

function getListSize() {
  const TIMING_ENV_VAR_AS_INTEGER = Number.parseInt("", 10);
  return 10;
}

function display(data) {
  let total = 0;
  const rows = Object.keys(data).map(key => {
    const time = data[key];
    total += time;
    return [key, time];
  }).sort((a, b) => b[1] - a[1]).slice(0, getListSize());
  rows.forEach(row => {
    row.push(`${(row[1] * 100 / total).toFixed(1)}%`);
    row[1] = row[1].toFixed(3);
  });
  rows.unshift(HEADERS);
  const widths = [];
  rows.forEach(row => {
    const len = row.length;

    for (let i = 0; i < len; i++) {
      const n = row[i].length;

      if (!widths[i] || n > widths[i]) {
        widths[i] = n;
      }
    }
  });
  const table = rows.map(row => row.map((cell, index) => ALIGN[index](cell, widths[index])).join(" | "));
  table.splice(1, 0, widths.map((width, index) => {
    const extraAlignment = index !== 0 && index !== widths.length - 1 ? 2 : 1;
    return ALIGN[index](":", width + extraAlignment, "-");
  }).join("|"));
  console.log(table.join("\n"));
}

var timing = function () {
  const data = Object.create(null);

  if (enabled) {
    process.on("exit", () => {
      display(data);
    });
  }

  return {
    time: function (key, fn) {
      if (typeof data[key] === "undefined") {
        data[key] = 0;
      }

      return function (...args) {
        let t = process.hrtime();
        fn(...args);
        t = process.hrtime(t);
        data[key] += t[0] * 1e3 + t[1] / 1e6;
      };
    },
    enabled,
    getListSize
  };
}();

const rules = {
  "generator-star": ["generator-star-spacing"],
  "global-strict": ["strict"],
  "no-arrow-condition": ["no-confusing-arrow", "no-constant-condition"],
  "no-comma-dangle": ["comma-dangle"],
  "no-empty-class": ["no-empty-character-class"],
  "no-empty-label": ["no-labels"],
  "no-extra-strict": ["strict"],
  "no-reserved-keys": ["quote-props"],
  "no-space-before-semi": ["semi-spacing"],
  "no-wrap-func": ["no-extra-parens"],
  "space-after-function-name": ["space-before-function-paren"],
  "space-after-keywords": ["keyword-spacing"],
  "space-before-function-parentheses": ["space-before-function-paren"],
  "space-before-keywords": ["keyword-spacing"],
  "space-in-brackets": ["object-curly-spacing", "array-bracket-spacing", "computed-property-spacing"],
  "space-return-throw-case": ["keyword-spacing"],
  "space-unary-word-ops": ["space-unary-ops"],
  "spaced-line-comment": ["spaced-comment"]
};
var replacements = {
  rules: rules
};
var replacements$1 = Object.freeze({
  __proto__: null,
  rules: rules,
  'default': replacements
});

var pkg = _commonjsHelpers.getCjsExportFromNamespace(_package$1);

var ruleReplacements = _commonjsHelpers.getCjsExportFromNamespace(replacements$1);

const {
  SourceCode
} = sourceCode;
const debug = debug__default['default']("eslint:linter");
const MAX_AUTOFIX_PASSES = 10;
const DEFAULT_PARSER_NAME = "espree";
const commentParser = new configCommentParser();
const DEFAULT_ERROR_LOC = {
  start: {
    line: 1,
    column: 0
  },
  end: {
    line: 1,
    column: 1
  }
};

function addDeclaredGlobals(globalScope, configGlobals, {
  exportedVariables,
  enabledGlobals
}) {
  for (const id of new Set([...Object.keys(configGlobals), ...Object.keys(enabledGlobals)])) {
    const configValue = configGlobals[id] === void 0 ? void 0 : configOps__default['default'].normalizeConfigGlobal(configGlobals[id]);
    const commentValue = enabledGlobals[id] && enabledGlobals[id].value;
    const value = commentValue || configValue;
    const sourceComments = enabledGlobals[id] && enabledGlobals[id].comments;

    if (value === "off") {
      continue;
    }

    let variable = globalScope.set.get(id);

    if (!variable) {
      variable = new eslintScope__default['default'].Variable(id, globalScope);
      globalScope.variables.push(variable);
      globalScope.set.set(id, variable);
    }

    variable.eslintImplicitGlobalSetting = configValue;
    variable.eslintExplicitGlobal = sourceComments !== void 0;
    variable.eslintExplicitGlobalComments = sourceComments;
    variable.writeable = value === "writable";
  }

  Object.keys(exportedVariables).forEach(name => {
    const variable = globalScope.set.get(name);

    if (variable) {
      variable.eslintUsed = true;
    }
  });
  globalScope.through = globalScope.through.filter(reference => {
    const name = reference.identifier.name;
    const variable = globalScope.set.get(name);

    if (variable) {
      reference.resolved = variable;
      variable.references.push(reference);
      return false;
    }

    return true;
  });
}

function createMissingRuleMessage(ruleId) {
  return Object.prototype.hasOwnProperty.call(ruleReplacements.rules, ruleId) ? `Rule '${ruleId}' was removed and replaced by: ${ruleReplacements.rules[ruleId].join(", ")}` : `Definition for rule '${ruleId}' was not found.`;
}

function createLintingProblem(options) {
  const {
    ruleId = null,
    loc = DEFAULT_ERROR_LOC,
    message = createMissingRuleMessage(options.ruleId),
    severity = 2
  } = options;
  return {
    ruleId,
    message,
    line: loc.start.line,
    column: loc.start.column + 1,
    endLine: loc.end.line,
    endColumn: loc.end.column + 1,
    severity,
    nodeType: null
  };
}

function createDisableDirectives(options) {
  const {
    type,
    loc,
    value,
    ruleMapper
  } = options;
  const ruleIds = Object.keys(commentParser.parseListConfig(value));
  const directiveRules = ruleIds.length ? ruleIds : [null];
  const result = {
    directives: [],
    directiveProblems: []
  };

  for (const ruleId of directiveRules) {
    if (ruleId === null || ruleMapper(ruleId) !== null) {
      result.directives.push({
        type,
        line: loc.start.line,
        column: loc.start.column + 1,
        ruleId
      });
    } else {
      result.directiveProblems.push(createLintingProblem({
        ruleId,
        loc
      }));
    }
  }

  return result;
}

function stripDirectiveComment(value) {
  return value.split(/\s-{2,}\s/u)[0].trim();
}

function getDirectiveComments(filename, ast, ruleMapper, warnInlineConfig) {
  const configuredRules = {};
  const enabledGlobals = Object.create(null);
  const exportedVariables = {};
  const problems = [];
  const disableDirectives = [];
  const validator = new configValidator__default['default']({
    builtInRules: rules$1
  });
  ast.comments.filter(token => token.type !== "Shebang").forEach(comment => {
    const trimmedCommentText = stripDirectiveComment(comment.value);
    const match = /^(eslint(?:-env|-enable|-disable(?:(?:-next)?-line)?)?|exported|globals?)(?:\s|$)/u.exec(trimmedCommentText);

    if (!match) {
      return;
    }

    const directiveText = match[1];
    const lineCommentSupported = /^eslint-disable-(next-)?line$/u.test(directiveText);

    if (comment.type === "Line" && !lineCommentSupported) {
      return;
    }

    if (warnInlineConfig) {
      const kind = comment.type === "Block" ? `/*${directiveText}*/` : `//${directiveText}`;
      problems.push(createLintingProblem({
        ruleId: null,
        message: `'${kind}' has no effect because you have 'noInlineConfig' setting in ${warnInlineConfig}.`,
        loc: comment.loc,
        severity: 1
      }));
      return;
    }

    if (lineCommentSupported && comment.loc.start.line !== comment.loc.end.line) {
      problems.push(createLintingProblem({
        ruleId: null,
        message: `${directiveText} comment should not span multiple lines.`,
        loc: comment.loc
      }));
      return;
    }

    const directiveValue = trimmedCommentText.slice(match.index + directiveText.length);

    switch (directiveText) {
      case "eslint-disable":
      case "eslint-enable":
      case "eslint-disable-next-line":
      case "eslint-disable-line":
        {
          const directiveType = directiveText.slice(7);
          const options = {
            type: directiveType,
            loc: comment.loc,
            value: directiveValue,
            ruleMapper
          };
          const {
            directives,
            directiveProblems
          } = createDisableDirectives(options);
          disableDirectives.push(...directives);
          problems.push(...directiveProblems);
          break;
        }

      case "exported":
        Object.assign(exportedVariables, commentParser.parseStringConfig(directiveValue, comment));
        break;

      case "globals":
      case "global":
        for (const [id, {
          value
        }] of Object.entries(commentParser.parseStringConfig(directiveValue, comment))) {
          let normalizedValue;

          try {
            normalizedValue = configOps__default['default'].normalizeConfigGlobal(value);
          } catch (err) {
            problems.push(createLintingProblem({
              ruleId: null,
              loc: comment.loc,
              message: err.message
            }));
            continue;
          }

          if (enabledGlobals[id]) {
            enabledGlobals[id].comments.push(comment);
            enabledGlobals[id].value = normalizedValue;
          } else {
            enabledGlobals[id] = {
              comments: [comment],
              value: normalizedValue
            };
          }
        }

        break;

      case "eslint":
        {
          const parseResult = commentParser.parseJsonConfig(directiveValue, comment.loc);

          if (parseResult.success) {
            Object.keys(parseResult.config).forEach(name => {
              const rule = ruleMapper(name);
              const ruleValue = parseResult.config[name];

              if (rule === null) {
                problems.push(createLintingProblem({
                  ruleId: name,
                  loc: comment.loc
                }));
                return;
              }

              try {
                validator.validateRuleOptions(rule, name, ruleValue);
              } catch (err) {
                problems.push(createLintingProblem({
                  ruleId: name,
                  message: err.message,
                  loc: comment.loc
                }));
                return;
              }

              configuredRules[name] = ruleValue;
            });
          } else {
            problems.push(parseResult.error);
          }

          break;
        }
    }
  });
  return {
    configuredRules,
    enabledGlobals,
    exportedVariables,
    problems,
    disableDirectives
  };
}

function normalizeEcmaVersion(ecmaVersion) {
  return ecmaVersion >= 2015 ? ecmaVersion - 2009 : ecmaVersion;
}

const eslintEnvPattern = /\/\*\s*eslint-env\s(.+?)\*\//gu;

function findEslintEnv(text) {
  let match, retv;
  eslintEnvPattern.lastIndex = 0;

  while ((match = eslintEnvPattern.exec(text)) !== null) {
    retv = Object.assign(retv || {}, commentParser.parseListConfig(stripDirectiveComment(match[1])));
  }

  return retv;
}

function normalizeFilename(filename) {
  const parts = filename.split(path__default['default'].sep);
  const index = parts.lastIndexOf("<text>");
  return index === -1 ? filename : parts.slice(index).join(path__default['default'].sep);
}

function normalizeVerifyOptions(providedOptions, config) {
  const disableInlineConfig = config.noInlineConfig === true;
  const ignoreInlineConfig = providedOptions.allowInlineConfig === false;
  const configNameOfNoInlineConfig = config.configNameOfNoInlineConfig ? ` (${config.configNameOfNoInlineConfig})` : "";
  let reportUnusedDisableDirectives = providedOptions.reportUnusedDisableDirectives;

  if (typeof reportUnusedDisableDirectives === "boolean") {
    reportUnusedDisableDirectives = reportUnusedDisableDirectives ? "error" : "off";
  }

  if (typeof reportUnusedDisableDirectives !== "string") {
    reportUnusedDisableDirectives = config.reportUnusedDisableDirectives ? "warn" : "off";
  }

  return {
    filename: normalizeFilename(providedOptions.filename || "<input>"),
    allowInlineConfig: !ignoreInlineConfig,
    warnInlineConfig: disableInlineConfig && !ignoreInlineConfig ? `your config${configNameOfNoInlineConfig}` : null,
    reportUnusedDisableDirectives,
    disableFixes: Boolean(providedOptions.disableFixes)
  };
}

function resolveParserOptions(parserName, providedOptions, enabledEnvironments) {
  const parserOptionsFromEnv = enabledEnvironments.filter(env => env.parserOptions).reduce((parserOptions, env) => lodash__default['default'].merge(parserOptions, env.parserOptions), {});
  const mergedParserOptions = lodash__default['default'].merge(parserOptionsFromEnv, providedOptions || {});
  const isModule = mergedParserOptions.sourceType === "module";

  if (isModule) {
    mergedParserOptions.ecmaFeatures = Object.assign({}, mergedParserOptions.ecmaFeatures, {
      globalReturn: false
    });
  }

  mergedParserOptions.ecmaVersion = normalizeEcmaVersion(mergedParserOptions.ecmaVersion);
  return mergedParserOptions;
}

function resolveGlobals(providedGlobals, enabledEnvironments) {
  return Object.assign({}, ...enabledEnvironments.filter(env => env.globals).map(env => env.globals), providedGlobals);
}

function stripUnicodeBOM(text) {
  if (text.charCodeAt(0) === 0xFEFF) {
    return text.slice(1);
  }

  return text;
}

function getRuleOptions(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig.slice(1);
  }

  return [];
}

function analyzeScope(ast, parserOptions, visitorKeys) {
  const ecmaFeatures = parserOptions.ecmaFeatures || {};
  const ecmaVersion = parserOptions.ecmaVersion || 5;
  return eslintScope__default['default'].analyze(ast, {
    ignoreEval: true,
    nodejsScope: ecmaFeatures.globalReturn,
    impliedStrict: ecmaFeatures.impliedStrict,
    ecmaVersion,
    sourceType: parserOptions.sourceType || "script",
    childVisitorKeys: visitorKeys || eslintVisitorKeys__default['default'].KEYS,
    fallback: _commonjsHelpers.traverser.getKeys
  });
}

function parse(text, parser, providedParserOptions, filePath) {
  const textToParse = stripUnicodeBOM(text).replace(_commonjsHelpers.astUtils.shebangPattern, (match, captured) => `//${captured}`);
  const parserOptions = Object.assign({}, providedParserOptions, {
    loc: true,
    range: true,
    raw: true,
    tokens: true,
    comment: true,
    eslintVisitorKeys: true,
    eslintScopeManager: true,
    filePath
  });

  try {
    const parseResult = typeof parser.parseForESLint === "function" ? parser.parseForESLint(textToParse, parserOptions) : {
      ast: parser.parse(textToParse, parserOptions)
    };
    const ast = parseResult.ast;
    const parserServices = parseResult.services || {};
    const visitorKeys = parseResult.visitorKeys || eslintVisitorKeys__default['default'].KEYS;
    const scopeManager = parseResult.scopeManager || analyzeScope(ast, parserOptions, visitorKeys);
    return {
      success: true,
      sourceCode: new SourceCode({
        text,
        ast,
        parserServices,
        scopeManager,
        visitorKeys
      })
    };
  } catch (ex) {
    const message = `Parsing error: ${ex.message.replace(/^line \d+:/iu, "").trim()}`;
    debug("%s\n%s", message, ex.stack);
    return {
      success: false,
      error: {
        ruleId: null,
        fatal: true,
        severity: 2,
        message,
        line: ex.lineNumber,
        column: ex.column
      }
    };
  }
}

function getScope(scopeManager, currentNode) {
  const inner = currentNode.type !== "Program";

  for (let node = currentNode; node; node = node.parent) {
    const scope = scopeManager.acquire(node, inner);

    if (scope) {
      if (scope.type === "function-expression-name") {
        return scope.childScopes[0];
      }

      return scope;
    }
  }

  return scopeManager.scopes[0];
}

function markVariableAsUsed(scopeManager, currentNode, parserOptions, name) {
  const hasGlobalReturn = parserOptions.ecmaFeatures && parserOptions.ecmaFeatures.globalReturn;
  const specialScope = hasGlobalReturn || parserOptions.sourceType === "module";
  const currentScope = getScope(scopeManager, currentNode);
  const initialScope = currentScope.type === "global" && specialScope ? currentScope.childScopes[0] : currentScope;

  for (let scope = initialScope; scope; scope = scope.upper) {
    const variable = scope.variables.find(scopeVar => scopeVar.name === name);

    if (variable) {
      variable.eslintUsed = true;
      return true;
    }
  }

  return false;
}

function createRuleListeners(rule, ruleContext) {
  try {
    return rule.create(ruleContext);
  } catch (ex) {
    ex.message = `Error while loading rule '${ruleContext.id}': ${ex.message}`;
    throw ex;
  }
}

function getAncestors(node) {
  const ancestorsStartingAtParent = [];

  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    ancestorsStartingAtParent.push(ancestor);
  }

  return ancestorsStartingAtParent.reverse();
}

const DEPRECATED_SOURCECODE_PASSTHROUGHS = {
  getSource: "getText",
  getSourceLines: "getLines",
  getAllComments: "getAllComments",
  getNodeByRangeIndex: "getNodeByRangeIndex",
  getComments: "getComments",
  getCommentsBefore: "getCommentsBefore",
  getCommentsAfter: "getCommentsAfter",
  getCommentsInside: "getCommentsInside",
  getJSDocComment: "getJSDocComment",
  getFirstToken: "getFirstToken",
  getFirstTokens: "getFirstTokens",
  getLastToken: "getLastToken",
  getLastTokens: "getLastTokens",
  getTokenAfter: "getTokenAfter",
  getTokenBefore: "getTokenBefore",
  getTokenByRangeStart: "getTokenByRangeStart",
  getTokens: "getTokens",
  getTokensAfter: "getTokensAfter",
  getTokensBefore: "getTokensBefore",
  getTokensBetween: "getTokensBetween"
};
const BASE_TRAVERSAL_CONTEXT = Object.freeze(Object.keys(DEPRECATED_SOURCECODE_PASSTHROUGHS).reduce((contextInfo, methodName) => Object.assign(contextInfo, {
  [methodName](...args) {
    return this.getSourceCode()[DEPRECATED_SOURCECODE_PASSTHROUGHS[methodName]](...args);
  }

}), {}));

function runRules(sourceCode, configuredRules, ruleMapper, parserOptions, parserName, settings, filename, disableFixes, cwd) {
  const emitter = safeEmitter();
  const nodeQueue = [];
  let currentNode = sourceCode.ast;

  _commonjsHelpers.traverser.traverse(sourceCode.ast, {
    enter(node, parent) {
      node.parent = parent;
      nodeQueue.push({
        isEntering: true,
        node
      });
    },

    leave(node) {
      nodeQueue.push({
        isEntering: false,
        node
      });
    },

    visitorKeys: sourceCode.visitorKeys
  });

  const sharedTraversalContext = Object.freeze(Object.assign(Object.create(BASE_TRAVERSAL_CONTEXT), {
    getAncestors: () => getAncestors(currentNode),
    getDeclaredVariables: sourceCode.scopeManager.getDeclaredVariables.bind(sourceCode.scopeManager),
    getCwd: () => cwd,
    getFilename: () => filename,
    getScope: () => getScope(sourceCode.scopeManager, currentNode),
    getSourceCode: () => sourceCode,
    markVariableAsUsed: name => markVariableAsUsed(sourceCode.scopeManager, currentNode, parserOptions, name),
    parserOptions,
    parserPath: parserName,
    parserServices: sourceCode.parserServices,
    settings
  }));
  const lintingProblems = [];
  Object.keys(configuredRules).forEach(ruleId => {
    const severity = configOps__default['default'].getRuleSeverity(configuredRules[ruleId]);

    if (severity === 0) {
      return;
    }

    const rule = ruleMapper(ruleId);

    if (rule === null) {
      lintingProblems.push(createLintingProblem({
        ruleId
      }));
      return;
    }

    const messageIds = rule.meta && rule.meta.messages;
    let reportTranslator$1 = null;
    const ruleContext = Object.freeze(Object.assign(Object.create(sharedTraversalContext), {
      id: ruleId,
      options: getRuleOptions(configuredRules[ruleId]),

      report(...args) {
        if (reportTranslator$1 === null) {
          reportTranslator$1 = reportTranslator({
            ruleId,
            severity,
            sourceCode,
            messageIds,
            disableFixes
          });
        }

        const problem = reportTranslator$1(...args);

        if (problem.fix && rule.meta && !rule.meta.fixable) {
          throw new Error("Fixable rules should export a `meta.fixable` property.");
        }

        lintingProblems.push(problem);
      }

    }));
    const ruleListeners = createRuleListeners(rule, ruleContext);
    Object.keys(ruleListeners).forEach(selector => {
      emitter.on(selector, timing.enabled ? timing.time(ruleId, ruleListeners[selector]) : ruleListeners[selector]);
    });
  });
  const eventGenerator = nodeQueue[0].node.type === "Program" ? new codePathAnalyzer(new nodeEventGenerator(emitter, {
    visitorKeys: sourceCode.visitorKeys,
    fallback: _commonjsHelpers.traverser.getKeys
  })) : new nodeEventGenerator(emitter, {
    visitorKeys: sourceCode.visitorKeys,
    fallback: _commonjsHelpers.traverser.getKeys
  });
  nodeQueue.forEach(traversalInfo => {
    currentNode = traversalInfo.node;

    try {
      if (traversalInfo.isEntering) {
        eventGenerator.enterNode(currentNode);
      } else {
        eventGenerator.leaveNode(currentNode);
      }
    } catch (err) {
      err.currentNode = currentNode;
      throw err;
    }
  });
  return lintingProblems;
}

function ensureText(textOrSourceCode) {
  if (typeof textOrSourceCode === "object") {
    const {
      hasBOM,
      text
    } = textOrSourceCode;
    const bom = hasBOM ? "\uFEFF" : "";
    return bom + text;
  }

  return String(textOrSourceCode);
}

function getEnv(slots, envId) {
  return slots.lastConfigArray && slots.lastConfigArray.pluginEnvironments.get(envId) || environments__default['default'].get(envId) || null;
}

function getRule(slots, ruleId) {
  return slots.lastConfigArray && slots.lastConfigArray.pluginRules.get(ruleId) || slots.ruleMap.get(ruleId);
}

function normalizeCwd(cwd) {
  if (cwd) {
    return cwd;
  }

  if (typeof process === "object") {
    return process.cwd();
  }

  return undefined;
}

const internalSlotsMap = new WeakMap();

class Linter$1 {
  constructor({
    cwd
  } = {}) {
    internalSlotsMap.set(this, {
      cwd: normalizeCwd(cwd),
      lastConfigArray: null,
      lastSourceCode: null,
      parserMap: new Map([["espree", espree__default['default']]]),
      ruleMap: new rules$1()
    });
    this.version = pkg.version;
  }

  static get version() {
    return pkg.version;
  }

  _verifyWithoutProcessors(textOrSourceCode, providedConfig, providedOptions) {
    const slots = internalSlotsMap.get(this);
    const config = providedConfig || {};
    const options = normalizeVerifyOptions(providedOptions, config);
    let text;

    if (typeof textOrSourceCode === "string") {
      slots.lastSourceCode = null;
      text = textOrSourceCode;
    } else {
      slots.lastSourceCode = textOrSourceCode;
      text = textOrSourceCode.text;
    }

    let parserName = DEFAULT_PARSER_NAME;
    let parser = espree__default['default'];

    if (typeof config.parser === "object" && config.parser !== null) {
      parserName = config.parser.filePath;
      parser = config.parser.definition;
    } else if (typeof config.parser === "string") {
      if (!slots.parserMap.has(config.parser)) {
        return [{
          ruleId: null,
          fatal: true,
          severity: 2,
          message: `Configured parser '${config.parser}' was not found.`,
          line: 0,
          column: 0
        }];
      }

      parserName = config.parser;
      parser = slots.parserMap.get(config.parser);
    }

    const envInFile = options.allowInlineConfig && !options.warnInlineConfig ? findEslintEnv(text) : {};
    const resolvedEnvConfig = Object.assign({
      builtin: true
    }, config.env, envInFile);
    const enabledEnvs = Object.keys(resolvedEnvConfig).filter(envName => resolvedEnvConfig[envName]).map(envName => getEnv(slots, envName)).filter(env => env);
    const parserOptions = resolveParserOptions(parserName, config.parserOptions || {}, enabledEnvs);
    const configuredGlobals = resolveGlobals(config.globals || {}, enabledEnvs);
    const settings = config.settings || {};

    if (!slots.lastSourceCode) {
      const parseResult = parse(text, parser, parserOptions, options.filename);

      if (!parseResult.success) {
        return [parseResult.error];
      }

      slots.lastSourceCode = parseResult.sourceCode;
    } else {
      if (!slots.lastSourceCode.scopeManager) {
        slots.lastSourceCode = new SourceCode({
          text: slots.lastSourceCode.text,
          ast: slots.lastSourceCode.ast,
          parserServices: slots.lastSourceCode.parserServices,
          visitorKeys: slots.lastSourceCode.visitorKeys,
          scopeManager: analyzeScope(slots.lastSourceCode.ast, parserOptions)
        });
      }
    }

    const sourceCode = slots.lastSourceCode;
    const commentDirectives = options.allowInlineConfig ? getDirectiveComments(options.filename, sourceCode.ast, ruleId => getRule(slots, ruleId), options.warnInlineConfig) : {
      configuredRules: {},
      enabledGlobals: {},
      exportedVariables: {},
      problems: [],
      disableDirectives: []
    };
    addDeclaredGlobals(sourceCode.scopeManager.scopes[0], configuredGlobals, {
      exportedVariables: commentDirectives.exportedVariables,
      enabledGlobals: commentDirectives.enabledGlobals
    });
    const configuredRules = Object.assign({}, config.rules, commentDirectives.configuredRules);
    let lintingProblems;

    try {
      lintingProblems = runRules(sourceCode, configuredRules, ruleId => getRule(slots, ruleId), parserOptions, parserName, settings, options.filename, options.disableFixes, slots.cwd);
    } catch (err) {
      err.message += `\nOccurred while linting ${options.filename}`;
      debug("An error occurred while traversing");
      debug("Filename:", options.filename);

      if (err.currentNode) {
        const {
          line
        } = err.currentNode.loc.start;
        debug("Line:", line);
        err.message += `:${line}`;
      }

      debug("Parser Options:", parserOptions);
      debug("Parser Path:", parserName);
      debug("Settings:", settings);
      throw err;
    }

    return applyDisableDirectives({
      directives: commentDirectives.disableDirectives,
      problems: lintingProblems.concat(commentDirectives.problems).sort((problemA, problemB) => problemA.line - problemB.line || problemA.column - problemB.column),
      reportUnusedDisableDirectives: options.reportUnusedDisableDirectives
    });
  }

  verify(textOrSourceCode, config, filenameOrOptions) {
    debug("Verify");
    const options = typeof filenameOrOptions === "string" ? {
      filename: filenameOrOptions
    } : filenameOrOptions || {};

    if (config && typeof config.extractConfig === "function") {
      return this._verifyWithConfigArray(textOrSourceCode, config, options);
    }

    if (options.preprocess || options.postprocess) {
      return this._verifyWithProcessor(textOrSourceCode, config, options);
    }

    return this._verifyWithoutProcessors(textOrSourceCode, config, options);
  }

  _verifyWithConfigArray(textOrSourceCode, configArray, options) {
    debug("With ConfigArray: %s", options.filename);
    internalSlotsMap.get(this).lastConfigArray = configArray;
    const config = configArray.extractConfig(options.filename);
    const processor = config.processor && configArray.pluginProcessors.get(config.processor);

    if (processor) {
      debug("Apply the processor: %o", config.processor);
      const {
        preprocess,
        postprocess,
        supportsAutofix
      } = processor;
      const disableFixes = options.disableFixes || !supportsAutofix;
      return this._verifyWithProcessor(textOrSourceCode, config, { ...options,
        disableFixes,
        postprocess,
        preprocess
      }, configArray);
    }

    return this._verifyWithoutProcessors(textOrSourceCode, config, options);
  }

  _verifyWithProcessor(textOrSourceCode, config, options, configForRecursive) {
    const filename = options.filename || "<input>";
    const filenameToExpose = normalizeFilename(filename);
    const text = ensureText(textOrSourceCode);

    const preprocess = options.preprocess || (rawText => [rawText]);

    const postprocess = options.postprocess || lodash__default['default'].flatten;

    const filterCodeBlock = options.filterCodeBlock || (blockFilename => blockFilename.endsWith(".js"));

    const originalExtname = path__default['default'].extname(filename);
    const messageLists = preprocess(text, filenameToExpose).map((block, i) => {
      debug("A code block was found: %o", block.filename || "(unnamed)");

      if (typeof block === "string") {
        return this._verifyWithoutProcessors(block, config, options);
      }

      const blockText = block.text;
      const blockName = path__default['default'].join(filename, `${i}_${block.filename}`);

      if (!filterCodeBlock(blockName, blockText)) {
        debug("This code block was skipped.");
        return [];
      }

      if (configForRecursive && path__default['default'].extname(blockName) !== originalExtname) {
        debug("Resolving configuration again because the file extension was changed.");
        return this._verifyWithConfigArray(blockText, configForRecursive, { ...options,
          filename: blockName
        });
      }

      return this._verifyWithoutProcessors(blockText, config, { ...options,
        filename: blockName
      });
    });
    return postprocess(messageLists, filenameToExpose);
  }

  getSourceCode() {
    return internalSlotsMap.get(this).lastSourceCode;
  }

  defineRule(ruleId, ruleModule) {
    internalSlotsMap.get(this).ruleMap.define(ruleId, ruleModule);
  }

  defineRules(rulesToDefine) {
    Object.getOwnPropertyNames(rulesToDefine).forEach(ruleId => {
      this.defineRule(ruleId, rulesToDefine[ruleId]);
    });
  }

  getRules() {
    const {
      lastConfigArray,
      ruleMap
    } = internalSlotsMap.get(this);
    return new Map(function* () {
      yield* ruleMap;

      if (lastConfigArray) {
        yield* lastConfigArray.pluginRules;
      }
    }());
  }

  defineParser(parserId, parserModule) {
    internalSlotsMap.get(this).parserMap.set(parserId, parserModule);
  }

  verifyAndFix(text, config, options) {
    let messages = [],
        fixedResult,
        fixed = false,
        passNumber = 0,
        currentText = text;
    const debugTextDescription = options && options.filename || `${text.slice(0, 10)}...`;
    const shouldFix = options && typeof options.fix !== "undefined" ? options.fix : true;

    do {
      passNumber++;
      debug(`Linting code for ${debugTextDescription} (pass ${passNumber})`);
      messages = this.verify(currentText, config, options);
      debug(`Generating fixed text for ${debugTextDescription} (pass ${passNumber})`);
      fixedResult = sourceCodeFixer.applyFixes(currentText, messages, shouldFix);

      if (messages.length === 1 && messages[0].fatal) {
        break;
      }

      fixed = fixed || fixedResult.fixed;
      currentText = fixedResult.output;
    } while (fixedResult.fixed && passNumber < MAX_AUTOFIX_PASSES);

    if (fixedResult.fixed) {
      fixedResult.messages = this.verify(currentText, config, options);
    }

    fixedResult.fixed = fixed;
    fixedResult.output = currentText;
    return fixedResult;
  }

}

var linter$1 = {
  Linter: Linter$1,

  getLinterInternalSlots(instance) {
    return internalSlotsMap.get(instance);
  }

};
const {
  Linter
} = linter$1;
var linter = {
  Linter,
  SourceCodeFixer: sourceCodeFixer,
  interpolate
};
var linter_1 = linter.Linter;
exports.linter_1 = linter_1;
//# sourceMappingURL=index-f2d14b8f.js.map