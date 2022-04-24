import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Quote({ quote, onDelete, onEdit }) {
    return (
        <tr>
            <td>{quote.excerpt}</td>
            <td>{quote.date}</td>
            <td>{quote.patron}</td>
            <td><MdEdit onClick = { () => onEdit(quote) }/></td>
            <td><MdDeleteForever onClick = { () => onDelete(quote._id) }/></td>
        </tr>
    );
}

export default Quote;