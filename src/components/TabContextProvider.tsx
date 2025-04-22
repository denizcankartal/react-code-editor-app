import React, { createContext, ReactNode, useContext, useReducer } from "react";

export interface Tab {
  id: string;
  title: string;
  value: string;
}

interface TabState {
  tabs: Tab[];
  activeTabId: string;
}

type TabAction =
  | { type: 'ADD_TAB'; payload: Tab }
  | { type: 'CLOSE_TAB'; payload: { id: string } }
  | { type: 'SET_ACTIVE_TAB'; payload: { id: string } }
  | { type: 'UPDATE_TAB_VALUE'; payload: { id: string; value: string } }

const TabContext = createContext<{
  state: TabState;
  dispatch: React.Dispatch<TabAction>;
} | null>(null);

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case 'ADD_TAB': {
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        activeTabId: action.payload.id,
      };
    }

    case 'CLOSE_TAB': {
      const updatedTabs = state.tabs.filter(tab => tab.id !== action.payload.id);
      const isActiveTabClosed = state.activeTabId === action.payload.id;
      const newActiveTabId = isActiveTabClosed
        ? updatedTabs.length > 0
          ? updatedTabs[updatedTabs.length - 1].id
          : ""
        : state.activeTabId;

      return {
        ...state,
        tabs: updatedTabs,
        activeTabId: newActiveTabId,
      };
    }

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTabId: action.payload.id };

    case 'UPDATE_TAB_VALUE':
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab.id === action.payload.id ? { ...tab, value: action.payload.value } : tab
        ),
      };

    default:
      return state;
  }
};

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tabReducer, {
    tabs: [],
    activeTabId: "",
  });

  return (
    <TabContext.Provider value={{ state, dispatch }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTabContext must be used within TabContextProvider");
  return ctx;
};
