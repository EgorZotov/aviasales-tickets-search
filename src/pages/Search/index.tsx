import Main from 'layouts/Main';
import { SideFilters, Wrap, SearchContent, ResultCard, SearchTabSwitch } from './styles';
import { ItemType } from 'components/TabSwitch';
import CheckBoxList, { SelectedBoxes } from 'components/CheckboxList';
import { useState, useMemo, useEffect } from 'react';
import { useTicketsSearch } from 'utils/api';
import { applyFilters } from 'utils/tickets';
import { Ticket, StopTypes, SortTypes } from 'types/tickets';
import { usePagination } from 'utils/hooks';

import Button from 'components/Button';
import Preloader from 'components/Preloader';

const Search = () => {
    const [sort, setSort] = useState<SortTypes>('cheapest');
    const [stops, setStops] = useState<StopTypes[]>(['stops_0', 'stops_1', 'stops_2', 'stops_3']);
    const { pollingFinished, tickets } = useTicketsSearch([]);

    const onSortChange = (item: ItemType) => {
        setSort(item.value);
    };

    const onStopsChange = (selectedStops: StopTypes[]) => {
        setStops(selectedStops);
    };

    const preparedTickets = useMemo<Ticket[]>(() => {
        return applyFilters(tickets, stops, sort);
    }, [stops, sort, tickets]);

    const { next, currentData: paginatedTickets, currentPage, maxPage } = usePagination<Ticket>(
        preparedTickets,
    );

    return (
        <Main>
            <Wrap>
                <SideFilters>
                    <CheckBoxList
                        title='Количество пересадок'
                        onChange={onStopsChange}
                        value={stops}
                        items={[
                            {
                                id: 'stops_all',
                                name: 'stops_all',
                                label: 'Все',
                                specialAction: { type: 'checkAll' },
                            },
                            {
                                id: 'stops_0',
                                name: 'stops_0',
                                label: 'Без пересадок',
                            },
                            {
                                id: 'stops_1',
                                name: 'stops_1',
                                label: '1 пересадка',
                            },
                            {
                                id: 'stops_2',
                                name: 'stops_2',
                                label: '2 пересадки',
                            },
                            {
                                id: 'stops_3',
                                name: 'stops_3',
                                label: '3 пересадки',
                            },
                        ]}
                    />
                </SideFilters>
                <SearchContent>
                    <SearchTabSwitch
                        onChange={onSortChange}
                        items={[
                            {
                                label: 'Самый дешёвый',
                                value: 'cheapest',
                            },
                            {
                                label: 'Самый быстрый',
                                value: 'fastest',
                            },
                        ]}
                    />
                    {pollingFinished ? (
                        <>
                            {paginatedTickets.map((ticket, key) => (
                                <ResultCard ticket={ticket} key={key} />
                            ))}
                            {currentPage !== maxPage && (
                                <Button onClick={next}>Показать ешё 5 билетов</Button>
                            )}
                        </>
                    ) : (
                        <Preloader />
                    )}
                </SearchContent>
            </Wrap>
        </Main>
    );
};

export default Search;
