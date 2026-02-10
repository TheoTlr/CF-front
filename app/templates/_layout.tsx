// app/templates/_layout.tsx
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function TemplatesLayout() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            {/* Ici tu peux mettre un header commun si besoin */}
            <Slot /> {/* Les pages index.tsx et [id].tsx seront rendues ici */}
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background,
        },
    });
