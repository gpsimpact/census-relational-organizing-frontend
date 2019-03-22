import * as React from "react";
import { ConfirmLoginComponent } from '../generated/apolloComponents';
import ConfirmRouter from '../components/Auth/ConfirmRouter';
import { Box } from '../components/Util/Layout/Box';
import { MainTitle } from '../components/Util/Typography/Titles';

export default class Confirm extends React.PureComponent<any> {
  render() {
    return(
        <ConfirmLoginComponent>
            {(mutate) => {
              return(
                <div className="container">
                    <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <Box>
                                    <MainTitle>Logging In</MainTitle>
                                    <ConfirmRouter 
                                    mutation={mutate} 
                                    token={this.props.query.token} 
                                    nextPage={this.props.query.nextPage}
                                    />
                                </Box>
                            </div>
                    </div>
                </div>
              )
            }}
          </ConfirmLoginComponent>
    )}
}