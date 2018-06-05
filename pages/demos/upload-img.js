import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/upload-img/upload-img.md';

function Page() {
    return (
        <MarkdownDocs
            markdown={markdown}
            demos={{
                'pages/demos/upload-img/UploadImg.js': {
                    js: require('docs/src/pages/demos/upload-img/UploadImg').default,
                    raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/upload-img/UploadImg'), 'utf8')
`,
                },
            }}
        />
    );
}

export default withRoot(Page);




