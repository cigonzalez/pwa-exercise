import { useEffect, useState } from "react";
import { Card, CardColumns } from "react-bootstrap";

const Joke = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("data") === null) {
        setData("Loading...");
      } else {
        setData(JSON.parse(localStorage.getItem("data")));
      }
    }

    fetch(
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=23ff8988cbade81d9f4b9e25069f539a&hash=00de9a8f19b12510a7edb83b4a52d448"
    ).then((result) =>
      result.json().then((result) => {
        localStorage.setItem("data", JSON.stringify(result.data.results));
        setData(result.data.results);
      })
    );
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <CardColumns>
        {data.map((d) => {
          return (
            <Card>
              <Card.Img
                variant="top"
                src={`${d.thumbnail.path}.${d.thumbnail.extension}`}
              />
              <Card.Body>
                <Card.Title>{d.name}</Card.Title>
                <Card.Text>{`ID: ${d.id}`}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
};

export default Joke;
