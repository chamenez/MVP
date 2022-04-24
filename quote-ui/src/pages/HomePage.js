import React from 'react';
import { Link } from 'react-router-dom';
import QuoteList from '../components/QuoteList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setQuoteToEdit } ) {
    const [quotes, setQuotes] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/quotes/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            setQuotes(quotes.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete quote with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = async quote => {
        setQuoteToEdit(quote);
        history.push("/edit-quote")
    }

    const loadQuotes = async () => {
        const response = await fetch('/quotes');
        const data = await response.json();
        setQuotes(data);
    }

    useEffect( () => {
        loadQuotes();
    }, []);

    return (
        <>
            <h2>List of Quotes</h2>
            <QuoteList quotes={quotes} onDelete={onDelete} onEdit={onEdit}></QuoteList>
            <Link to="/create-quote">Create an quote</Link>
        </>
    );
}

export default HomePage;