# Backend-Dokumentation

## 1. Backend-Architektur & Datenmodell
- **Technologien:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Struktur:** Klare Trennung in Controller, Routen, Middleware, Services, Models
- **Datenmodell:**
  - User: Authentifizierung, Einstellungen, Beziehungen zu Broker, Ideen, Alarmen
  - Broker: Zuordnung zu User, Typisierung, Konten
  - Konto: Portfolio, Währung, AccountNumber, Positionen, Transaktionen
  - Position: Asset-Typ, Symbol, Menge, Preise, Historie, Transaktionen
  - Transaktion: Kauf/Verkauf/Dividende/Gebühr, Bezug zu Konto/Position
  - Alarm: Schwellenwerte, Status, Channel, User-Bezug
  - KI-Bewertung: Scores, Kommentare, Bezug zu Aktienidee

## 2. Authentifizierung & Sicherheit
- **JWT-basierte Authentifizierung** für alle geschützten Endpunkte
- **bcrypt** für Passwort-Hashing
- **Middleware:** Validierung des Tokens, Fehlerhandling, Logging
- **Sicherheitskonzept:**
  - Nur eigene Daten abrufbar (UserId-Check in allen Queries)
  - Fehlerausgabe ohne sensitive Details

## 3. API-Endpunkte & Logik
- **User-API:** Registrierung, Login, Settings
- **Broker-API:** CRUD, nur für eingeloggte User
- **Portfolio-API (Konto):** CRUD, Broker-Zuordnung, nur eigene Konten
- **Positions-API:** CRUD, nur Positionen aus eigenen Konten
- **Transaktions-API:** (in Planung) Buchungen zu Positionen/Konten
- **Alarm- und KI-API:** (in Planung) Schwellenwert- und Bewertungslogik

## 4. Testautomatisierung & Teststrategie
- **Frameworks:** Jest & Supertest
- **Testfälle:**
  - User: Registrierung, Login, Token-Validierung
  - Position: Anlegen, Lesen, Aktualisieren, Löschen
- **Testdaten:**
  - Eindeutige User-E-Mail per Zeitstempel
  - Isolierte Testdaten pro Lauf, keine Abhängigkeit zu bestehenden Daten
- **Testausführung:**
  - Tests laufen fehlerfrei durch
  - Automatisierte Prüfung von Statuscodes, Response-Struktur und Datenintegrität

## 5. Entwicklungsprozess & Best Practices
- **TypeScript-First:** Strikte Typisierung für alle API-Interfaces
- **Prisma ORM:** Schema-First DB-Design, automatische Migrations
- **Modulare Struktur:** Wiederverwendbare Controller, Services, Middleware
- **SonarLint/SonarQube:** Statische Analyse, Einhaltung von Best Practices
