// Complete MUI Icons mock to prevent EMFILE errors
const MockIcon = () => null;

// Export a mock for each potential icon export
module.exports = new Proxy({}, {
  get: () => MockIcon,
  has: () => true,
  ownKeys: () => [],
  getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true })
});
