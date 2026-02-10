import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, AppTheme } from './theme';

type ThemeContextType = {
    theme: AppTheme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider
            value={{
        theme,
            toggleTheme: () => setIsDark(v => !v),
    }}
>
    {children}
    </ThemeContext.Provider>
);
}

export function useThemeContext() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('ThemeProvider manquant');
    return ctx;
}
