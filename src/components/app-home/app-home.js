import React from 'react';
import Promo from '../promo/promo';
import Page from '../app-page-structure/app-page-structure';

const Home = () => {
    return (
        <div>
            <Page openedPage='home'>
                <Promo />
            </Page>
        </div>
    )
}
export default Home;
