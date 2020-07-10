import React from 'react';
import s from './app-home.module.css'
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import Promo from '../promo/promo'
import Burger from '../app-header/header-burger/header-burger'
import Page from '../app-page-structure/app-page-structure'

// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSidebarOpen: false,
//         }
//     }
    
//     toggleMenu = () => {
//         this.setState({isSidebarOpen: !this.state.isSidebarOpen});
//     }

//     render() {
//     return (
//         <div>
//             <Burger  showMenu={this.toggleMenu} isSidebarOpen={this.state.isSidebarOpen} />
//             <Header /*callback={this.showMenu}*//>
//             <div  className={'flex'}>
//                 <Sidebar isOpen={this.state.isSidebarOpen} />
//                 <Promo />
//             </div>
//         </div>
//     )
//     }
// }

const Home = () => {
    return (
        <div>
            <Page>
                <Promo />
            </Page>
        </div>
    )
}
export default Home;
