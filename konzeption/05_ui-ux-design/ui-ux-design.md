# UI/UX-Design für das Aktienmonitoring-Dashboard

## 1. Wichtige Screens & UX-Flows (Textuelle Beschreibung)

### 1. Dashboard (Home)
- Übersichtliche Kachel-Ansicht mit KPIs: Gesamtvermögen, G&V, Anzahl Broker/Konten/Positionen, aktuelle Alarme
- Schnellzugriff auf Portfolio, Aktienideen, News, Dokumentenimport
- News- und Sentiment-Feed als eigene Sektion
- Alerts und wichtige Termine (z.B. Dividenden, Quartalszahlen) prominent sichtbar

### 2. Portfolioübersicht
- Hierarchische Darstellung: Broker > Konten > Positionen
- Kacheln für jeden Broker/Konto mit Wert, G&V, Anzahl Positionen
- Tabellenansicht für Positionen mit Filter/Suchfunktion
- Detailansicht pro Position (Kursverlauf, Performance, Transaktionen)
- Aktionen: Position hinzufügen, bearbeiten, löschen, Dokument importieren

### 3. Aktienideen-Board
- Karten- oder Listenansicht aller Ideen mit Titel, Symbol, Analyst, aktuellem Preis, Kursziel, KI-Bewertung
- Filter nach Strategie (kurz/mittel/lang), Branche, Bewertung
- Detailansicht mit Tranchendarstellung, Fundamentaldaten, Chart, KI-Kommentar
- Aktionen: Idee anlegen, bearbeiten, löschen

### 4. Alarm-Management
- Übersicht aller aktiven und vergangenen Alarme (Tabellen- oder Kartenansicht)
- Filter nach Typ (Preis, Tranche, G&V, Termin)
- Alarm anlegen (Dialog mit Schwellenwert, Kanal, Ziel)
- Statusanzeige (aktiv, ausgelöst, bestätigt)

### 5. Dokumentenimport
- Upload-Bereich für PDF/CSV (Drag & Drop)
- Vorschau der erkannten Daten (Mapping-Editor, Fehleranzeige)
- Import-Workflow: Hochladen → Validieren → Übernehmen
- Historie aller Importe mit Status und Fehlerprotokoll

### 6. News & Sentiment
- Feed mit aktuellen Finanznachrichten, Unternehmensmeldungen, Dividendenkalender
- Sentiment-Analyse (z.B. Farbbalken, Score, Trendpfeile)
- Filter nach beobachteten Aktien, Branchen, Märkten

### 7. KI-Bewertung & Backtesting
- Bewertungs-Widget mit Scores (fundamental, technisch, kombiniert) und KI-Kommentar
- Backtesting-Modul: Strategie auswählen, Zeitraum festlegen, Ergebnis als Chart/Statistik

---

## 2. Mockup-Vorschläge (als Wireframe-Beschreibung)

### Dashboard (Home)
- Oben: Navigationsleiste (Logo, Portfolio, Ideen, News, Alarme, User-Menu)
- Hauptbereich: 4 große KPI-Kacheln (Gesamtvermögen, G&V, Broker, Positionen)
- Darunter: Zwei Spalten
  - Links: News-Feed & Sentiment
  - Rechts: Aktuelle Alarme & Termine
- Footer: Quicklinks, Impressum, Datenschutz

### Portfolioübersicht
- Breadcrumb-Navigation: Dashboard > Portfolio > [Broker] > [Konto]
- Links: Broker/Konten als Accordion-Liste
- Rechts: Positions-Tabelle mit Filter, Suchfeld, Spalten (Symbol, Name, Stückzahl, Wert, G&V, Aktionen)
- Oben: Button "Position hinzufügen", "Dokument importieren"
- Detailansicht als Modal oder eigene Seite

### Aktienideen-Board
- Grid- oder Listenansicht mit Karten für jede Idee
- Karte: Titel, Symbol, Analyst, aktueller Preis, Kursziel, KI-Bewertung (Score, Ampel)
- Filterleiste oben (Strategie, Branche, Bewertung)
- Button "Idee anlegen"
- Klick auf Karte öffnet Detailansicht mit Tranchendarstellung (z.B. Balkendiagramm), Chart, Fundamentaldaten, KI-Kommentar

### Alarm-Management
- Tab-Ansicht: "Aktiv" | "Ausgelöst" | "Alle"
- Tabelle mit Spalten: Typ, Ziel, Schwelle, Status, Aktionen
- Button "Alarm anlegen" (öffnet Dialog)

### Dokumentenimport
- Drag & Drop-Bereich oben
- Tabelle mit Vorschau der erkannten Daten
- Mapping-Editor als Modal (Spalten zuordnen)
- Fehleranzeige unterhalb der Tabelle
- Historie als Timeline oder Tabelle

### News & Sentiment
- Zwei Spalten: Links News-Feed (Karten mit Quelle, Headline, Zeit, Symbol), rechts Sentiment-Widget (Score, Trend, Top-Topics)
- Filterleiste oben

### KI-Bewertung & Backtesting
- Bewertungs-Widget: Score-Kacheln, Ampel, KI-Kommentar
- Backtesting: Formular für Strategieauswahl, Zeitraum, Ergebnis als Chart (z.B. Linien- oder Balkendiagramm)

---

> Für die Umsetzung können Tools wie Figma, Excalidraw oder Miro genutzt werden. Die beschriebenen Mockups dienen als Vorlage für die visuelle Ausarbeitung.
