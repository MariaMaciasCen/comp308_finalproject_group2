import React, { useState, useEffect  } from "react";

const ProgressBar = (props) => {
    const { } = props;
    const [completeded, setCompleted] = useState(0);
    useEffect(() => {
        setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
      }, []);
      const [bgcolor, setColor] = useState(0);
      /*useEffect(() => {
        bgcolor:""
          //setInterval(() => setColor("#" +(Math.floor(Math.random()*16777215).toString(16))));
             }, []);*/
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completeded}%`,
        backgroundColor: bgcolor,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'blue',
        fontWeight: 'bold'
      }
    return (
        <div>
        <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles} >{`${completeded}%`}</span>
        </div>
        </div>
        <div style={containerStyles}>
            <div style={fillerStyles}backgroundColor={"#04695c"}>
        <span style={labelStyles} bgcolor={bgcolor}>completed={completeded}</span>  
        </div></div>
        <button onClick={() => {
              const randomColor = Math.floor(Math.random()*16777215).toString(16);
              //document.body.style.backgroundColor = "#" + randomColor;
              setColor("#" +randomColor)
            }}>Generate New Random Color</button>
  <       span id="color"></span>
        </div>
      
      
    );
  };
 
  export default ProgressBar;
  

