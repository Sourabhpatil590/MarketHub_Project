import { useContext } from 'react';
import './AddToCart.css'
import { cartContext } from '../../context';

function AddToCart( {product}) {
// console.log( product)
    let {cart, addToCart, deleteFromCart} = useContext(cartContext)
    let quantity;
    function increment(){
        addToCart(product)
    }

    function decrement(){
        deleteFromCart(product)
    }
    if(cart[product.id]){
        quantity = cart[product.id].quantity
        return (
            <div>
                <div className='quantityBlock'>
                    <button className='incrementButton'onClick={decrement}> - </button>
                    <button className='quantity'> {quantity} </button>
                    <button className='decrementButton'onClick={increment}> + </button>
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

export default AddToCart