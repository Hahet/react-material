import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './no-data.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
