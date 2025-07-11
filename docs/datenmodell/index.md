# Datenmodell Design

## 1. Entitäten und Felder

### User
- user_id (PK)
- name
- email
- settings

### Broker
- broker_id (PK)
- name
- type (z.B. Online, Bank)
- notes
- user_id (FK)

### Konto
- konto_id (PK)
- name
- broker_id (FK)
- account_number (optional)
- currency
- notes

### Position
- position_id (PK)
- konto_id (FK)
- asset_type (Aktie, CFD, Krypto, ...)
- symbol
- name
- quantity
- entry_price
- current_price
- entry_date
- fees
- margin_price (nur CFD)
- leverage (nur CFD)
- position_value
- annual_fees
- notes

### Aktienidee
- idee_id (PK)
- title
- symbol
- analyst
- current_price
- target_price
- tranche_strategy (kurz/mittel/lang)
- capital_percentage
- ki_rating_fundamental
- ki_rating_technical
- ki_rating_combined
- ki_comment
- notes
- user_id (FK)

### Tranche
- tranche_id (PK)
- idee_id (FK)
- type (kurz/mittel/lang)
- entry_criteria
- entry_price
- invested_percentage

### Dokument
- dokument_id (PK)
- konto_id (FK)
- type (PDF, CSV, OCR, ...)
- file_path
- import_date
- status
- notes

### Alarm
- alarm_id (PK)
- user_id (FK)
- position_id (FK, optional)
- symbol
- type (Preis, Datum, G&V, Tranche, ...)
- threshold
- channel (Discord, In-App, ...)
- active
- created_at

### News
- news_id (PK)
- symbol
- source
- headline
- content
- date
- sentiment

## 2. Beziehungen (ER-Diagramm)

```
[User] 1---n [Broker] 1---n [Konto] 1---n [Position]
   |                              |
   |                              n
   |                              |
   n                              [Dokument]
   |
   n
[Alarm]
   |
   n
[Aktienidee] 1---n [Tranche]
   |
   n
[News]
```

## Validierungsregeln & Constraints

- Pflichtfelder: Alle Primärschlüssel, Referenzen (FK), symbol, name, entry_price, quantity, user_id
- Wertebereiche: quantity > 0, entry_price >= 0, fees >= 0, leverage >= 1 (bei CFDs)
- Eindeutigkeit: symbol pro Aktie/Krypto, account_number pro Konto (optional)
- E-Mail-Format für User
- Soft Deletes für Positionen und Dokumente (Feld: deleted_at)

## Indizierung & Performance

- Indizes auf: user_id, symbol, konto_id, broker_id, idee_id, alarm_id
- Composite-Index auf (user_id, symbol) für schnelle Portfolioabfragen

## Migrationsstrategie

- Datenbankschema wird mit Prisma Migrations versioniert
- Änderungen werden zuerst in der Entwicklung getestet, dann in Staging/Produktion übernommen
- Backups vor jeder Migration
