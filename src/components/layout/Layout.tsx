import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Cart } from '../cart/Cart';
import { ScrollProgress } from '../ScrollProgress';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Cart />
    </div>
  );
}
