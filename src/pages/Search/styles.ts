import styled from 'styled-components';
import TicketCard from 'components/TicketCard';
import TabSwitch from 'components/TabSwitch';

export const Wrap = styled.div`
    display: flex;
`;

export const SideFilters = styled.aside`
    width: 232px;
    margin-right: 20px;
`;

export const SearchContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ResultCard = styled(TicketCard)`
    margin-bottom: 20px;
`;

export const SearchTabSwitch = styled(TabSwitch)`
    margin-bottom: 20px;
`;
