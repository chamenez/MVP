import * as quotes from './quote_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new quote with the excerpt, date and patron provided in the body
 */
app.post('/quotes', (req, res) => {
    quotes.createQuote(req.body.excerpt, req.body.date, req.body.patron)
        .then(quote => {
            res.status(201).json(quote);    
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve quotes. 
 * All quotes are returned.
 */

app.get('/quotes', (req, res) => {
    const quoteId = req.params._id;
    quotes.findQuoteById(quoteId)
        .then(quote => {
            if (quote !== null) {
                res.json(quote);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Update the quote whose id is provided in the path parameter and set
 * its excerpt, date and patron to the values provided in the body.
 */

app.put('/quotes/:_id', (req, res) => {
    quotes.replaceQuote(req.params._id, req.body.excerpt, req.body.date, req.body.patron)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, excerpt: req.body.excerpt, date: req.body.date, patron: req.body.patron })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            } 
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the quote whose id is provided in the query parameters
 */

 app.delete('/quotes/:_id', (req, res) => {
    quotes.deleteById(req.params._id)
        .then(deleteCount => {
            if (deleteCount === 1) {
                res.status(204).send();
             } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});