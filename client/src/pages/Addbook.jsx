import React from 'react'
import { useState } from 'react'
import "../styles/formdata.css"
import api from "../api/config"

const Addbook = () => {
    const [formData, setFormData] = useState({})
    const [image, setImage] = useState()
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const addBook = async (e) => {
        e.preventDefault()

        const response = await api.post("/book/add", {
            ...formData, image:image
        },{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        } )
        
        //didnot work using fetch, dont know why!!
        // const response =  await fetch("http://localhost:8000/book/add", {
        //     method:"POST",
        //     headers:{
                // "Content-Type":"multipart/form-data"
        //     },
        //     body:{
        //         ...formData, image:image
        //     }
        // })
        console.log(response);
    }
  return (
    <div style={{display:"flex", justifyContent:"center", color:"green", fontSize:"20px"}}>
        <form style={{display:"flex", flexDirection:"column"}} onSubmit={addBook}>
            name: 
            <input type="text" name='name' onChange={handleChange}/>
            author:
            <input type="text" name='author'onChange={handleChange}/>
            genre:
            <input type="text" name='genre' onChange={handleChange}/>
            description:
            <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}/>
            filename:
            <input type="file" name='image' onChange={(e)=>{setImage(e.target.files[0])}}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Addbook