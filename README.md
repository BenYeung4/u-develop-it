#1 - run --version to see if sql is installed:
mysql --version

/

#2 - start SQL on terminal and enter password:
mysql -u root -p

/

Creates a database (should see a sucess message):
mysql> CREATE DATABASE election;

/

below is the term that will be used for the database (also selecting the database taht we would want"USE (whatever name we entered)"):
USE election;

/

Creates a candidate table in sql terminal VARCHAR(whatever number in here is the amount of characters there is suppose to be):
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

/

to quit SQL just type:
quit

////////////////////

rechecking if everything is in SQL :
SHOW DATABASES;

/

checks if the tables are set up correctly:
SHOW TABLES;

if the table is missing something, best to reset it for example, do the following in SQL also below is after we have manually entered everything into the individual databased sql file rather than entered in the terminal:
mysql>source db/db.sql; ----this will throw away the old database and source it from the original/the one we want
mysql>SHOW DATABASES; -----check that the election database was created
mysql>source db/schema.sql; ------ creates the table for candidates
mysql>SHOW TABLES; ----check that the candidates table was created correctly
mysql>source db/seeds.sql; ----seed the candidates table(assuming adding the content)
mysql>SELECT\* FROM candidates; generate and show database

/
if update the seeds.sql do the following
source db/schema.sql
source db/seeds.sql
then confirm
SELECT \* FROM candidates;

deleting a specific set of party
DELETE FROM parties WHERE id = 1;
SELECT \* FROM candidates;
deletes all party_id that is 1

/

adding the extra description
SELECT \* FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

/

reduces the size
SELECT candidates.\*, parties.name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

/
renaming the data row:
SELECT candidates.\*, parties.name AS party_name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;

/
when writing the votes for the voters:
addes the votes:
INSERT INTO votes (voter_id, candidate_id)
VALUES(3,1), (4,2), (5,2), (6,2), (7,2), (8,3), (9,3);

display the number of votes:
SELECT COUNT(candidate_id) FROM votes;

display the votes for candidates but only the number, not the catagory
SELECT COUNT(candidate_id) FROM votes GROUP BY candidate_id;

adds catagories to view the votes for
SELECT candidates.\*, parties.name AS party_name, COUNT(candidate_id)
FROM votes
LEFT JOIN candidates ON votes.candidate_id = candidates.id
LEFT JOIN parties ON candidates.party_id = parties.id
GROUP BY candidate_id;
+------+------------+-----------+----------+--------------------+----------------+---------------------+
| id | first_name | last_name | party_id | industry_connected | party_name | COUNT(candidate_id) |  
+------+------------+-----------+----------+--------------------+----------------+---------------------+  
| 1 | Ronald | Firbank | 1 | 1 | JS Juggernauts | 2 |  
| 2 | Virginia | Woolf | 1 | 1 | JS Juggernauts | 4 |  
| 3 | Piers | Gaveston | 1 | 0 | JS Juggernauts | 2 |  
| 5 | Katherine | Mansfield | 2 | 1 | Heroes of HTML | 1 |
+------+------------+-----------+----------+--------------------+----------------+---------------------+

renames the count column from count(candidate_id) to count, reformat the table by ORDER in desending:
SELECT candidates.\*, parties.name AS party_name, COUNT(candidate_id) AS count
FROM votes
LEFT JOIN candidates ON votes.candidate_id = candidates.id
LEFT JOIN parties ON candidates.party_id = parties.id
GROUP BY candidate_id ORDER BY count DESC;
+------+------------+-----------+----------+--------------------+----------------+-------+
| id | first_name | last_name | party_id | industry_connected | party_name | count |
+------+------------+-----------+----------+--------------------+----------------+-------+
| 2 | Virginia | Woolf | 1 | 1 | JS Juggernauts | 4 |
| 1 | Ronald | Firbank | 1 | 1 | JS Juggernauts | 2 |
| 3 | Piers | Gaveston | 1 | 0 | JS Juggernauts | 2 |
| 5 | Katherine | Mansfield | 2 | 1 | Heroes of HTML | 1 |
+------+------------+-----------+----------+--------------------+----------------+-------+

//////////////////////

initialize NODE.js:
npm init --y

/

installed npm express package and mysql2(allow us to connect to the MYSQL database and execute the SQL commands):
npm install express mysql2

/

install and set up testing JEST:
npm install jest --save-dev

/

create server.js
touch server.js
