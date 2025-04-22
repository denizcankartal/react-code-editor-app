import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

type CodeMirrorEditorProps = {
  value: string;
  onChange: (val: string) => void;
  height?: string;
};

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange, height = '200px' }) => {
  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={[javascript()]}
      onChange={(val) => onChange(val)}
    />
  );
};

export default CodeMirrorEditor;
