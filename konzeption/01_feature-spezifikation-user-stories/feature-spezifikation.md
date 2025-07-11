## Weitere Kernfeatures

- Automatisierte Dokumentenerkennung (OCR) für PDF-Scans und Fotos von Dokumenten
- Integration externer Trading-APIs (z.B. Orderauslösung über Interactive Brokers API)
- Datenexport als PDF-Report (automatisch generierte Berichte für Portfolio, Performance, Steuer etc.)

---

## Übersicht aller Kernfunktionen

- 3-Tranchen-Strategie (kurz-/mittel-/langfristig, Chartanalyse-basiert)
- Fundamentalanalyse (Kaufentscheidung)
- PDF/CSV-Dokumentenimport
- Automatisierte Dokumentenerkennung (OCR)
- Performanceanalyse bis auf Positionsebene und Gesamtportfolio
- Alarmierung via Discord & In-App
- Integration externer Trading-APIs
- Datenexport als PDF-Report
- News- & Informationsbereich (inkl. Sentiment, Insider, Analysten, Wirtschaftskalender, Dividenden)
- Watchlist mit Priorisierung
- Backtesting-Modul
- Ziel- und Risikomanagement
- KI-Bewertung (fundamental, technisch, kombiniert, Kommentar)
- Portfolioverwaltung (Broker, Konten, Positionen, Import, Hierarchie)
- Rebalancing-Tool
- Portfolio-Simulation
- API-Schnittstelle für externe Tools
- Dark/Light Mode
- Audit-Log
## Erweiterte Features & Module (fortgesetzt)

### News- & Informationsbereich (erweitert)
- Sentiment-Analyse: Auswertung von Social Media (z.B. Twitter/X, Reddit, Stocktwits) und News-Schlagzeilen zur Marktstimmung
- Insider- und Analystenaktivitäten: Anzeige von Insiderkäufen/-verkäufen und aktuellen Analystenratings inkl. Kurszielen
- Ereignis- und Wirtschaftskalender: Übersicht wichtiger Termine (Quartalszahlen, Hauptversammlungen, Zinsentscheide, Wirtschaftsdaten)

### Weitere Features
- Automatisierte Handelsvorschläge (KI-basiert)
- Portfolio-Simulation („Was-wäre-wenn“-Szenarien)
- Rebalancing-Tool (Vorschläge zur optimalen Portfolio-Gewichtung)
- API-Schnittstelle für externe Tools
- Dark/Light Mode
- Audit-Log (Historie aller Änderungen und Importe)
## Erweiterte Features & Module

### News-Integration & Dividendenkalender
- Eigener Bereich im Dashboard für aktuelle Finanznachrichten, Unternehmensmeldungen und Dividendenankündigungen
- Scraping und Aggregation verschiedener Informationsquellen (z.B. Yahoo Finance, finanzen.net, Seeking Alpha)
- Filter nach beobachteten Aktien, Branchen, Märkten
- Integration eines Dividendenkalenders mit Benachrichtigungsfunktion

### Watchlist mit Priorisierung
- Nutzer kann Aktienideen nach Priorität, Strategie oder Branche sortieren und filtern
- Favoriten-/Hotlist-Funktion

### Backtesting-Modul
- Simuliere die Entwicklung von Strategien oder Portfolios mit historischen Kursdaten
- Vergleich von realer und hypothetischer Performance
- Visualisierung der Backtesting-Ergebnisse

### Ziel- und Risikomanagement
- Setzen von Sparzielen, Renditeerwartungen und Risikolimits
- Warnungen bei Überschreitung von Drawdown oder Zielabweichungen
## KI-Bewertung (MVP)

### Fundamentale Kennzahlen (Beispiele)
- KGV (Kurs-Gewinn-Verhältnis)
- KUV (Kurs-Umsatz-Verhältnis)
- KBV (Kurs-Buchwert-Verhältnis)
- Eigenkapitalquote
- Verschuldungsgrad
- Umsatzwachstum (1, 3, 5 Jahre)
- Gewinnwachstum
- Dividendenrendite
- Free Cashflow
- Margen (Brutto, Operativ, Netto)
- ROE (Eigenkapitalrendite)
- Analystenratings

### Technische Indikatoren (Beispiele)
- Gleitende Durchschnitte (kurz, mittel, lang)
- RSI (Relative Strength Index)
- MACD
- Volatilität
- Trendstärke (ADX)
- Unterstützungen/Widerstände
- Chartformationen (z.B. Ausbrüche, Dreiecke)

### Bewertungslogik
- Unterscheidung nach Zeithorizont: kurzfristig, mittelfristig, langfristig (je nach Kennzahlen/Indikatoren unterschiedlich gewichtet)
- Bewertung jeweils fundamental, technisch und kombiniert (1–10)
- Automatisch generierter KI-Kommentar zur Bewertung (z.B. „Aktie ist fundamental solide, aber technisch überkauft. Langfristig attraktiv.“)

### Funktionen
- Automatische Analyse und Bewertung jeder Aktie nach aktuellen Daten
- Darstellung der Scores (fundamental, technisch, kombiniert) und KI-Kommentar
- Historie der Bewertungen (z.B. wie hat sich die Bewertung über die Zeit verändert?)

### User Stories
- Als Nutzer möchte ich für jede Aktie eine KI-gestützte Bewertung (1–10) für fundamentale, technische und kombinierte Analyse erhalten.
- Als Nutzer möchte ich einen automatisch generierten Kommentar zur Bewertung sehen, der Chancen und Risiken zusammenfasst.
- Als Nutzer möchte ich zwischen kurzfristiger, mittelfristiger und langfristiger Analyse wählen können.

## Dokumentenimport (PDF/CSV)

### Funktionen
- Import von Portfolio- und Positionsdaten aus PDF/CSV (z.B. Broker-Reports)
- Automatische Erkennung des Dateityps und Brokers zur Auswahl des passenden Parsers
- Mapping-Editor: Nutzer kann Spalten aus CSV/PDF manuell Feldern im System zuordnen, falls das Format unbekannt ist
- Fehlerprotokoll: Anzeige von Importfehlern (z.B. fehlende Felder, ungültige Werte) mit Möglichkeit zur Korrektur
- Historie aller Importe mit Rückgängig-Funktion (Undo)
- Benachrichtigung nach erfolgreichem Import (z.B. In-App-Toast oder Discord-Webhook)
- Automatisches Auslesen aller wichtigen Felder (Wertpapier/Symbol, Stückzahl, Einstandskurs, Kaufdatum, Gebühren, Konto/Broker, Margin, Initial Margin, Maintenance Margin, Positionswert, Währung)
- Dynamische Berechnung fehlender Felder (z.B. jährliche Kosten, wenn möglich)
- Felder, die nicht automatisch erkannt werden, können manuell ergänzt oder korrigiert werden
- Vorschau der importierten Daten vor Übernahme ins Portfolio
- Automatischer Abgleich mit bestehendem Portfolio: Erkennung von neuen, geänderten und geschlossenen Positionen
- Speicherung der importierten Daten zur Historisierung und für spätere Vergleiche
- Unterstützung für verschiedene CSV/PDF-Formate (z.B. IBKR, andere Broker)

### User Stories
- Als Nutzer möchte ich meine Portfolio- und Positionsdaten aus Broker-Reports (PDF/CSV) importieren, um mein Portfolio schnell und fehlerfrei zu aktualisieren.
- Als Nutzer möchte ich eine Vorschau der importierten Daten sehen und diese vor dem Speichern bearbeiten können.
- Als Nutzer möchte ich, dass das System automatisch erkennt, welche Positionen neu, geändert oder geschlossen wurden.
- Als Nutzer möchte ich fehlende oder nicht erkannte Felder manuell ergänzen können.
- Als Nutzer möchte ich, dass dynamisch berechnete Felder (z.B. jährliche Kosten) automatisch ergänzt werden, wenn möglich.

## Alarmierung

### Funktionen
- Automatische Discord-Alarme für jede der 3 Tranchen einer Aktienidee (z.B. "Tranche 1 Einstieg erreicht bei 100€")
- Manuell einstellbare Preisalarme für beliebige Schwellenwerte (Kurs über/unter X, prozentuale Veränderung, Zeitpunkte)
- Alarmierung per Discord (Webhook) und In-App-Benachrichtigung
- Übersicht aller aktiven und vergangenen Alarme
- Möglichkeit, Alarme zu bearbeiten und zu löschen

### Use Cases
- Als Nutzer möchte ich automatisch benachrichtigt werden, wenn eine der 3 definierten Tranchen-Einstiegskurse erreicht wird, um rechtzeitig investieren zu können.
- Als Nutzer möchte ich eigene Preisalarme für beliebige Wertpapiere und Schwellenwerte setzen, um flexibel auf Marktbewegungen reagieren zu können.
- Als Nutzer möchte ich einen Alarm erhalten, wenn eine Position einen bestimmten Gewinn/Verlust überschreitet (z.B. +10% oder -5%).
- Als Nutzer möchte ich einen Alarm für das Erreichen eines bestimmten Datums (z.B. Quartalszahlen, Dividendenzahlung) setzen können.
- Als Nutzer möchte ich wählen können, ob ich Alarme per Discord, In-App oder beides erhalten möchte.
- Als Nutzer möchte ich alle aktiven und vergangenen Alarme einsehen, bearbeiten und löschen können.
## Performanceanalyse

### Wichtige Kennzahlen & Auswertungen
- Gesamtvermögen (Summe aller Konten, inkl. Margin & G&V bei CFDs)
- Gesamt-Gewinn & Verlust (G&V) über alle Positionen
- G&V pro Position, Konto und Broker
- Übersichtliche Darstellung wie im Screenshot (Kacheln für Kapital, Broker, Positionen, Gesamt-G&V)
- Korrekte Berechnung: Bei CFDs zählt Margin + G&V zum Gesamtvermögen, nicht der Positionswert

### Funktionen
- Übersichtliche Dashboards für Gesamtportfolio, einzelne Konten und Positionen
- Kacheln für Gesamtvermögen, G&V, Anzahl Broker, Konten, Positionen
- Hierarchische Darstellung: Broker > Konten > Positionen
- (Optional) Erweiterung: Tortendiagramm für Asset-Allokation

### User Stories
- Als Nutzer möchte ich mein Gesamtvermögen und den Gesamt-G&V auf einen Blick sehen.
- Als Nutzer möchte ich G&V für jede Position, jedes Konto und jeden Broker nachvollziehen können.
- Als Nutzer möchte ich, dass bei CFDs die Margin und der G&V korrekt ins Gesamtvermögen einfließen.
- Als Nutzer möchte ich eine übersichtliche Darstellung meines Portfolios, wie im Screenshot, erhalten.
# 01. Feature-Spezifikation & User Stories

## Ziel
Definition der Kernfunktionen und User Stories für das Aktienmonitoring-Tool, um die Anforderungen für die Entwicklung klar zu beschreiben.


## Aktienideen
Jede Aktienidee enthält folgende Felder:
- Titel
- Symbol
- Analyst
- Aktueller Preis
- Kursziel
- 3-Tranchen-Strategie (kurz-/mittel-/langfristig, Einstiegskriterien)
- Prozentualer Kapitaleinsatz
- KI-Bewertung (fundamental & technisch)
- Notizen/Begründung

### Funktionen
- Übersicht aller Aktienideen als Liste/Board
- Detailansicht für jede Aktienidee (per Klick erreichbar)
- Bearbeiten-Button in der Detailansicht
- Löschen-Button in der Detailansicht

### User Stories
- Als Nutzer möchte ich neue Aktienideen mit allen relevanten Daten anlegen, um potenzielle Investments zu dokumentieren.
- Als Nutzer möchte ich für jede Aktienidee eine 3-Tranchen-Strategie (kurz-, mittel-, langfristig) festlegen, um meinen Einstieg zu planen.
- Als Nutzer möchte ich eine KI-gestützte Bewertung der Aktie sehen, um eine fundierte Entscheidung treffen zu können.
- Als Nutzer möchte ich eine Detailansicht zu jeder Aktienidee öffnen können, um alle Informationen im Überblick zu haben.
- Als Nutzer möchte ich Aktienideen bearbeiten und löschen können, um meine Watchlist aktuell zu halten.


## Portfolioverwaltung

### Datenstruktur
**Broker**
- Name
- Typ (z.B. Online-Broker, Bank)
- Notizen

**Konto**
- Kontoname
- Zugehöriger Broker
- Kontonummer (optional)
- Währung
- Notizen

**Positionen**
- Jede Position ist immer einem Konto und Broker zugeordnet
- Erweiterbar für neue Assetklassen

**Aktien/Krypto-Positionen:**
- Wertpapier
- Symbol
- Stückzahl
- Einstandskurs
- Aktueller Kurs
- Kaufdatum
- Gebühren
- Zugehöriges Konto
- Notizen

**CFD-Positionen:**
- Wertpapier (z.B. Aktie, CFD, Krypto)
- Symbol
- Stückzahl
- Marginpreis
- Hebel
- Positionswert
- Einstandskurs
- Aktueller Kurs
- Kaufdatum
- Kaufgebühren
- Jährliche Gebühren
- Zugehöriges Konto
- Notizen

### Funktionen
- Hierarchische Darstellung: Broker > Konten > Positionen
- Import von Positionen aus PDF/CSV (automatische Zuordnung zu Konto/Broker)
- Bearbeiten und Löschen von Brokern, Konten und Positionen
- Übersicht und Detailansicht für jede Ebene

### User Stories
- Als Nutzer möchte ich verschiedene Broker und Konten anlegen, um meine Investments zu strukturieren.
- Als Nutzer möchte ich Positionen (Aktien, CFDs, Krypto) mit allen relevanten Feldern anlegen und verwalten.
- Als Nutzer möchte ich Positionen aus PDF/CSV importieren und automatisch zuordnen lassen.
- Als Nutzer möchte ich alle Positionen übersichtlich nach Broker und Konto gegliedert sehen.
- Als Nutzer möchte ich Positionen, Konten und Broker bearbeiten und löschen können.

### Portfolioverwaltung
- Als Nutzer möchte ich meine Broker, Konten und Positionen verwalten, um mein gesamtes Portfolio im Blick zu behalten.
- Als Nutzer möchte ich Kontoauszüge und Margenberichte als PDF oder CSV importieren, um meine Positionen automatisch zu aktualisieren.

### Performanceanalyse
- Als Nutzer möchte ich die Performance meines Portfolios und einzelner Positionen analysieren, um meine Anlagestrategie zu optimieren.
- Als Nutzer möchte ich visuelle Auswertungen (z.B. Charts) zu Einstiegsgelegenheiten und Performance erhalten.

### Alarmierung
- Als Nutzer möchte ich Preisalarme für bestimmte Aktien setzen, um bei wichtigen Kursbewegungen benachrichtigt zu werden.
- Als Nutzer möchte ich Alarme per Discord und direkt in der App erhalten.

## Akzeptanzkriterien (Beispiele)
- Aktienideen können mit allen Feldern angelegt, bearbeitet und gelöscht werden.
- Die 3-Tranchen-Strategie ist für jede Aktie individuell konfigurierbar.
- Dokumentenimport unterstützt PDF und CSV.
- Performanceübersicht zeigt aggregierte und detaillierte Werte.
- Alarme funktionieren zuverlässig und werden per Discord & In-App ausgelöst.
