import { useContext, useEffect, useState } from "react";
import {
  createNewActivity,
  deleteActivityById,
  getAllActivities,
} from "../../../../api/activities";
import { AppContext } from "../../../../AppContext";

export default function useFetchActivities() {
  const { setAlertConfig, setShowDeleteModal } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  async function fetchData() {
    await getAllActivities()
      .then((res) => {
        setData(res?.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function createActivity() {
    setIsLoading(true);
    await createNewActivity().finally(() => {
      fetchData();
    });
  }

  async function deleteActivity() {
    if (selectedId) {
      setIsLoading(true);
      await deleteActivityById(selectedId).finally(() => {
        setShowDeleteModal(false);
        fetchData();

        setTimeout(() => {
          setAlertConfig({
            show: true,
            message: "Activity berhasil dihapus",
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
    isLoading,
    createActivity,
    deleteActivity,
    setSelectedId,
  };
}
