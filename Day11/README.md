* What is Database?
An organised collection of data. A method to manipulate and access the data.

* Database VS DBMS
Database is a collection of Data. And DBMS is a system or software that manage all the data in database. And from these Management system we have done crud operation with database. Combination of database and its management system is known as database management system.

* What is RDBMS?
A type of database system that stores data in structured tables (using rows and columns) and uses SQL for managing and quering data.

Some other databases are:
. MongoDB
. Oracle
. MySQL
. SQlite
. Postgre Sql
. Maz DB
. Fire bird
. Redis
. Firebase


Install Postgre SQL:- pdADMIN
note:- Your username by default is postgres and keep your password in your mind.

Queries of PostGreSQL in psql shell:-

* Want to see the collection :- \list or \l
* To clear Screen:- \! cls or \!clear
* To create Database:- Create database databasename
* To choose the database:- \c databasename
* Deleting a database:- drop database <db_name>;

* If you want to execute postgreSQL command in cmd:-

Step1:- First set the postgreSQL>16>bin path in enviornmnet variables.
Step2:- psql -u postgres to write the queries.

* Command and Queries:-

. Queries to create table:- create table(id INT, name VARCHAR(100),city VARCHAR(100));
. Command to display table:- /d tableName;
. Inserting data in table:- 
INSERT INTO tablename(id,name,city)
VALUES(101,'Raju','Delhi')
Or
INSERT INTO tablename VALUES(101,'Rahul');

. Inserting multiple data in table:-
INSERT INTO tablename(id,name,city)
VALUES (102,'shan','mumbai'),(103,'Paul','chennai');

. Reading data from a table:-
SELECT * FROM <table_name>
SELECT <column_name> from tablename.

. Reading multiple data from a table:-
SELECT <column_name>,<column_name> from tablename.

. Modify/Update from a table:-
UPDATE tablename SET city='London' WHERE id=2;

. Deleting data form a table:-
DELETE FROM table_name WHERE name='Raju'; // Here you can prefer the feild that is unique like id.


* Datatypes
. Constraints
    . Primary key
    . NOT NULL
    . Default
    . Serial
    . Unique

Datatypes:- 
An attributes that specifies the type of data in a column of our database table.


Most widely Used are:-
. Numeric - INT, DOUBLE, FLOAT, DECIMAL
. String- VARCHAR
. Date- DATE
. Boolean- BOOLEAN

* What will we do when we want to store the value like 15.35?
Decimal(n,m)// Where n is Total no of digit or m is the no of precision value.

Primary Key:-
. The primary key constraint uniquely identifies each record in a table.
. Primary keys must contain UNIQUE values, and cannot contain NULL values.
. A table can have only one primary key.
. NOT NULL value is not allowed to that feild.
    CREATE TABLE customer( id INT NOT NULL, name VARCHAR(100) NOT NULL,);
. DEFAULT VALUE:-
    CREATE TABLE customer(
        acc_no INT PRIMARY KEY, 
        name VARCHAR(100) NOT NULL,
        acc_type VARCHAR(50) NOT NULL DEFAULT 'Savings'
    );
. AUTO_INCREMENT:- For this use SERIAL keyword.
    CREATE TABLE employee(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(50),
        lastname VARCHAR(50)
    )


Claues in PostgreSQL:-
. Where
. Distinct
. Order By
. Limit
. Like

Q1.Find the customer whose emp_id is 5?
Query:- select * from customer
        where emp_id=5;

Q2. Find the customer who is working in HR department?
Query:- select * from customer 
        where dept='HR';

Q3. Find the customer whose salary is greater than 500000 equals to 50000.
Query:- select * from customer
        where salary>=50000;

Q4. Find the customer from IT and HR department?
Query:- select * from customer
        where dept='HR' or dep='IT';

Q5. Find a customer whose department is IT and salary is greater than 50000.
Query:- select * from customer
        where dept='IT' AND salary>50000.

* Relational Operators
Operators                   Meaning
<                           Less than
>                           Greater than
<=                          Less than or equals to
>=                          Greater than or equal to
=                           Equal to 
!=                          Not equal to

* Logical Operators
1. AND= Both condition is true then true only.
2. OR= If any one is true then true only.
3. IN=In is used to give option in which any one is true.
4. NOTIN=NOT IN is used to find the value that is not in field.

Q. Find a customer from 'IT','HR','FINANCE'?
Query:- select * from customer
        WHERE dept IN('IT','HR','FINANCE');

5. Between :- Act as a logial operator use to find the data in between two value.
Query:- select * from customer
        Where salary between 40000 and 55000;

* Distinct clause:-
If the value is duplicate in our database and when we fetch with query and i want only one data from the field. So that time we can use Distinct clause like this:-

example like :- if you want all dept then;
select dept from customer; // Then the out put is all dept.

if you use distinct clause then.
selct DISTINCT dept from employees;// It will print only distinct dept.

OrderBy:- It is used for sorting of data.

Q1. Write a query to display the data in sorting order for fname field?
Query:- select * FROM customer orderby fname;

In order by clause if you simply use order by clause then it return the data in ascending order.

But if you want in descending order then
select * from customer orderby fname DESC;

* Limit:- If you want limited amount of data then you can use limit clause.

Q. Find three customer from top?
Query:- select * from employees LIMIT 3;

* Like:- This clause is used to find a similar pattern in data according to that this clause display data.

Q. find the name of employees whose name is started from R?
Query:-select * from customer WHERE fname like 'A%'; //A is the starting point, % this is for any thing afte A.

Q. find the name of employees whose name contain character i?
Query:- select * from cusomer where fname like '%i%';

Q. find the name of employees whose dept name length is 2?
Query:- select * from customer where dept like '--';

Q. Find the employees name whose name's second alphabet is 'a'?
Query:- select * from customer where fname like '_a%';

Aggregation:-
In aggregation we have many function like. COUNT(),SUM(),AVG(),MIN(),MAX() etc..

Q. Find the total numbers of employee according to emp_id?
Query:- select COUNT(emp_id) FROM employess.//You can put any column name .But preferred anme primary key column.

* SUM():-
SELECT SUM(salary) FROM tablename.

* AVG():-
SELECT AVG(salary) FROM tablename.

* MIN():-
SELECT MIN(salary) FROM tablename.

* MAX():-
SELECT MAX(salary) FROM tablename.

What is GROUP BY?
Q. Find the number of employees in each department?
QUERY:- SELECT dept FROM tablename GROUPBY dept.
        SELECT dept,COUNT(fname) FROM tablename GROUPBY dept.

Q. Find the sum of salary of each department?
QUERY:- SELECT dept,SUM(salary) FROM tablename GROUPBY dept;

String Functions:-

In strings there are multiple functions:-
. CONCAT, CONCAT-WS
. SUBSTR
. LEFT,RIGHT
. LENGTH
. UPPER,LOWER
. TRIM,LTRIM,RTRIM
. REPLACE
. POSITION
. STRING_AGG

* CONCAT():-
CONCAT(first_col,sec_col);
CONCAT_WS(first_word,second_word,.....)

SELECT CONCAT(fname,lname) from employee
or
SELECT CONCAT(fname,lname) AS fullname from employees;

Q. Write a query to print emp_id,fullname that is concatenation of (first or lastname) and then dept.
Query:- SELECT emp_id,CONCAT(fanme,lname) AS fullname dept FROM employees;

Q. Write a query to print emp_id,fullname that is concatenation of (fname,lname) but add one space and the dept.
Query:- SELECT emp_id,CONCAT(fname,' ',lname) AS fullname,dept FROM employees;
or
Query:- SELECT emp_id,CONCAT_WS(' ',fname,lname) AS fullname,dept FROM employees;

* SUBSTRING():-
SELECT SUBSTRING('HEY BUDDY',1,4);//HEY 
SELECT SUBSTR('HEY BUDDY',4,9);// BUDDY

* REPLACE():-
REPLACE(str,from_str,to_str);
REPLACE('HEY BUDDY','Hey','Hello');//Hello Buddy

SELECT REPLACE('ABCXYZ','ABC','PQR');//PQRXYZ

Q. Write a query to convert all IT dept to tech dept:-
SELECT REPLACE(dept,'IT','TECH') FROM tablename;

* REVERSE():-
SELECT REVERSE('Hello');

* LENGTH():-
SELECT LENGTH('HELLO');// length=5

* UPPER() and LOWER():-
SELECT UPPER('fname') from tablename

* LEFT() and RIGHT():-
SELECT LEFT('HELLO WORLD',4);//HELL

* TRIM():-
SELECT TRIM(' Alright! ');

SELECT LENGTH('     Alright     ');//4
SELECT LENGTH(TRIM('        Alright     '));

* POSITION():-
SELECT POSITION('om' in 'thomas');//3


Exercise CONCAT:-

Task1:- emp_id:fname:lname:dept
QUERY:- SELECT CONCAT_WS(':',emp_id,fname,lname,dept) FROM employees WHERE emp_id=1;

Task2:- emp_id:fname lname:salary
Query:- SELECT CONCAT_WS(':',emp_id,CONCAT_WS(' ',fname,lname),salary) FROM employees WHERE emp_id=1;

Task3:- emp_id:fname lname:dept
Query:- SELECT CONCAT_WS(':',emp_id,fname,UPPER(dept)) FROM employees WHERE emp_id=4;

Task4:- firstletter of deptname emp_id  fname
QUERY:- SELECT CONCAT(LEFT(dept,1),emp_id,' ',fname) FROM employees.

Exercise DISTINCT,ORDERBY,LIKE and LIMIT
Q1. Find different type of department in database?
QUERY:- SELECT DISTINCT dept FROM employees

Q2. Display records with high-low salary:-
QUERY:- SELECT MAX(salary) FROM employees;

Q3. How to see only top 3 records from a table?
QUERY:- SELECT * FROM employees LIMIT 3;

Q4. Show records where first name start with letter 'A':-
Query:- SELECT * FROM employees WHERE fname LIKE 'A%';

Q5. Show records where length of the lname is 4 character.
Query:- SELECT * FROM employees WHERE LENGTH(lname)=4;

Exercise COUNT,GROUP BY, MIN, MAX, SUM and AVG

Q1. Find total no. of employees in database?
QUERY:- SELECT COUNT(emp_id) FROM employee.

Q2. Find no. of employees in each department?
QUERY:- SELECT dept,COUNT(emp_id) FROM employees GROUP BY dept.

Q3. Find lowest salary paying?
QUERY:- SELECT MIN(salary) FROM employees.

Q4. Find highest salary paying?
Query:- SELECT * FROM employees 
        WHERE salary=(SELECT MAX(salary) FROM employees);

Q5. Find total salary paying in LOAN department?
Query:- SELECT SUM(salary) FROM employee
        WHERE dept='LOAN'.

Q6. Average salary paying in each department?
Query:- SELECT AVG(salary),dept FROM employee GROUP BY dept.