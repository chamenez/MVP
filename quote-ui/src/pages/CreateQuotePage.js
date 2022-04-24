import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateQuotePage = () => {

    const [excerpt, setExcerpt] = useState('');
    const [date, setDate] = useState('');
    const [patron, setPatron] = useState('');

    const history = useHistory();

    const createQuote = async () => {
        const newQuote = {excerpt, date, patron}
        const response = await fetch('/quotes', {
            method: 'POST',
            body: JSON.stringify(newQuote),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully created the quote");
        } else {
            alert(`Failed to add quote, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Create Quote</h1>
            <input
                type="text"
                placeholder="Enter excerpt here"
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)} />
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <input
                type="text"
                placeholder="Enter patron here"
                value={patron}
                onChange={e => setPatron(e.target.value)} />
            <button
                onClick={createQuote}
            >Create</button>
        </div>
    );
}

export default CreateQuotePage;