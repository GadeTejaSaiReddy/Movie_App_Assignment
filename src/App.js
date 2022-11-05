import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import './App.css';

function App() {
  let [arr, setarr] = useState(null)

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://fake-movie-database-api.herokuapp.com/api?s=batman")
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(response => setarr(response.Search))
  }, [])
  const [name, setname] = useState("");
  const [favouritelen,setfavouritelen]=useState("")
  if (arr) {
    let searchedarr = [];
    let totalmoviesname = [];
    let dumarr = []
    arr.map(element => {
      dumarr.push(element.Title, element.Poster);
      totalmoviesname.push(dumarr);
      dumarr = []
    });
    // console.log(totalmoviesname)
    if (name !== "") {
      for (let i = 0; i < totalmoviesname.length; i++) {
        if ((totalmoviesname[i][0]).toUpperCase().includes(name.toUpperCase())) {
          searchedarr.push(totalmoviesname[i])
        }
      }
    }
    // console.log(searchedarr)
    // console.log(arr);
    // console.log(arr.length);
    const filter = (e) => {
      setname(e.target.value)
    }
    let favouritearr = [];
    let dumarr2 = [];
    const addtofavourite = (e) => {
      const src = e.target.parentNode.parentNode.parentNode.firstChild.firstChild.src
      // console.log(e.target.parentNode.parentNode.parentNode.firstChild.firstChild.src);
      //console.log(src)
      arr.map((element) => {
        // console.log(src===element.Poster)
        if (src === element.Poster) {
          dumarr2.push(element.Title, element.Poster);
          //setfavouritelen(dumarr2)
          favouritearr.push(dumarr2);
          dumarr2 = []
        }
        //console.log(favouritearr);
        setfavouritelen(favouritearr)
      })
   
    }
   // console.log(favouritelen)


    return (
      <div className="main-container">
         <div className="heading-part">
            <div className="movies-list">Movies</div>
            <input id="search-movie" placeholder="search movie" onChange={filter}></input>
         </div>
        {
          (name === "") &&
          <div className="display">{arr.map((element) =>
              <div className="image-name">
                  <div>
                     <img className="poster" src={element.Poster} alt={element.Title}></img>
                     <div className="title">{element.Title}</div>
                  </div>
                  <div className="hovering-part">
                      <div className="hovering-part-child1">Add to favourites</div>
                      <div><img onClick={addtofavourite} src="data:image/png;base64,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" alt="favourite"></img></div>
                  </div>
              </div>)}
          </div> 
        }

        {
          (name !== "") &&
          <div className="display">{searchedarr.map((element) => <div className="image-name"> <img className="poster" src={element[1]} alt={element[0]}></img>
            <div>{element[0]}</div></div>)}</div>
        }
        {/* second favourite part  */}
         <div className="favourite-part">
          <div className="favourite-heading">Favourites</div>
          {
            (favouritelen.length>0) &&
            <div className="display">{favouritelen.map((element) => <div className="image-name"> <img className="poster" src={element[1]} alt={element[0]}></img>
            <div>{element[0]}</div></div>)}</div>
          }  
         </div>
      </div>)
  }

}

export default App;
