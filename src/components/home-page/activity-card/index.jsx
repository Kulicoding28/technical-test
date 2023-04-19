import { format } from "date-fns";
import localeId from "date-fns/locale/id";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { ActivityItemDeleteButtonIcon } from "../../../assets";

export default function ActivityCard({ id, title, createdAt, onBeforeDelete }) {
  const { setShowDeleteModal } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="activity-card" data-cy="activity-item">
      <div
        className="activity-card__body"
        onClick={() => {
          navigate(`/detail/${id}`);
        }}
      >
        <h4 data-cy="activity-item-title" className="activity-item-title">
          {title}
        </h4>
      </div>

      <div className="activity-card__footer">
        <span data-cy="activity-item-date">
          {createdAt
            ? format(new Date(createdAt), "d MMMM yyyy", {
                locale: localeId,
              })
            : ""}
        </span>
        <button
          data-cy="activity-item-delete-button"
          onClick={() => {
            setShowDeleteModal(true);
            onBeforeDelete();
          }}
        >
          <img src={ActivityItemDeleteButtonIcon} alt="delete-icon" />
        </button>
      </div>
    </div>
  );
}
