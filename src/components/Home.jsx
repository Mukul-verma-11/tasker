import React from 'react'
import { useState,useEffect } from 'react'
import axios from'axios'



const Home = () => {
    const [data,setData] = useState([])

    useEffect(() => {
        axios.get('https://api.spoonacular.com/recipes/random?apiKey=8d9bae50f1b5421ea4a97f08d0d23f12')
            .then(res => setData(res.data.recipes[0].extendedIngredients))
    },[])

    const sort = () => {
        const sortArray = [...data]

        sortArray.sort((a, b) => a['name'].toLowerCase() > b['name'].toLowerCase())
        
        console.log(sortArray);
        // setData(sortArray)
        console.log(data);

    }

  return (
    <>
          
          <table>
            <thead>
                  <tr>
                      <th>Image</th>
                      <th>name</th>
                  </tr>
            </thead>
            <tbody>
                  {data.map((d, i) => 
                  <tr key={i} >
                      <td  ><img src={d.image} alt="" /></td>
                      <td onClick={sort} >{d.name}</td>
                  </tr> )}
            </tbody>
          </table>
    
    
    </>
  )
}

export default Home