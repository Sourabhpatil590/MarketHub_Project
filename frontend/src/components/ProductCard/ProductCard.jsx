import './ProductCard.css';
// import AddToCart from '../AddToCart/AddToCart';
import ReduxAddToCart from '../ReduxAddToCart/ReduxAddToCart'
import AddToWishList from '../AddToWishList/AddToWishList'

function ProductCard({product}){
    console.log('productCard ', product.id)
    return (
        <div className='productCard'>
            <img src={product.images[0]} alt='' className='productImage'></img>
            <h4 className='title'> {product.title}</h4>
            <h4 className='price'> Price: {product.price}</h4>
            <ReduxAddToCart product = {product} />
            <AddToWishList product = {product}/>
        </div>
    ) 
}

export default ProductCard