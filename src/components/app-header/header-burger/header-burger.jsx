import React from 'react';
import styled from 'styled-components';

const StyledBurger = styled.div`
  cursor: pointer;
  width: 55px;
  height: 31px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  position: fixed;
  top: 15px;
  left: 15px;
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#09d3ac' : '#ccc'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  @media (max-width: 768px) {
    height: 29px;
    top: 13px;
    left: 16px;
    div {
      width: 1.8rem;
    }
  }
  @media (max-width: 378px) {
    height: 23px;
    top: 9px;
    left: 12px;
    div {
      width: 1.5rem;
    }
  }
`;

const Burger = ({showMenu, isSidebarOpen}) => {

  // const [open, setOpen] = useState(false)
  const handleBurgerOnClickEvent = (event) => {
    // setOpen(!open);
    showMenu();

  } 
  
  return (
    <>
      <StyledBurger open={isSidebarOpen} onClick={handleBurgerOnClickEvent}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </>
  )
}
export default Burger