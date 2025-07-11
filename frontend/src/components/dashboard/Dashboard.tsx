import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  ShowChart,
  MoreVert,
} from '@mui/icons-material';
import type { Konto, Position } from '../../types/api';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStats {
  totalValue: number;
  todayChange: number;
  todayChangePercent: number;
  positionsCount: number;
  brokersCount: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalValue: 0,
    todayChange: 0,
    todayChangePercent: 0,
    positionsCount: 0,
    brokersCount: 0,
  });
  const [kontos, setKontos] = useState<Konto[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [kontosData, positionsData, brokersData] = await Promise.all([
        apiService.getKontos(),
        apiService.getPositions(),
        apiService.getBrokers(),
      ]);

      setKontos(kontosData);
      setPositions(positionsData);

      // Berechne Statistiken
      const totalValue = kontosData.reduce((sum, konto) => sum + konto.saldo, 0);
      const positionsValue = positionsData.reduce(
        (sum, position) => sum + position.anzahl * position.aktuellerPreis,
        0
      );

      // Simuliere Tagesveränderung (in der Realität würde das vom Backend kommen)
      const todayChange = (positionsValue + totalValue) * 0.015; // 1.5% Beispielwert
      const todayChangePercent = ((todayChange / (positionsValue + totalValue)) * 100);

      setStats({
        totalValue: totalValue + positionsValue,
        todayChange,
        todayChangePercent,
        positionsCount: positionsData.length,
        brokersCount: brokersData.length,
      });
    } catch (error) {
      console.error('Fehler beim Laden der Dashboard-Daten:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatPercentage = (percent: number): string => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Lade Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Begrüßung */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Willkommen zurück, {user?.name}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Hier ist eine Übersicht über Ihr Portfolio
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </Box>

      {/* Statistik-Karten */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Gesamtwert
                </Typography>
                <Typography variant="h5">
                  {formatCurrency(stats.totalValue)}
                </Typography>
              </Box>
              <AccountBalance sx={{ color: 'primary.main' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {stats.todayChange >= 0 ? (
                <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: stats.todayChange >= 0 ? 'success.main' : 'error.main',
                }}
              >
                {formatCurrency(Math.abs(stats.todayChange))} ({formatPercentage(stats.todayChangePercent)})
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Positionen
                </Typography>
                <Typography variant="h5">
                  {stats.positionsCount}
                </Typography>
              </Box>
              <ShowChart sx={{ color: 'primary.main' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Broker
                </Typography>
                <Typography variant="h5">
                  {stats.brokersCount}
                </Typography>
              </Box>
              <AccountBalance sx={{ color: 'primary.main' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Kontos
                </Typography>
                <Typography variant="h5">
                  {kontos.length}
                </Typography>
              </Box>
              <AccountBalance sx={{ color: 'primary.main' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Hauptinhalt */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Aktuelle Positionen */}
        <Card sx={{ flex: '2 1 500px', minWidth: 500 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Aktuelle Positionen</Typography>
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Alle anzeigen</MenuItem>
                <MenuItem onClick={handleMenuClose}>Neue Position</MenuItem>
              </Menu>
            </Box>
            {positions.length === 0 ? (
              <Typography color="text.secondary">
                Noch keine Positionen vorhanden. Fügen Sie Ihre erste Position hinzu!
              </Typography>
            ) : (
              positions.slice(0, 5).map((position) => {
                const currentValue = position.anzahl * position.aktuellerPreis;
                const buyValue = position.anzahl * position.kaufpreis;
                const profit = currentValue - buyValue;
                const profitPercent = (profit / buyValue) * 100;

                return (
                  <Box key={position.id} sx={{ borderBottom: '1px solid #f0f0f0', py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {position.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {position.name}
                        </Typography>
                        <Typography variant="body2">
                          {position.anzahl} Stück × {formatCurrency(position.aktuellerPreis)}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1">
                          {formatCurrency(currentValue)}
                        </Typography>
                        <Chip
                          label={`${profit >= 0 ? '+' : ''}${formatCurrency(profit)} (${formatPercentage(profitPercent)})`}
                          color={profit >= 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Kontos */}
        <Card sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kontos
            </Typography>
            {kontos.length === 0 ? (
              <Typography color="text.secondary">
                Noch keine Kontos vorhanden.
              </Typography>
            ) : (
              kontos.map((konto) => (
                <Box key={konto.id} sx={{ borderBottom: '1px solid #f0f0f0', py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2">
                        {konto.name}
                      </Typography>
                      <Chip
                        label={konto.kontoTyp}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="subtitle1">
                      {formatCurrency(konto.saldo)}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
