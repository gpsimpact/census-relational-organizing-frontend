import {css} from '../lib/styled';

export const Animations = css`
    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loading {
        from {
            background-position: 0 0;
        }

        to {
            background-position: 100% 100%;
        }
    }

    @keyframes opacities {
        0% {opacity: 1};
        50% {opacity: 0};
        100% {opacity: 1};
    }
`;
