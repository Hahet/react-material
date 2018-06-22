import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/transfer/transfer.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/transfer/Transfer.js': {
          js: require('docs/src/pages/demos/transfer/Transfer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/transfer/Transfer'), 'utf8')
`,
        }
      ,
        'pages/demos/transfer/Transferdrag.js': {
          js: require('docs/src/pages/demos/transfer/Transferdrag').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/transfer/Transferdrag'), 'utf8')
`,
        }
        ,
        'pages/demos/transfer/AsyncTransfer.js': {
          js: require('docs/src/pages/demos/transfer/AsyncTransfer').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/transfer/AsyncTransfer'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
