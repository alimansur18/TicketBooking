import React, { useState } from 'react';

const FilterComponent = ({ applyFilters }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    const languages = ['Hindi', 'Tamil', 'Telugu', 'Marathi'];
    const genres = ['Drama', 'Action', 'Comedy', 'Crime'];
    const ratings = ['A', 'U', 'A/U'];

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    const addFilters = () => {
        applyFilters(selectedLanguage, selectedGenre, selectedRating);
    };

    const reset = () => {
        setSelectedLanguage('');
        setSelectedGenre('');
        setSelectedRating('');
        applyFilters('', '', '');
    }

    return (
        <div className="container" style={{width:'18rem'}}>
            <ul className="list-group">
                <li className="list-group-item list-group-item-secondary"><h3>Refine Search</h3></li>
                <li className="list-group-item">
                    <strong>Language:</strong>
                    {languages.map((language) => (
                        <div key={language} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="language"
                                value={language}
                                checked={selectedLanguage === language}
                                onChange={handleLanguageChange}
                            />
                            <label className="form-check-label">{language}</label>
                        </div>
                    ))}
                </li>

                <li className="list-group-item">
                    <strong>Genre:</strong>
                    {genres.map((genre) => (
                        <div key={genre} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genre"
                                value={genre}
                                checked={selectedGenre === genre}
                                onChange={handleGenreChange}
                            />
                            <label className="form-check-label">{genre}</label>
                        </div>
                    ))}
                </li>

                <li className="list-group-item">
                    <strong>Rating:</strong>
                    {ratings.map((rating) => (
                        <div key={rating} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={selectedRating === rating}
                                onChange={handleRatingChange}
                            />
                            <label className="form-check-label">{rating}</label>
                        </div>
                    ))}
                </li>
            </ul>
            <div className='container d-flex justify-content-around'>
                <button className="btn btn-success mt-3" onClick={addFilters}>
                    Add Filters
                </button>
                <button className="btn btn-success mt-3" onClick={reset}>
                    Reset
                </button>
            </div>

        </div>
    );
};

export default FilterComponent;
