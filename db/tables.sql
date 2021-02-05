create Database IFULTool;

USE IFULTool; -- Interaktives Fehler- und Loesungs- Tool

CREATE TABLE Anwender
(
    AnwenderID      SERIAL PRIMARY KEY,
    Vorname         VARCHAR(31),
    Nachname        VARCHAR(31),
    Email           VARCHAR(63),
    Telefon         VARCHAR(31),
    Password        VARCHAR(63),
    AbteilungsID    INTEGER
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
    Titel               VARCHAR(31),
    Beschreibung        VARCHAR(255),
    Lösung			    VARCHAR(255),
    Auswirkung          VARCHAR(255),
    Status              VARCHAR(255),
    SoftwareID          INTEGER,
    AnwenderID          INTEGER
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
    RollenID			SERIAL PRIMARY KEY,
    BerechtigungsID		INTEGER
);

