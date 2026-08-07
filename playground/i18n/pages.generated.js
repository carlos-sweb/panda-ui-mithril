16 | 
17 |   pages[dir] = {}
18 | 
19 |   // Import English
20 |   const enContent = readFileSync(enPath, 'utf-8')
21 |   const enMap = parseYaml(enContent)
                     ^
ReferenceError: parseYaml is not defined
      at /home/sweb/panda-ui-mithril/gen-pages.mjs:21:17

Bun v1.3.14 (Linux x64)
