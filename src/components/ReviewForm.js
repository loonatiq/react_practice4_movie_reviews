import { useState } from "react";
import FileInput from "./FileInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAl_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialValues = INITIAl_VALUES,
  initialPreview,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) {
  // const [title, setTitle] = useState("");
  // const [rating, setRating] = useState(0);
  // const [content, setContent] = useState("");
  const t = useTranslate();
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValues] = useState(initialValues);
  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleRatingChange = (e) => {
  //   const nextRating = Number(e.target.value) || 0;
  //   if (nextRating > 5 || nextRating < 0) {
  //     nextRating = 0;
  //   }
  //   setRating(nextRating);
  // };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAl_VALUES);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />

      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />

      <button type="submit" disabled={isSubmitting}>
        {t("confirm button")}
      </button>

      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
