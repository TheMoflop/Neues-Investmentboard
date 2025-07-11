import React from 'react';
import { Box, CircularProgress, Typography, Skeleton, Card, CardContent } from '@mui/material';

interface LoadingProps {
  /** Loading message to display */
  message?: string;
  /** Size of the loading spinner */
  size?: number;
  /** Additional styling */
  sx?: object;
}

/**
 * Loading Component
 * Displays a loading spinner with optional message
 */
export const Loading: React.FC<LoadingProps> = ({ 
  message = "Wird geladen...", 
  size = 40,
  sx = {} 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        ...sx
      }}
    >
      <CircularProgress size={size} sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

/**
 * Skeleton Loader for Cards
 * Shows placeholder while content is loading
 */
export const CardSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  // Generate stable keys for skeleton lines
  const skeletonLines = Array.from({ length: lines }, (_, index) => ({
    id: `skeleton-line-${index}`,
    width: index === lines - 1 ? "40%" : "100%",
  }));

  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        {skeletonLines.map((line) => (
          <Skeleton 
            key={line.id}
            variant="text" 
            width={line.width} 
            height={20}
            sx={{ mb: 0.5 }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

/**
 * Skeleton Loader for Lists
 * Shows placeholder list items while loading
 */
export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => {
  // Generate stable keys for skeleton items
  const skeletonItems = Array.from({ length: items }, (_, index) => ({
    id: `skeleton-item-${index}`,
  }));

  return (
    <Box>
      {skeletonItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" height={24} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

/**
 * Full Page Loading Component
 * Centers loading spinner in full viewport
 */
export const FullPageLoading: React.FC<{ message?: string }> = ({ 
  message = "Anwendung wird geladen..." 
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        zIndex: 9999,
      }}
    >
      <Loading message={message} size={60} />
    </Box>
  );
};
