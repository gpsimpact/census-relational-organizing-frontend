import Link from 'next/link';
import { PublicPaths } from '../../../paths';
import Nav from 'react-bootstrap/Nav'
import { useTranslation } from 'react-i18next';

export const AnonNav = () => {
    const { t } = useTranslation();

    return(
       <Link href={`${PublicPaths.register}`}>
           <Nav.Link href={`${PublicPaths.register}`}>
               {t('NEED TO REGISTER?')}
           </Nav.Link>
        </Link>
    )
}