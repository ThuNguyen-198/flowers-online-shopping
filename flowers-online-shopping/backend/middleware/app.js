//EXPRESS MIDDLEWARE

const express = require('express');

const app = express();

//Allow our app from localhost:4200 to access server in localhost:3000
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/flowers', (request, response, next) => {
    const flowers = [
		{   id: 'abcd1234',
            nameOfBouquet: 'Pastel Purple Bouquet',
            color: 'violet',
            kind: ['lavender', 'rose'],
            occasion: 'Valentine'
		}
	];

    response.status(200).json({
		message: "Data fetched successfully",
		flowers: flowers
	});
    
})

module.exports = app;