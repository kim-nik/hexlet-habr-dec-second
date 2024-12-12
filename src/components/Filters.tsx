import React, { useEffect, useRef, useState } from "react";

interface FiltersProps {
  platformFilter: string;
  setPlatformFilter: (value: string) => void;
  ratingFilter: { min: number; max: number };
  setRatingFilter: (value: { min: number; max: number }) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Filters: React.FC<FiltersProps> = ({
  platformFilter,
  setPlatformFilter,
  ratingFilter,
  setRatingFilter,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) => {
  // какой-то такой дебаунс осилил написать
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const debouncedSetSearchQuery = useRef(debounce(setSearchQuery, 300)).current;

  useEffect(() => {
    debouncedSetSearchQuery(localSearchQuery);
  }, [localSearchQuery, debouncedSetSearchQuery]);

  return (
    <div className="filters">
      <select
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
        className="filter-dropdown"
      >
        {/* тут нам конечно хорошо бы не хардкодить платформы, а достать с апи, но не в этот раз */}
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
      <input
        type="text"
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        placeholder="Поиск по тексту отзыва"
        className="search-input"
      />
    </div>
  );
};

export default Filters;
