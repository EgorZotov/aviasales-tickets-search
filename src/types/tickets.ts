export interface Segment {
    // Код города (iata)
    origin: string;
    // Код города (iata)
    destination: string;
    // Дата и время вылета туда
    date: string;
    // Массив кодов (iata) городов с пересадками
    stops: string[];
    // Общее время перелёта в минутах
    duration: number;
}

export interface Ticket {
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [Segment, Segment];
}

// TODO: Type define filters and sort options
export type SortTypes = 'cheapest' | 'fastest' | 'optimal';
export type StopTypes = 'stops_0' | 'stops_1' | 'stops_2' | 'stops_3';
export type StopValues = 0 | 1 | 2 | 3;
