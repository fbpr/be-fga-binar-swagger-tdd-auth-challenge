const express = require('express');
const app = express();
const router = require('./routes');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'FGA BINAR Backend Javascript Challenge 5',
      version: '1.0.0',
      description: 'Backend Javascript Challenge 5 Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
      {
        url: 'http://localhost:8080/api/v1',
      },
    ],
  },
  apis: ['./routes/*.route.js'],
};

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', router);
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerOptions))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
