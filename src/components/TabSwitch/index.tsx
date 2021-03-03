import { Switch, SwitchItem } from './styles';
import { useState } from 'react';

//TODO: Check how to pass value type here
export interface ItemType {
    label: string;
    value: any;
}

export interface TabSwitchProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onChange'> {
    items: ItemType[];
    onChange?: (item: ItemType) => void;
}

const TabSwitch = (props: TabSwitchProps) => {
    const { onChange, items, ...wrapperProps } = props;
    const [currentTab, setTab] = useState<number>(0);
    const onTabPress = (item: ItemType, index: number) => {
        onChange(item);
        setTab(index);
    };
    return (
        <Switch {...wrapperProps}>
            {items.map((item, key) => (
                <SwitchItem
                    active={currentTab === key}
                    onClick={() => onTabPress(item, key)}
                    key={item.value}
                >
                    {item.label}
                </SwitchItem>
            ))}
        </Switch>
    );
};

export default TabSwitch;
