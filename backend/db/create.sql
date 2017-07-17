DROP TABLE IF EXISTS records;
DROP TABLE IF EXISTS examResponses;
DROP TABLE IF EXISTS examQuestions;
DROP TABLE IF EXISTS exams;
DROP TABLE IF EXISTS testOptions;
DROP TABLE IF EXISTS testQuestions;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS uvaUsers;
DROP TABLE IF EXISTS keywordRelations;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS lessons;

CREATE TABLE lessons (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sections (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  lesson INTEGER UNSIGNED NOT NULL, 
  title VARCHAR(200) NOT NULL,
  contentText TEXT,
  contentImage BLOB,
  PRIMARY KEY (id),
  UNIQUE (lesson, title),
  FOREIGN KEY (lesson) REFERENCES lessons(id)
);

CREATE TABLE keywords (
  keyword VARCHAR(30) NOT NULL,
  PRIMARY KEY (keyword)
);

CREATE TABLE keywordRelations (
  section INTEGER UNSIGNED NOT NULL,
  keyword VARCHAR(30) NOT NULL,
  PRIMARY KEY (section, keyword),
  FOREIGN KEY (section) REFERENCES sections(id),
  FOREIGN KEY (keyword) REFERENCES keywords(keyword)
);

CREATE TABLE uvaUsers (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  isAlumn BIT(1) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE questions (
  user INTEGER UNSIGNED NOT NULL,
  dateOfQuestion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  section INTEGER UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  contentText TEXT,
  contentImage BLOB,
  responseText TEXT,
  responseImage BLOB,
  reported BIT(1) DEFAULT 0,
  ignored BIT(1) DEFAULT 0,
  PRIMARY KEY (section, title),
  FOREIGN KEY (user) REFERENCES users(id),
  FOREIGN KEY (section) REFERENCES sections(id)
);

CREATE TABLE testQuestions (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  lesson INTEGER UNSIGNED NOT NULL,
  wordingText VARCHAR(255),
  wordingImage BLOB,
  UNIQUE (lesson, wordingText, wordingImage(255)),
  PRIMARY KEY (id),
  FOREIGN KEY (lesson) REFERENCES lessons(id)
);

CREATE TABLE testOptions (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  question INTEGER UNSIGNED NOT NULL,
  answer VARCHAR(255) NOT NULL,
  isCorrect BIT(1) NOT NULL,
  dateOf DATETIME(6) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (question, answer),
  FOREIGN KEY (question) REFERENCES testQuestions(id)
);

CREATE TABLE exams (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  user INTEGER UNSIGNED NOT NULL,
  dateOf TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE examQuestions (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  exam INTEGER UNSIGNED NOT NULL,
  question INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (exam) REFERENCES exams(id),
  FOREIGN KEY (question) REFERENCES testQuestions(id)
);

CREATE TABLE examResponses (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  option INTEGER UNSIGNED NOT NULL,
  question INTEGER UNSIGNED NOT NULL,
  selected BIT(1) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (option) REFERENCES testOptions(id),
  FOREIGN KEY (question) REFERENCES examQuestions(id)
);

CREATE TABLE records (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  user INTEGER UNSIGNED NOT NULL,
  section INTEGER UNSIGNED NOT NULL,
  dateOf TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES users(id),
  FOREIGN KEY (section) REFERENCES sections(id)
);

INSERT INTO lessons(title) VALUES
  ("TEMA 2: Combinatoria"),
  ("TEMA 3: Relaciones");
INSERT INTO sections(lesson, title, contentText) VALUES
  (1, "2.1 Conjuntos", "Contenido de conjuntos"),
  (1, "2.1.1 Operaciones. Propiedades", "Contenido de operaciones. Propiedades"),
  (2, "3.1 Operaciones con relaciones", "Contenido de operaciones con relaciones"),
  (2, "3.2 Propiedades de las relaciones binarias en A", "Contenido de propiedades de las relaciones binarias en A");
INSERT INTO keywords VALUES
  ("conjunto"),
  ("elemento"),
  ("universal"),
  ("universo"),
  ("inversa"),
  ("compuesta"),
  ("reflexiva"),
  ("antirreflexiva");
INSERT INTO keywordRelations VALUES
  (1, "conjunto"),
  (1, "elemento"),
  (2, "conjunto"),
  (2, "universal"),
  (2, "universo"),
  (3, "inversa"),
  (3, "compuesta"),
  (4, "reflexiva"),
  (4, "antirreflexiva");
INSERT INTO uvaUsers(username, password, isAlumn) VALUES
  ("qwe", "qwe", 0),
  ("asd", "asd", 1),
  ("zxc", "zxc", 1),
  ("alumno", "alumno", 1),
  ("profesor", "profesor", 0);
INSERT INTO users(username) VALUES
  ("asd"),
  ("qwe");
INSERT INTO questions(user, section, title, contentText, responseText, reported, ignored) VALUES
  (1, 1, "duda1", "contenido duda1", "respuesta duda1", 0, 0),
  (1, 2, "duda2", "contenido duda2", "respuesta duda2", 0, 0),
  (1, 3, "duda3", "contenido duda3", "respuesta duda3", 0, 0),
  (1, 1, "duda4", "contenido duda4", "respuesta duda4", 0, 0),
  (1, 1, "duda5", "contenido duda5", null, 0, 0),
  (1, 1, "duda6", "contenido duda6", null, 0, 0),
  (1, 1, "duda7", "contenido duda7", null, 0, 0);
INSERT INTO testQuestions(lesson, wordingText) VALUES
  (1, "enunciado 1"),
  (1, "enunciado 2"),
  (1, "enunciado 3"),
  (1, "enunciado 4"),
  (1, "enunciado 5"),
  (1, "enunciado 6"),
  (1, "enunciado 7"),
  (1, "enunciado 8"),
  (1, "enunciado 9"),
  (1, "enunciado 10"),
  (1, "enunciado 11"),
  (1, "enunciado 12"),
  (1, "enunciado 13"),
  (1, "enunciado 14"),
  (1, "enunciado 15");
INSERT INTO testOptions(question, answer, isCorrect) VALUES
  (1, "respuesta1T", 1),
  (1, "respuesta2F", 0),
  (1, "respuesta3F", 0),
  (1, "respuesta4F", 0),
  (2, "respuesta1T", 1),
  (2, "respuesta2T", 1),
  (2, "respuesta3F", 0),
  (2, "respuesta4F", 0),
  (3, "respuesta1T", 1),
  (3, "respuesta2T", 1),
  (3, "respuesta3T", 1),
  (3, "respuesta4F", 0),
  (4, "respuesta3T", 1),
  (4, "respuesta4F", 0),
  (5, "respuesta3T", 1),
  (5, "respuesta4F", 0),
  (6, "respuesta3T", 1),
  (6, "respuesta4F", 0),
  (7, "respuesta3T", 1),
  (7, "respuesta4F", 0),
  (8, "respuesta3T", 1),
  (8, "respuesta4F", 0),
  (9, "respuesta3T", 1),
  (9, "respuesta4F", 0),
  (10, "respuesta3T", 1),
  (10, "respuesta4F", 0),
  (11, "respuesta3T", 1),
  (11, "respuesta4F", 0),
  (12, "respuesta3T", 1),
  (12, "respuesta4F", 0),
  (13, "respuesta3T", 1),
  (13, "respuesta4F", 0),
  (14, "respuesta3T", 1),
  (14, "respuesta4F", 0),
  (15, "respuesta3T", 1),
  (15, "respuesta4F", 0);