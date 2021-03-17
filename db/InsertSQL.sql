INSERT INTO fehler (titel,beschreibung,loesung,auswirkung,status,softwareid,anwenderid,erstellt_am)
VALUES
    ('Fehler ', 'Beim Anmeldung werde ich nicht weitergeleitet','keine vorhanden','Benutzer können Software nicht nutzen','nicht behoben',1,2,2020-01-01),
    ('Falsche Darstellung', 'es wird eine Falsche Uhrzeit und das Datum in falscher Reihenfolge angezeigt', 'Fehler im Code der behoben wurde','Erstelldatum kann nicht nachvollzogen werden','behoben',1,1,2021-05-01),
    ('Fehler beim Logout', 'Logout nicht möglich', 'keine vorhanden', 'Sicherheitsproblem','nicht behoben',2,5),
    ('test','test','test','test','test',1,2,2019-11-12)

;

INSERT INTO abteilung (abteilungsname,Standort)
VALUES
    ('Finanzbuchhaltung','Berlin'),
    ('Personalverwaltung','Berlin'),
    ('IT-Abteilung','Brandenburg')
;

INSERT INTO rolle (beschreibung)
VALUES
    ('Administrator'),
    ('Gastnutzer')
;

INSERT INTO berechtigung (beschreibung)
VALUES
    ('Lesen von Fehlern'),
    ('Erstellen von Fehlern')
;

INSERT INTO software (hersteller,softwarename)
VALUES
    ('SAP', 'S/4 HANA'),
    ('Oracle', 'Mysql'),
    ('Microsoft','Windows10')
;

INSERT INTO rollenberechtigung (rollenid,berechtigungsid)
VALUES
    (1,2),
    (2,1),
    (2,2)
;