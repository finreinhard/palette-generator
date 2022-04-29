import Step from "./Step";

export interface RGBColor {
    red: number;
    green: number;
    blue: number;
}

export interface Steps {
    [name: number]: RGBColor;
}

interface ColorProps {
    name: string;
    steps: Steps
    onStepChange: (step: string, newColor: RGBColor) => void;
}

const Color = (props: ColorProps) => (
    <div style={{display: 'flex', gap: 16}}>
        {Object.entries(props.steps).map(([step, color]) => (
            <Step
                key={`${props.name}-${step}`}
                name={`${props.name}-${step}`}
                color={color}
                onStepChange={props.onStepChange}
            />
        ))}
    </div>
);

export default Color;
