import { useState, useEffect, useCallback } from "react";
import FilterBox from "../../components/FilterBox/FilterBox";
import Navigation from "../../components/Navigation/Navigation";
import EventCard from "../../components/EventCard/EventCard";
import { fetchEvents } from "../../utils/Api";
import "./FilterEvents.css";

const FilterEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    selectedMonth: null,
    selectedYear: null,
    selectedCategory: "All", // Default to "All"
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetchEvents();
        setEvents(response);
        setFilteredEvents(response);
      } catch {
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const { selectedMonth, selectedYear, selectedCategory } = filters;

    let filtered = events;

    // Filter by month and year
    if (selectedMonth && selectedYear) {
      filtered = filtered.filter((event) => {
        const [year, month] = event.date.split("-");
        return year === String(selectedYear) && month === selectedMonth;
      });
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  // Callback for month/year filters
  const getMonthYear = useCallback((selectedMonth, selectedYear) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedMonth,
      selectedYear,
    }));
  }, []);

  // Callback for category filter
  const getCategory = useCallback((selectedCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategory,
    }));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <Navigation />
      <div className="find-events-wrapper">
        <FilterBox getMonthYear={getMonthYear} getCategory={getCategory} />
        <div className="event-list-wrapper">
          <div className="event-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  date={event.date}
                  heading={event.heading}
                  location={event.location}
                  img={event.img}
                  category={event.category}
                />
              ))
            ) : (
              <p>No events match the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterEvents;
