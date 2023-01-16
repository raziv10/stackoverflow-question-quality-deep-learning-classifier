import React from 'react';
import logo from './stackoverflow.png';
import github from './github.png';
import { Box, Typography } from '@material-ui/core';

const Landing = () =>{
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box py={4}></Box>
            <Box mx={"auto"} px={2} style={{maxWidth: "800px"}}>
                <h1 style={{color: "#222426"}}>Is it possible to predict the quality of a question on Stack Overflow?</h1>
                <Typography align="left">
                <p>For our final project in AML 2404 AI and ML Labat Lambton College, we have attempted to answer this question using different machine learning methods. 
                We did not find a definitive answer in the end, although by using 45k previously asked questions on stackoverflow.com, we have trained a model that might shed some 
                light on the characteristics of a high quality question, and that of a low quality and unfocused question.</p>
                <p>In the header you can find links to a general demonstration of the k-Nearest Neighbors algorithm, as well as a live demonstration of question quality prediction using a Recurrent Neural Network with Long Short-Term Memory.
                The demonstration of predicting question quality is created by implementing a model and saving it on a pickle file, sending requests to the model through Flask and displaying on the Front End web app.
                    The k-Nearest Neighbors-demonstration is created using d3 to manipulate an SVG-canvas. <br/></p>
                </Typography>
                <p><strong> The k-Nearest Neighbors demonstration is best viewed on desktop.</strong></p>
            </Box>
            <Box mx={"auto"}>
                <img src={logo} alt="Stack Overflow logo" style={{height: "40vh"}} />
            </Box>
            <Box py={4} mx={"auto"} style={{backgroundColor: "#BCBBBB"}} width={"100%"}>
                <h3>Rajiv Luitel</h3>
                <br/>
                <a href="https://github.com/raziv10/stackoverflow-question-quality-deep-learning-classifier" style={{border: "none", textDecoration: "none"}}><img src={github} alt="Github logo" style={{height: "5rem"}} /></a>
            </Box>
        </Box>
    )
};

export default Landing;
