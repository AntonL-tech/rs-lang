import React, {Component} from 'react';
import Header from '../app-header/app-header'
import Sidebar from '../app-sidebar/app-sidebar'
import Burger from '../app-header/header-burger/header-burger'

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
    return (
        <div>
            <Burger  showMenu={this.toggleMenu} isSidebarOpen={this.state.isSidebarOpen} />
            <Header/>
            <div  className={'flex'}>
                <Sidebar isOpen={this.state.isSidebarOpen} />
                {this.props.children}
            </div>
        </div>
    )
  }
}
export default Page;
