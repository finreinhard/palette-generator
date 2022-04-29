import React, {useEffect, useState} from 'react';
import Color, {RGBColor, Steps} from "./components/Color";

const colorNames = ['blue', 'cyan', 'red', 'orange', 'yellow', 'green', 'mint', 'purple'];
const range = {
    from: 10,
    to: 100,
    steps: 10
};

const emptyRange: any = {};

for (let i = range.from; i <= range.to; i += range.steps) {
    emptyRange[i] = {red: 0, green: 0, blue: 0};
}

const emptyColors = colorNames.reduce((previousValue, currentValue) => ({
    ...previousValue,
    [currentValue]: {...emptyRange}
}), {});

interface Colors {
    [name: string]: Steps;
}

const rgbPartToHex = (part: number) => {
    const partHex = part.toString(16);

    if(partHex.length === 1) {
        return `0${partHex}`;
    }

    return partHex;
}

const rgbToHex = (color: RGBColor) => `#${rgbPartToHex(color.red)}${rgbPartToHex(color.green)}${rgbPartToHex(color.blue)}`;

function App() {
    const [colors, setColors] = useState<Colors>(emptyColors);

    const onStepChange = (name: string, newColor: RGBColor) => {
        const colorName = name.split('-')[0];
        const stepName = name.split('-')[1];

        setColors((oldColors) => ({
            ...oldColors,
            [colorName]: {
                ...oldColors[colorName],
                [stepName]: newColor,
            },
        }));
    };

    useEffect(() => {
        const savedColors = localStorage.getItem('colors');


        if (!savedColors) {
            return;
        }

        setColors(JSON.parse(savedColors));
    }, []);

    useEffect(() => {
        if (colors === emptyColors) {
            return;
        }
        localStorage.setItem('colors', JSON.stringify(colors));
    }, [colors]);

    return (
        <div>
            <h1>Color Palette Generator</h1>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                {Object.entries(colors).map(([color, steps]) => (
                    <Color key={`color-${color}`} name={color} steps={steps} onStepChange={onStepChange} />
                ))}
            </div>
            <h2>Text to copy ;-)</h2>
            <code>
                {Object.entries(colors).map(([colorName, steps]) =>
                    Object.entries(steps).map(([step, color]) => (
                    <span style={{display: 'block'}} key={`template-${colorName}-${step}`}>{`${colorName}-${step}: ${rgbToHex(color)},`}</span>
                )))}
            </code>
        </div>
    );
}

export default App;
