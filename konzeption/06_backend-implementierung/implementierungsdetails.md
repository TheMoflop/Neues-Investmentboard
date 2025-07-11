# Implementierungsdetails: Backend, Frontend & Datenbank

## 1. Projekt-Setup

### Backend
- Node.js + Express + TypeScript
- Projektstruktur nach Clean Architecture (Controller, Service, Model, Route, Middleware)
- Prisma ORM für DB-Anbindung
- .env für Konfiguration

### Frontend
- React + Vite + MUI + TypeScript
- Atomic Design für Komponentenstruktur
- .env für API-URLs

### Datenbank
- PostgreSQL, initiales Schema via Prisma
- Migrationsordner, Versionierung aller Änderungen

---

## 2. Architektur- & API-Design
- REST-API nach OpenAPI/Swagger-Standard
- Authentifizierung via JWT, Rollen/Scopes
- WebSocket-API für Echtzeitdaten (Kurse, Alarme)
- Trennung von Public/Private Endpunkten
- API-Versionierung (z.B. /api/v1/)

---

## 3. Migrations- & Versionsstrategie
- Alle DB-Änderungen via Prisma-Migrationen, versioniert im Repo
- Rollback-Strategien für fehlgeschlagene Migrationen
- API-Änderungen werden dokumentiert und versioniert

---

## 4. Dev-Workflows & Coding-Guidelines
- Git-Flow: Feature-Branches, Pull Requests, Code-Reviews
- Linting & Prettier für Style-Checks
- Commit-Message-Konventionen (Conventional Commits)
- Automatisierte Tests (Unit, Integration, E2E) als Pflicht für Merges
- Dokumentation im Code (JSDoc, Typedoc)

---

## 5. Beispiel: Erste Implementierungsschritte
1. Repo clonen, Abhängigkeiten installieren
2. Datenbank & Services via Docker starten
3. Prisma-Migrationen ausführen
4. Backend-API-Endpunkte für User-Registrierung/Login anlegen
5. Frontend: Login-Formular und Dashboard-Screen als erste Komponenten
6. Tests für Authentifizierung und User-Flow schreiben

---

> Mit dieser Struktur ist ein schneller, sauberer und skalierbarer Projektstart gewährleistet. Alle Änderungen werden versioniert und sind für das Team nachvollziehbar.
