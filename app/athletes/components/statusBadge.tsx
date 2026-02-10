import { View, Text } from 'react-native';
import {useTheme} from "@/hooks/useTheme";

type StatusBadgeProps = {
    status: 'ACTIVE' | 'PAUSE' | 'NOUVEAU'; // ou string si tu veux plus générique
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const { theme } = useTheme();

    const colors = {
        ACTIVE: theme.colors.success,
        PAUSE: theme.colors.danger,
        NOUVEAU: theme.colors.primary,
    };

    return (
        <View
            style={{
                backgroundColor: colors[status] + '20',
                borderRadius: theme.radius.full,
                paddingHorizontal: 8,
            }}
        >
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: colors[status],
                }}
            >
                {status}
            </Text>
        </View>
    );
}

export function TagBadge({ label }) {
    const { theme } = useTheme();

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                borderRadius: theme.radius.full,
                paddingHorizontal: 8,
            }}
        >
            <Text
                style={{
                    fontSize: 11,
                    color: theme.colors.textSecondary,
                }}
            >
                {label}
            </Text>
        </View>
    );
}
