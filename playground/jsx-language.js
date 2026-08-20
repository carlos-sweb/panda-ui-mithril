// Custom JSX language definition for highlight.js
// Simple approach: use XML as base and add JavaScript expression support
export default function(hljs) {
  // Get the XML language definition
  const xml = hljs.getLanguage('xml')
  if (!xml) {
    return {}
  }

  // Clone the XML language to avoid modifying the original
  const jsx = JSON.parse(JSON.stringify(xml))
  jsx.name = 'jsx'
  jsx.aliases = ['jsx']
  
  // Add JavaScript expression handling
  // Look for the contains array in the XML language
  if (jsx.contains) {
    // Add a pattern for JavaScript expressions in curly braces
    jsx.contains.unshift({
      className: 'javascript',
      begin: '\\{',
      end: '\\}',
      contains: [
        {
          className: 'string',
          begin: "'",
          end: "'"
        },
        {
          className: 'string',
          begin: '"',
          end: '"'
        },
        {
          className: 'number',
          begin: '\\b\\d+\\b'
        },
        {
          className: 'title.function',
          begin: '[a-zA-Z_$][a-zA-Z0-9_$]*'
        }
      ]
    })
  }

  return jsx
}
