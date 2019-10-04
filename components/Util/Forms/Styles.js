import styled from 'styled-components';


export const InputContainer = styled('div')`
    display: block;
    width: 100%;
    padding-bottom:.5rem;;
    margin-bottom: 1rem;
`;

export const Label = styled('label')`
    display: block;
    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
`;

export const TextInput = styled('input')`
    display: block;
    width: 100%;
    padding: .5rem;
    border: none;
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    :focus {
        background: ${props => props.theme.colors.g2};
        border-left: 3px solid ${props => props.theme.colors.g3};
        border-bottom: 2px solid ${props => props.theme.colors.g3};

    }
    ${({ error, theme }) => error && `
            border-left: 3px solid ${theme.colors.secondary};
            border-bottom: 2px solid ${theme.colors.secondary};
    `}
`;

export const ErrorContainer = styled('div')`
    display: block;
    position: absolute;
    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
    color: ${props => props.theme.colors.secondary};
`;

export const StyledSelectInput = styled('select')`
    display: block;
    width: 100%;
    padding: .5rem;
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-position: right 50%;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZFNDEwNjlGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZFNDEwNkFGNzFEMTFFMkJEQ0VDRTM1N0RCMzMyMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkU0MTA2N0Y3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkU0MTA2OEY3MUQxMUUyQkRDRUNFMzU3REIzMzIyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuGsgwQAAAA5SURBVHjaYvz//z8DOYCJgUxAf42MQIzTk0D/M+KzkRGPoQSdykiKJrBGpOhgJFYTWNEIiEeAAAMAzNENEOH+do8AAAAASUVORK5CYII=);
    border-left: 3px solid ${props => props.theme.colors.g1};
    border-bottom: 2px solid ${props => props.theme.colors.g3};
    background: ${props => props.theme.colors.g1};
    :focus {
        background: ${props => props.theme.colors.g2};
        border-left: 3px solid ${props => props.theme.colors.g3};
        border-bottom: 2px solid ${props => props.theme.colors.g3};

    }
    ${({ error, theme }) => error && `
            border-left: 3px solid ${theme.colors.secondary};
            border-bottom: 2px solid ${theme.colors.secondary};
    `}
`;




export const CheckBoxWrapper = styled('div')`
    input[type='checkbox'] {
        display: none;
    }
`;
export const CheckBoxLabel = styled(`label`)`
    display: inline-block;
    height: 34px;
    position: relative;
    padding-left: 70px;
    margin-right: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    margin-top: 20px;

        span{
            opacity: .5;
            transition: .25s;
            display: block;
            text-transform: uppercase;
            font-weight: bold;
            margin-top: 7px;
            font-size: .65rem;
            padding-left: .25rem;
            ${({checked}) => checked && `
                opacity: 1;
            `}
        }
    
    ${({smallMarg}) => smallMarg && `
        margin: 10px 0px;
    `}


`;
export const CheckBoxLabelText = styled('span')`
    display: block;
    text-transform: uppercase;
    font-size: .75rem;
    padding-left: .5rem;
`;
export const CheckBoxInput = styled('input')`
    display: none;
`;
export const CheckBoxToggler = styled('div')`
        background-color: ${props => props.theme.colors.g3};
        bottom: 0;
        left: 0;
        top: 0;
        width: 60px;
        position: absolute;

        cursor: pointer;
        border-radius: 5px;
        transition: .25s;
        .checkem {
            transition: .25s;
            position: absolute;
            right: 8px;
            bottom: 8px;
            z-index: 50;
            opacity: 0;
            color: ${props => props.theme.colors.primary};
        }
        ${({checked, theme}) => checked && `
            background-color: ${theme.colors.primary};
            .checkem {
                opacity: 1;
            }
        `}
    :before {
        background-color: ${props => props.theme.colors.white};
        bottom: 4px;
        content: "";
        height: 26px;
        left: 4px;
        position: absolute;
        border-radius: 5px;
        transition: .25s;
        width: 26px;
        ${({checked}) => checked && `
            transform: translateX(26px);
        `}
    }
`;

export const RadioButtonContainer = styled('div')`
    
`;

export const RadioGroupContainer = styled('div')`
    width: 100%;
    position: relative;
    padding-left: .5rem;
    margin-bottom: 30px;

    legend {
        display: block;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Raleway',sans-serif;
        font-weight: 900;
    }
    label {
        display: inline-block;
        text-transform: uppercase;
        font-size: .7rem;
        padding-left: .5rem;
    }
`;

export const LinearButtonContainer = styled('div')`
    legend {
        display: block;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Raleway',sans-serif;
        font-weight: 900;
    }
  label {
        width: 100%;
        cursor: pointer;

    }
    
      display: inline-block;
      ${({width, theme}) => width && `
            width: ${width};
        `}
        
`;
export const LinearButtonInner = styled('div')`
    display: flex; 
    flex-direction: column;
    border: 4px solid ${props => props.theme.colors.g3};
    min-height: 81px;
    padding: 5px;
    position: relative;
  
    input {
        display: block;
        margin: 5px auto;
    }
  
    .linear-label {
        margin-top: 10px;
        font-size: .7rem;
        line-height: .8rem;
        text-align: center;
    }
    ${({checked, theme}) => checked && `
            border-color: ${theme.colors.primary};
    `}
 
`;

export const LinearGroupContainer = styled('div')`
    legend {
        display: block;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Raleway',sans-serif;
        font-weight: 900;
    }
    width: 100%;
    position: relative;
    padding-left: .5rem;
    margin-bottom: 30px;
    label {
        display: inline-block;
        text-transform: uppercase;
        font-size: .7rem;
        padding-left: .5rem;
    }
`;

export const CheckBoxGroupContainer = styled('div')`
   legend {
        display: block;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Raleway',sans-serif;
        font-weight: 900;
    }
`;