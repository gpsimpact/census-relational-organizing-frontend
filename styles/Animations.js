import {css} from 'styled-components';

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

    @keyframes modalIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes modalInnerIn {
        0% {
            width: 0px;
            opacity: 0;
        }
        25% {
            width: 0px;
            opacity: 0;
        }
        100% {
            width: 800px;
            opacity: 1;
        }
    }


`;
