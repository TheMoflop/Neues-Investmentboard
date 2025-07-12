# Test Infrastruktur

Diese Dokumentation beschreibt die komplett neu aufgebaute Test-Infrastruktur des Frontend-Projekts.

## Überblick

Die Test-Infrastruktur wurde von Grund auf neu entwickelt, um folgende Probleme zu lösen:
- DOM-Mounting-Fehler bei React Testing Library
- Komplexe Provider-Hierarchien
- Fehlende Mocks für Contexts und APIs
- Inkonsistente Test-Setups

## Struktur

### Core-Dateien

- **`src/test/setup.ts`** - Globale Test-Konfiguration und Browser-API-Mocks
- **`src/test/test-utils.tsx`** - Render-Utilities und Test-Provider
- **`src/test/mocks.ts`** - Mock-Daten und Helper-Funktionen

### Setup (`setup.ts`)

Konfiguriert die globale Testumgebung:

```typescript
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
```

#### Features:
- Automatisches Cleanup nach jedem Test
- Browser-API-Mocks (matchMedia, IntersectionObserver, etc.)
- localStorage/sessionStorage-Mocks
- React Router DOM-Mocks
- Context-Mocks (Auth, Toast, Theme)
- API Service-Mocks

### Test Utils (`test-utils.tsx`)

Bietet wiederverwendbare Utilities für Tests:

```typescript
import { renderWithProviders, testScenarios } from './test-utils';
```

#### Features:
- **`TestProviders`** - Konfigurierbare Provider-Komponente
- **`renderWithProviders`** - Custom Render-Funktion mit Providern
- **`testScenarios`** - Vorgefertigte Test-Szenarien
- **`testUtils`** - Utility-Funktionen

#### Verwendung:

```typescript
// Basis-Rendering
renderWithProviders(<Component />);

// Mit spezifischen Contexts
renderWithProviders(<Component />, {
  authContext: { user: mockUser, isAuthenticated: true },
  routerProps: { initialEntries: ['/dashboard'] }
});

// Vorgefertigte Szenarien
testScenarios.renderAsAuthenticatedUser(<Component />);
testScenarios.renderAsUnauthenticatedUser(<Component />);
testScenarios.renderWithLoadingState(<Component />);
```

### Mocks (`mocks.ts`)

Zentrale Sammlung von Mock-Daten und -Funktionen:

```typescript
import { mockData, createMockApiService, testHelpers } from './mocks';
```

#### Features:
- **`mockData`** - Typisierte Mock-Daten für User, Auth, Broker, etc.
- **`createMockApiService`** - Konfigurierbare API-Service-Mocks
- **`createMockAuthContext`** - Auth-Context-Mocks
- **`testHelpers`** - Helper für häufige Test-Szenarien
- **`testMatchers`** - Custom Assertion-Helper

#### Verwendung:

```typescript
// Mock-Daten verwenden
const user = mockData.user;
const authResponse = mockData.authResponse;

// API-Mocks setup
const mockApi = createMockApiService();
testHelpers.setupSuccessfulLogin(mockApi);

// Assertions
testMatchers.expectLoginCalledWith(mockLogin, 'email', 'password');
testMatchers.expectNavigationTo(mockNavigate, '/dashboard');
```

## Best Practices

### 1. Test-Struktur

```typescript
describe('ComponentName', () => {
  const mockOnCallback = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render required elements', () => {
      renderWithProviders(<Component onCallback={mockOnCallback} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle click events', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Component onCallback={mockOnCallback} />);
      
      await user.click(screen.getByRole('button'));
      expect(mockOnCallback).toHaveBeenCalled();
    });
  });
});
```

### 2. Provider-Testing

```typescript
// Für Komponenten mit Auth-Context
it('should show login when unauthenticated', () => {
  testScenarios.renderAsUnauthenticatedUser(<Component />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

// Für Komponenten mit spezifischen Router-States
it('should handle navigation', () => {
  renderWithProviders(<Component />, {
    routerProps: { initialEntries: ['/specific-route'] }
  });
});
```

### 3. API-Testing

```typescript
it('should handle API calls', async () => {
  const mockApi = createMockApiService();
  testHelpers.setupSuccessfulLogin(mockApi);
  
  renderWithProviders(<LoginForm />);
  
  // ... user interactions ...
  
  await waitFor(() => {
    testMatchers.expectLoginCalledWith(mockApi.login, 'email', 'password');
  });
});
```

### 4. Error-Testing

```typescript
it('should handle API errors', async () => {
  const mockApi = createMockApiService();
  testHelpers.setupFailedLogin(mockApi);
  
  renderWithProviders(<LoginForm />);
  
  // ... trigger error ...
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Konfiguration

### Vitest Config

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/**'],
    maxConcurrency: 4,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', 'test/**', 'e2e/**']
    }
  }
});
```

### Package Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Migration von alten Tests

1. **Import anpassen:**
   ```typescript
   // Alt
   import { render, screen } from '@testing-library/react';
   
   // Neu
   import { renderWithProviders, screen } from './test-utils';
   ```

2. **Provider-Setup ersetzen:**
   ```typescript
   // Alt
   render(
     <AuthProvider>
       <ThemeProvider>
         <MemoryRouter>
           <Component />
         </MemoryRouter>
       </ThemeProvider>
     </AuthProvider>
   );
   
   // Neu
   renderWithProviders(<Component />);
   ```

3. **Mocks aktualisieren:**
   ```typescript
   // Alt
   vi.mock('../contexts/AuthContext', () => ({
     useAuth: () => ({ user: null, login: vi.fn() })
   }));
   
   // Neu - automatisch in setup.ts konfiguriert
   // Oder spezifisch:
   renderWithProviders(<Component />, {
     authContext: { user: mockData.user, isAuthenticated: true }
   });
   ```

## Troubleshooting

### Häufige Probleme

1. **"Cannot find module" Fehler**
   - Prüfen Sie die Import-Pfade in `setup.ts`
   - Stellen Sie sicher, dass alle Dependencies installiert sind

2. **DOM-Mounting-Fehler**
   - Verwenden Sie `renderWithProviders` statt direktem `render`
   - Vermeiden Sie manuelle DOM-Container-Erstellung

3. **Context-Fehler**
   - Nutzen Sie die Mock-Contexts aus `setup.ts`
   - Konfigurieren Sie spezifische Context-Werte über `renderWithProviders`

4. **API-Mock-Fehler**
   - Importieren Sie Mocks aus `mocks.ts`
   - Verwenden Sie `testHelpers` für Standard-Szenarien

### Debug-Tipps

```typescript
// Console-Output für debugging
screen.debug(); // Zeigt aktuelle DOM-Struktur

// Erweiterte Queries
screen.getByTestId('component');
screen.getByRole('button', { name: /submit/i });

// Async-Debugging
await waitFor(() => {
  expect(element).toBeInTheDocument();
}, { timeout: 3000 });
```

## Erweiterung

### Neue Mock-Daten hinzufügen

```typescript
// In mocks.ts
export const mockData = {
  // ...existing data...
  newEntity: {
    id: 1,
    name: 'Test Entity',
    // ...properties
  } as NewEntityType,
};
```

### Neue Test-Szenarien

```typescript
// In test-utils.tsx
export const testScenarios = {
  // ...existing scenarios...
  renderWithSpecialCondition: (ui: React.ReactElement, options = {}) => {
    return renderWithProviders(ui, {
      authContext: { /* special auth state */ },
      ...options,
    });
  },
};
```

### Custom Matchers

```typescript
// In mocks.ts
export const testMatchers = {
  // ...existing matchers...
  expectCustomAction: (mockFn, expectedValue) => {
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ value: expectedValue })
    );
  },
};
```

## Fazit

Die neue Test-Infrastruktur bietet:
- ✅ Saubere Provider-Isolation
- ✅ Wiederverwendbare Mock-Utilities
- ✅ Typisierte Test-Daten
- ✅ Konsistente Test-Setups
- ✅ Bessere Debugging-Möglichkeiten
- ✅ Einfache Erweiterbarkeit

Dies ermöglicht es, robuste und wartbare Tests zu schreiben, die sich auf die eigentliche Funktionalität konzentrieren können.
