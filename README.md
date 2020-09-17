# cardGeneratorApi

This is an express api project made to generate fake credit cards, save them on a database, update their funds and delete them 

  - Great for testing purposes 
  - Easy to see if the payment of an app works, without using real cards
  - Database agnostic 

### Installation

Create the Database with the seed.sql in data/

```sh
-- CREATE DATABASE
CREATE DATABASE FINANCE;

-- Create Tables

CREATE TABLE FINANCE.Card (
    id INT  AUTO_INCREMENT PRIMARY KEY,
	card_type VARCHAR(255) NOT NULL ,
	card_number VARCHAR(500) UNIQUE NOT NULL ,
	expiration_month VARCHAR(255) NOT NULL ,
	expiration_year VARCHAR(255) NOT NULL ,
	cvv VARCHAR(255) NOT NULL ,
	card_funds DOUBLE NOT NULL ,
	name VARCHAR(255) NOT NULL
);

```

Create the .env with the .env.example

```sh
host= # IP or 'localhost'
user= # database user
database='FINANCE' # Is the default in the seed.sql
password= # database password
secret = # encryption secret 
```

Install the dependencies and start the server.

```sh
$ npm install 
$ npm serve
```

# Postman Collection: 
Use this link: https://www.getpostman.com/collections/73762288f3ed5b89626b
