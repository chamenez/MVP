// Get the mongoose object.
import mongoose from 'mongoose';

// Prepare the database quote_db in the MongoDB server running locally on port 27017.
mongoose.connect(
    "mongodb://localhost:27017/quote_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database.
const db = mongoose.connection;
// The open event is called when the database connection successfully opens.
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema.
 */
const quoteSchema = mongoose.Schema({
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    patron: { type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Quote = mongoose.model("Quote", quoteSchema);

/**
 * Create a quote.
 * @param {String} excerpt
 * @param {String} date
 * @param {String} patron
 * 
 * @returns A promise. Resolves to the JSON object for the document created by calling save.
 */

const createQuote = async (excerpt, date, patron) => {
    // Call the constructor to create an instance of the model class Quote.
    const quote = new Quote({ excerpt: excerpt, date: date, patron: patron });
    // Call save to persist this object as a document in MongoDB.
    return quote.save();
}

/**
 * Find the quote with the given ID value.
 * @param {String} _id
 * @returns A promise. Returns object.
 */

const findQuoteById = async (_id) => {
    const query = Quote.find();
    return query.exec();
}

/**
 * Replace the quote, date and patron language properties of the quote with the id value provided.
 * @param {String} _id
 * @param {String} excerpt
 * @param {String} date
 * @param {String} patron
 * @returns A promise. Resolves to the JSON object for the document created by calling save.
 */

const replaceQuote = async (_id, excerpt, date, patron) => {
    const result = await Quote.replaceOne({ _id: _id }, { excerpt: excerpt, date: date, patron: patron });
    return result.modifiedCount;
}

/**
 * Find the quote with the given ID value.
 * @param {String} _id
 * @returns A promise. Returns object.
 */

const deleteById = async (_id) => {
    const result = await Quote.deleteOne({ _id: _id });
    return result.deletedCount;
};

export {createQuote, findQuoteById, replaceQuote, deleteById}