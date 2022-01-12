import { useState } from "react";
import ReviewList from "./ReviewList";
import items from "../mock.json";

function App() {
  const [sort, setSort] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[sort] - a[sort]);

  const handleNewestClick = () => setSort("createdAt");
  const handleBestClick = () => setSort("rating");
  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>평점순</button>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
