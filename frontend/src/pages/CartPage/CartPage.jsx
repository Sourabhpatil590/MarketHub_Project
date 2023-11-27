// import { useContext } from "react"
// import { cartContext } from "../context"
import { Header, ProductCard, NavBar } from "../../components";
import './CartPage.css'
import { useSelector } from "react-redux";

function CartPage(){
    // let {cart} = useContext(cartContext);
    let cart = useSelector(state=> state.cart.items)
    // console.log('cart', cart)
    let cartList = Object.values(cart)
    if(cartList.length >= 1){
        return (
            <div className='parent'>
                <div className='fixed'>
                    <Header />
                    <NavBar />
                </div>
                
                {/* <Link to='/' >Home</Link> */}
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
                <p className="noelements"> No elements in the cart </p>
            </div>

        )
    }

}
export default CartPage