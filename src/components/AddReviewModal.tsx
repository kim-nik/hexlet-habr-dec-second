import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addReview, fetchReviews } from "../actions/actions";
import "./AddReviewModal.css";

interface AddReviewModalProps {
  onClose: () => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [platform, setPlatform] = useState("Google");
  const [rating, setRating] = useState("1");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      platform,
      rating: Number(rating),
      text,
      date: new Date().toISOString(),
    };

    dispatch(addReview(newReview));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header">Добавить новый отзыв</h2>
        <form onSubmit={handleSubmit}>
          <div className="horizontal-group">
            <div className="form-group">
              <label htmlFor="platform">Платформа</label>
              <select
                id="platform"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="Google">Google</option>
                <option value="Яндекс">Яндекс</option>
                <option value="2ГИС">2ГИС</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Рейтинг:</label>
              <select
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="text">Текст отзыва:</label>
            <textarea
              id="text"
              name="text"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-button">
              Сохранить
            </button>
            <button type="button" onClick={onClose} className="close-button">
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
