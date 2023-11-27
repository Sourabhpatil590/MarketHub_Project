import { useContext } from 'react';
import { categoryContext } from '../../context'; 
import './Category.css'

function Category(){

    let { categories, setCategory} = useContext(categoryContext)

    function setProductCategory(event){
        event.preventDefault();
        setCategory(event.target.value)
    }

    return(
        <div className='category'>
            <label className='label'> Choose a Category </label>
            <select onChange={setProductCategory} name="category">
                <option value='all'>all </option>
                {
                    categories?.current.value.map((item, index) => (<option value={item} key={item+index}>{item} </option>))
                }
            </select>
        </div>

    )
}

export default Category;