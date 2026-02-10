import {useTheme} from "@/hooks/useTheme";
import {View} from "react-native";

export function Card({ children, style }) {
    const { theme } = useTheme();
    return (
        <View
            style={[
                {
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius.lg,
                    padding: theme.spacing.lg,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}