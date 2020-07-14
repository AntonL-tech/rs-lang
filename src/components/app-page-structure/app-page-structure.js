import React, {Component} from 'react';
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import Burger from '../app-header/header-burger/header-burger';
import s from './app-page-structure.module.css';

class Page extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isSidebarOpen: false,
      }
  }
  
  toggleMenu = () => {
      this.setState({isSidebarOpen: !this.state.isSidebarOpen});
  }

  render() {
    const { isSidebarOpen } = this.state;
    const { openedPage, children } = this.props;

    return (
        <div>
            <Burger  showMenu={this.toggleMenu} isSidebarOpen={isSidebarOpen} />
            <Header/>
            <div  className={s.flex}>
                <Sidebar isOpen={isSidebarOpen} openedPage={openedPage}/>
                {children}
            </div>
        </div>
    )
  }
}
export default Page;
