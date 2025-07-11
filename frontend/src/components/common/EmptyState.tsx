import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Add as AddIcon, AccountBalance as BankIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';

interface EmptyStateProps {
  /** Title of the empty state */
  title: string;
  /** Description text */
  description: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Action button text */
  actionText?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Additional styling */
  sx?: object;
}

/**
 * Empty State Component
 * Displays a friendly message when lists or sections are empty
 * Provides clear call-to-action for users to add content
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
  sx = {},
}) => {
  return (
    <Card sx={{ textAlign: 'center', p: 4, ...sx }}>
      <CardContent>
        {icon && (
          <Box sx={{ mb: 3, color: 'text.secondary', opacity: 0.6 }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" gutterBottom color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          {description}
        </Typography>
        {actionText && onAction && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAction}
            sx={{ borderRadius: 2 }}
          >
            {actionText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Specific Empty State for Portfolio (Kontos)
 */
export const EmptyPortfolio: React.FC<{ onCreateKonto: () => void }> = ({ onCreateKonto }) => (
  <EmptyState
    title="Noch keine Kontos vorhanden"
    description="Erstelle dein erstes Konto, um mit der Portfolio-Verwaltung zu beginnen. Du kannst Depot-, Verrechnungs- oder Sparkontos anlegen."
    icon={<BankIcon sx={{ fontSize: 64 }} />}
    actionText="Erstes Konto anlegen"
    onAction={onCreateKonto}
  />
);

/**
 * Specific Empty State for Broker
 */
export const EmptyBroker: React.FC<{ onCreateBroker: () => void }> = ({ onCreateBroker }) => (
  <EmptyState
    title="Noch keine Broker konfiguriert"
    description="Verbinde deinen ersten Broker, um deine Portfolios zu verwalten. Wir unterstützen alle gängigen Broker mit sicherer API-Integration."
    icon={<TrendingUpIcon sx={{ fontSize: 64 }} />}
    actionText="Ersten Broker hinzufügen"
    onAction={onCreateBroker}
  />
);

/**
 * Specific Empty State for Positions
 */
export const EmptyPositions: React.FC<{ onCreatePosition?: () => void }> = ({ onCreatePosition }) => (
  <EmptyState
    title="Noch keine Positionen vorhanden"
    description="Deine Positionen werden hier angezeigt, sobald du sie hinzufügst oder über deinen Broker importierst."
    icon={<TrendingUpIcon sx={{ fontSize: 64 }} />}
    actionText={onCreatePosition ? "Position hinzufügen" : undefined}
    onAction={onCreatePosition}
  />
);
