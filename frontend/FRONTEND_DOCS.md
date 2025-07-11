# Frontend Dokumentation - InvestBoard

## Übersicht

Das Frontend ist eine moderne React-TypeScript-Anwendung mit Material-UI, die eine intuitive Benutzeroberfläche für das Portfolio-Management bietet.

## Technologie-Stack

### Core Technologies
- **React 19.1.0** - Modern React with Hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool und development server
- **Material-UI (MUI) 7.2.0** - Component library und design system

### Dependencies
- **@emotion/react & @emotion/styled** - CSS-in-JS für MUI
- **@mui/icons-material** - Material Design Icons
- **axios** - HTTP client für API calls
- **react-router-dom** - Client-side routing

## Architektur

### Ordnerstruktur
```
src/
├── components/          # React Components
│   ├── auth/           # Authentication components
│   ├── broker/         # Broker management
│   ├── common/         # Shared components (Sidebar)
│   ├── dashboard/      # Dashboard main view
│   └── portfolio/      # Portfolio management
├── contexts/           # React Context (Auth)
├── services/          # API services
├── theme/             # MUI theme configuration
└── types/             # TypeScript type definitions
```

## Features

### 🔐 Authentifizierung
- JWT-basierte Authentifizierung
- Persistent Login (LocalStorage)
- Protected Routes

### 📊 Dashboard
- Portfolio-Übersicht mit Statistiken
- Aktuelle Positionen
- Konto-Übersicht
- Responsive Design

### 💼 Portfolio Management
- Konto-Verwaltung (Depot, Verrechnungskonto, Sparkonto)
- Broker-Integration
- CRUD-Operationen

### 🏦 Broker Management
- Broker-Konfiguration
- API-Schlüssel Verwaltung

### 📱 Responsive Design
- Mobile-first Approach
- Adaptive Sidebar Navigation
- Touch-optimierte UI-Elemente

## Development

### Scripts
```bash
npm run dev      # Development server (Port 5173)
npm run build    # Production build
npm run lint     # Code linting
npm run preview  # Preview production build
```

### API Integration
- Backend URL: `http://localhost:4000/api`
- JWT Authentication
- Type-safe API calls

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0
