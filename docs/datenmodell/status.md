# Status Datenmodell-Design

## ✅ Erledigt
- Modelle für User, Broker, Konto (Portfolio), Positionen, Aktienideen, Alarme, Transaktionen, KI-Bewertung
- Erweiterung: Felder für notes, marginPrice, positionValue, annualFees, capitalPercentage
- Optionale Relation positionId in Alarm
- Modell für Tranche (Tranchen einer Aktienidee)
- Modell für Dokument (Importierte Dokumente)
- Modell für News (Nachrichten zu Aktienideen)
- Modell für PositionHistory (Änderungsprotokoll)

## 🔄 Offen
- Erweiterte Modelle für Chartdaten, Fundamentaldaten

## Prisma Schema Status
Das Prisma-Schema wurde erweitert und eine Migration durchgeführt. Alle neuen Felder und Modelle sind in der Datenbank verfügbar.
