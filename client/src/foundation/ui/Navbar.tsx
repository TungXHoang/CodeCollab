import { Link, Outlet } from 'react-router-dom';
import React from 'react';
const Navbar=()=>{
  return (    
      <>
                <div className='navBar'>
                    <div className='stocks'>
                        <Link to="/">Stocks</Link>
                    </div>
                    <div className='favourites'>
                        <Link to="/favourites">Favourite</Link>
                </div>
                    <div className='cart'>
                        <Link to="/cart">Cart</Link>
                    </div>
      </div>
      <Outlet />
      </>
    )

}

export default React.memo(Navbar);