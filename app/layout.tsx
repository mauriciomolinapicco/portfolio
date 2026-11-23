import type { Metadata } from 'next';
import { SmoothScroll } from '../components/smooth-scroll';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mauricio Molina — Software Engineer',
  description: 'Mauricio Molina. Backend, arquitectura y producto. Software Engineer en Delto y constructor de Lymbo, software para gimnasios.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SmoothScroll />{children}</body></html>;
}
