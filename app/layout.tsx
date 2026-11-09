import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mauricio Molina — Software para tu negocio',
  description: 'Desarrollo de software, integraciones y productos para negocios.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
