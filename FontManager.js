import { useFonts } from 'expo-font';

export const loadFonts = async () => {
  useFonts({
    'Bebas': require('./assets/BebasNeue-Regular.ttf'),
  });
};

// Vous pouvez également exporter des constantes pour les noms de polices, si nécessaire.
export const body_font = 'Bebas';