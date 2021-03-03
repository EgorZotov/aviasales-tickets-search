import { useRef } from 'react';
import { Airline, Card, Head, Price, Segment, SegmentCol, SegmentTop, SegmenBottom } from './style';
import { Ticket } from 'types/tickets';
import { formatSegments } from 'utils/tickets';

interface TicketCardProps extends React.ComponentPropsWithoutRef<'div'> {
    ticket: Ticket;
}

const TicketCard = (props: TicketCardProps) => {
    const { ticket, ...wrapperProps } = props;
    const renderSegmentCol = (top?: string, bottom?: string) => (
        <SegmentCol>
            {top && <SegmentTop>{top}</SegmentTop>}
            {bottom && <SegmenBottom>{bottom}</SegmenBottom>}
        </SegmentCol>
    );
    return (
        <Card {...wrapperProps}>
            <Head>
                <Price>{ticket.price.toLocaleString()}Р</Price>
                <Airline carrier={ticket.carrier} />
            </Head>
            {formatSegments(ticket.segments).map((segment, key) => {
                return (
                    <Segment key={key}>
                        {renderSegmentCol(segment.flightPoints, segment.flightTime)}
                        {renderSegmentCol(segment.durationLabel, segment.formattedDuration)}
                        {renderSegmentCol(segment.stopsLabel, segment.formattedStops)}
                    </Segment>
                );
            })}
        </Card>
    );
};

export default TicketCard;
