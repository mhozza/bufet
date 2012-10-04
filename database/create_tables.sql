USE m25bufet;

ALTER DATABASE m25bufet charset=utf8;

DROP TABLE IF EXISTS users;
CREATE TABLE 
	users
(
	uid BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	credentials_source TEXT,
	username TEXT NOT NULL,
	name TEXT NOT NULL, 
	picture_url TEXT NOT NULL
);

INSERT INTO users VALUES (4, 'fb:1189818408', '<FETCH>', '<FETCH>', '<FETCH>'); -- Mic
INSERT INTO users VALUES (5, 'fb:1074847871', '<FETCH>', '<FETCH>', '<FETCH>'); -- Majak
ALTER TABLE users AUTO_INCREMENT = 10;

DROP TABLE IF EXISTS items;
CREATE TABLE 
	items
(
	iid BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	picture_url TEXT NOT NULL,
	descr TEXT NOT NULL,
	divisible TINYINT NOT NULL DEFAULT 10 -- Can be only 1,5,10
);

INSERT INTO items (iid, name, picture_url, descr) VALUES (3, 'Dummy Item', 'http://www.maximumpc.com/files/u46168/no-bugs.png', '');
INSERT INTO items (iid, name, picture_url, descr) VALUES (4,'Horalka', 'http://www.tvojakava.sk/pics/tovarove%20automaty/horalka.png', 'kus');
INSERT INTO items (iid, name, picture_url, descr, divisible) VALUES (5,'Dzus', 'http://www.mcdonalds.sk/img/sk/produkty/produkty/chlazene_napoje/p06.jpg', 'šálka', '5');
ALTER TABLE items AUTO_INCREMENT = 10;

DROP TABLE IF EXISTS transactions;
CREATE TABLE
	transactions
(
	date DATETIME NOT NULL,
	uid BIGINT NOT NULL REFERENCES users(uid),
	iid BIGINT NOT NULL REFERENCES items(iid),
	amount BIGINT NOT NULL, -- scale: 0.1 
	price BIGINT NOT NULL, -- in 0.1 euro cent
	type TEXT NOT NULL -- 'purchase', 'cancel', 'pay', ''
);

INSERT INTO transactions VALUES (NOW(), 4, 4, 10, 30, 'purchase');
INSERT INTO transactions VALUES (NOW(), 4, 4, 10, 30, 'purchase');
INSERT INTO transactions VALUES (NOW(), 4, 4, 10, 30, 'cancel');
INSERT INTO transactions values (NOW(), 4, 3, 10, 30, 'pay'); 

DROP TABLE IF EXISTS price;
CREATE TABLE
	price
(
	iid BIGINT NOT NULL REFERENCES items(iid),
	price BIGINT NOT NULL, -- in 0.1 euro cents
	date DATETIME NOT NULL
);

INSERT INTO price VALUES (4, 400, '2012-10-03 18:26:58');
INSERT INTO price VALUES (5, 20, '2012-10-03 18:26:59');
INSERT INTO price VALUES (4, 30, '2012-10-03 18:27:58');

DROP TABLE IF EXISTS inventory;
CREATE TABLE
	inventory
(
	iid BIGINT NOT NULL REFERENCES items(iid)
);
INSERT INTO inventory VALUES (4);
INSERT INTO inventory VALUES (5);

-- VIEW WITH LAST DATES
DROP VIEW IF EXISTS items_last_date;
CREATE VIEW
	items_last_date
AS
	SELECT 
		iid,
		MAX(date) as date
	FROM 
		price
	GROUP BY
		iid;

-- VIEW WITH ACTUAL PRICES

DROP VIEW IF EXISTS actual_price;
CREATE VIEW 
	actual_price
AS
	SELECT 
		i.iid AS iid,
		i.name AS name,
		i.picture_url AS picture_url,
		i.descr AS descr,
		i.divisible AS divisible,
		p.price AS price
	FROM 
		items i
		JOIN 
		price p ON (
			i.iid = p.iid	
		) 
		JOIN 
		items_last_date pp ON (
			pp.iid = p.iid AND
			pp.date = p.date
			
		);
