import { useState, useEffect } from "react";
import { generateDataOptions, months, years, category } from "../../utils/DataRender";
import "./FilterBox.css";

const FilterBox = ({ getMonthYear, getCategory }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  useEffect(() => {
    getMonthYear(selectedMonth, selectedYear); // Передача месяца и года
    getCategory && getCategory(selectedCategory); // Передача категории
  }, [selectedMonth, selectedYear, selectedCategory, getMonthYear, getCategory]);

  return (
    <div className="filter-card">
      <form>
        <div className="wrapper">
          {/* Фильтр по месяцу */}
          <div className="date">
            <label htmlFor="month">Month:</label>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {generateDataOptions(months)}
            </select>
          </div>

          {/* Фильтр по году */}
          <div className="date">
            <label htmlFor="year">Year:</label>
            <select value={selectedYear} onChange={handleYearChange}>
              {generateDataOptions(years)}
            </select>
          </div>

          {/* Фильтр по категории */}
          <div className="category">
            <label htmlFor="category">Category:</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {generateDataOptions(category)}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;
