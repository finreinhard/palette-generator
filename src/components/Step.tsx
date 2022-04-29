import {RGBColor} from "./Color";
import ColorInput from "./ColorInput";

interface StepProps {
    name: string;
    color: RGBColor;
    onStepChange: (step: string, newColor: RGBColor) => void;
}

const Step = (props: StepProps) => {
    const {name, color, onStepChange} = props;
    const {red, green, blue} = color;

    const onValueChange = (stepName: string, newValue: number) => {
        if (isNaN(newValue)) {
            return;
        }
        onStepChange(name, {
            red,
            green,
            blue,
            [stepName]: newValue,
        })
    };

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
            <span>{name}</span>
            <div style={{width: 32, height: 32, backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
            <div style={{display: 'flex'}}>
                <ColorInput name="red" value={red} onChange={onValueChange} />
                <ColorInput name="green" value={green} onChange={onValueChange} />
                <ColorInput name="blue" value={blue} onChange={onValueChange} />
            </div>
        </div>
    );
};

export default Step;
