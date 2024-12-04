import { useState } from "react";

export const SearchEvents = ({ data, onSearchFilter }) => {
  const [searchEvent, setSearchEvent] = useState("");

  const handleSearch = (searchText) => {
    setSearchEvent(searchText);
    let filteredEvents = data;

    if (searchText.trim().length > 0) {
      filteredEvents = data.filter(
        (event) =>
          event.title.toLowerCase().includes(searchText.toLowerCase()) ||
          event.tags.join(" ").toLowerCase().includes(searchText.toLowerCase())
      );
    }
    onSearchFilter(filteredEvents);
  };

  return (
    <div className="input-group">
      <span className="text-secondary fw-lighter input-group-text bg-white border-0">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="text-secondary form-control border-0"
        placeholder="Search by title or tag"
        value={searchEvent}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
