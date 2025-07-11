# Testplanung & Qualitätssicherung

> Verantwortlich: Testmanager, QA-Lead, DevOps, Entwicklerteam

## Teststrategie
- **Ziel:** Maximale Zuverlässigkeit, Sicherheit und Benutzerfreundlichkeit durch systematische, risikoorientierte Testprozesse
- **Testpyramide:** Fokus auf Unit-Tests (Basis), Integrationstests (Mitte), End-to-End-Tests (Spitze)
- **Shift-Left:** Tests früh im Entwicklungsprozess, Test-Driven Development (TDD) empfohlen
- **Automatisierung:** Vollständige Integration in CI/CD, tägliche und anlassbezogene Testläufe
- **Risikobasierte Priorisierung:** Kritische Kernprozesse (z.B. Portfolio-Import, Alarmierung) werden besonders intensiv getestet

## Testarten
- **Unit-Tests:** Backend-Logik, Datenbankmodelle, Frontend-Komponenten, Validierungsregeln
- **Integrationstests:** API-Endpunkte, Datenbankzugriffe, Authentifizierung, Schnittstellen zu Drittsystemen
- **End-to-End-Tests:** Kritische User-Flows (z.B. Registrierung, Portfolio-Import, Alarm-Auslösung, KI-Bewertung)
- **Manuelle Tests:** Exploratives Testen, Usability-Tests, Accessibility-Checks (WCAG 2.1)
- **Sicherheitstests:** Penetrationstests, Schwachstellenscans, Dependency-Checks (z.B. Snyk)
- **Performance-Tests:** Lasttests, Antwortzeiten, Skalierungsszenarien
- **Regressionstests:** Automatisiert und manuell nach jedem Release
- **Smoke-Tests:** Schnelle Prüfung nach jedem Deployment

## Tools & Frameworks
- **Backend:** Jest, Mocha, Pytest, Coverage-Tools (z.B. Coverage.py, Istanbul)
- **Frontend:** Jest, Testing Library, Cypress, Playwright, Axe (Accessibility)
- **CI/CD:** GitHub Actions, GitLab CI, Azure DevOps, automatisierte Test- und Lint-Workflows
- **Code-Qualität:** ESLint, Prettier, SonarQube, CodeQL
- **Security:** Snyk, OWASP ZAP, Dependabot
- **Testmanagement:** Zephyr, Xray, TestRail (optional für große Teams)

## Beispiel-Testfälle (Auszug)
- **Anmeldung/Registrierung:** Erfolgreich, Fehlerfälle, Validierung, Brute-Force-Abwehr
- **Portfolio-Import:** Verschiedene Dateiformate, fehlerhafte Dateien, Zuordnungsfehler, Rollback bei Fehlern
- **Alarmierung:** Schwellenwert erreicht, Mehrfachbenachrichtigung, Fehlerkanäle (E-Mail, Push)
- **KI-Bewertung:** Plausibilität, Fehlerfälle, Grenzwerte, Performance
- **Zugriffsrechte:** Unautorisierter Zugriff, Rollenprüfung
- **Datenkonsistenz:** Nach Import, nach Löschvorgängen

## Automatisierung & Workflows
- **Trigger:** Tests laufen automatisch bei jedem Commit, Pull Request und vor jedem Deployment
- **Code Coverage:** Ziel >85%, kritische Module >90%, Coverage-Reports im CI/CD
- **Build-Blocking:** Fehlerhafte Builds/Tests verhindern Deployments (Quality Gate)
- **Testdaten:** Verwendung von anonymisierten, realitätsnahen Testdaten
- **Rollback:** Automatisierte Rollbacks bei fehlgeschlagenen Deployments
- **Reporting:** Automatisierte Test- und Fehlerreports an das Team

## Dokumentation & Reporting
- **Testfälle:** Werden versioniert gepflegt (z.B. als Markdown, in Testmanagement-Tools)
- **Testergebnisse:** Automatisierte Reports, Historie im CI/CD-System
- **Fehlerhandling:** Bugs werden im Issue-Tracker (z.B. Jira, GitHub Issues) mit Priorisierung und Reproduzierbarkeit dokumentiert
- **Testabdeckung:** Regelmäßige Auswertung und Visualisierung der Coverage
- **Lessons Learned:** Nach jedem Release Review der Teststrategie und Ableitung von Verbesserungen

# Erweiterte Testmanagement-Themen

## Testdatenmanagement
- **Strategie:** Nutzung synthetischer, anonymisierter und DSGVO-konformer Testdaten
- **Tools:** Factory Libraries, Datenmaskierung, automatisierte Generierung
- **Datenpflege:** Regelmäßige Aktualisierung, Versionierung und Löschung von Testdaten

## Accessibility-Testing
- **Automatisiert:** Einsatz von Tools wie Axe, Lighthouse, Pa11y in CI/CD
- **Manuell:** Screenreader-Checks (NVDA, VoiceOver), Tastaturnavigation, Farbkontrast-Checks
- **Dokumentation:** Accessibility-Reports und Nachverfolgung von Barrieren

## Disaster Recovery & Backup-Tests
- **Backup-Strategie:** Regelmäßige Backups aller kritischen Datenbanken und Konfigurationen
- **Recovery-Tests:** Geplante Restore-Übungen, Validierung der Datenintegrität nach Wiederherstellung
- **Dokumentation:** Protokollierung aller Backup- und Recovery-Tests

## Monitoring & Health-Checks
- **Automatisierte Smoke-Tests:** Nach jedem Deployment auf Staging/Prod
- **Health-Checks:** API- und System-Health-Checks mit Alerting bei Ausfällen
- **Monitoring-Tools:** Prometheus, Grafana, Sentry, ELK-Stack

## Testumgebungen
- **Definition:** Klare Trennung von Dev, QA, Staging und Produktion
- **Synchronisation:** Regelmäßiger Datenabgleich (anonymisiert) zwischen Staging und Produktion
- **Rollback:** Automatisierte Rollback-Strategien bei fehlgeschlagenen Deployments

## Release- & Abnahmetests
- **Definition of Done:** Klare Abnahmekriterien für jede User Story/Feature
- **User Acceptance Testing (UAT):** Abnahme durch Product Owner/Stakeholder
- **Go-Live-Checkliste:** Formale Freigabe vor Produktivsetzung

## Testrollen & Verantwortlichkeiten
- **Verantwortung:** Entwickler (Unit/Integration), QA (E2E, Regression), Product Owner (UAT), DevOps (Monitoring)
- **Review-Prozess:** Peer-Reviews für Testfälle und Testergebnisse

## Testmetriken & Reporting
- **KPIs:** Fehlerdichte, Testabdeckung, Flaky Tests, Zeit bis Fehlerbehebung
- **Trendanalysen:** Auswertung über Releases hinweg, Lessons Learned Workshops
- **Dashboards:** Visualisierung der wichtigsten Testmetriken für das Team

## Security-Regression
- **Regelmäßige Security-Scans:** Nach jedem Update von Abhängigkeiten und Security-Patches
- **Regressionstests:** Automatisierte und manuelle Tests auf bekannte Schwachstellen

---

---

> Diese Testplanung ist State-of-the-Art und stellt sicher, dass Qualität, Sicherheit und User Experience auf höchstem Niveau gewährleistet werden. Sie wird kontinuierlich überprüft und an neue Anforderungen angepasst.
