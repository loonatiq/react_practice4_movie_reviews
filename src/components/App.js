import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import "./App.css";
import { getReviews } from "../Api";

function App() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[sort] - a[sort]);

  const handleNewestClick = () => setSort("createdAt");
  const handleBestClick = () => setSort("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (sortQuery) => {
    const { reviews } = await getReviews(sortQuery);
    setItems(reviews);
  };

  //무한루프 방지
  useEffect(() => {
    handleLoad(sort);
  }, [sort]);

  return (
    <div className="body">
      <div className="Buttons">
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <div></div>
      <div className="main">
        <ReviewList items={sortedItems} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
