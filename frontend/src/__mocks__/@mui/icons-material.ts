// Complete MUI Icons mock to prevent EMFILE errors
const MockIcon = () => null;

// Export a mock for each potential icon export  
export default new Proxy({} as any, {
  get: () => MockIcon,
  has: () => true,
  ownKeys: () => [],
  getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true })
});

// Named exports for common icons
export const Visibility = MockIcon;
export const VisibilityOff = MockIcon;
export const TrendingUp = MockIcon;
