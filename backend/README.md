# Neues Investmentboard – Backend

## Projektbeschreibung
Das Backend des Investmentboards bildet die zentrale Schnittstelle für die Verwaltung von Nutzern, Portfolios, Brokern und Positionen. Ziel ist es, eine sichere und skalierbare Plattform für die digitale Verwaltung von Investments bereitzustellen.

## Ziele
- Nutzerverwaltung (Registrierung, Login, Authentifizierung)
- Verwaltung von Portfolios, Brokern und Positionen
- Erweiterbarkeit und Skalierbarkeit
- Sicherheit und Datenschutz

## Kernfeatures
- User-Management (Registrierung, Login, Authentifizierung)
- Portfolio-Management (Erstellen, Bearbeiten, Löschen von Portfolios)
- Broker-Management (Verwaltung von Brokern)
- Positionsverwaltung (Hinzufügen, Bearbeiten, Entfernen von Positionen)
- API-Sicherheit (JWT, Rollen, Rechte)

# Backend Setup

## Setup

1. `npm install`
2. Datenbank & Prisma-Client einrichten:
   - `npx prisma migrate dev --name init`
   - `npx prisma generate`
3. Server starten: `npm run dev`


## API-Endpunkte (Übersicht)
- POST `/api/v1/users/register` – User registrieren
- POST `/api/v1/users/login` – Login
- GET `/api/v1/portfolios` – Alle Portfolios abrufen
- POST `/api/v1/portfolios` – Portfolio anlegen
- GET `/api/v1/brokers` – Alle Broker abrufen
- POST `/api/v1/brokers` – Broker anlegen
- GET `/api/v1/positions` – Alle Positionen abrufen
- POST `/api/v1/positions` – Position anlegen

Weitere Endpunkte sind in Planung und werden sukzessive ergänzt.
