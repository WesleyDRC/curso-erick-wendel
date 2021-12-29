DROP TABLE IF EXISTS TB_HEROES;
CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
);

--create
INSERT INTO TB_HEROES(NOME,PODER)
VALUES 
    ('Batman', 'Dinheiro'),
    ('Flash', 'Velocidade'),
    ('Homem Aranha', 'Aranha');

--read
SELECT * FROM TB_HEROES
SELECT * FROM TB_HEROES WHERE NOME='Flash';

--update
UPDATE TB_HEROES
SET NOME='GOKU', PODER='Deus'
WHERE ID=1;

--delete
DELETE FROM TB_HEROES WHERE ID = 2;