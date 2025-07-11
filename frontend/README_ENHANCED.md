# InvestBoard Frontend 🚀

Ein modernes, professionelles Portfolio-Management-Frontend built mit React, TypeScript und Material-UI.

## 🌟 Features

### ✅ **Vollständig implementiert**
- 🔐 **JWT-basierte Authentifizierung** mit persistentem Login
- 📊 **Portfolio Dashboard** mit Echtzeit-Statistiken
- 💼 **Portfolio Management** (Depot, Verrechnungskonto, Sparkonto)
- 🏦 **Broker Management** mit API-Integration
- 🧭 **Responsive Navigation** mit Sidebar
- 🎨 **Dark/Light Mode** mit Theme-Switcher
- 📱 **Mobile-first Design** für alle Geräte
- 🔔 **Toast-Benachrichtigungen** für User-Feedback
- 🎭 **Empty States** für bessere UX
- ⚡ **Loading States** mit Skeleton-Loader

### 🔮 **Geplante Features**
- [ ] Real-time Updates (WebSockets)
- [ ] Advanced Charts für Portfolio-Analyse
- [ ] PWA Features (Offline-Fähigkeiten)
- [ ] Push Notifications
- [ ] Export-Funktionen (PDF/CSV)
- [ ] Internationalisierung (i18n)

## 🛠️ Technologie-Stack

### **Core Technologies**
- **React 19.1.0** - Modern React mit Hooks und Concurrent Features
- **TypeScript** - Type-safe JavaScript für bessere Entwicklererfahrung
- **Vite** - Ultra-schneller Build-Tool und Development Server
- **Material-UI (MUI) 7.2.0** - Component Library und Design System

### **State Management & API**
- **React Context** - Für Authentication, Theme und Notifications
- **Axios** - HTTP Client mit JWT-Handling und Error Interceptors
- **React Router** - Client-side Routing mit Protected Routes

### **Development & Quality**
- **ESLint** - Code Quality und Konsistenz
- **TypeScript strict mode** - Maximale Type Safety
- **Prettier** - Code Formatting (empfohlen)

## 🏗️ Architektur

### **Ordnerstruktur**
```
src/
├── components/          # React Components
│   ├── auth/           # Authentication (Login, Register)
│   ├── broker/         # Broker Management
│   ├── common/         # Shared Components (Sidebar, Loading, EmptyState)
│   ├── dashboard/      # Dashboard main view
│   └── portfolio/      # Portfolio Management
├── contexts/           # React Context (Auth, Theme, Toast)
├── services/          # API services
├── theme/             # MUI theme configuration
└── types/             # TypeScript type definitions
```

### **Design System**
- **Primärfarbe**: Blau (#1976d2) - Vertrauen & Professionalität
- **Sekundärfarbe**: Grün (#4caf50) - Gewinne & Erfolg  
- **Akzentfarbe**: Rot (#f44336) - Verluste & Warnungen
- **Dark/Light Mode**: Vollständig implementiert
- **Responsive Breakpoints**: Mobile-first (360px+), Tablet (768px+), Desktop (1200px+)

## 🚀 Getting Started

### **Voraussetzungen**
- Node.js 18+ 
- npm oder yarn
- Backend läuft auf `http://localhost:4000`

### **Installation**
```bash
# Repository klonen
git clone <repository-url>
cd frontend

# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Produktion
npm run build

# Preview der Production Build
npm run preview
```

### **Verfügbare Scripts**
```bash
npm run dev          # Development Server (http://localhost:5173)
npm run build        # Production Build
npm run preview      # Preview Production Build
npm run lint         # ESLint Code Check
npm run lint:fix     # ESLint Auto-Fix
```

## 🔐 Authentifizierung

Das Frontend verwendet JWT-basierte Authentifizierung:

1. **Login/Registration** über `/auth`
2. **Token Persistence** in localStorage
3. **Automatic Token Refresh** bei 401-Responses  
4. **Protected Routes** für authentifizierte Bereiche

## 🎨 Theme System

### **Dark/Light Mode**
- Theme-Switcher in der Sidebar
- Automatische System-Präferenz-Erkennung
- Persistierung der User-Präferenz

### **Custom Theme**
```typescript
// Theme anpassen in src/theme/theme.ts
export const createAppTheme = (mode: 'light' | 'dark') => {
  // Custom theme configuration
}
```

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 0px - 767px (Touch-optimiert)
- **Tablet**: 768px - 1199px (Hybrid Navigation)  
- **Desktop**: 1200px+ (Full Sidebar)

### **Mobile Features**
- Kollapsible Navigation
- Touch-optimierte Buttons (44px+ Touch Targets)
- Floating Action Buttons
- Swipe-Gesten Support (geplant)

## 🔔 Benachrichtigungen

Toast-Benachrichtigungen für User-Feedback:

```typescript
import { useToast } from '../contexts/ToastContext';

const { showSuccess, showError, showWarning, showInfo } = useToast();

// Usage
showSuccess('Portfolio erfolgreich erstellt!');
showError('Fehler beim Laden der Daten');
```

## 🎭 UX Features

### **Empty States**
- Freundliche Hinweise bei leeren Listen
- Call-to-Action Buttons
- Kontextspezifische Illustrationen

### **Loading States**
- Skeleton Loader für bessere Perceived Performance
- Progressive Loading
- Lazy Loading (geplant)

## 🧪 Testing (Geplant)

```bash
# Unit Tests
npm run test

# E2E Tests  
npm run test:e2e

# Coverage Report
npm run test:coverage
```

## 🚢 Deployment

### **Docker**
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### **Environment Variables**
```bash
# .env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_TITLE=InvestBoard
```

## 🐛 Debugging

### **Common Issues**
1. **API Connection**: Check `VITE_API_BASE_URL` in `.env`
2. **Auth Issues**: Clear localStorage and retry login
3. **Build Issues**: Delete `node_modules` and reinstall

### **Development Tools**
- React DevTools Extension
- Redux DevTools (wenn Redux hinzugefügt wird)
- VS Code Extensions: ES7+ React/Redux/React-Native snippets

## 🤝 Contributing

### **Code Style**
- Use TypeScript strict mode
- Follow ESLint rules
- Add JSDoc comments for complex functions
- Use semantic HTML and ARIA attributes

### **Git Workflow**
```bash
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create Pull Request
```

## 📄 License

MIT License - siehe LICENSE.md

## 🆘 Support

Bei Fragen oder Problemen:
1. Check die [Issues](link-to-issues)
2. Erstelle ein neues Issue mit detaillierter Beschreibung
3. Für dringende Probleme: [Contact](contact-info)

---

**Built with ❤️ by the InvestBoard Team**
