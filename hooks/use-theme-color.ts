import { Colors } from '@/constants/theme';

export function useThemeColor(props: { color?: string }, colorName: keyof typeof Colors) {
  if (props.color) {
    return props.color;
  } else {
    return Colors[colorName];
  }
}
