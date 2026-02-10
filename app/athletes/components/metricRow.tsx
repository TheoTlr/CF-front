import {useTheme} from "@/hooks/useTheme";
import {Text, View} from "react-native";

export function MetricRow({ label, tag, active = false }) {
    const { theme } = useTheme();

    return (
        <View
            style={{
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.md,
                borderRadius: theme.radius.md,
                backgroundColor: active
                    ? theme.colors.primarySoft
                    : 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: theme.spacing.sm,
            }}
        >
            <Text style={{ color: theme.colors.textPrimary }}>
                {label}
            </Text>

            <View
                style={{
                    backgroundColor: theme.colors.background,
                    borderRadius: theme.radius.full,
                    paddingHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        color: theme.colors.textSecondary,
                    }}
                >
                    {tag}
                </Text>
            </View>
        </View>
    );
}