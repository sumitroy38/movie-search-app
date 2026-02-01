import React from 'react';
import './Loader.css';
const Loader = () => (
  <div className="loader" role="status" aria-label="Loading">
    <div className="loader__ring" />
    <span className="loader__text">Loading...</span>
  </div>
);
export default Loader;
