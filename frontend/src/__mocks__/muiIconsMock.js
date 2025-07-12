// Comprehensive mock for all @mui/icons-material exports
const MockIcon = () => null;

// Export all possible icons with the same mock
export default MockIcon;

// Common icons used in the app
export const VisibilityOff = MockIcon;
export const Visibility = MockIcon;
export const TrendingDown = MockIcon;
export const ShowChart = MockIcon;
export const MoreVert = MockIcon;
export const DarkMode = MockIcon;
export const LightMode = MockIcon;
export const SettingsInputComponentOutlined = MockIcon;

// Fallback proxy for any other icons
const iconProxy = new Proxy({}, {
  get: () => MockIcon
});

// Export everything through proxy to catch any missed icons
export * from iconProxy;
