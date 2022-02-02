DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `orderLines`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `keywordArticle`;
DROP TABLE IF EXISTS `productFabric`;
DROP TABLE IF EXISTS `paragraphs`;
DROP TABLE IF EXISTS `testimonies`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `fabrics`;
DROP TABLE IF EXISTS `keywords`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `subCategories`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;


CREATE TABLE `users` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(200) NOT NULL,
  `lastname` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL
);

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`) 
VALUES 
  (1, 'Anaïs', 'Bonin', 'anaisboninfr@gmail.com'),
  (2, 'Jenna', 'Lienhard', 'jennalienhard@gmail.com'),
  (3, 'Maéva', 'Raharijaona', 'maeva.raharijaona@gmail.com')
;


CREATE TABLE `categories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
);

INSERT INTO `categories`(`id`, `name`) 
VALUES 
  (1, 'femmes'),
  (2, 'bébés')
;


CREATE TABLE `subCategories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `categoryId` INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

INSERT INTO `subCategories` (`id`, `name`, `categoryId`) 
VALUES 
  (1, 'jupes', 1),
  (2, 'robes', 1),
  (3, 'blouses', 1),
  (4, 'chemisiers', 1),
  (5, 'pantalons', 1),
  (6, 'bavoirs', 2),
  (7, 'gigoteuses', 2),
  (8, 'protèges carnet de santé', 2),
  (9, 'couvertures', 2)
;


CREATE TABLE `articles` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255),
  `date` DATE NOT NULL
);

INSERT INTO `articles`(`id`, `title`, `img`, `date`) 
VALUES 
  (1, 'Quelle gigoteuse choisir pour son enfant', 'image link', 20220130);


CREATE TABLE `keywords` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
);

INSERT INTO `keywords`(`id`, `name`) 
VALUES 
  (1, 'lin'),
  (2, 'bébé'),
  (3, 'gigoteuse'),
  (4, 'été')
;


CREATE TABLE `fabrics` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `information` TEXT
);

INSERT INTO `fabrics` (`id`, `name`, `information`) 
VALUES 
  (1, 'lin', 'Le lin est une matière légère qui respire'),
  (2, 'coton', 'Le coton est une matière douce pour la peau'),
  (3, 'laine', "La laine est une matière chaude pour l'hiver")
;


CREATE TABLE `products` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `shortDescription` VARCHAR(400) NOT NULL,
  `description` TEXT,
  `price` FLOAT NOT NULL,
  `stock` INT,
  `isAvailable` BOOLEAN DEFAULT(TRUE),
  `isEssential` BOOLEAN DEFAULT(FALSE),
  `categoryId` INT NOT NULL,
  `subCategoryId` INT,
  FOREIGN KEY (categoryId) REFERENCES categories(id),
  FOREIGN KEY (subCategoryId) REFERENCES subCategories(id)
);

INSERT INTO `products` (
  `id`,
  `name`,
  `shortDescription`,
  `description`,
  `price`,
  `stock`,
  `isAvailable`,
  `isEssential`,
  `categoryId`,
  `subCategoryId`
  ) 
VALUES 
  (1, 'gigoteuse été', 'Gigoteuse pour bébé en lin', "Description d'une gigoteuse en lin pour l'été, pour les grosses chaleurs. Respirant.", 82, 3, true, true, 2, 7), 
  (2, 'gigoteuse hivers', 'Gigoteuse pour bébé en coton', "Description d'une gigoteuse en coton pour passer l'hiver au chaud", 92, 2, true, false, 2, 7)
;


CREATE TABLE `images` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `link` VARCHAR(350) NOT NULL,
  `coverPicture` BOOLEAN DEFAULT(FALSE),
  `productId` INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO `images` (
  `title`,
  `link`,
  `coverPicture`,
  `productId`
)
VALUES
  ("Gigoteuse d'été", 'lien image' ,true, 1),
  ("Gigoteuse d'hiver", 'lien image',true, 2)
;


CREATE TABLE `productFabric` (
  `productId` INT NOT NULL,
  `fabricId` INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (fabricId) REFERENCES fabrics(id)
);

INSERT INTO `productFabric` (
  `productId`,
  `fabricId`
)
VALUES
  (1, 1),
  (2, 2)
;


CREATE TABLE `reviews` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `userId` INT NOT NULL,
  `productId` INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO `reviews` (`text`, `userId`, `productId`)  
VALUES 
  ("Ce produit est génial, taille parfaitement", 2, 1),
  ("Mon bébé l'adore, il ne dort plus sans !", 1, 2)
;


CREATE TABLE `testimonies` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `userId` INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO `testimonies`(`id`, `text`, `userId`) 
VALUES 
  (1, "J'adore les produits Maona. Les finissions sont parfaites, la qualité est excellente et le service client irreprochable. Je recommande !", 1),
  (2, "J'ai passé commande chez Maona il y deux mois, depuis mon enfant dort tellement bien ! Leurs gigoteuses sont toutes douces", 2)
;


CREATE TABLE `paragraphs` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `subtitle` VARCHAR(255),
  `text` TEXT NOT NULL,
  `articleId` INT NOT NULL,
  FOREIGN KEY (articleId) REFERENCES articles(id)
);

INSERT INTO `paragraphs`(`subtitle`, `text`, `articleId`) 
VALUES 
  ("Sous titre 1 de l'article", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor, purus et accumsan scelerisque, arcu massa molestie massa, sit amet blandit erat tortor a ante. Cras ullamcorper turpis vitae laoreet elementum. Duis vestibulum sed dui sit amet efficitur. Aliquam congue enim velit, nec sodales leo porttitor scelerisque. In nec felis quis dui placerat hendrerit. Quisque ac tellus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque et nunc orci. Pellentesque eu justo vel magna eleifend cursus vel id urna. Praesent id viverra diam.", 1),
  ("Sous titre 2 de l'article", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor, purus et accumsan scelerisque, arcu massa molestie massa, sit amet blandit erat tortor a ante. Cras ullamcorper turpis vitae laoreet elementum. Duis vestibulum sed dui sit amet efficitur. Aliquam congue enim velit, nec sodales leo porttitor scelerisque. In nec felis quis dui placerat hendrerit. Quisque ac tellus velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque et nunc orci. Pellentesque eu justo vel magna eleifend cursus vel id urna. Praesent id viverra diam.", 1)
;


CREATE TABLE `orders` (
  `id` BIGINT NOT NULL PRIMARY KEY,
  `date` DATE NOT NULL,
  `totalOrder` FLOAT NOT NULL,
  `status` VARCHAR(100) NOT NULL DEFAULT 'En cours',
  `userId` INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
); 

INSERT INTO `orders` (`id`, `date`, `totalOrder`, `status`, `userId`)  
VALUES 
  (120220110111, 20220110, 82, 'En cours', 1);


CREATE TABLE `orderLines` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `productName` VARCHAR(200) NOT NULL,
  `quantity` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `totalPrice`FLOAT NOT NULL,
  `orderId` BIGINT NOT NULL,
  `productId` INT NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO `orderLines` (`productName`, `quantity`, `price`, `totalPrice`, `orderId`, `productId`)  
VALUES 
  ("gigoteuse été", 1, 82, 20220110, 120220110111, 1)
;

