import { useRef } from "react";
import { Editor, OnChange } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useTabContext } from "./TabContextProvider.tsx";
import { editor } from "monaco-editor";

const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const {state, dispatch} = useTabContext();
  const currentTab = state.tabs.find(value => value.id === state.activeTabId);
  const value = currentTab?.value;

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
    editorRef.current.layout();
  };

  const onChange: OnChange = (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (ev && state.activeTabId) {
      dispatch({type: "UPDATE_TAB_VALUE", payload: {id: state.activeTabId, value: value || ""}})
    }
  }

  return currentTab && (
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
      }}
      height="75vh"
      theme="vs-dark"
      language={"typescript"}
      onMount={onMount}
      value={value}
      onChange={onChange}
    />
  );
};
export default CodeEditor;
