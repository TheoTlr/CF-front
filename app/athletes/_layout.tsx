import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import {Slot} from "expo-router";

export default function AthletesLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.page}>
            <Slot />
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.lg,
        },
        container: {
            flex: 1,
        },
    });
