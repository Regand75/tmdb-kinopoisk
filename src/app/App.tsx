import { AppRouter } from '@/app/providers/router';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};


