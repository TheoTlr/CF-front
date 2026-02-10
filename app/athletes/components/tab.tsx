import {useTheme} from "@/hooks/useTheme";
import {Text, View} from "react-native";

export function Tab({ label, active = false }) {
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
            }}
        >
            <Text
                style={{
                    color: active
                        ? theme.colors.primary
                        : theme.colors.textSecondary,
                    fontWeight: '600',
                }}
            >
                {label}
            </Text>
        </View>
    );
}