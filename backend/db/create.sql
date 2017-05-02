DROP TABLE IF EXISTS keywordRelations;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS lessons;

CREATE TABLE lessons (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(200),
  PRIMARY KEY (id)
);

CREATE TABLE sections (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  lesson INTEGER UNSIGNED NOT NULL, 
  title VARCHAR(200),
  content TEXT,
  PRIMARY KEY (id),
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

INSERT INTO lessons(title) VALUES
  ("TEMA 2: Combinatoria"),
  ("TEMA 3: Relaciones");
INSERT INTO sections(lesson, title, content) VALUES
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