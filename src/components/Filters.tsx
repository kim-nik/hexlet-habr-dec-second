import React from "react";

interface FiltersProps {
  platformFilter: string;
  setPlatformFilter: (value: string) => void;
  ratingFilter: { min: number; max: number };
  setRatingFilter: (value: { min: number; max: number }) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  platformFilter,
  setPlatformFilter,
  ratingFilter,
  setRatingFilter,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="filters">
      <select
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Все платформы</option>
        <option value="Google">Google</option>
        <option value="Яндекс">Яндекс</option>
        <option value="2ГИС">2ГИС</option>
      </select>
      <div className="rating-filter">
        <label>Рейтинг от</label>
        <input
          type="number"
          min="0"
          max="5"
          value={ratingFilter.min}
          onChange={(e) =>
            setRatingFilter({ ...ratingFilter, min: Number(e.target.value) })
          }
          className="rating-input"
        />
        <label>до</label>
        <input
          type="number"
          min="0"
          max="5"
          value={ratingFilter.max}
          onChange={(e) =>
            setRatingFilter({ ...ratingFilter, max: Number(e.target.value) })
          }
          className="rating-input"
        />
      </div>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="filter-dropdown"
      >
        <option value="date-desc">Новые</option>
        <option value="date-asc">Старые</option>
        <option value="rating-desc">Рейтинг по убыванию</option>
        <option value="rating-asc">Рейтинг по возрастанию</option>
      </select>
    </div>
  );
};

export default Filters;
