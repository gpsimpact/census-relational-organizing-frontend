import { FieldProps } from "formik";
import styled from '../../../lib/styled';


type AddSelectProps = {
    id: string;
    name: string;
    label: string;
    error?: any;
    options: any;
  }
const GroupContainer = styled('div')`
    display: block;
    width: 100%;
    padding-bottom: ${props => props.theme.spacing[2]};
    margin-bottom: ${props => props.theme.spacing[3]};
`;
const Label = styled('label')`
    display: block;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSize[1]};
    font-weight: ${props => props.theme.fontWeight[2]};
    padding-left: ${props => props.theme.spacing[2]};
`;
const ErrorContainer = styled('div')`
    display: block;
    position: absolute;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSize[0]};
    font-weight: ${props => props.theme.fontWeight[2]};
    padding-left: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.red};
`;
const SelectInput = styled('select')<{error?:any}>`
display: block;
width: 100%;
padding: ${props => props.theme.spacing[2]};
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
        border-left: 3px solid ${theme.colors.red};
        border-bottom: 2px solid ${theme.colors.red};
`}
`;


export const SelectField = ({
    field,
    form: { errors, touched},
    ...props
}: FieldProps & AddSelectProps) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return(
        <GroupContainer>

            <Label htmlFor={props.name} id={`label-${props.id}`}>{props.label}</Label>

            <SelectInput error={errorMessage} {...field} {...props}>
                {
                    props.options.map((opt, i) => {
                        return(
                            <option key={i} value={opt.value}>{opt.label}</option>
                        )
                    })
                }
            </SelectInput>
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

        </GroupContainer>
    )
}