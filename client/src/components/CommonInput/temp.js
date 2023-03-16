Dmitrii Vyaznikov, [16 Mar 2023, 20:54:08]:
export const FETCH_SPOILERS_REQUEST = 'FETCH_SPOILERS_REQUEST';
export const FETCH_SPOILERS_SUCCESS = 'FETCH_SPOILERS_SUCCESS';
export const FETCH_SPOILERS_FAILURE = 'FETCH_SPOILERS_FAILURE';

export const fetchSpoilers = (searchString) => {
  return (dispatch) => {
    dispatch({ type: FETCH_SPOILERS_REQUEST });

    return fetch(/api/spoilers?searchString=${searchString})
  .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_SPOILERS_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_SPOILERS_FAILURE, payload: error });
      });
  };
};

// reducers.js
import { FETCH_SPOILERS_REQUEST, FETCH_SPOILERS_SUCCESS, FETCH_SPOILERS_FAILURE } from './actions';

const initialState = {
  isLoading: false,
  spoilers: [],
  error: null,
};

export const spoilersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOILERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_SPOILERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        spoilers: action.payload,
        error: null,
      };
    case FETCH_SPOILERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        spoilers: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpoilers } from './actions';

const Search = () => {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const spoilers = useSelector(state => state.spoilers);
  const error = useSelector(state => state.error);

  const handleSearch = () => {
    dispatch(fetchSpoilers(searchString));
  };

  return (
    <div>
      <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {spoilers.length > 0 && (
        <ul>
          {spoilers.map((spoiler) => (
            <li key={spoiler.id}>{spoiler.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
