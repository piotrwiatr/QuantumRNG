import React, {useState, createContext} from "react";

export const GeneratorContext = createContext();

export const GeneratorContextProvider = props => {
    const [generatorType, setGeneratorType] = useState("unsigned");
    return (
        <GeneratorContext.Provider value={{generatorType, setGeneratorType}}>
            {props.children}
        </GeneratorContext.Provider>
    );
};