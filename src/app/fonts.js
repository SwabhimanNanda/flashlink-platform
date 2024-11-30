import { Inter, Bricolage_Grotesque,  } from 'next/font/google';

export const bri = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
});

export const bri2 = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700'], // Change 400 to '400' as a string
});

export const bri3 = Bricolage_Grotesque({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'], // Change 400 to '400' as a string
  });

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
