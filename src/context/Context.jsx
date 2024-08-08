import def from "ajv/dist/vocabularies/applicator/additionalItems";
import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context =  createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("");  //used to send the input data
    const [recentPrompt, setRecentPrompt] = useState("");     // when we click on send button input data saved in recentPrompt and display it in main component
    const  [prevPrompt, setPrevPrompt] = useState([]);    // to store all the input history and display in recent tab
    const [showResult, setShowResult] = useState(false);    // its a boolean value whwn it is true it will hide the greet and cards anda display the result
    const [loading, setLoading] = useState(false);   // whenn it is true it will display loading animation
    const [resultData, setResultData] = useState("");   // to display the result in our webpage

    

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }


    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }


    const onSent = async(prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev, input]);
            setRecentPrompt(input);
            response  = await run(input);
        }        
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0; i < responseArray.length; i++){
            if(i === 0 || i % 2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArary = newResponse2.split(" ");
        for(let i = 0; i < newResponseArary.length; i++){
            const nextWord = newResponseArary[i];
            delayPara(i, nextWord+" ")
        }
        setLoading(false);
        setInput("");
    }


   


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
       
    }
    return (
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;