import humanizeDuration from 'humanize-duration';

export const shortRuHumanizer = humanizeDuration.humanizer({
    language: 'shortRu',
    languages: {
        shortRu: {
            y: () => 'г',
            mo: () => 'мес',
            w: () => 'нед',
            d: () => 'д',
            h: () => 'ч',
            m: () => 'м',
            s: () => 'с',
            ms: () => 'мс',
        },
    },
});
