import {useTheme} from "@/hooks/useTheme";
import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export function StatCard({ icon, label, value, color }) {
    const { theme } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.lg,
                padding: theme.spacing.lg,
                borderWidth: 1,
                borderColor: theme.colors.border,
            }}
        >
            <Ionicons name={icon} size={22} color={color} />
            <Text
                style={{
                    marginTop: theme.spacing.sm,
                    color: theme.colors.textSecondary,
                    fontSize: 13,
                }}
            >
                {label}
            </Text>
            <Text
                style={{
                    marginTop: 4,
                    fontSize: 22,
                    fontWeight: '700',
                    color: theme.colors.textPrimary,
                }}
            >
                {value}
            </Text>
        </View>
    );
}