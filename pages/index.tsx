import * as React from "react";
import Page from '../components/Page';
import getCurrentUser from '../lib/currentUser';
import { CurrentUser } from '../lib/userConstructor';
import styled from '../lib/styled';
//@ts-ignore
import flag from '../static/img/flag.jpg';


const Hero = styled('section')`
    margin-top: -100px;
    padding-top: 100px;
    position: relative;
    z-index: 1;
    background-image: url(${flag});
    padding: 250px 0px;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
    &:after {
        content: "";
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        position: absolute;
        z-index: 2;
        opacity: .8;
        background-color: ${props => props.theme.colors.black};
    }
    * {
        position: relative;
        z-index: 25;
    }
`;
const HeroContent = styled('div')`
    color: ${props => props.theme.colors.white};
`;

const Section = styled('section')`
    padding: 75px 0px;
`;
class Index extends React.Component<any> {

    static async getInitialProps({
        ...ctx
    }) {
        console.log(ctx);
        const { currentUser } = await getCurrentUser(ctx.apolloClient);
        let nextPage: string;

      
        return { currentUser, nextPage };


    }

    render() {
        let currentUser = CurrentUser(this.props);


        return(
            <Page
                currentUser={currentUser}
            >
            <Hero>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                        <HeroContent>
                            <h1> Welcome to the census app</h1>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at elit a ipsum efficitur lobortis. Vestibulum porttitor leo ligula, ut iaculis velit accumsan in. Vestibulum tincidunt mi in ornare maximus. Morbi nec vehicula nulla. Nullam imperdiet tellus non felis pharetra semper.</p>
                        </HeroContent>
                        </div>
                    </div>
                </div>
            </Hero>
            <Section>

            <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            Marketing content?
                        </div>
                        <div className="col-md-3">
                        Marketing content?

                            </div>

                            <div className="col-md-3">
                            Marketing content?

                            </div>
                    </div>
                </div>
            </Section>
            
            </Page>
        )
    }
}

export default Index;