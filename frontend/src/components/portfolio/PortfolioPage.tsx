import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Fab,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import type { Konto, Broker, CreateKontoRequest } from '../../types/api';
import { apiService } from '../../services/apiService';
import { EmptyPortfolio } from '../common/EmptyState';
import { ListSkeleton } from '../common/Loading';
import { useToast } from '../../contexts/ToastContext';

/**
 * Portfolio Page Component
 * Manages portfolio accounts (Kontos) with full CRUD functionality
 * Displays empty states, loading states, and provides user-friendly error handling
 */
const PortfolioPage: React.FC = () => {
  const [kontos, setKontos] = useState<Konto[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKonto, setEditingKonto] = useState<Konto | null>(null);
  const [formData, setFormData] = useState<CreateKontoRequest>({
    name: '',
    kontoTyp: 'DEPOT',
    saldo: 0,
    waehrung: 'EUR',
    brokerId: 0,
  });
  
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Load portfolio and broker data
   * Handles loading states and error scenarios
   */
  const loadData = async () => {
    try {
      setLoading(true);
      const [kontosData, brokersData] = await Promise.all([
        apiService.getKontos(),
        apiService.getBrokers(),
      ]);
      setKontos(kontosData);
      setBrokers(brokersData);
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      showError('Fehler beim Laden der Portfolio-Daten');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open dialog for creating or editing a Konto
   * @param konto - Optional Konto to edit, undefined for new Konto
   */
  const handleOpenDialog = (konto?: Konto) => {
    if (konto) {
      setEditingKonto(konto);
      setFormData({
        name: konto.name,
        kontoTyp: konto.kontoTyp,
        saldo: konto.saldo,
        waehrung: konto.waehrung,
        brokerId: konto.brokerId,
      });
    } else {
      setEditingKonto(null);
      setFormData({
        name: '',
        kontoTyp: 'DEPOT',
        saldo: 0,
        waehrung: 'EUR',
        brokerId: brokers.length > 0 ? brokers[0].id : 0,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingKonto(null);
  };

  /**
   * Save Konto data (create or update)
   * Displays success or error messages based on the outcome
   */
  const handleSave = async () => {
    try {
      if (editingKonto) {
        await apiService.updateKonto(editingKonto.id, formData);
        showSuccess('Konto erfolgreich aktualisiert');
      } else {
        await apiService.createKonto(formData);
        showSuccess('Konto erfolgreich erstellt');
      }
      handleCloseDialog();
      loadData();
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      showError('Fehler beim Speichern der Kontodaten');
    }
  };

  /**
   * Delete a Konto by ID
   * Confirms with the user before deletion
   */
  const handleDelete = async (id: number) => {
    if (window.confirm('Möchten Sie dieses Konto wirklich löschen?')) {
      try {
        await apiService.deleteKonto(id);
        showSuccess('Konto erfolgreich gelöscht');
        loadData();
      } catch (error) {
        console.error('Fehler beim Löschen:', error);
        showError('Fehler beim Löschen des Kontos');
      }
    }
  };

  /**
   * Format currency values for display
   * @param amount - The amount of money
   * @param currency - The currency code (default: EUR)
   * @returns Formatted currency string
   */
  const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  /**
   * Get color for Konto type chip
   * @param type - The type of the Konto (e.g., DEPOT, VERRECHNUNGSKONTO)
   * @returns Color key for MUI chip component
   */
  const getKontoTypeColor = (type: string) => {
    switch (type) {
      case 'DEPOT':
        return 'primary';
      case 'VERRECHNUNGSKONTO':
        return 'secondary';
      case 'SPARKONTO':
        return 'success';
      default:
        return 'default';
    }
  };

  // Show loading state with modern skeleton
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Portfolio Management
        </Typography>
        <ListSkeleton items={3} />
      </Box>
    );
  }

  // Show empty state if no kontos and no brokers
  if (kontos.length === 0 && brokers.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Portfolio Management
        </Typography>
        <EmptyPortfolio onCreateKonto={() => handleOpenDialog()} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Portfolio Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          disabled={brokers.length === 0}
        >
          Neues Konto
        </Button>
      </Box>

      {brokers.length === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography color="error">
              Sie müssen zuerst einen Broker hinzufügen, bevor Sie Kontos erstellen können.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Show empty state for kontos if brokers exist but no kontos */}
      {kontos.length === 0 && brokers.length > 0 && (
        <EmptyPortfolio onCreateKonto={() => handleOpenDialog()} />
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {kontos.map((konto) => {
          const broker = brokers.find(b => b.id === konto.brokerId);
          
          return (
            <Card key={konto.id} sx={{ minWidth: 300, flex: '1 1 300px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {konto.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpenDialog(konto)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(konto.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="h4" color="primary" gutterBottom>
                  {formatCurrency(konto.saldo, konto.waehrung)}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Chip
                    label={konto.kontoTyp}
                    color={getKontoTypeColor(konto.kontoTyp) as any}
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {broker?.name || 'Unbekannter Broker'}
                  </Typography>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Erstellt: {new Date(konto.createdAt).toLocaleDateString('de-DE')}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {kontos.length === 0 && (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              Noch keine Kontos vorhanden. Erstellen Sie Ihr erstes Konto!
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Dialog für Konto erstellen/bearbeiten */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingKonto ? 'Konto bearbeiten' : 'Neues Konto erstellen'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Kontoname"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            select
            margin="dense"
            label="Kontotyp"
            fullWidth
            variant="outlined"
            value={formData.kontoTyp}
            onChange={(e) => setFormData({ ...formData, kontoTyp: e.target.value as any })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="DEPOT">Depot</MenuItem>
            <MenuItem value="VERRECHNUNGSKONTO">Verrechnungskonto</MenuItem>
            <MenuItem value="SPARKONTO">Sparkonto</MenuItem>
          </TextField>
          
          <TextField
            margin="dense"
            label="Anfangssaldo"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.saldo}
            onChange={(e) => setFormData({ ...formData, saldo: parseFloat(e.target.value) || 0 })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Währung"
            fullWidth
            variant="outlined"
            value={formData.waehrung}
            onChange={(e) => setFormData({ ...formData, waehrung: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            select
            margin="dense"
            label="Broker"
            fullWidth
            variant="outlined"
            value={formData.brokerId}
            onChange={(e) => setFormData({ ...formData, brokerId: parseInt(e.target.value) })}
          >
            {brokers.map((broker) => (
              <MenuItem key={broker.id} value={broker.id}>
                {broker.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Abbrechen</Button>
          <Button onClick={handleSave} variant="contained">
            {editingKonto ? 'Aktualisieren' : 'Erstellen'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button für Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={() => handleOpenDialog()}
        disabled={brokers.length === 0}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default PortfolioPage;
