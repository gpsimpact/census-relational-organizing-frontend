import Link from 'next/link';
import { PublicPaths } from '../../../paths';
import Nav from 'react-bootstrap/Nav'

export const AnonNav = () => {
    return(
       <Link href={`${PublicPaths.register}`}>
           <Nav.Link href={`${PublicPaths.register}`}>
               Register
           </Nav.Link>
        </Link>
    )
}