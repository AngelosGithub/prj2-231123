import React, { createContext, useState } from "react";
export const SearchContext = createContext(null);
function SearchProvider({ children }) {
  const [keyword, setKeyword] = useState("");
  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
