create Database IFULTool;

USE IFULTool; -- Interaktives Fehler- und Loesungs- Tool

CREATE TABLE Anwender
(
    AnwenderID      SERIAL PRIMARY KEY,
    Vorname         VARCHAR(255),
    Nachname        VARCHAR(255),
    Email           VARCHAR(255),
    Telefon         VARCHAR(255),
    Password        VARCHAR(255),
    AbteilungsID    INTEGER,
    Registriert_Am    DATE
);

CREATE TABLE Abteilung
(
    AbteilungsID    SERIAL PRIMARY KEY,
    Abteilungsname  VARCHAR(31),
    Standort        VARCHAR(31)
);

CREATE TABLE Rolle
(
    RollenID        SERIAL PRIMARY KEY,
    Beschreibung    VARCHAR(255)
);

CREATE TABLE Berechtigung
(
    BerechtigungsID SERIAL PRIMARY KEY,
    Beschreibung	VARCHAR(255)
);

CREATE TABLE Fehler
(
    FehlerID		    SERIAL PRIMARY KEY,
    Titel               VARCHAR(255),
    Beschreibung        VARCHAR(255),
    Loesung			    VARCHAR(255),
    Auswirkung          VARCHAR(255),
    Status              VARCHAR(255),
    SoftwareID          INTEGER,
    AnwenderID          INTEGER,
    Erstellt_Am         DATE
);

CREATE TABLE Software
(
    SoftwareID		    SERIAL PRIMARY KEY,
    Hersteller          VARCHAR(31),
    Softwarename		VARCHAR(31)
);

CREATE TABLE AnwenderRolle
(
    AnwenderID          SERIAL PRIMARY KEY,
    RollenID			INTEGER
);

CREATE TABLE RollenBerechtigung
(
    RollenID			Integer,
    BerechtigungsID		INTEGER
);

