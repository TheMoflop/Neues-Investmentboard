# ER-Diagramm (grafisch)

Das folgende Diagramm zeigt die wichtigsten Entitäten und deren Beziehungen im System. Die Darstellung ist im PlantUML-Format gehalten, sodass du sie direkt in Tools wie PlantUML, dbdiagram.io oder VS Code Extensions (z.B. "PlantUML Previewer") nutzen kannst.

```plantuml
@startuml
entity User {
  *user_id : UUID
  name
  email
  settings
}

entity Broker {
  *broker_id : UUID
  name
  type
  notes
  user_id : UUID
}

entity Konto {
  *konto_id : UUID
  name
  broker_id : UUID
  account_number
  currency
  notes
}

entity Position {
  *position_id : UUID
  konto_id : UUID
  asset_type
  symbol
  name
  quantity
  entry_price
  current_price
  entry_date
  fees
  margin_price
  leverage
  position_value
  annual_fees
  notes
}

entity Aktienidee {
  *idee_id : UUID
  title
  symbol
  analyst
  current_price
  target_price
  tranche_strategy
  capital_percentage
  ki_rating_fundamental
  ki_rating_technical
  ki_rating_combined
  ki_comment
  notes
  user_id : UUID
}

entity Tranche {
  *tranche_id : UUID
  idee_id : UUID
  type
  entry_criteria
  entry_price
  invested_percentage
}

entity Dokument {
  *dokument_id : UUID
  konto_id : UUID
  type
  file_path
  import_date
  status
  notes
}

entity Alarm {
  *alarm_id : UUID
  user_id : UUID
  position_id : UUID
  symbol
  type
  threshold
  channel
  active
  created_at
}

entity News {
  *news_id : UUID
  symbol
  source
  headline
  content
  date
  sentiment
}

User ||--o{ Broker
Broker ||--o{ Konto
Konto ||--o{ Position
Konto ||--o{ Dokument
User ||--o{ Alarm
Position ||--o{ Alarm
User ||--o{ Aktienidee
Aktienidee ||--o{ Tranche
Aktienidee ||--o{ News
@enduml
```

> Tipp: Kopiere diesen PlantUML-Code in ein passendes Tool, um das ER-Diagramm grafisch zu visualisieren.
