import { describe, it, expect } from 'vitest';

describe('MUI Icons Import Test', () => {
  it('should be able to import MUI icons', async () => {
    try {
      const { Visibility, VisibilityOff, TrendingUp } = await import('@mui/icons-material');
      expect(Visibility).toBeDefined();
      expect(VisibilityOff).toBeDefined();
      expect(TrendingUp).toBeDefined();
    } catch (error) {
      console.error('MUI Icons Import error:', error);
      throw error;
    }
  });
});
