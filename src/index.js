import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/"></Route>
          <Route path="/notes" element={<div className="noSelect">Select a note, or create a new one.</div>}></Route>
          <Route path="/notes/:noteID" element={<App />}></Route>
          <Route path="/notes/:noteID/edit" element={<App />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

   


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

