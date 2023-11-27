// import { Link } from 'react-router-dom';
import {Header, Category, Products, NavBar} from '../../components';
import useWindowSize from '../../hooks/useWindowSize'
import './HomePage.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function HomePage(){
    let {width} = useWindowSize()
    if(width > 720){
        return (
        <div className='parent'>
            <div className='fixed'>
                <Header />
                <NavBar />
            </div>
            <Category />
            <Products />
        </div>
        )
    }
    else{
        return(
            <div className='parent'>
                <NavBar />
                <Category />
                <Products />
            </div>
            )

    }
}

export default HomePage