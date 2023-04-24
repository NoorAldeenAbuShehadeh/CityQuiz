import "./App.css";
import { useState } from "react";

//--------------------------------------------------------------------------------
const submitForm=(answer)=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === "istanbul") {
        resolve();
      } else {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      }
    }, 1500);
  });
}

//-----------------------------------------------------------------------------------

const App=()=> {

  const [city, setCity] = useState("");
  const [btn, setBtn] = useState(false);
  const [txtArea, setTxtArea] = useState(true);
  const [Message, setMessage] = useState("initial");
//---------------------------------------------------------------------------------
  const handleTextareaChange = (e) => {
    setCity(e.target.value);
    if (e.target.value === "") {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };
//---------------------------------------------------------------------------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setBtn(false);
    setTxtArea(false);
    setMessage("loading");
    try {
      await submitForm(city);
      setMessage("success");
    } catch (err) {
      setMessage("error");
    } finally {
      setBtn(true);
      setTxtArea(true);
    }
  };
//---------------------------------------------------------------------------------
  if (Message === "success") {
    return <h1 id="success">That's right!</h1>;
  }
  
  return (
    <>
      <h2>City quiz</h2>
      <p>What city is located on two continents?</p>
      <textarea
        id="textarea"
        value={city}
        disabled={!txtArea}
        onChange={handleTextareaChange}
      ></textarea>
      <br />
      <button id="button" disabled={!btn} onClick={handleFormSubmit}>
        Submit
      </button>
      {Message === "loading" && <p id="loading">Loading...</p>}
      {Message === "error" && (
        <p id="error" style={{ color: "red" }}>
          Good guess but a wrong answer. Try again!
        </p>
      )}
    </>
  );
}

export default App;
