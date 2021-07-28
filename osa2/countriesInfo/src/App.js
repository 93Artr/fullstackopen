import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ search, handleSearch }) => {
  return(
    <div>
      find countries <input value={search} onChange={handleSearch} />
    </div>
  )
}

const Result = ({ results, search, setSearch }) => {
  const filteredResults = 
    results.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));
  const checkResults = filteredResults.length > 10 ? 
    <p>Too many matches, specify another filter</p> : 
    filteredResults.length > 1 ?
    filteredResults.map((result) =>  {return(<p key={result.name}>{result.name}</p>)} ) : 
    filteredResults.map(result => {
      return(
        <div key={result.population}>
          <h2>{result.name}</h2>
          capital {result.capital} <br />
          population {result.population} <br />
          <h3>Languages</h3>
          <ul>
            {result.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={result.flag} alt={'flag'} style={{maxWidth: '200px'}} />
        </div>
      )
    });
  return (
    <div>
      {checkResults}
    </div>
  )
}

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data);
        if (response.data > 10) return;
        else setResults(response.data)
      });
  }, []);
  
  const handleSearch = e => setSearch(e.target.value);

  return(
    <div>
      <SearchBar search={search} handleSearch={handleSearch} />
      <Result results={results} search={search} setSearch={setSearch} />
    </div>
  )
};

export default App;
