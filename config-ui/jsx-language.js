/*
Language: JSX
Description: JSX syntax highlighting for Mithril.js code examples
Requires: javascript.js
Author: Panda UI Mithril
*/

/**
 * Custom JSX language definition for highlight.js.
 *
 * Extends the built-in JavaScript grammar with a JSX-tag sub-mode
 * that highlights opening/closing/self-closing tags, tag names,
 * attribute names, string values, and expression attribute values.
 */
export default function(hljs) {
  const js = hljs.getLanguage('javascript');
  if (!js) return { name: 'JSX' };

  const jsx = Object.assign({}, js);
  jsx.name = 'JSX';
  jsx.aliases = ['jsx'];

  const JSX_ATTR = {
    className: 'attr',
    begin: /[:@a-zA-Z_$][\w$.\-]*/,
    relevance: 0
  };

  const JSX_EXPR = {
    className: 'expr',
    begin: /\{/,
    end: /\}/,
    endsParent: true,
    contains: [ 'self' ]
  };

  const JSX_ATTR_VALUE = {
    className: 'string',
    begin: /=\s*/,
    end: /(?=[\s/>])/,
    endsParent: true,
    contains: [
      {
        className: 'string',
        begin: /"/,
        end: /"/,
        contains: [
          { begin: /\{/, end: /\}/, className: 'expr', contains: ['self'] }
        ]
      },
      {
        className: 'string',
        begin: /'/,
        end: /'/,
        contains: [
          { begin: /\{/, end: /\}/, className: 'expr', contains: ['self'] }
        ]
      },
      JSX_EXPR
    ]
  };

  const JSX_TAG = {
    className: 'tag',
    begin: /<\/?/,
    end: /\/?>/,
    contains: [
      { className: 'title', begin: /[A-Z][\w]*/, relevance: 0 },
      { className: 'name',  begin: /[a-z][\w-]*/, relevance: 0 },
      JSX_ATTR,
      JSX_ATTR_VALUE,
      JSX_EXPR
    ]
  };

  jsx.contains = (jsx.contains || []).concat([JSX_TAG]);

  return jsx;
}
