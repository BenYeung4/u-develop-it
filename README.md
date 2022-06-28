#1 - run --version to see if sql is installed:
mysql --version

/

#2 - start SQL on terminal and enter password:
mysql -u root -p

/

Creates a database (should see a sucess message):
mysql> CREATE DATABASE election;

/

below is the term that will be used for the database:
USE election;

/

Creates a candidate table in sql terminal:
CREATE TABLE candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
industry_connected BOOLEAN NOT NULL
);

/

verify if table was created:
DESCRIBE candidates;

/

adds description of data taht we would want:
INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES ('Ronald', 'Firbank', 1);

/

sees what data we have entered:
SELECT \* FROM candidates; (remove the \, when entering, the README file auto generates before the star)

/

list of info we want:
INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES
('Virginia', 'Woolf', 1),
('Piers', 'Gaveston', 0),
('Charles', 'LeRoi', 1),
('Katherine', 'Mansfield', 1),
('Dora', 'Carrington', 0),
('Edward', 'Bellamy', 0),
('Montague', 'Summers', 1),
('Octavia', 'Butler', 1),
('Unica', 'Zurn', 1);

/

retrieving specific column values:
SELECT first_name, last_name FROM candidates;

/

searching for speific character:
SELECT first_name, industry_connected
FROM candidates
WHERE industry_connected = 1;
or
WHERE id = 5;

/

deleting the data (NOTE THAT THIS WILL DELETE EVERYTHINFG):
mysql> DROP DATABASE election;

/

recreate the election database taht was entered in the file rather than the terminal:
mysql> source db/db.sql
this is for the candidate table: mysql> source db/schema.sql
this is the seed for the table: mysql> source db/seeds.sql

/

if we ever need to edit/udpate a candidate(below is stating, set the industry to 1, with the candidate id 3):

UPDATE candidates
SET industry_connected = 1
WHERE id = 3;

/

if we need to remove/delete:
DELETE FROM candidates
WHERE first_name = "Montague";
