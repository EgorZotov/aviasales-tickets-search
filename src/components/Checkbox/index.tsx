import { CheckBoxListItem } from 'components/CheckboxList';
import { Label, Box, Input, CheckMark, LabelText } from './style';

export interface CheckboxChange {
    name: string;
    value: boolean;
}
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    onCheckboxChange?: (change: CheckboxChange) => void;
}

const CheckBox = (props: CheckboxProps) => {
    const { label, onCheckboxChange, ...inputProps } = props;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onCheckboxChange) {
            onCheckboxChange({ name: e.target.name, value: e.target.checked });
        }
    };
    return (
        <Label htmlFor={inputProps.id}>
            <Input type='checkbox' {...inputProps} onChange={onChange} />
            <Box>
                <CheckMark />
            </Box>
            <LabelText>{props.label}</LabelText>
        </Label>
    );
};

CheckBox.defaulProps = {
    checked: false,
};

export default CheckBox;
