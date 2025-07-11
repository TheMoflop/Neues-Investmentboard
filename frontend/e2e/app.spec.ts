import { test, expect } from '@playwright/test';

test.describe('Investment Board App', () => {
  test('should load homepage and show navigation', async ({ page }) => {
    await page.goto('/');
    
    // Überprüfe, dass die Seite geladen wird
    await expect(page).toHaveTitle(/Investment/);
    
    // Überprüfe Navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Überprüfe wichtige Navigationselemente
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Portfolio')).toBeVisible();
    await expect(page.locator('text=Broker')).toBeVisible();
  });

  test('should handle user authentication flow', async ({ page }) => {
    await page.goto('/');
    
    // Klicke auf Login
    await page.click('text=Login');
    
    // Überprüfe, dass Login-Form sichtbar ist
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Teste Formularvalidierung
    await page.click('button[type="submit"]');
    
    // Überprüfe Validierungsmeldungen
    await expect(page.locator('text=Email ist erforderlich')).toBeVisible();
  });

  test('should navigate between main pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigiere zu Portfolio
    await page.click('text=Portfolio');
    await expect(page.url()).toContain('/portfolio');
    
    // Navigiere zu Broker
    await page.click('text=Broker');
    await expect(page.url()).toContain('/broker');
    
    // Zurück zum Dashboard
    await page.click('text=Dashboard');
    await expect(page.url()).toContain('/dashboard');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Simuliere mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Überprüfe, dass die Seite auf mobilen Geräten funktioniert
    await expect(page.locator('nav')).toBeVisible();
    
    // Teste mobile Navigation (falls vorhanden)
    // await page.click('[data-testid="mobile-menu"]');
    // await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
  });

  test('should handle theme switching', async ({ page }) => {
    await page.goto('/');
    
    // Klicke auf Theme-Umschalter (falls vorhanden)
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      
      // Überprüfe, dass sich das Theme ändert
      await expect(page.locator('body')).toHaveClass(/dark/);
    }
  });
});
