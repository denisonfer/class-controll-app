import { CloseIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

type TSearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  accessibilityLabel: string;
  className?: string;
};

export function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  className,
}: TSearchFieldProps) {
  const hasValue = value.length > 0;

  return (
    <Input className={className}>
      <InputSlot>
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {hasValue ? (
        <InputSlot
          onPress={() => onChangeText("")}
          accessibilityLabel="Limpar busca"
        >
          <InputIcon as={CloseIcon} />
        </InputSlot>
      ) : null}
    </Input>
  );
}
