import * as Tabs from '@radix-ui/react-tabs';
import { Tab, useTabContext } from "./TabContextProvider.tsx";
import styled from "styled-components";
import CodeMirrorEditor from "./CodeMirrorEditor.tsx";

const StyledTabs = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TabList = styled(Tabs.List)`
  display: flex;
  padding: 0.5rem;
  overflow-x: auto;
`;

const TabTrigger = styled(Tabs.Trigger)<{ $active?: boolean }>`
  all: unset;
  background: ${({ $active }) => ($active ? '#1e1e1e' : '#3a3a3a')};
  color: #fff;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const TabContent = styled(Tabs.Content)`
  flex: 1;
  padding: 1rem;
  background: #1e1e1e;
`;

const AddButton = styled.button`
  margin-left: auto;
  padding: 0.3rem 0.8rem;
  background: #4caf50;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

const CloseButton = styled.span`
  margin-left: 8px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

function createNewTab(tabCount: number): Tab {
  const id = `tab-${Date.now()}`;
  return {
    id,
    title: `Tab-${tabCount}`,
    value: `// write your code here TAB - ${id}`,
  };
}

export const TabView = () => {
  const { state, dispatch } = useTabContext();

  const handleAddTab = () => {
    const newTab = createNewTab(state.tabs.length + 1);
    dispatch({ type: 'ADD_TAB', payload: newTab });
  };

  return (
    <StyledTabs
      value={state.activeTabId ?? ''}
      onValueChange={(id) => dispatch({ type: 'SET_ACTIVE_TAB', payload: { id } })}
    >
      <TabList>
        {state.tabs.map(tab => (
          <TabTrigger key={tab.id} value={tab.id} $active={state.activeTabId === tab.id}>
            {tab.title}
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'CLOSE_TAB', payload: { id: tab.id } });
              }}
            >
              ×
            </CloseButton>
          </TabTrigger>
        ))}
        <AddButton onClick={handleAddTab}>+</AddButton>
      </TabList>

      {state.tabs.map(tab => (
        <TabContent value={tab.id} key={tab.id}>
          <CodeMirrorEditor value={tab.value} onChange={(val) => dispatch({type: "UPDATE_TAB_VALUE", payload: {id: tab.id, value: val}}) }></CodeMirrorEditor>
        </TabContent>
      ))}
    </StyledTabs>
  );
};
