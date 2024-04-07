// netlify/functions/leaderboard.js
const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({secret: process.env.FAUNADB_SECRET_KEY});

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    // Add a new entry
    const data = JSON.parse(event.body);
    return client.query(q.Create(q.Collection('leaderboard'), {data}))
      .then((response) => ({
        statusCode: 200,
        body: JSON.stringify(response)
      }))
      .catch((error) => ({
        statusCode: 400,
        body: JSON.stringify(error)
      }));
  } else if (event.httpMethod === 'GET') {
    // Retrieve all entries
    return client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('leaderboard'))),
      q.Lambda(x => q.Get(x))
    ))
    .then((response) => ({
      statusCode: 200,
      body: JSON.stringify(response.data.map(item => item.data))
    }))
    .catch((error) => ({
      statusCode: 400,
      body: JSON.stringify(error)
    }));
  }
};
