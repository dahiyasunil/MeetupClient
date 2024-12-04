import { useState } from "react";

export const FilterEvents = ({ events, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    console.log(events);

    let filteredData = [];

    if (filter === "") {
      filteredData = events;
    } else {
      filteredData = events.filter(
        (event) => event.type.toLowerCase() === filter.toLowerCase()
      );
    }

    onFilterChange(filteredData);
  };

  return (
    <div className="col-lg-2 col-12">
      <select
        className="text-secondary form-select border-0 mt-3 mt-lg-0"
        value={selectedFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="">Select Event Type</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        <option value="Both">Both</option>
      </select>
    </div>
  );
};
