import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateQuotePage from './pages/CreateQuotePage';
import EditQuotePage from './pages/EditQuotePage';
import Navigation from './components/Navigation';
import { useState } from 'react';


function App() {

  const [quoteToEdit, setQuoteToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header>
          <h1>Quote Database For You Everyplace.</h1>
          <p>Use this site to create, edit, or delete whatever quote you wish to bequeath.</p>
        </header>
        <Navigation />
        <main>
          <Route path="/" exact><HomePage setQuoteToEdit = {setQuoteToEdit} /></Route>
          <Route path="/create-quote"><CreateQuotePage /></Route>
          <Route path="/edit-quote"><EditQuotePage quoteToEdit = {quoteToEdit} /></Route>
        </main>
        <footer>
          <p>&copy; 2022 Dominic Chavez</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;