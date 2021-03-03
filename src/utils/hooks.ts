import axios, { AxiosRequestConfig } from 'axios';
import { useState, useMemo, useEffect, useRef } from 'react';
import { LongPollRequest, LongPollResponse } from './polling';

export const usePagination = <T>(data: T[] = [], itemsPerPage = 5) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        return data.slice(0, currentPage * itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const next = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    };

    const prev = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const jump = (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    };

    return { next, prev, jump, currentData, currentPage, maxPage };
};

export const usePolling = <T extends LongPollResponse>(defaultRequest?: () => Promise<T>) => {
    const [pollingFinished, setPollingFinished] = useState<boolean>(false);
    const [data, setData] = useState<T>({} as T);
    const poll = useRef<LongPollRequest<T>>();
    const startPolling = (request?: () => Promise<T>) => {
        poll.current = new LongPollRequest<T>(
            request ? request : defaultRequest,
            data => {
                setData(data);
            },
            () => {
                setPollingFinished(true);
            },
        );
        poll.current.startPolling();
    };
    const stopPolling = () => {
        if (poll.current) {
            setPollingFinished(true);
            poll.current.stopPolling();
        }
    };
    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);
    return { pollingFinished, data, startPolling, stopPolling };
};
