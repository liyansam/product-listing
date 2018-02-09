# Product Listing Project Overview
This project is a web application demo of product listing. Supports CRUD manipulations for products.

## Architecture:
Seperated front-end and back-end. Use MVC architecture in both front-end and back-end. In back-end I used Data Access Object to perfrom CRUD logics.

## Technology:
Front-end: Angular.js

Back-end: node.js + express

Database: MongoDB on Heroku cloud

## REST APIS:
GET /products : get a list of products in database

GET /products/:id : get a product by its ID

POST /products : create a new product

PUT /products/:id update a product by its ID

DELETE /products/:id delete a product by its ID

# How to run:
if you do not have node.js & npm first install them:

see: https://nodejs.org/en/download/

in /backend/:

do `npm install && npm start`

in /frontend/:

do `npm start`

then go to http://localhost:8000 to see the web app

MongoDB has been configured on Heroku
