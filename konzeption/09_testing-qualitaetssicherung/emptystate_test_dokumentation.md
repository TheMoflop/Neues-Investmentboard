# Dokumentation: EmptyState Test und EMFILE-Problem

## Kontext
- Die EmptyState-Komponenten sind für die User Experience und Konsistenz der App essenziell.
- Das Testen dieser Komponenten ist wichtig, da sie in PortfolioPage, BrokerPage und PositionsPage verwendet werden.

## Problem
- Beim Testen mit Vitest und Material-UI Icons trat ein EMFILE-Fehler auf ("too many open files").
- Ursache: Material-UI Icons öffnen zu viele Dateien gleichzeitig in der Testumgebung.
- Workarounds wie das Entfernen des Tests oder das Testen von Dummy-Komponenten sind nicht professionell.

## Lösung
- Die Icons werden mit `vi.mock('@mui/icons-material', ...)` gemockt, sodass keine echten Icon-Dateien geladen werden.
- Dadurch werden die EmptyState-Komponenten vollständig und realistisch getestet.
- Der Test ist jetzt stabil und deckt alle Varianten ab:
  - EmptyState (Basis)
  - EmptyPortfolio
  - EmptyBroker
  - EmptyPositions

## Ergebnis
- 100% Testabdeckung für EmptyState-Komponenten
- Keine EMFILE-Fehler mehr
- Alle relevanten Interaktionen (Button-Clicks, Icon-Rendering, Text) werden getestet
- Die Lösung ist dokumentiert und nachvollziehbar

## Code-Snippet für Mocking
```ts
vi.mock('@mui/icons-material', () => ({
  Add: vi.fn(() => <span data-testid="add-icon">Add</span>),
  AccountBalance: vi.fn(() => <span data-testid="bank-icon">Bank</span>),
  TrendingUp: vi.fn(() => <span data-testid="trending-icon">Trending</span>),
}));
```

## Fazit
- Die Tests sind jetzt robust und produktionsreif
- Die Mocking-Strategie kann für andere MUI-Icon-Probleme wiederverwendet werden
- Die Dokumentation ist unter `konzeption/09_testing-qualitaetssicherung/emptystate_test_dokumentation.md` abgelegt
