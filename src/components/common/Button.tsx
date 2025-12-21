import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#aaa" : "#007AFF",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
}
