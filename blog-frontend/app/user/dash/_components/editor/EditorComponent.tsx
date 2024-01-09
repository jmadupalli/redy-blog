"use client";
import "@mdxeditor/editor/style.css";

import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  MDXEditorProps,
  MDXEditorMethods,
  MDXEditor,
} from "@mdxeditor/editor";
import { ForwardedRef } from "react";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};
const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({ imageUploadHandler: null }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      txt: "text",
      js: "JavaScript",
      tsx: "TypeScript",
      css: "CSS",
      py: "Python",
      java: "Java",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

export default function EditorComponent({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> } & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      {...props}
      contentEditableClassName="prose max-w-full font-sans min-h-80 bg-white overflow-auto"
      plugins={allPlugins(props.markdown)}
    />
  );
}
