import { useRef } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor, OnChange } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import LanguageSelector from "./LanguageSelector";
import * as monaco from "monaco-editor";
import Output from "./Output";
import { useTabContext } from "./TabContextProvider.tsx";
import { editor } from "monaco-editor";

const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const {state, dispatch} = useTabContext();
  const currentTab = state.tabs.find(value => value.id === state.activeTabId);
  const language = currentTab?.language;
  const value = currentTab?.value;

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
    editorRef.current.layout();
  };

  const onSelect = (language: string) => {
    if (!state.activeTabId || !language) {
      return;
    }
    dispatch({type: "UPDATE_TAB_LANGUAGE", payload: {id: state.activeTabId, language: language}});
    dispatch({type: "UPDATE_TAB_VALUE", payload: {id: state.activeTabId, value: CODE_SNIPPETS[language]}});
  };

  const onChange: OnChange = (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (ev && state.activeTabId) {
      dispatch({type: "UPDATE_TAB_VALUE", payload: {id: state.activeTabId, value: value || ""}})
    }
  }

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language ?? "JavaScript"} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            // defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={onChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language ?? "JavaScript"} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
