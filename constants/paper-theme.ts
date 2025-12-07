import { MD3LightTheme } from 'react-native-paper';

/**
 * React Native Paper theme configuration
 */
export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    success: '#4caf50',

    // onSurfaceVariant: '#666',
    // outline: '#6BA3B8',
    // Custom colors
    blue: '#6BA3B8',
    green: '#5EBAB0',
    red: '#FF0000',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    brown: '#A52A2A',
    gray: '#808080',
    black: '#000000',
  },
};
