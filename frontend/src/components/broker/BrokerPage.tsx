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
  IconButton,
  Fab,
} from '@mui/material';
import { Edit, Delete, Add, AccountBalance } from '@mui/icons-material';
import type { Broker, CreateBrokerRequest } from '../../types/api';
import { apiService } from '../../services/apiService';
import { EmptyBroker } from '../common/EmptyState';
import { ListSkeleton } from '../common/Loading';
import { useToast } from '../../contexts/ToastContext';

/**
 * Broker Page Component
 * Manages broker connections with full CRUD functionality
 * Displays empty states, loading states, and provides user-friendly error handling
 */
const BrokerPage: React.FC = () => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBroker, setEditingBroker] = useState<Broker | null>(null);
  const [formData, setFormData] = useState<CreateBrokerRequest>({
    name: '',
    apiUrl: '',
    apiKey: '',
  });

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadBrokers();
  }, []);

  /**
   * Load brokers data with error handling
   */
  const loadBrokers = async () => {
    try {
      setLoading(true);
      const brokersData = await apiService.getBrokers();
      setBrokers(brokersData);
    } catch (error) {
      console.error('Fehler beim Laden der Broker:', error);
      showError('Fehler beim Laden der Broker-Daten');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open dialog for creating or editing a broker
   * @param broker - Optional broker to edit, undefined for new broker
   */
  const handleOpenDialog = (broker?: Broker) => {
    if (broker) {
      setEditingBroker(broker);
      setFormData({
        name: broker.name,
        apiUrl: broker.apiUrl || '',
        apiKey: broker.apiKey || '',
      });
    } else {
      setEditingBroker(null);
      setFormData({
        name: '',
        apiUrl: '',
        apiKey: '',
      });
    }
    setDialogOpen(true);
  };

  /**
   * Close the dialog and reset editing state
   */
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingBroker(null);
  };

  /**
   * Save broker data (create or update)
   */
  const handleSave = async () => {
    try {
      if (editingBroker) {
        await apiService.updateBroker(editingBroker.id, formData);
        showSuccess('Broker erfolgreich aktualisiert');
      } else {
        await apiService.createBroker(formData);
        showSuccess('Broker erfolgreich erstellt');
      }
      handleCloseDialog();
      loadBrokers();
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      showError('Fehler beim Speichern der Broker-Daten');
    }
  };

  /**
   * Delete a broker by ID with confirmation
   * @param id - Broker ID to delete
   */
  const handleDelete = async (id: number) => {
    if (window.confirm('Möchten Sie diesen Broker wirklich löschen?')) {
      try {
        await apiService.deleteBroker(id);
        showSuccess('Broker erfolgreich gelöscht');
        loadBrokers();
      } catch (error) {
        console.error('Fehler beim Löschen:', error);
        showError('Fehler beim Löschen des Brokers');
      }
    }
  };

  // Show loading state with skeleton
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Broker Management
        </Typography>
        <ListSkeleton items={3} />
      </Box>
    );
  }

  // Show empty state if no brokers
  if (brokers.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Broker Management
        </Typography>
        <EmptyBroker onCreateBroker={() => handleOpenDialog()} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Broker Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Neuer Broker
        </Button>
      </Box>

      {brokers.length === 0 ? (
        <EmptyBroker onCreateBroker={() => handleOpenDialog()} />
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {brokers.map((broker) => (
            <Card key={broker.id} sx={{ minWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">
                        {broker.name}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleOpenDialog(broker)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(broker.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  {broker.apiUrl && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      API URL: {broker.apiUrl}
                    </Typography>
                  )}

                  {broker.apiKey && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      API Key: {broker.apiKey.substring(0, 8)}...
                    </Typography>
                  )}

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Erstellt: {new Date(broker.createdAt).toLocaleDateString('de-DE')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      )}

      {/* Dialog für Broker erstellen/bearbeiten */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBroker ? 'Broker bearbeiten' : 'Neuen Broker erstellen'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Broker Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            margin="dense"
            label="API URL (optional)"
            fullWidth
            variant="outlined"
            value={formData.apiUrl}
            onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
            sx={{ mb: 2 }}
            placeholder="https://api.broker.com"
          />
          
          <TextField
            margin="dense"
            label="API Key (optional)"
            fullWidth
            variant="outlined"
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder="Ihr API-Schlüssel"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Abbrechen</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingBroker ? 'Aktualisieren' : 'Erstellen'}
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
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default BrokerPage;
