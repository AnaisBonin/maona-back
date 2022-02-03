mysql> SHOW TABLES;
+-----------------+
| Tables_in_maona |
+-----------------+
| articles        |
| categories      |
| fabrics         |
| images          |
| keywords        |
| orderLines      |
| orders          |
| paragraphs      |
| productFabric   |
| products        |
| reviews         |
| subCategories   |
| testimonies     |
| users           |
+-----------------+


^C
mysql> SELECT pdt.*, c.name AS category, r.text AS review FROM products pdt 
    ->   JOIN categories c ON pdt.categoryId = c.id
    ->   JOIN reviews r ON r.productId;
+----+------------------+--------------------------------+----------------------------------------------------------------------------------------+-------+-------+-------------+-------------+------------+---------------+----------+---------------------------------------------+
| id | name             | shortDdescription              | description                                                                            | price | stock | isAvailable | isEssential | categoryId | subCategoryId | category | review                                      |
+----+------------------+--------------------------------+----------------------------------------------------------------------------------------+-------+-------+-------------+-------------+------------+---------------+----------+---------------------------------------------+
|  1 | gigoteuse été    | Gigoteuse pour bébé en lin     | Description d'une gigoteuse en lin pour l'été, pour les grosses chaleurs. Respirant.   |    82 |     3 |           1 |           1 |          2 |             7 | bébés    | Ce produit est génial, taille parfaitement  |
|  1 | gigoteuse été    | Gigoteuse pour bébé en lin     | Description d'une gigoteuse en lin pour l'été, pour les grosses chaleurs. Respirant.   |    82 |     3 |           1 |           1 |          2 |             7 | bébés    | Mon bébé l'adore, il ne dort plus sans !    |
|  2 | gigoteuse hivers | Gigoteuse pour bébé en coton   | Description d'une gigoteuse en coton pour passer l'hiver au chaud                      |    92 |     2 |           1 |           0 |          2 |             7 | bébés    | Ce produit est génial, taille parfaitement  |
|  2 | gigoteuse hivers | Gigoteuse pour bébé en coton   | Description d'une gigoteuse en coton pour passer l'hiver au chaud                      |    92 |     2 |           1 |           0 |          2 |             7 | bébés    | Mon bébé l'adore, il ne dort plus sans !    |
+----+------------------+--------------------------------+----------------------------------------------------------------------------------------+-------+-------+-------------+-------------+------------+---------------+----------+---------------------------------------------+
