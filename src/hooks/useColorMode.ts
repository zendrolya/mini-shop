import { useContext } from 'react';
import { ColorModeContext } from '../context/ColorModeCtx';

export function useColorMode() {
  return useContext(ColorModeContext);
}
