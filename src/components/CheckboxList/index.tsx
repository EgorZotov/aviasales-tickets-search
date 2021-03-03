import CheckBox, { CheckboxChange } from 'components/Checkbox';
import { ListWrap, ListTitle, ListLabel } from './styles';
import { useMemo, useState } from 'react';

export type SpecialActionTypes = 'checkAll';

export interface SpecialAction {
    type: SpecialActionTypes;
    include?: string[];
}

export interface CheckboxList {
    [boxName: string]: {
        label: string;
        specialAction?: SpecialAction;
    };
}

export interface CheckBoxListItem {
    id: string;
    label: string;
    name: string;
    specialAction?: SpecialAction;
}

// TODO: add generic for boxNames

export interface BoxesSpecialAction {
    [boxName: string]: SpecialAction;
}

export type SelectedBoxes = Set<string>;

export interface CheckBoxListProps {
    items: CheckBoxListItem[];
    value: string[];
    title?: string;
    onChange?: (item: string[]) => void;
}

const CheckBoxList = (props: CheckBoxListProps) => {
    const setBoxValue = (selectedBoxes: SelectedBoxes, change: CheckboxChange) => {
        console.log('Set box', change);
        if (change.value) {
            selectedBoxes.add(change.name);
        } else {
            selectedBoxes.delete(change.name);
        }
    };

    const [selectedBoxes, setSelectedBoxes] = useState<SelectedBoxes>(() => {
        const newSelectedBoxes: SelectedBoxes = new Set();
        for (const box in props.items) {
            setBoxValue(newSelectedBoxes, { name: box, value: false });
        }
        return newSelectedBoxes;
    });

    const specialActionBoxes = useMemo(() => {
        const specialActionBoxes = new Map<string, SpecialAction>();
        for (const box of props.items) {
            if (box.specialAction) {
                specialActionBoxes.set(box.name, box.specialAction);
            }
        }
        return specialActionBoxes;
    }, [props.items]);

    const checkSpectialActionTrigger = (selectedBoxes: SelectedBoxes) => {
        let selectedBoxesCount = 0;
        for (const box of selectedBoxes) {
            if (!specialActionBoxes.has(box)) selectedBoxesCount++;
        }
        for (const [box, specialAction] of specialActionBoxes) {
            switch (specialAction.type) {
                case 'checkAll':
                    setBoxValue(selectedBoxes, {
                        name: box,
                        value: selectedBoxesCount === props.items.length - specialActionBoxes.size,
                    });
                    break;
            }
        }
        return selectedBoxes;
    };

    const selectBox = (change: CheckboxChange) => {
        setSelectedBoxes(selectedBoxes => {
            const { items } = props;
            const newBoxesState = new Set(selectedBoxes);
            if (specialActionBoxes.has(change.name)) {
                switch (specialActionBoxes.get(change.name).type) {
                    case 'checkAll':
                        for (const item of props.items) {
                            setBoxValue(newBoxesState, {
                                name: item.name,
                                value: change.value,
                            });
                        }
                        break;
                }
            } else {
                setBoxValue(newBoxesState, change);
                checkSpectialActionTrigger(newBoxesState);
            }
            if (props.onChange) {
                props.onChange(Array.from(newBoxesState));
            }
            return newBoxesState;
        });
    };

    return (
        <ListWrap>
            <ListTitle>{props.title}</ListTitle>
            {props.items.map(box => {
                return (
                    <ListLabel key={box.id} htmlFor={box.id}>
                        <CheckBox
                            label={box.label}
                            id={box.id}
                            checked={selectedBoxes.has(box.name)}
                            name={box.name}
                            onCheckboxChange={selectBox}
                        />
                    </ListLabel>
                );
            })}
        </ListWrap>
    );
};

export default CheckBoxList;
