import { useState } from "react";
import ReviewList from "./ReviewList";
import mockItems from "../mock.json";
import "./App.css";

function App() {
  const [items, setItems] = useState(mockItems);
  const [sort, setSort] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[sort] - a[sort]);

  const handleNewestClick = () => setSort("createdAt");
  const handleBestClick = () => setSort("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div className="body">
      <div className="buttons">
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <div className="main">
        <ReviewList items={sortedItems} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
