import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import DataContext from "../context/index";

function Search() {
  const { SearchPokemon } = useContext(DataContext);
  const { error } = useContext(DataContext);
  const [searchName, setSearchName] = useState("");
  return (
    <form
      className="pa4 black-80"
      onSubmit={(e) => {
        e.preventDefault();
        SearchPokemon(searchName);
      }}
    >
      <div className="measure" style={{ margin: "0 auto" }}>
        <label for="name" className="f6 b db mb2">
          Name <span className="normal black-60">(Pokemon)</span>
        </label>
        <input
          maxLength="10"
          minLength="3"
          pattern="[A-Za-z]+"
          id="name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value.toLowerCase())}
          className="input-reset ba b--black-20 pa2 mb2 db w-100 br3"
          type="text"
          aria-describedby="name-desc"
        />
        {error ? (
          <small id="name-desc" className="f6 red db mb2">
            Please enter a valid pokemon name
          </small>
        ) : (
          <small id="name-desc" className="f6 black-60 db mb2">
            Enter pokemon name and press on search button
          </small>
        )}
      </div>
      <button style={{ background: "none", border: "none" }}>
        <a
          class="f6 link dim ph3 pv2 mb2 dib white bg-light-purple br3 pointer mr3"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </a>
        <a
          className="f6 link dim ph3 pv2 mb2 dib white bg-mid-gray pointer br3"
          type="Submit"
        >
          Search
        </a>
      </button>
    </form>
  );
}

export default Search;
