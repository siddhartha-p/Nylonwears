import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <form className="d-flex" role="search" onSubmit={submitHandler}>
      <input
        id="searchinput"
        className={`searchinput form-control me-2`}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        id="search"
        className={`btn search`}
        type="submit"
        aria-label="Search-button"
      >
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
