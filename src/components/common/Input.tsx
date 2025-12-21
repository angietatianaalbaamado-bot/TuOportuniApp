import { TextInput, Text, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: string;
}

export default function Input({ value, onChangeText, placeholder, secureTextEntry, error }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
          borderWidth: 1,
          borderColor: error ? "red" : "#ccc",
          padding: 10,
          borderRadius: 6,
        }}
      />
      {error && <Text style={{ color: "red", marginTop: 4 }}>{error}</Text>}
    </View>
  );
}
