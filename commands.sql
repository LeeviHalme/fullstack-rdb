CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,                                                                
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);
INSERT INTO blogs (author, url, title, likes) VALUES ('Matti Meikäläinen', 'https://esimerkki.fi/blogi1', 'Ensimmäinen blogi', 5);
INSERT INTO blogs (author, url, title) VALUES ('Maija Meikäläinen', 'https://esimerkki.fi/blogi2', 'Toinen blogi');