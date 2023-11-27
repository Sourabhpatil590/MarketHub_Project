import { useEffect, useState } from "react"

function useWindowSize(){

    let [sizeState, setSize]= useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    function resize(){
        let size = {width: window.innerWidth, height:window.innerHeight};
        setSize(size)
    }

    useEffect(()=>{
        window.addEventListener('resize', resize)
    },[])

    return sizeState
}

export default useWindowSize;