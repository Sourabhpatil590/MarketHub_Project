import ProductCard from '../ProductCard/ProductCard'
import './Products.css'

import { productsContext, categoryContext } from '../../context'
import { useContext } from 'react'


function Products(){
    let {productsList} = useContext(productsContext)
    let {selectedCategory} = useContext(categoryContext)
    return (
        <div className='list'>
            { productsList.filter(item => {
                    // console.log('item in products:', item.category)
                    // console.log('item category', item.category, 'selected category:', category)
                    if(selectedCategory === 'all'){return true}
                    else{
                        return selectedCategory === item.category
                    }
                    } )
                .map((item, index) => (<ProductCard 
                    product={item}
                    key={item.title + index}/>)) }
        </div>
    )}
export default Products