# TestFuelPhpCode
===

## Overview
- [testFuelPhp](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/testFuelPhp) - It is a project to test whether FuelPHP can connect to the database.
- [testFuelPhp/fuel/app/config/development/db.php](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/testFuelPhp/fuel/app/config/development/db.php) - Database config file.
- [DBcommand.txt](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/DBcommand.txt)- "Create database command" is written this file.

## Description
- [testFuelPhp](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/testFuelPhp) - Connect to the database and spit out contents.
- [testFuelPhp/fuel/app/config/development/db.php](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/testFuelPhp/fuel/app/config/development/db.php) - Read official document for details.
- [DBcommand.txt](https://github.com/nikaidoumari/TestFuelPhpCode/blob/master/DBcommand.txt) - Please paste this command after starting mysql.

## Demo
![ss1.png](https://raw.githubusercontent.com/nikaidoumari/TestFuelPhpCode/master/img/ss1.png)

## Requirement
- Apache
- PHP 7
- MySQL 5.4

## Usage
Access the [http://localhost/TestFuelPhpCode/testFuelPhp/public/index.php/welcome/dbtest](http://localhost/TestFuelPhpCode/testFuelPhp/public/index.php/welcome/dbtest) from the browser and check whether the contents of the database are displayed.

## Install
##### Clone this repository to apache docment root.
`git clone https://github.com/nikaidoumari/TestFuelPhpCode.git /var/www/`
##### Edit "testFuelPhp/fuel/app/config/development/db.php" and change the user name password.
`vim db.php`
##### Paste Inside of DBcommand.txt after starting mysql.
After pasting, It should be as shown below.
```
mysql> USE testDatabase
Database changed
mysql> SHOW TABLES;
+------------------------+
| Tables_in_testDatabase |
+------------------------+
| users                  |
+------------------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM users;
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  1 | YAMADA |   54 |
|  2 | TANAKA |   32 |
|  3 | SUZUKI |   45 |
|  4 | SATO   |   18 |
+----+--------+------+
4 rows in set (0.00 sec)
```

## Licence

These codes are licensed under CC0.

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")](http://creativecommons.org/publicdomain/zero/1.0/deed.ja)

## Author

[NikaidouMari](https://github.com/nikaidoumari)
