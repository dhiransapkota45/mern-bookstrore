import React, { useEffect } from "react";
import { useState } from "react";
import api from "../api/config";
import "../styles/homepage.css";

const Homepage = () => {
  const [searchData, setSearchData] = useState("");

  const [bookData, setBookData] = useState([]);
  const [tempBookData, setTempBookData] = useState([])
  useEffect(() => {
    const fetcher = async () => {
      const unfilteredData = await api.get("/book");
      setBookData(unfilteredData.data.foundBooks);
      setTempBookData(unfilteredData.data.foundBooks)
    };

    fetcher();
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      console.log("hello");
      const response = await api.get(`/book/search?query=${searchData}`);
      if(response.data.searchResult){
        console.log(response.data.searchResult);
        setBookData(response.data.searchResult)
      }
    };
    if(searchData){
        fetcher();
    }else{
      setBookData(tempBookData)
    }
  }, [searchData]);
  return (
    <>
      <div className="searchdiv">
        <input
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          type="text"
          placeholder="search books here..."
          className="search"
        />
      </div>
      <div className="homepage">
        {bookData.map((bookitem, index) => {
          return (
            <div key={index} className="card">
              <img src={bookitem.image} alt={`image of ${bookitem.name}`} />
              <div> Name: {bookitem.name}</div>

              <div> author: {bookitem.author}</div>

              <div> genre: {bookitem.genre}</div>

              <div> description: {bookitem.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Homepage;
