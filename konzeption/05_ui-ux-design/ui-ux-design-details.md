# Dashboard (Home)

## Ziel
Sofortiger Überblick über das gesamte Investment-Ökosystem, schnelle Navigation zu allen Kernbereichen, Alerts und News im Fokus.

## UX-Flow
- User landet nach Login direkt auf dem Dashboard.
- KPI-Kacheln oben zeigen: Gesamtvermögen, Gesamt-G&V, Anzahl Broker/Konten/Positionen.
- Darunter: Zwei Spalten – links News & Sentiment, rechts aktuelle Alarme & Termine.
- Alerts und wichtige Termine sind immer sichtbar.
- Navigation zu Portfolio, Ideen, News, Alarme, Dokumentenimport über Hauptmenü.

## Mockup-Beschreibung
- Header: Logo, Navigation, User-Menu
- KPI-Kacheln (4 Stück, prominent)
- Zwei Spalten darunter:
  - Links: News-Feed (Karten), Sentiment-Widget (Score, Trend)
  - Rechts: Aktuelle Alarme (Liste), Termine (Timeline)
- Footer: Quicklinks, Impressum, Datenschutz

---

# Portfolioübersicht

## Ziel
Hierarchische, intuitive Verwaltung und Analyse aller Investments, schnelle Filterung und Detailzugriff.

## UX-Flow
- User wählt Portfolio im Hauptmenü oder über Dashboard-Kachel.
- Links: Accordion-Liste aller Broker und Konten.
- Rechts: Positions-Tabelle mit Filter, Suchfeld, Spalten (Symbol, Name, Stückzahl, Wert, G&V, Aktionen).
- Klick auf Position öffnet Detailansicht (Modal oder Seite) mit Kursverlauf, Performance, Transaktionen.
- Aktionen: Position hinzufügen, bearbeiten, löschen, Dokument importieren.

## Mockup-Beschreibung
- Breadcrumb-Navigation oben
- Accordion-Liste links (Broker/Konten)
- Positions-Tabelle rechts
- Oben: Buttons für "Position hinzufügen", "Dokument importieren"
- Detailansicht als Modal oder eigene Seite

---

# Aktienideen-Board

## Ziel
Schnelle Erfassung, Bewertung und Verwaltung von Investmentideen, Fokus auf Strategie und KI-Bewertung.

## UX-Flow
- User öffnet Ideen-Board über Navigation oder Dashboard.
- Grid- oder Listenansicht aller Ideen (Karten mit Titel, Symbol, Analyst, Preis, Kursziel, KI-Bewertung).
- Filterleiste oben (Strategie, Branche, Bewertung).
- Klick auf Karte öffnet Detailansicht mit Tranchendarstellung, Chart, Fundamentaldaten, KI-Kommentar.
- Aktionen: Idee anlegen, bearbeiten, löschen.

## Mockup-Beschreibung
- Grid- oder Listenansicht mit Karten
- Karte: Titel, Symbol, Analyst, aktueller Preis, Kursziel, KI-Bewertung (Score, Ampel)
- Filterleiste oben
- Button "Idee anlegen"
- Detailansicht mit Tranchendarstellung (Balkendiagramm), Chart, Fundamentaldaten, KI-Kommentar

---

# Alarm-Management

## Ziel
Alle Alarme im Blick, schnelle Konfiguration und Reaktion auf Marktbewegungen.

## UX-Flow
- User öffnet Alarme über Navigation oder Dashboard.
- Tab-Ansicht: "Aktiv" | "Ausgelöst" | "Alle"
- Tabelle mit Spalten: Typ, Ziel, Schwelle, Status, Aktionen
- Button "Alarm anlegen" (öffnet Dialog)
- Statusanzeige (aktiv, ausgelöst, bestätigt)

## Mockup-Beschreibung
- Tab-Ansicht oben
- Tabelle mit Alarmen
- Button "Alarm anlegen"
- Dialog für neue Alarme (Typ, Ziel, Schwelle, Kanal)

---

# Dokumentenimport

## Ziel
Schneller, fehlerarmer Import von Broker-Dokumenten, volle Kontrolle über Zuordnung und Fehlerbehandlung.

## UX-Flow
- User öffnet Import über Navigation oder Portfolio.
- Drag & Drop-Bereich für PDF/CSV oben
- Nach Upload: Vorschau der erkannten Daten (Mapping-Editor, Fehleranzeige)
- User bestätigt Import, Daten werden übernommen
- Historie aller Importe mit Status und Fehlerprotokoll

## Mockup-Beschreibung
- Drag & Drop-Bereich oben
- Tabelle mit Vorschau der erkannten Daten
- Mapping-Editor als Modal
- Fehleranzeige unterhalb der Tabelle
- Historie als Timeline oder Tabelle

---

# News & Sentiment

## Ziel
Schneller Überblick über relevante Nachrichten, Marktstimmung und Termine für alle beobachteten Assets.

## UX-Flow
- User öffnet News über Navigation oder Dashboard.
- Zwei Spalten: Links News-Feed (Karten mit Quelle, Headline, Zeit, Symbol), rechts Sentiment-Widget (Score, Trend, Top-Topics)
- Filterleiste oben (Aktien, Branchen, Märkte)

## Mockup-Beschreibung
- Zwei Spalten: News-Feed (Karten), Sentiment-Widget
- Filterleiste oben

---

# KI-Bewertung & Backtesting

## Ziel
Transparente, nachvollziehbare Bewertung und Simulation von Strategien, unterstützt durch KI.

## UX-Flow
- User öffnet Bewertung/Backtesting über Portfolio, Ideen oder Navigation.
- Bewertungs-Widget mit Scores (fundamental, technisch, kombiniert) und KI-Kommentar
- Backtesting-Modul: Strategie auswählen, Zeitraum festlegen, Ergebnis als Chart/Statistik

## Mockup-Beschreibung
- Bewertungs-Widget: Score-Kacheln, Ampel, KI-Kommentar
- Backtesting: Formular für Strategieauswahl, Zeitraum, Ergebnis als Chart (Linie/Balken)

---

> Für die visuelle Ausarbeitung können Figma, Excalidraw oder Miro genutzt werden. Die Mockup-Beschreibungen dienen als Vorlage für Designer und Entwickler.

---

# Übergreifende UI/UX-Guidelines & Best Practices

## 1. Designprinzipien & Guiding Principles
- **Konsistenz:** Einheitliche Farben, Typografie, Abstände und Komponenten über alle Screens hinweg (Designsystem, z.B. nach Material Design oder Ant Design).
- **Klarheit & Fokus:** Wichtige Informationen und Aktionen sind stets prominent und leicht zugänglich.
- **Visuelle Hierarchie:** Durch Größe, Farbe, Kontrast und Weißraum werden Schwerpunkte gesetzt.
- **Barrierefreiheit:** Mind. WCAG 2.1 AA, hohe Kontraste, skalierbare Schrift, klare Fokus-Indikatoren.
- **Branding:** Farbpalette, Logo, Icons und Bildsprache sind auf Zielgruppe abgestimmt.

## 2. Interaktionsdesign & Microinteractions
- **Hover-States:** Buttons, Karten und interaktive Elemente zeigen bei Hover/Focus visuelles Feedback.
- **Loading-States:** Skeleton Loader, Spinner oder Progress Bars bei längeren Ladezeiten.
- **Animationen:** Dezent, z.B. für Modals, Toasts, Statuswechsel (max. 300ms, keine Ablenkung).
- **Feedback:** Sofortige Rückmeldung bei Aktionen (z.B. Button-Click, Formular-Submit, Fehler).

## 3. Responsive & Adaptive Design
- **Mobile-First:** Layouts ab 360px Breite, Breakpoints für Tablet (≥768px) und Desktop (≥1200px).
- **Touch-Optimierung:** Große Touch-Flächen, keine zu kleinen Buttons (<44x44px).
- **Flexibles Grid:** Komponenten passen sich an verfügbare Fläche an, Sidebars werden zu Menüs.

## 4. Accessibility & Inclusive Design
- **Tastaturbedienung:** Alle Funktionen sind per Tab/Enter/Space erreichbar.
- **Screenreader:** ARIA-Labels, semantische HTML-Struktur, Alternativtexte für Bilder.
- **Farbschwächen:** Keine alleinige Farbcodierung, ausreichende Kontraste.

## 5. User Onboarding & Empty States
- **Erstnutzung:** Kurze Tour, Tooltips oder Hilfetexte für neue User.
- **Empty States:** Freundliche Hinweise und Call-to-Action, wenn Listen leer sind (z.B. "Noch keine Aktienidee – jetzt anlegen!").

## 6. Fehlermeldungen & Systemfeedback
- **Error States:** Klare, verständliche Fehlermeldungen mit Lösungsvorschlag.
- **Success/Info:** Grüne/gelbe Toasts oder Banner für Erfolg/Warnung.
- **Validierung:** Inline-Feedback bei Formulareingaben, keine Popups für Fehler.

## 7. Dark Mode & Customization
- **Theme-Switch:** Umschaltbar zwischen Light/Dark Mode, Speicherung im Userprofil.
- **Custom Settings:** Schriftgröße, Kontraste, ggf. Kompakt-/Komfortmodus.

## 8. UI-Komponentenbibliothek (Beispiele)
- **Button:** Primär, Sekundär, Icon-Button, Disabled, Loading
- **Input:** Textfeld, Select, Checkbox, Radio, Switch
- **Card:** Für Ideen, News, Portfolio-Positionen
- **Modal/Dialog:** Für Details, Bestätigungen, Formulare
- **Table:** Mit Sortierung, Filter, Pagination
- **Alert/Toast:** Für Systemfeedback
- **Tabs, Accordion, Tooltip, Badge, Avatar, ProgressBar**

## 9. Iconographie & Bildsprache
- **Stil:** Klare, moderne Line-Icons (z.B. Feather, Material, RemixIcon)
- **Konsistenz:** Einheitliche Strichstärke, keine Mischstile
- **Bilder:** Lizenzierte, thematisch passende Illustrationen/Fotos

---

> Diese Guidelines dienen als verbindliche Grundlage für alle UI/UX-Entscheidungen und die spätere Implementierung (z.B. in React mit MUI/Ant Design oder als eigenes Designsystem). Sie sichern eine konsistente, zugängliche und moderne User Experience.

---

# Erweiterte UI/UX-Themen für exzellente Produktqualität

## 10. Motion Design & Animation Guidelines
- **Purposeful Motion:** Animationen unterstützen die Orientierung, verdeutlichen Statuswechsel und Hierarchien.
- **Dauer:** Maximal 300ms, keine ablenkenden Loops.
- **Beispiele:** Slide-in für Modals, sanftes Fading für Toasts, Progress-Animationen bei Ladeprozessen.

## 11. Accessibility Deep Dive
- **Farbsimulation:** Design-Check für Rot-/Grün-Schwäche, Tools wie Stark oder Figma Plugins nutzen.
- **Screenreader-Flow:** Test mit NVDA/VoiceOver, sinnvolle Reihenfolge und ARIA-Roles.
- **Fokusmanagement:** Sichtbare, kontrastreiche Fokus-Indikatoren, keine "Tab-Traps".

## 12. Usability-Testing & Prototyping-Strategien
- **Rapid Prototyping:** Klickbare Prototypen in Figma, Test mit echten Usern vor Entwicklung.
- **Testmethoden:** 5-User-Test, A/B-Testing, Remote-Interviews, Think-Aloud.
- **Feedback-Loop:** Iterative Verbesserung nach jedem Testzyklus.

## 13. Design Tokens & Variablen
- **Definition:** Zentrale Variablen für Farben, Spacing, Typografie, Border-Radius etc.
- **Vorteil:** Konsistenz, einfache Anpassung für Themes/Branding.
- **Beispiel:** `--color-primary: #1976d2; --font-size-base: 16px;`

## 14. Content Design & Microcopy
- **Tonality:** Klar, freundlich, motivierend, keine Fachchinesisch.
- **Microcopy:** Hilfetexte, Button-Labels, Fehlermeldungen – immer konkret und handlungsorientiert.
- **Beispiel:** Statt "Fehler 404" → "Seite nicht gefunden. Zurück zum Dashboard?"

## 15. Internationalisierung & Lokalisierung
- **Mehrsprachigkeit:** UI-Texte, Datums-/Zahlenformate, Währungen anpassbar.
- **Platzhalter:** Genügend Raum für längere Übersetzungen (z.B. Deutsch vs. Englisch).
- **RTL-Support:** Optional für Sprachen wie Arabisch/Hebräisch.

## 16. Data Visualization Principles
- **Klarheit:** Diagramme immer mit Achsenbeschriftung, Legende, Einheiten.
- **Farben:** Farbpalette mit ausreichendem Kontrast, keine alleinige Farbcodierung.
- **Interaktivität:** Tooltips, Drilldown, Filteroptionen für komplexe Daten.

## 17. Mobile UX Best Practices
- **Daumenfreundliche Navigation:** Wichtige Aktionen im unteren Bereich.
- **Gesten:** Swipe, Pull-to-Refresh, Long-Press für Kontextmenüs.
- **Offline-States:** Klare Hinweise und Retry-Optionen bei fehlender Verbindung.

## 18. UX Metrics & Erfolgsmessung
- **KPIs:** Task Success Rate, Time on Task, Error Rate, Net Promoter Score (NPS).
- **Analytics:** Integration von Tools wie Matomo, Google Analytics, Hotjar für User-Flows.
- **Continuous Improvement:** Regelmäßige Auswertung und Ableitung von UX-Maßnahmen.

---

> Diese erweiterten Themen heben die User Experience auf Weltklasse-Niveau und dienen als Inspiration und Qualitätsmaßstab für alle Design- und Entwicklungsentscheidungen.
