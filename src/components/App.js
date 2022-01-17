import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import "./App.css";
import { getReviews } from "../Api";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const sortedItems = items.sort((a, b) => b[sort] - a[sort]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleNewestClick = () => setSort("createdAt");
  const handleBestClick = () => setSort("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ sort, offset, limit: LIMIT });
  };

  //무한루프 방지, 초기실행
  useEffect(() => {
    handleLoad({ sort, offset: 0, limit: LIMIT });
  }, [sort]);

  return (
    <div className="body">
      <div className="Buttons">
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <div className="main">
        <ReviewList items={sortedItems} onDelete={handleDelete} />
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
