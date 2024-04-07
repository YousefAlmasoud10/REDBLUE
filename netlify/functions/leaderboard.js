// netlify/functions/leaderboard.js

const faunadb = require('faunadb'),
      q = faunadb.query;
exports.faunadb = faunadb;
exports.q = q;

// Updated FaunaDB client initialization with the EU region endpoint
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY, // Make sure this environment variable is set in Netlify and locally for testing
  domain: 'db.eu.fauna.com', // Specify the EU region endpoint
  scheme: 'https', // Use HTTPS
});
exports.client = client;


