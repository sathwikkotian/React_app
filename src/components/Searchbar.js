import React, { useState } from "react";
import "./SearchBar.css"; 

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products, brands and more..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>🔍</button>
    </div>
  );
}

export default SearchBar;
