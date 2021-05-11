import { useEffect, useState } from "react";

const Joke = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("data") === null) {
        setData("Loading...");
      } else {
        setData(localStorage.getItem("data"));
      }
    }

    fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=23ff8988cbade81d9f4b9e25069f539a&hash=00de9a8f19b12510a7edb83b4a52d448"
    ).then((result) =>
      result.json().then((result) => {
        localStorage.setItem("data", result.data.results);
        console.log(result.data.results);
        setData(result.data.results);
      })
    );
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Characters</h1>
      {data.forEach((d) => {
        <div>
          <p>1</p>
          <p>{d.id}</p>
          <p>{d.name}</p>
          <img src={d.image} />
        </div>;
      })}
    </div>
  );
};

export default Joke;
