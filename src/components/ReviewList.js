import { useState } from "react";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import "./ReviewList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// function starRating(value) {
//   let stars = "";
//   for (let i = 0; i < value; i++) {
//     stars += "⭐";
//   }
//   return stars;
// }

function ReviewListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="ReviewListItem">
      <img
        className="ReviewListItem-img"
        src={item.imgUrl}
        alt={item.title}
      ></img>
      <div className="summary">
        <button onClick={handleDeleteClick}>x</button>
        <button onClick={handleEditClick}>수정</button>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
