# 10-Stufiger Entwicklungsplan für das Aktienmonitoring-Projekt

## 01. Feature-Spezifikation & User Stories
- 3-Tranchen-Strategie (kurz-/mittel-/langfristig, Chartanalyse-basiert)
- Fundamentalanalyse (Kaufentscheidung)
- PDF/CSV-Dokumentenimport
- Performanceanalyse bis auf Positionsebene und Gesamtportfolio
- Alarmierung via Discord & In-App

## 02. Datenmodell-Design
- Modelle für Aktienideen, Fundamentaldaten, Chartdaten, Tranchen, Portfolio, Positionen, Broker, Dokumente, Alarme

## 03. Technologieauswahl
- Frontend: React + TypeScript
- Backend: Node.js (Express) oder Python (FastAPI)
- Datenbank: PostgreSQL (relationale Daten, z.B. Positionen)
- Realtime: WebSockets
- APIs: Yahoo Finance (Kurse/Fundamentaldaten), ggf. Alpha Vantage, Discord Webhooks

## 04. Architekturentwurf
- API-zentriert, modular, Erweiterbarkeit für weitere Assetklassen und Nutzer

## 05. UI/UX-Design
- Mockups für:
  - Aktienideen-Board mit Tranchendarstellung
  - Portfolioübersicht (Gesamt & Positionen)
  - Dokumentenimport
  - Alarmübersicht

## 06. Backend-Implementierung
- REST-API für alle Kernfunktionen
- Anbindung an Kurs-/Fundamental-APIs
- Chartanalyse-Logik (z.B. Moving Averages, RSI)
- Dokumentenimport (PDF/CSV-Parsing)
- Alarm-Logik (Discord, In-App)

## 07. Frontend-Implementierung
- Darstellung der Tranchen-Strategie (inkl. Chart)
- Fundamentalanalyse-Visualisierung
- Portfolio- und Performanceansichten
- Dokumentenimport-UI
- Alarmanzeige

## 08. KI-Bewertung (MVP)
- Einfache Regelwerke für technische/fundamentale Bewertung
- Platzhalter für spätere KI-Integration

## 09. Testing & Qualitätssicherung
- Unit-/Integrationstests
- Usability-Tests

## 10. Deployment & Feedback
- Deployment als Web-App
- Feedbackschleife mit Zielnutzer
