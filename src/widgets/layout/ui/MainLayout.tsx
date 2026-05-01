import { Header } from '@/widgets/header/ui/Header';
import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { Footer } from '@/widgets/footer';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={`container ${styles.content}`}>
        <Suspense fallback={<div>Загрузка страницы...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};