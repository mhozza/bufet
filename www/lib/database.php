<?php

require_once('../config/config.php');

class BufetData {
    private $PDO;
    private static $instance;
    
    private function __construct() {
        $cred = $GLOBALS['DATABASE'];
        $this->PDO = new PDO(
            "mysql:host=$cred[host];dbname=$cred[database]",
            $cred['username'],
            $cred['password'],
            array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
        );
    }

    public static function getInstance() {
        
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;

    }

    private function fetchUserData(&$value) {
        $cred = explode(':', $value['credentials_source']);
        if (count($cred) !== 2) {
            return;
        }
        if ($cred[0] !== 'fb') {
            return;
        }
        if ($value['name'] !== '<FETCH>' &&
            $value['username'] !== '<FETCH>' &&
            $value['picture_url'] !== '<FETCH>' ) {
            return;
        }

        $encoded_json = 
            file_get_contents("http://graph.facebook.com/$cred[1]?");
        $dec = json_decode($encoded_json);
        if ($value['name'] === '<FETCH>') {
            $value['name'] = $dec->{'name'};
        }
        if ($value['username'] === '<FETCH>') {
            $value['username'] = $dec->{'username'};
        }
        if ($value['picture_url'] === '<FETCH>') {
            $public_url = 
                "http://graph.facebook.com/$cred[1]/picture?type=normal";
            $data=file_get_contents($public_url);
            $filename="../images/$cred[1].jpg";
            file_put_contents($filename, $data);
            $value['picture_url'] = "images/$cred[1].jpg";
        }
        $this->updateUserData($value);
    }

    public function updateUserData($value) {
        $sel = $this->PDO->prepare('UPDATE users SET name=:NAME , username=:USERNAME , picture_url=:URL WHERE uid=:UID');
        $sel->bindValue(':NAME',$value['name'],PDO::PARAM_STR);
        $sel->bindValue(':USERNAME',$value['username'],PDO::PARAM_STR);
        $sel->bindValue(':URL',$value['picture_url'],PDO::PARAM_STR);
        $sel->bindValue(':UID',$value['uid'],PDO::PARAM_INT);
        $sel->execute();
    }

    public function getUsers() {
        $sel = $this->PDO->prepare('
                SELECT
                        u.uid AS uid,
                        u.credentials_source AS credentials_source,
                        u.username AS username,
                        u.name AS name,
                        u.picture_url AS picture_url
                FROM 
                        users AS u
                        LEFT JOIN (
                                SELECT 
                                        SUM(price*amount)/10000 AS balance,
                                        uid 
                                FROM
                                        transactions 
                                WHERE 
                                        type = \'purchase\' AND 
                                        date > DATE_SUB(NOW(), INTERVAL 1 MONTH)
                                GROUP BY 
                                        uid
                        ) a 
                        ON 
                                (a.uid = u.uid) 
                ORDER BY a.balance DESC;
        ');
        $sel->execute();
        $data = $sel->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as &$value) {
            $this->fetchUserData($value);
        }
        return $data;
    }

    public function getUser($uid) {
        $sel = $this->PDO->prepare('SELECT * FROM users WHERE uid = :uid');
        $sel->bindValue(':uid', $uid, PDO::PARAM_INT);
        $sel->execute();
        $ret = $sel->fetch(PDO::FETCH_ASSOC);
        $this->fetchUserData($ret);
        return $ret;

    }

    public function getInventory() {
        $sel = $this->PDO->query('
            SELECT
                p.iid,
                p.name,
                p.picture_url,
                p.descr,
                p.divisible,
                p.price 
            FROM 
                actual_price p 
            LEFT JOIN (
                SELECT 
                    iid,
                    SUM(amount*price) AS count 
                FROM 
                    transactions 
                WHERE
                    type=\'purchase\' AND 
                    date > DATE_SUB(NOW(), INTERVAL 1 MONTH) 
                GROUP BY iid
            ) a 
            ON (a.iid = p.iid) 
            WHERE p.iid IN (SELECT * FROM inventory) ORDER BY count DESC;
        ');
        return $sel->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getItem($iid) {
        $sel = $this->PDO->prepare(
            'SELECT * FROM actual_price WHERE iid = :iid '
        );
        $sel->bindValue(':iid', $iid, PDO::PARAM_INT);
        $sel->execute();
        return $sel->fetch(PDO::FETCH_ASSOC);
    }

    public function buyItem($uid, $iid, $amount, $ppu) {
        $item = $this->getItem($iid);
        if (
            $item['price'] != $ppu ||
            ($amount % $item['divisible']) != 0
        )   {
          return false;
        }
        $sel = $this->PDO->prepare(
            'INSERT INTO transactions (date, uid, iid, amount, price, type)
            VALUES (NOW(), :uid, :iid, :amount, :ppu, \'purchase\');');
        $sel->bindValue(':uid', $uid, PDO::PARAM_INT);
        $sel->bindValue(':iid', $iid, PDO::PARAM_INT);
        $sel->bindValue(':amount', $amount, PDO::PARAM_INT);
        $sel->bindValue(':ppu', $ppu, PDO::PARAM_INT);
        if($sel->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function pay($uid, $value) {
        $sel = $this->PDO->prepare(
            'INSERT INTO transactions (date, uid, iid, price, amount, type)
            VALUES (NOW(), :uid, 3, :value, 10, \'pay\')' 
        );
        $sel->bindValue(':uid', $uid, PDO::PARAM_INT);
        $sel->bindValue(':value', $value, PDO::PARAM_INT);
        if($sel->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function getTransactions() {
        $sel = $this->PDO->prepare('SELECT * FROM transactions;');
        $sel->execute();
        return $sel->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTransactionsOfUser($uid) {
        $sel = $this->PDO->prepare(
            'SELECT * FROM transactions t JOIN items i ON (t.iid = i.iid)
            WHERE uid = :uid ORDER BY date DESC;'
        );
        $sel->bindValue(':uid', $uid, PDO::PARAM_INT);
        $sel->execute();
        return $sel->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBalance($uid) {
        $sel = $this->PDO->prepare('
            SELECT 
              SUM(IF(type=\'pay\', price, 0))/1000 -
              SUM(IF(type=\'purchase\', price*amount, 0))/10000 AS balance
            FROM transactions 
            WHERE 
              uid = :uid AND
              type IN (\'purchase\',\'pay\') AND
              tid NOT IN (
                SELECT rtid
                FROM transactions
                WHERE
                  type = \'cancel\' AND
                  uid = :uuid
              )
            ');
        $sel->bindValue(':uid', $uid);
        $sel->bindValue(':uuid', $uid);
        $sel->execute();
        $ret = $sel->fetch(PDO::FETCH_ASSOC);
        return $ret['balance'];
    }
};
