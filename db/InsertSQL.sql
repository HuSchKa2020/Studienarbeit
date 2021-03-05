INSERT INTO fehler (titel,beschreibung,lösung,auswirkung,status,softwareid,anwenderid)
VALUES
    ('Fehler ', 'Beim Anmeldung werde ich nicht weitergeleitet','keine vorhanden','Benutzer können Software nicht nutzen','nicht behoben',1,2),
    ('Falsche Darstellung', 'es wird eine Falsche Uhrzeit und das Datum in falscher Reihenfolge angezeigt', 'Fehler im Code der behoben wurde','Erstelldatum kann nicht nachvollzogen werden','behoben',1,1),
    ('Fehler beim Logout', 'Logout nicht möglich', 'keine vorhanden', 'Sicherheitsproblem','nicht behoben',2,5),
    ('test','test','test','test','test',1,2)

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