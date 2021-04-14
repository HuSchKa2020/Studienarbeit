ALTER TABLE anwender ADD COLUMN registriert_am timestamp not null default current_timestamp;

ALTER TABLE fehler ADD COLUMN erstellt_am timestamp not null default current_timestamp;

set timezone to 'Europe/Berlin';
