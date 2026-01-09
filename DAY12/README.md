RELATIONSHIP:-
* Type of RelationShip:-
. One to One
. One to Many
. Many to Many

One to one relation ship:- In this relation ship there is only one table i.e. relate with another one table there is atleat one common field that help two tables to realate with each other.

One to Many relation ship:- In this relation ship there is only one table i.e. relate with another tables in between them atleat one field should be common.

*. What is Foreign key?
A column that we used in our table actually belongs to different table that column for key is known as Foreign Key.

Give an example how to create foreign key:-

Creation of table:-

CUSTOMER
    CREATE TABLE customers(
        cust_id SERIAL PRIMARY KEY,
        cust_name VARCHAR(100) NOT NULL
    );

ORDER
    CREATE TABLE orders(
        ord_id SERIAL PRIMARY KEY,
        ord_date DATE NOT NULL,
        price NUMERIC NOT NULL,
        cust_id INTEGER NOT NULL
        FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
    )

Insertion of table:-

CUSTOMER
    INSERT INTO customers(cust_name) 
    VALUES 
        ('Raju'),('Sham'),('Paul'),('Alex');

Order
    INSERT INTO orders(ord_date,cust_id,price)
    VALUES
        ('2024-01-01',1,250.00),
        ('2024-01-15',1,300.00),
        ('2024-02-01',2,150.00),
        ('2024-03-01',3,450.00),
        ('2024-04-04',2,550.00);


Understand JOINS:-
JOIN operation is used to combine rows from two or more tables based on a related column between them.

Customers:-
PRIMARY KEY
CUST-ID     NAME        EMAIL
101         Raju        raju@email.com
102         Sham        sham@email.com
103         Babu Rao    babu@email.com

Orders:-
PRIMARY KEY
ORDER_ID    DATE            AMOUNT      CUST_ID
Ord-1       2023-05-15      200         101
Ord-2       2023-04-28      500         102
Ord-3       2023-05-14      1000        101

Types of Join:-
.   CROSS JOIN
.   INNER JOIN
.   LEFT JOIN
.   RIGHT JOIN


*.  CROSS JOIN:-
Every row from one table is combined with every row from another table.

Query:- SELECT * FROM customers CROSS JOIN orders;

*.  INNER JOIN
Returns only the rows where there is a match between the specified columns in both the left (or first) and right (or second) tables.

Query:- SELECT * FROM customers C//alias
        INNER JOIN
        order O
        ON C.cust_id=O.cust_id;

In inner join we can see the data which have at least one column common.

Inner join with Group By:-
SELECT name FROM customers
    INNER JOIN orders
    ON order.cust_id=customers.cust_id
GROUP BY name;

*.  LEFT JOIN
Returns all rows from the left(or first) table and the matching rows from the right (or second) table.

SELECT * FROM customers C
    LEFT JOIN
    orders O
ON c.cust_id=O.cust_id;

*.  RIGHT JOIN
Returns all rows from the right(or second) table and the matching rows from the left(or second) table.

SELECT * FROM customers C
    RIGHT JOIN
    order O
ON C.cust_id=O.cust_id;

*. MANY-MANY relationship:- In this relation ship there is more than one table that is related to one more one tables with a common field.

Task on RelationShip:-
Task:-
Create a one-to-many and many-to-many relationship in a shopping store context using
four tables:-
. customers
. orders
. products
. order_items

Include a price column in the products table and display the relationship between customers and their orders. Along with the details of the products in each order

Customers       Orders         Products         Ord-items
cust_id         Ord_id          p_id            iems_id
cust_name       Ord_date        p_name          ord_id
                cust_id         price           p_id
                                                quantity

To perform this task:-
Step1: Create all tables:-
    Customer
    CREATE TABLE customer(
        cust_id SERIAL PRIMARY KEY,
        cust_name VARCHAR(100) NOT NULL
    )

    ORDER
    CREATE TABLE orders(
        ord_id SERIAL PRIMARY KEY,
        ord_date DATE NOT NULL,
        cust_id INTEGER NOT NULL,
        FOREIGN KEY (cust_id) REFERENCES customers
    );

    PRODUCT
    CREATE TABLE products(
        p_id SERIAL PRIMARY KEY,
        p_name VARCHAR(100) NOT NULL,
        price NUMBERIC NOT NULL
    )

    ITEMS
    CREATE TABLE order_items(
        item_id SERIAL PRIMARY KEY,
        ord_id INTEGER NOT NULL,
        p_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (ord_id) REFERENCES Orders (ord_id),
        FOREIGN KEY (p_id) REFERENCES products(p_id)
    );

Inserting the data in the table:-
Customer:-
    INSERT INTO customers(cust_name)
    VALUES 
        ('Raju'),('Sham'),('Paul'),('Alex');

ORDERS:-
    INSERT INTO orders(ord_date,cust_id)
    VALUES
        ('2024-01-01',1), ---Raju first order
        ('2024-02-01',2), ---Sham first order
        ('2024-03-01',3), ---Paul first order
        ('2024-04-04',2); ---Sham second order

PRODUCTS:-
    INSERT INTO products(p_name,price)
    VALUES
        ('laptop',55000.00),
        ('Mouse',500.00),
        ('Keyboard',800.00),
        ('Cable',250.00);

Order-items
    INSERT INTO order_items(ord_id,p_id,quantity)
    VALUES
        (1,1,1),
        (1,4,2),
        (1,2,1),
        (3,2,1);

QUERY TO DISPLAY DATA:-
SELECT c.cust_name,p.p_name,oi.quantity,o.ord_date,p.price,(oi.quantity*p.price) From 
    order_cites oi
    JOIN
        products p ON oi.p_id=p.p_id
    JOIN
        orders o ON o.ord_id=oi.ord_id
    JOIN
        customer c ON o.cust_id=c.cust_id;

What are VIEWS?
It is a temporary table that you can access at any time at one click.

CREATE VIEW biling_info As
SELECT 
    o.ord_id,
    o.ord_name,
    o.ord_date,
    p.p_name,
    p.price,
    oi.quantity
    (oi.quantity * p.price) AS total_price
FROM order_items oi
    JOIN
        products p ON oi.p_id=p.p_id
    JOIN
        orders o ON o.ord_id=oi.ord_id
    JOIN
        customer c ON o.cust_id=c.cust_id;
    
Having clause:-
When you will use group by then you will not use WHERE for condition in PSQL. So, we having clause.

SELECT p_name,SUM(total_price) from billing_info GROUP BY p_name
    HAVING SUM(total_price)>1000;

GROUP BY ROLLUP

SELECT p_name,SUM(total_price) from billing_info 
    GROUP BY ROLL UP(p_name)
    ORDER BY sum(total-price);

SELECT 
    COALESCE(p_name,'Total'),
    SUM(total_price) AS Amount
FROM billing_info
    GROUP BY
    ROLL UP(p_name) ORDER BY amount;

Understand Stored Procedure:-

STORED ROUTINE:- An SQL statement or a set of SQL statement that can be stored on database server which can be call no. of times.

Types of STORED ROUTINE
. STORED PROCEDURE
. User defined Functions

*. STORED PROCEDURE:-Set of SQL statements and procedural logic that can perform operations such as inserting, updating, deleteing, and querying data.

CREATE OR REPLACE PROCEDURE procedure_name(parameter_name parameter_type ...)
LANGUAGE plpgsql
AS $$
BEGIN
    --- procedural code here
END;
$$;

Example:-
CREATE OR REPLACE PROCEDURE update_emp_salary(
    p_employee_id INT,
    p_new_salary NUMRIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary=p_new_salary
    WHERE emp_id=p_employee_id;
END;
$$;

if you want to execute then stored procedure you can use the syntax.

CALL update_emp_salary(3,71000);

Task create a stored procedure to insert data in table's column:-

    CREATE OR REPLACE PROCEDURE add_employee(
        p_fname VARCHAR,
        p_lname VARCHAR,
        p_email VARCHAR,
        p_dept VARCHAR,
        p_salary NUMERIC
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO employees(fname,lname,email,dept,salary)
        VALUES(p_fname,p_lname,p_email,p_dept,p_salary);
    END;
    $$;


Understand User Defined Functions:-
Custom function created by the user to perform specific operations and return a value.

SYNTAX:-
CREATE OR REPLACE FUNCTION function_name(parameters)
RETURNS return_type AS $$
BEGIN
    --function body(sql statements).
    RETURN some_value; ---for scalar function
END;
$$ LANGUAGE plpgsql;

Q. Find name of the employee in each department having maximum salary.
CREATE OR REPLACE FUNCTION dept_max_emp1(dept_name,VARCHAR)
RETURNS TABLE(emp_id INT,fname VARCHAR, salary NUMERIC)
AS $$
BEGIN
    RETURN query
    SELECT
        e.emp_id,e.frame,e.salary
    FROM
        employees e
    WHERE
        e.dept=dept_name
        AND e.salary =(
            SELECT MAX(emp.salary)
            FROM employees emp
            WHERE emp.dept=dept.name
        );
    END;
    $$ LANGUAGE plpgsql;

SELECT * FROM dep_max_sal_emp('IT');

*. What are windows functions:-
Window functions also known as analytic function allow you to perform calculations across a set of rows related to the current row.

Defined by an OVER() clauses.

Running salary with windows functions:-

SELECT fname,salary,SUM(salary) OVER(ORDER BY salary) FROM employees;


Benefits of window Functions:-

. Advanced Analytics: They enable complex calculations like running totals, moving averages, rank calculations, and cumulative distributions.

. Non-Aggregating:- Unlike aggregate functions, window functions do not collapse rows. This means you can calculate aggregates while retaining individual row details.

. flexibility:- They can be used in various clauses of sql, such as SELECT, ORDER BY, and HAVING, providing a lot of flexibility in writing queries.

Moving average:-
    SELECT fname,salary,SUM(slary) OVER(ORDER BY salary) FROM employees;

Multiple types of windows functions:-
. ROW_NUMBER()
. RANK()
. DENSE_RANK()
. LAG()
. LEAD()

These are SQL window (analytic) functions. I’ll explain each clearly, with simple examples so you can understand the difference easily.

⸻

*. ROW_NUMBER()
Gives a unique sequential number to each row (no duplicates), even if values are the same.

Example
SELECT name, salary,
ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;

*. RANK()
Gives same rank for equal values
Leaves gaps in ranking

Example
SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

*. DENSE_RANK()
Same rank for equal values
No gaps in ranking

Example
SELECT name, salary,
DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

*. LAG()
Gets previous row value (looks backward)

Example
SELECT name, salary,
LAG(salary) OVER (ORDER BY salary) AS prev_salary
FROM employees;

*. LEAD()
Gets next row value (looks forward)

Example
SELECT name, salary,
LEAD(salary) OVER (ORDER BY salary) AS next_salary
FROM employees;