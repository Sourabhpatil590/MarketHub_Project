import { Header, ProductCard, NavBar } from "../../components";
import './WishListPage.css'
import { useSelector } from "react-redux";

function WishListPage(){
    // let {cart} = useContext(cartContext);
    let wishlist = useSelector(state=> state.wishList.items)
    // console.log('wishlist', wishlist)
    let cartList = Object.values(wishlist)
    if(cartList.length >= 1){
        return (
            <div className='parent'>
                <div className="fixed">
                    <Header />
                    <NavBar />
                </div>

                {/* <Link to='/' > Home </Link> */}
                <div className="cartlist">
                    {
                    cartList?.map((item, index) => (
                        <ProductCard product={item} key={item.title + index}/>
                    ))
                    }
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='parent'>
                <Header />
                <NavBar />
                {/* <Link to='/' > Home </Link> */}
                <p className='noelements'> No elements in the wishlist </p>
            </div>
        )
    }

}

export default WishListPage