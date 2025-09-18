import React from "react";
import { Search, X } from "lucide-react";

export const  SearchInput = React.memo( ({ query, setQuery })=> {
  return (
    <div className="search-top">
      <div className="left">
        <Search size={20} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          aria-label="Search"
        />
      </div>
      <div className="right">
        {query && (
          <button className="clear" onClick={() => setQuery("")} aria-label="Clear">
            <X size={18} />
          </button>
        )}
        <a className="clear-link" onClick={() => setQuery("")}>
          Clear
        </a>
      </div>
    </div>
  );
})
