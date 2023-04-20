import React, { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
import { ActivityEmptyState } from "../../../assets";
import Button from "../../global/button";
import DeleteModal from "../../global/delete-modal";
import Loading from "../../global/loading";
import ActivityCard from "../activity-card";
import useFetchActivities from "./hooks/useFetchActivities";

export default function Contents() {
  const { showDeleteModal, setShowDeleteModal } = useContext(AppContext);
  const { data, createActivity, deleteActivity, setSelectedId, isLoading } =
    useFetchActivities();
  const [activityTitle, setActivityTitle] = useState("");

  return (
    <main className="home-contents">
      <div className="home-contents__header">
        <h1 data-cy="activity-title">Activity</h1>
        <Button
          data-cy="activity-add-button"
          className="button"
          onClick={createActivity}
        >
          <span className="plus-icon">+</span> Tambah
        </Button>
      </div>

      <div className="home-contents__main">
        {isLoading ? (
          <Loading />
        ) : !data?.length ? (
          <div className="empty-list" data-cy="activity-empty-state">
            <img
              data-cy="activity-empty-state"
              src={ActivityEmptyState}
              alt="empty-state"
              onClick={createActivity}
            />
          </div>
        ) : (
          <div className="activity-list">
            {data?.map((d, i) => (
              <ActivityCard
                key={`${i}_${d?.id}`}
                id={d?.id}
                title={d?.title || ""}
                createdAt={d?.created_at || ""}
                onBeforeDelete={() => {
                  setActivityTitle(d?.title);
                  setSelectedId(d?.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setActivityTitle("");
        }}
        onDelete={deleteActivity}
        highlightText={`"${activityTitle}"?`}
      />
    </main>
  );
}
