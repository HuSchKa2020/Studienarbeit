create Database IFULTool;

USE IFULTool; -- Interaktives Fehler- und Loesungs- Tool

CREATE TABLE Anwender
(
    AnwenderIDI     INTEGER(7) SERIAL PRIMARY KEY,
    Vorname         VARCHAR(31),
    Nachname        VARCHAR(31),
    Email           VARCHAR(63),
    Telefon         VARCHAR(31);
    Password        VARCHAR(63),
    AbteilungsID    INTEGER(7)
);

CREATE TABLE Abteilung
(
    AbteilungsID    INTEGER(7) SERIAL PRIMARY KEY,
    Abteilungsname  VARCHAR(31),
    Standort        VARCHAR(31)
);

CREATE TABLE Rolle
(
    RollenID        Integer(7) SERIAL PRIMARY KEY,
    Beschreibung    VARCHAR(255)
);

CREATE TABLE Berechtigung
(
    BerechtigungsID	INTEGER(7) SERIAL PRIMARY KEY,
    Beschreibung	VARCHAR(255)
);

CREATE TABLE Fehler
(
    FehlerID		    INTEGER(7) SERIAL PRIMARY KEY,
    Titel               VARCHAR(31)
    Beschreibung        VARCHAR(255),
    Lösung			    VARCHAR(255),
    Auswirkung          VARCHAR(255),
    Status              VARCHAR(255),
    SoftwareID          INTEGER(7),
    AnwenderID          INTEGER(7)
);

CREATE TABLE Software
(
    SoftwareID		    INTEGER(7) SERIAL PRIMARY KEY,
    Hersteller          VARCHAR(31),
    Softwarename		VARCHAR(31),
);

CREATE TABLE AnwenderRolle
(
    AnwenderID          INTEGER(7) SERIAL PRIMARY KEY,
    RollenID			INTEGER(7)
);

CREATE TABLE RollenBerechtigung
(
    RollenID			INTEGER(7),
    BerechtigungsID		INTEGER(7)
);
