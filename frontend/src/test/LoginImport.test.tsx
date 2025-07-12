import { describe, it, expect } from 'vitest';

describe('Login Import Test', () => {
  it('should be able to import Login component', async () => {
    // Test if we can import the Login component without hanging
    try {
      const { default: Login } = await import('../components/auth/Login');
      expect(Login).toBeDefined();
    } catch (error) {
      console.error('Import error:', error);
      throw error;
    }
  });
});
