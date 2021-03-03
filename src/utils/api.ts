import axios from 'axios';
import { useObservableState } from 'observable-hooks';
import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LongPollRequest } from './polling';
import { Ticket } from 'types/tickets';
import { usePolling } from './hooks';

export interface TicketsRespone {
    stop: boolean;
    tickets: Ticket[];
}

export interface SearchResponse {
    searchId: string;
}

export const AviasalesApi = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru',
});

export const getSearchId = async (): Promise<SearchResponse> => {
    const { data } = await AviasalesApi.get<SearchResponse>('/search');
    return data;
};

export const getTickets = async (searchId: string): Promise<TicketsRespone> => {
    const { data } = await AviasalesApi.get<TicketsRespone>(`/tickets?searchId=${searchId}`);
    return data;
};

export const useTicketsSearch = (initialState = [] as Ticket[]) => {
    const {
        startPolling,
        pollingFinished,
        data: { tickets = [] },
    } = usePolling<TicketsRespone>();
    useEffect(() => {
        const startSearch = async () => {
            const { searchId } = await getSearchId();
            const ticketsRequest = () => getTickets(searchId);
            startPolling(ticketsRequest);
        };
        startSearch();
    }, []);
    return { tickets, pollingFinished };
};
