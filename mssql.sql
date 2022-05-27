create table EMP_LOGIN
(
	username varchar(100),
	user_password varchar(100)
	
);

insert into EMP_LOGIN values('admin','admin');

create table customer 
(
	customer_id integer IDENTITY(1,1) PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	house_no VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	zipcode VARCHAR(50) NOT NULL,
	username varchar(50) unique not null,
	password varchar(50) not null,

);


INSERT INTO CUSTOMER 
(name,phone,email, username, password,house_no,city,zipcode)
VALUES
('Mahade','01671648062','ammar@mailinator.com','ammar', '12345','Q5','Dhaka','1207');



CREATE TABLE ACCOUNTS
(	
	account_id integer IDENTITY(1,1) PRIMARY KEY NOT NULL,
	customer_id integer NOT NULL,
	date_opened DATE NOT NULL,
	current_balance FLOAT ,

	FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO ACCOUNTS 
( customer_id, date_opened,current_balance)
VALUES
( 1,'18-Feb-2016',50000);




CREATE TABLE BRANCH
( 
	branch_id INTEGER IDENTITY(1,1)  PRIMARY KEY NOT NULL,
	name varchar(50) NOT NULL,
	house_no VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	zip_code VARCHAR(50) NOT NULL,

);

INSERT INTO BRANCH VALUES ('Malibagh','M502', 'Dhaka', '1217');


CREATE TABLE TRANSACTION_BANK
(
	transaction_id integer IDENTITY(1,1)  PRIMARY KEY NOT NULL,
	account_id integer NOT NULL,
	branch_id integer NOT NULL,
	date_of_transaction DATE NOT NULL,
	amount FLOAT(20) NOT NULL,
	action VARCHAR(20), 
	FOREIGN KEY (account_id) REFERENCES ACCOUNTS(account_id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id)  ON UPDATE CASCADE ON DELETE CASCADE
);



-------------

