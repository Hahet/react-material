import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/dragbase/dragbase.md';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/dragbase/DragManually.js': {
          js: require('docs/src/pages/demos/dragbase/DragManually').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/dragbase/DragManually'), 'utf8')
`,
        },
      }}
    />
  );
}
let C = DragDropContext(HTML5Backend)(Page);
export default withRoot(C);
