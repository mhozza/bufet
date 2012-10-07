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
INSERT INTO users VALUES (6, 'fb:826414967', '<FETCH>', '<FETCH>', '<FETCH>'); -- Tina
INSERT INTO users VALUES (7, 'fb:1449635559', '<FETCH>', '<FETCH>', '<FETCH>'); -- Martin Macko
INSERT INTO users VALUES (8, 'fb:100002512842538', '<FETCH>', '<FETCH>', '<FETCH>'); -- Martin Kravec
INSERT INTO users VALUES (9, '', 'jaro', 'Jaroslav Budiš','images/JaroslavBudis.jpg'); -- Jaro
INSERT INTO users VALUES (10, 'fb:600118001', '<FETCH>', '<FETCH>', '<FETCH>'); -- Kuko
INSERT INTO users VALUES (11, 'fb:587288808', '<FETCH>', '<FETCH>', '<FETCH>'); -- Brona
INSERT INTO users VALUES (12, 'fb:609663909', '<FETCH>', '<FETCH>', '<FETCH>'); -- Vinko
ALTER TABLE users AUTO_INCREMENT = 15;

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
	tid BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	date DATETIME NOT NULL,
	uid BIGINT NOT NULL REFERENCES users(uid),
	iid BIGINT NOT NULL REFERENCES items(iid),
	amount BIGINT, -- scale: 0.1 
	price BIGINT, -- in 0.1 euro cent
	type TEXT NOT NULL, -- 'purchase', 'cancel', 'pay', ''
	rtid BIGINT REFERENCES transactions(tid) 
);

INSERT INTO transactions VALUES (4, NOW(), 4, 4, 10, 300, 'purchase', NULL);
INSERT INTO transactions VALUES (5, NOW(), 4, 4, 10, 300, 'purchase', NULL);
INSERT INTO transactions VALUES (6, NOW(), 4, 4, NULL, NULL, 'cancel', 5);
INSERT INTO transactions values (7, NOW(), 4, 3, 10, 300, 'pay', NULL); 

ALTER TABLE transactions AUTO_INCREMENT = 10;

DROP TABLE IF EXISTS price;
CREATE TABLE
	price
(
	iid BIGINT NOT NULL REFERENCES items(iid),
	price BIGINT NOT NULL, -- in 0.1 euro cents
	date DATETIME NOT NULL
);

INSERT INTO price VALUES (4, 4000, '2012-10-03 18:26:58');
INSERT INTO price VALUES (5, 200, '2012-10-03 18:26:59');
INSERT INTO price VALUES (4, 300, '2012-10-03 18:27:58');

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
