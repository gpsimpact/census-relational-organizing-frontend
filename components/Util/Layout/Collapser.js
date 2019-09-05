import React from 'react';
import styled, {css} from 'styled-components';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { H2 } from '../Typography';

export const CollapserContainer = styled('div')`

`;

export const CollapserInner = styled('div')`
-webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    display: block;
    height: 0px;
    overflow: hidden;
    ${({open}) => open && css`
        height: auto;
    `}
    padding-left: 35px;
`;

export const CollapserButton = styled('div')`
-webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
  &:hover {
      cursor: pointer;
      h2 {
        color: ${props => props.theme.colors.primaryColor} !important;
      }
      svg {
          fill: ${props => props.theme.colors.primaryColor} !important;
      }
  }
  svg {
      width: 30px;
      height: 30px;
      margin-top: -4px;
  }
  ${({open}) => open && css`
  margin-bottom: 15px;

        svg {
            transform: rotate(90deg); /* Equal to rotateZ(45deg) */
        }
    `}
`;

export class Collapser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open
        }
    }

    render(){
        return(
            <CollapserContainer>
                <CollapserButton onClick={() => this.setState({open: !this.state.open})} open={this.state.open}>
                    <H2 uppercase><KeyboardArrowRight/> {this.props.title}</H2>
                </CollapserButton>
                <CollapserInner open={this.state.open}>
                    {this.props.children}
                </CollapserInner>
            </CollapserContainer>
        )
    }
}


