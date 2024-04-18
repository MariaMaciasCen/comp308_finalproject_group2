import React, { useState, useEffect  } from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    const [completeded, setCompleted] = useState(0);
    useEffect(() => {
        setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
      }, []);
    
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
        color: 'white',
        fontWeight: 'bold'
      }
    return (
        <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completeded}%`}</span>
        </div>
        <div style={fillerStyles}>
        <span bgcolor={"#00695c"}>completed={completeded}</span>  
        </div>
        
      </div>
      
    );
  };
 
  export default ProgressBar;

