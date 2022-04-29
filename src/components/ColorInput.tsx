interface ColorInputProps {
    name: string;
    value: number;
    onChange: (name: string, newValue: number) => void;
}

const ColorInput = (props: ColorInputProps) => (
    <input
        style={{flex: 1, maxWidth: 48}}
        type="number"
        placeholder={props.name}
        value={props.value}
        onChange={(e) => props.onChange(props.name, e.target.valueAsNumber)}
        min={0}
        max={255}
    />
);

export default ColorInput;
