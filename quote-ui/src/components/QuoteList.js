import React from 'react';
import Quote from './Quote';

function QuoteList({ quotes, onDelete, onEdit}) {
    return (
        <table id="quotes">
            <thead>
                <tr>
                    <th>Excerpt</th>
                    <th>Date</th>
                    <th>Patron</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {quotes.map((quote, i) => <Quote quote={quote}
                    onDelete = {onDelete}
                    onEdit = {onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default QuoteList;
