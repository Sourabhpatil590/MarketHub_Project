import { useDispatch, useSelector } from "react-redux";
import { addToWishList, deleteFromWishList } from "../../reducers/wishListReducer";
import './AddToWishList.css'

function WishList({product}){
    const dispatch = useDispatch()
    // const [addedToWishList, setWishList] = useState(false)
    let wishlist = useSelector(state => state.wishList.items)

    function addtowishList(){
        dispatch(addToWishList(product))

    }

    function removefromwishlist(){
        dispatch(deleteFromWishList(product))
 
    }
    if(wishlist[product.id]){
        return(
            <div className="addtowishlist">
                <button onClick={removefromwishlist}>Remove from Wishlist</button>
            </div>
        )
    }
    else{
        return (
            <div className="addtowishlist">
                <button onClick={addtowishList}>Add to Wishlist</button>
            </div>
        )
    }


}

export default WishList