/// <reference types="@testing-library/jest-dom/vitest" />

// Custom matchers for Vitest + Testing Library
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/vitest';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers {}
}
