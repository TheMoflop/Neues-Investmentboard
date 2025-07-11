import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton 
} from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import PortfolioPage from './components/portfolio/PortfolioPage';
import BrokerPage from './components/broker/BrokerPage';
import Sidebar from './components/common/Sidebar';
import { TrendingUp, Logout, Menu } from '@mui/icons-material';

const drawerWidth = 240;
const basename = process.env.NODE_ENV === 'production' ? '/Neues-Investmentboard' : '';

const AppBarComponent: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        ml: { sm: `${drawerWidth}px` } 
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        <TrendingUp sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          InvestBoard
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Hallo, {user?.name}
        </Typography>
        <Button color="inherit" onClick={logout} startIcon={<Logout />}>
          Abmelden
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Lädt...</Typography>
      </Box>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBarComponent onMenuClick={handleDrawerToggle} />
      
      {isAuthenticated && (
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: isAuthenticated ? `${drawerWidth}px` : 0 },
          mt: isAuthenticated ? 8 : 0,
        }}
      >
        <Routes>
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/positions"
            element={
              <ProtectedRoute>
                <Typography variant="h4" sx={{ p: 3 }}>Positionen (Coming Soon)</Typography>
              </ProtectedRoute>
            }
          />
          <Route
            path="/brokers"
            element={
              <ProtectedRoute>
                <BrokerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Typography variant="h4" sx={{ p: 3 }}>Profil (Coming Soon)</Typography>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Typography variant="h4" sx={{ p: 3 }}>Einstellungen (Coming Soon)</Typography>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

/**
 * Main App Component
 * Wraps the entire application with theme, authentication, and notification providers
 * Provides centralized context management for the entire app
 */
const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router basename={basename}>
            <AppContent />
          </Router>
        </AuthProvider>
      </ToastProvider>
    </CustomThemeProvider>
  );
};

export default App;
