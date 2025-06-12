import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value }) => {
  return (
    <Editor
      height="300px"
      language={language}
      value={value}
      theme="vs-dark"
      options={{
        readOnly: true,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default CodeEditor;
