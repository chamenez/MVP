import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditQuotePage = ( props ) => {

    const [excerpt, setExcerpt] = useState(props.quoteToEdit.excerpt);
    const [date, setDate] = useState(props.quoteToEdit.date);
    const [patron, setPatron] = useState(props.quoteToEdit.patron);

    const history = useHistory();

    const editQuote = async () => {
        const editedQuote = {excerpt, date, patron}
        const response = await fetch(`/quotes/${props.quoteToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedQuote),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the quote");
        } else {
            alert(`Failed to edit quote, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Quote</h1>
            <input
                type="text"
                // placeholder="Enter excerpt here"
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)} />
            <input
                type="text"
                // placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <input
                type="text"
                // placeholder="Enter patron here"
                value={patron}
                onChange={e => setPatron(e.target.value)} />
            <button
                onClick={editQuote}
            >Save</button>
        </div>
    );
}

export default EditQuotePage;