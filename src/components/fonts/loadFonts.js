import { Font } from 'expo';

async function loadFonts() {
  await Font.loadAsync({
    'SFProText-Regular': require('../../assets/fonts/SFProText-Regular.otf'),
  });
}

loadFonts();
