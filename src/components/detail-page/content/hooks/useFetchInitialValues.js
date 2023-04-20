import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../../../../api/activities";
import {
  createNewTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from "../../../../api/todo";
import { AppContext } from "../../../../AppContext";

export default function useFetchInitialValues() {
  const { setAlertConfig, setShowDeleteModal, setShowAddTodoModal } =
    useContext(AppContext);
  const [activityName, setActivityName] = useState("");
  const [data, setData] = useState([]);
  const [todoDetails, setTodoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { id } = useParams();

  async function fetchData() {
    const p1 = getActivityById(id);
    const p2 = getAllTodos(id);
    Promise.all([p1, p2])
      .then((values) => {
        // set activity name value
        setActivityName(values?.[0]?.title || "");

        // set todo value
        setData(values?.[1]?.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function fetchDetailsData(id) {
    await getTodoById(id)
      .then((res) => setTodoDetails(res))
      .finally(() => setShowAddTodoModal(true));
  }

  async function createTodo(values) {
    setIsLoading(true);
    await createNewTodo(values).finally(() => {
      setShowAddTodoModal(false);
      fetchData();
    });
  }

  async function updateTodo(values) {
    setIsLoading(true);
    await updateTodoById(values).finally(() => {
      setShowAddTodoModal(false);
      fetchData();
    });
  }

  async function deleteTodo() {
    if (selectedId) {
      setIsLoading(true);
      await deleteTodoById(selectedId).finally(() => {
        setShowDeleteModal(false);
        fetchData();

        setTimeout(() => {
          setAlertConfig({
            show: true,
            message: "Todo berhasil dihapus",
          });
        }, 500);
      });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();

    return () => {
      setData([]);
      setIsLoading(false);
    };
  }, []);

  return {
    data,
    activityName,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    selectedId,
    setSelectedId,
    fetchDetailsData,
    todoDetails,
  };
}
