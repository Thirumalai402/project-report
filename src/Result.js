import React from "react";
function Result({secretNumber, term}) 
{
    let guessnumber;
    if(term){
    if(term>secretNumber)
    {
        guessnumber="higher"
    }
    else if(term<secretNumber){
        guessnumber="lower"
    }
    else if(term==secretNumber){
        guessnumber="yupppp you got it right"
    }
    else{
    guessnumber="please enter a valid number"
    }
}

    return <h4>Your Guessed value: {guessnumber}</h4>
}
export default Result;