import { useState, createContext, useEffect } from "react";

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (alertConfig.show) {
      setTimeout(() => {
        setAlertConfig({
          show: false,
          message: "",
        });
      }, 1500);
    }
  }, [alertConfig.show]);

  return (
    <AppContext.Provider
      value={{
        showDeleteModal,
        setShowDeleteModal,
        alertConfig,
        setAlertConfig,
        showAddTodoModal,
        setShowAddTodoModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
