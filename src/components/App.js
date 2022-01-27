import { useCallback, useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import "./App.css";
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from "../Api";
import ReviewForm from "./ReviewForm";
import useAsync from "./hooks/useAsync";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const sortedItems = items.sort((a, b) => b[sort] - a[sort]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const handleNewestClick = () => setSort("createdAt");
  const handleBestClick = () => setSort("rating");

  const handleDelete = async (id) => {
    const result = await deleteReviews(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      let result = await getReviewsAsync(options);
      if (!result) return;
      const { reviews, paging } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ sort, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  //무한루프 방지, 초기실행
  useEffect(() => {
    handleLoad({ sort, offset: 0, limit: LIMIT });
  }, [sort, handleLoad]);

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  return (
    <div className="body">
      <div className="Buttons">
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewForm
        onSubmit={createReviews}
        onSubmitSuccess={handleCreateSuccess}
      />
      <div className="main">
        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReviews}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
      <div className="addMore">
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
      </div>
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
