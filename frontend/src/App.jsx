// import logo from '../logo.svg';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import {cartContext, categoryContext, productsContext} from './context';
import { HomePage, CartPage, NotFound, WishListPage } from './pages';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

function App() {
  console.log('App called')
  let [productsList, setProducts] = useState([]);
  let [selectedCategory, setCategory] = useState('all')
  let [loading, setLoading] = useState(true);
  let [cart, setCart] = useState({});
  
  let categories = useRef([]);

  // API call for Categories
  // function setProductCatagory(input){
  //   catagory = setCatagory(input)
  //   console.log('selected catagory', catagory)
  // }
  // mapping interface
  // function mappingInterface(res){
  //   let newResponse = res.map(item => {
  //     let {catagory, description, id, images, price, title } = item;
  //     return {catagory, description, id, images, price, title }
  //   } )
  //   return newResponse;
  // }

  // API call for product catagories to backend
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(cat => {
        categories.current.value = cat;
        console.log('API called for catagories', categories)
      })
  }, [])

  // API call for product list
  useEffect(()=> {
    // fetch('https://fakestoreapi.com/products')
    // fetch('https://api.escuelajs.co/api/v1/products')
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then(json=>{
      setProducts(json.products);
      setLoading(false);
      console.log('API called for product list', productsList)
    })}, [])

// Function Add item to the cart
  function addToCart(product){
    console.log('added to cart', product.id)
    let newCart = {...cart};
    if(newCart[product.id]){
    newCart[product.id].quantity += 1
    }
    else{
    newCart[product.id] = {
        id : product.id,
        images : product.images,
        price : product.price,
        title : product.title,
        quantity : 1
    }}
    setCart(newCart)
  }

// Function Delete item from cart
  function deleteFromCart(product){
    
    let newCart = {...cart};
    if(newCart[product.id]){
      newCart[product.id].quantity -= 1
      console.log('reduced the quantity', product.id)
      if(newCart[product.id].quantity <= 0){
        delete newCart[product.id]
        console.log('deleted from cart', product.id)
      }
      
    }
    setCart(newCart)
    }

  if(loading){
    return (
      <div >
        <iframe src="https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm" width="100%" height="100%" allowFullScreen title='loadingIcon'>loading</iframe>
      </div>
    )
  }
  else{
      return (
        <productsContext.Provider value={{productsList}}>
          <categoryContext.Provider value = {{categories, selectedCategory, setCategory}}>
            <cartContext.Provider value={{cart, addToCart, deleteFromCart}}>
                <BrowserRouter>
                  <Routes>
                    <Route exact={true} path='/' element={<HomePage />}/>
                    <Route exact={true} path='/cart' element={<CartPage/>}/>
                    <Route exact={true} path='/wishlist' element={<WishListPage/>}/>
                    <Route element={<NotFound/>} />
                  </Routes>
                </BrowserRouter>
            </cartContext.Provider>
          </categoryContext.Provider>
        </productsContext.Provider>
      );
    }
  }
export default App;
