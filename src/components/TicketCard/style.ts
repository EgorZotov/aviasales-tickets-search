import styled from 'styled-components';

export const Card = styled.div`
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 184px; //?
    padding: 20px;
`;

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const Price = styled.span`
    color: ${({ theme }) => theme.colors.Accent};
    font-size: 24px;
    font-weight: 600;
`;

type AirlineProps = {
    carrier: string;
};

export const Airline = styled.img.attrs<AirlineProps>(({ carrier, ...attrs }) => ({
    ...(carrier ? { src: `https://pics.avs.io/99/36/${carrier}.png` } : {}),
    ...attrs,
}))<AirlineProps>`
    max-height: 36px;
`;

export const Segment = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const SegmentCol = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const SegmentTop = styled.span`
    color: ${({ theme }) => theme.colors.TextAdditional};
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: uppercase;
`;

export const SegmenBottom = styled.span`
    color: ${({ theme }) => theme.colors.Text};
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
`;
