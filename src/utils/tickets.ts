import moment from 'moment';
import { DateTime, Duration } from 'luxon';
import { Ticket, Segment, StopTypes, SortTypes, StopValues } from 'types/tickets';
import { shortRuHumanizer } from './timeHumanizer';

export const formatSegments = (segments: [Segment, Segment]) => {
    return segments.map(segment => {
        const departureTime = DateTime.fromISO(segment.date);
        const landingTime = DateTime.fromISO(segment.date).plus({ minutes: segment.duration });
        return {
            ...segment,
            flightPoints: `${segment.origin}-${segment.destination}`,
            flightTime: `${departureTime.toFormat('hh:mm')} - ${landingTime.toFormat('hh:mm')}`,
            formattedDuration: shortRuHumanizer(segment.duration * 60000, {
                units: ['h', 'm'],
                delimiter: ' ',
            }),
            durationLabel: 'В пути',
            stopsLabel:
                segment.stops.length !== 0 ? `${segment.stops.length} пересадки` : 'Без пересадок',
            formattedStops: segment.stops.join(','),
        };
    });
};

export const applyFilters = (tickets: Ticket[], stops: StopTypes[], sort: SortTypes) => {
    // Shallow copy of tickets
    let newTickets = tickets.slice();

    if (stops && stops.length) {
        // Map const string values to number representing stops
        const selectedStops = stops.reduce<StopValues[]>((acc, stop) => {
            switch (stop) {
                case 'stops_0':
                    return [...acc, 0];
                case 'stops_1':
                    return [...acc, 1];
                case 'stops_2':
                    return [...acc, 2];
                case 'stops_3':
                    return [...acc, 3];
                default:
                    return acc;
            }
        }, []);

        // Filter only stops that are selected by user
        newTickets = tickets.filter(ticket => {
            return selectedStops.some(
                stop =>
                    stop === ticket.segments[0].stops.length ||
                    stop === ticket.segments[1].stops.length,
            );
        });
    }

    switch (sort) {
        case 'cheapest':
            newTickets.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case 'fastest':
            // Fastest is nerest by Date or Fastest by duration ?
            // newTickets.sort((a, b) => {
            //     return (
            //         new Date(a.segments[0].date).getTime() - new Date(b.segments[0].date).getTime()
            //     );
            // });
            newTickets.sort((a, b) => {
                return (
                    a.segments[0].duration +
                    a.segments[1].duration -
                    (b.segments[0].duration + b.segments[1].duration)
                );
            });
            break;
    }
    return newTickets;
};
