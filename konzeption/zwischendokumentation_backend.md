
# Zwischendokumentation Backend & Testautomatisierung (Stand: 11.07.2025)

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

## 5. Fehlerbehandlung & Logging
- **Try/Catch in allen Controllern**
- **Logging:** Fehlerausgabe mit Kontext (z.B. `[createPortfolio] Fehler:`)
- **HTTP-Statuscodes:** 400/401/404/409/500 je nach Fehlerfall
- **SonarLint/SonarQube:** Statische Analyse, Einhaltung von Best Practices

## 6. Entwicklungsprozess & Best Practices
- **Modularisierung:** Klare Trennung von Verantwortlichkeiten
- **Typisierung:** Durchgehende Nutzung von TypeScript-Typen
- **Codequalität:** Statische Analyse, Refactoring nach SonarLint-Hinweisen
- **Dokumentation:** Markdown-Struktur, Zwischendokumentation, Feature-Spezifikation

## 7. Nächste Schritte & Roadmap
- Testabdeckung für weitere Endpunkte (Broker, Portfolio, Transaktion, Alarm)
- Frontend-Start (React/Vite/MUI, API-Anbindung)
- Erweiterte Features: KI-Bewertung, Alarmierung, Dokumentenimport
- CI/CD, Deployment, Monitoring

---

**Letzter Stand:**
Alle Kern-APIs und automatisierten Tests laufen stabil. Die Codebasis ist professionell strukturiert, testbar und bereit für die nächsten Entwicklungsschritte.
