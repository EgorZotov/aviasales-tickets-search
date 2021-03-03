import { Wrap, Content } from './style';
import Header from 'components/Header';

export interface MainProps {
    children?: React.ReactNode;
}

const Main = (props: MainProps) => {
    return (
        <Wrap>
            <Header />
            <Content>{props.children}</Content>
        </Wrap>
    );
};

export default Main;
