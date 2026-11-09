import { useState } from "react";

export default function CitySearch({ onSearch }) {
  // Gemmer det brugeren skriver i feltet
  const [city, setCity] = useState("");

  // Kører når formularen sendes
  function handleSubmit(event) {
    event.preventDefault(); // så siden ikke genindlæses
    onSearch(city.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <img className="search-icon-grey" src="/img/search.png" alt="" />
      <input
        className="search-input"
        type="search"
        name="city"
        placeholder="Skriv en by, fx København"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button className="search-button" type="submit">
        <img className="search-icon-white" src="/img/search.png" alt="" />
        Søg vejr
      </button>
    </form>
  );
}  