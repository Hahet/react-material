/* eslint-disable no-console */

import { mkdir, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import * as reactDocgen from 'react-docgen';
import generateMarkdown from '../src/modules/utils/generateMarkdown';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getHeaders } from '../src/modules/utils/parseMarkdown';
import createMuiTheme from '../../packages/react-material/src/styles/createMuiTheme';
import getStylesCreator from '../../packages/react-material/src/styles/getStylesCreator';

function ensureExists(pat, mask, cb) {
  mkdir(pat, mask, err => {
    if (err) {
      if (err.code === 'EEXIST') {
        cb(null); // ignore the error if the folder already exists
      } else {
        cb(err); // something else went wrong
      }
    } else {
      cb(null); // successfully created folder
    }
  });
}

// Read the command-line args
const args = process.argv;

// Exit with a message
function exit(error) {
  console.log(error, '\n');
  process.exit();
}

if (args.length < 4) {
  exit('\nERROR: syntax: buildApi source target');
}

const rootDirectory = path.resolve(__dirname, '../../');
const docsApiDirectory = path.resolve(rootDirectory, args[3]);
const theme = createMuiTheme();

function buildDocs(options) {
  const { component: componentObject, pagesMarkdown } = options;
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const component = require(componentObject.filename);
  const styles = {
    classes: [],
    name: null,
  };

  if (component.styles && component.default.options) {
    // Collect the customization points of the `classes` property.
    styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
      className => !className.match(/^(@media|@keyframes)/),
    );
    styles.name = component.default.options.name;
  }

  let reactAPI;
  try {
    reactAPI = reactDocgen.parse(src);
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.name = path.parse(componentObject.filename).name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;

  // if (reactAPI.name !== 'Select') {
  //   return;
  // }

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '')
                                              .replace('/packages/material-ui/core/', '/packages/react-material/')
                                              .replace('/packages/material-ui/lab/', '/packages/react-material/');
  let markdown;
  try {
    markdown = generateMarkdown(reactAPI);
  } catch (err) {
    console.log('Error generating markdown for', componentObject.filename);
    throw err;
  }

  ensureExists(docsApiDirectory, 0o744, err => {
    if (err) {
      console.log('Error creating directory', docsApiDirectory);
      return;
    }

    writeFileSync(path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.md`), markdown);
    writeFileSync(
      path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.js`),
      `import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './${kebabCase(reactAPI.name)}.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
`,
    );

    console.log('Built markdown docs for', componentObject.filename);
  });
}

function run() {
  const pagesMarkdown = findPagesMarkdown()
    .map(markdown => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
        components: getHeaders(markdownSource).components,
      };
    })
    .filter(markdown => markdown.components.length > 0);
  const components = findComponents(path.resolve(rootDirectory, args[2]));

  components.forEach(component => {
    buildDocs({ component, pagesMarkdown });
  });
}

run();
