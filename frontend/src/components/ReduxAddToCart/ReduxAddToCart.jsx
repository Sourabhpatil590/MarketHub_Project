// import { useContext } from 'react';
import './ReduxAddToCart.css'
// import { cartContext } from '../../context';
import { addToCart, deleteFromCart } from '../../reducers/cartReducers';
import { useSelector, useDispatch } from 'react-redux';

function ReduxAddToCart( {product}) {
// console.log( product)
    // let {cart, addToCart, deleteFromCart} = useContext(cartContext)
    let quantity = useSelector(state => state.cart.items[product.id]?.quantity | 0)
    let dispatch = useDispatch()

    function increment(){
        dispatch(addToCart(product))
    }

    function decrement(){
        dispatch(deleteFromCart(product))
    }
    if(quantity >= 1){
        return (
            <div>
                <div className='quantityBlock'>
                    <button className='decrementButton'onClick={decrement}> - </button>
                    <button className='quantity'> {quantity} </button>
                    <button className='incrementButton'onClick={increment}> + </button>
                </div>
                <p className='totalPrice'>Total price: ₹ {quantity*product.price}</p>
            </div>
        )
    }
    else{
        return(
            <div>
                <div className='quantityBlock'>
                    <button onClick={increment} className='addButton'> Add to cart </button>
                </div>
                <p className='totalPrice'> Total price: ₹ 0</p>
            </div>

        )
    }

}

export default ReduxAddToCart