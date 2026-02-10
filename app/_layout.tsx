import { ThemeProvider } from '@/constants/ThemeProvider';
import SidebarLayout from './sidebarLayout';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <SidebarLayout />
        </ThemeProvider>
    );
}
