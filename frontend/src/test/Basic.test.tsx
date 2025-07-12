import { describe, it, expect } from 'vitest';

// Sehr einfacher Test ohne DOM, React oder MUI
describe('Basic Test Suite (No dependencies)', () => {
  it('should pass a simple math test', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  it('should handle string operations', () => {
    const text = 'Hello World';
    expect(text.length).toBe(11);
    expect(text.toLowerCase()).toBe('hello world');
  });

  it('should handle array operations', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.length).toBe(5);
    expect(arr.filter(x => x > 3)).toEqual([4, 5]);
  });

  it('should handle object operations', () => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      age: 25
    };
    
    expect(user.name).toBe('Test User');
    expect(user.email).toContain('@');
    expect(user.age).toBeGreaterThan(18);
  });
});
