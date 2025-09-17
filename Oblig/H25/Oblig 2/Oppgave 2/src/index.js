import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/base.css";
import "./styles/table.css";
import "./styles/searchbar.css";
import "./styles/continentfilter.css";
import "./styles/pagination.css";
import "./styles/pagesize.css";
import "./styles/app.css";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);