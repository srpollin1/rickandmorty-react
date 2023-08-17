import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pagesToShow = 5; // Define the number of pages to show in pagination

  useEffect(() => {
    const fetchCharactersAndEpisodes = async () => {
      try {
        const charactersResponse = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        const charactersData = await charactersResponse.json();
        setCharacters(charactersData.results);
        setTotalPages(charactersData.info.pages);

        const episodesResponse = await fetch('https://rickandmortyapi.com/api/episode/');
        const episodesData = await episodesResponse.json();
        setEpisodes(episodesData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharactersAndEpisodes();
  }, [currentPage]);

  const handleCharacterClick = character => {
    setSelectedCharacter(character);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );

  const calculatePageRange = () => {
    const halfRange = Math.floor(pagesToShow / 2);
    const startPage = Math.max(1, currentPage - halfRange);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div>
      <h2 className='text-center mb-3 px-5 p-3'>Rick and Morty API</h2>

      <div className="text-center mt-4">
        <nav>
          <ul className="pagination justify-content-center">
            {calculatePageRange().map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>


      <div className="input-group mb-3 px-5">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by name"
          aria-label="Filter by name"
          aria-describedby="filter-button"
          value={filter}
          onChange={handleFilterChange}
        />
        <button className="btn btn-outline-secondary" type="button" id="filter-button">
          Filter
        </button>
      </div>

      <div className="row px-5">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="col-md-6 mb-3">
            <div className="card">
              <img src={character.image} alt={character.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                {selectedCharacter === character && (
                  <div>
                    <p>Number of Episodes: {character.episode.length}</p>
                    <p>First Episode: {episodes.length > 0 ? episodes[0].name : 'Loading...'}</p>
                    <p>Location: {character.location?.name}</p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => handleCharacterClick(character)}
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Home;
