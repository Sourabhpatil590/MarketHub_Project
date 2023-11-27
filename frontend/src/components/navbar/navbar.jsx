// import Nav from 'react-bootstrap/Nav';
import './navbar.css'
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className='navbar'>
        <Link to='/'>
          <h3>Home</h3>
        </Link>
        <Link to='/cart'>
          <h3>Cart</h3>
        </Link>
        <Link to='/wishlist'>
          <h3>Wishlist</h3>
        </Link>
    </div>
  )}
export default NavBar

    
