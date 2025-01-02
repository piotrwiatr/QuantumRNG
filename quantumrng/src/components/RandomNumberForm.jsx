import React, {useContext, useState} from 'react';
import { GeneratorContext } from '../context/GeneratorContext';
import backend from '../api/backend';

const RandomNumberForm = () => {
    const {generatorType, setGeneratorType} = useContext(GeneratorContext);

    const [lowerBound, setLowerBound] = useState("");
    const [upperBound, setUpperBound] = useState("");

    const [lowerBoundError, setLowerBoundError] = useState("");
    const [upperBoundError, setUpperBoundError] = useState("");

    const [randomNumber, setRandomNumber] = useState(null);

    const handleLowerBoundChange = (value) => {
        setLowerBound(value);

        if (value === "") {
            setLowerBoundError("Field cannot be empty");
        } else {
            const numericValue = Number(value);
            const minima = generatorType === "unsigned" ? 0 : -(2**126);
            if (isNaN(numericValue) || numericValue < minima) {
                setLowerBoundError("Please enter a valid integer value");
            } else {
                setLowerBoundError("");
            }
        }
    };

    const handleUpperBoundChange = (value) => {
        setUpperBound(value);

        if (value === "") {
            setUpperBoundError("Field cannot be empty");
        } else {
            const numericValue = Number(value);
            const maxima = generatorType === "unsigned" ? (2**127) - 1 : (2**126) - 1;
            if (isNaN(numericValue) || numericValue > maxima) {
                setUpperBoundError("Please enter a valid integer value");
            } else {
                setUpperBoundError("");
            }
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (lowerBoundError === "" && upperBoundError === "") {
            try {
                const response = await backend.post("", {
                    generator_type: generatorType,
                    lower_bound: lowerBound,
                    upper_bound: upperBound
                });
        
                setRandomNumber(response.data.randomNumber);
            } catch (err) {
                console.log(err);
                // err.response

                if (err.response.data.origin === "lower_bound") {
                    setLowerBoundError(err.response.data.error);
                } else if (err.response.data.origin === "upper_bound") {
                    setUpperBoundError(err.response.data.error);
                }
            }
        }
    };

    return (
    <div className="generator-form">
        <form action="">
            <div className="form-group">
                <p className="label">Generate a:</p>
                <div className="centered">
                    <p onClick={() => {
                        setGeneratorType("unsigned");
                        handleLowerBoundChange("");
                        handleUpperBoundChange("");
                    }} className={generatorType === "unsigned" ? "generatorType active" : "generatorType"}>Unsigned Integer</p>
                    <p>or</p>
                    <p onClick={() => {
                        setGeneratorType("signed");
                        handleLowerBoundChange("");
                        handleUpperBoundChange("");
                    }} className={generatorType === "signed" ? "generatorType active" : "generatorType"}>Signed Integer</p>
                </div>
            </div>
            <div className="form-group">
                <p className="label">From:</p>
                <div className="centered">
                    <div className="text-field">
                        {lowerBoundError !== "" && <div className="error-text">{lowerBoundError}</div>}
                        <input type="number" id="lowerBound" value={lowerBound} onChange={(e) => handleLowerBoundChange(e.target.value)}/>
                        <span className="help-text">Min is {generatorType === "signed" ? "-2^126" : "0"}</span>
                    </div>
                    <p>to</p>
                    <div className="text-field">
                        {upperBoundError !== "" && <div className="error-text">{upperBoundError}</div>}
                        <input type="number" id="upperBound" value={upperBound} onChange={(e) => handleUpperBoundChange(e.target.value)}/>
                        <span className="help-text">Max is {generatorType === "signed" ? "2^126 - 1" : "2^127 - 1"}</span>
                    </div>
                </div>
            </div>
            <div className="form-group submit">
                <button className={!(lowerBoundError === "" && upperBoundError === "") ? "disabled-btn" : "generate-btn"} onClick={e => handleSubmit(e)} type="submit" id="generate-btn">Generate</button>
            </div>
        </form>
        <div className="output">
            <p className="output-text">{randomNumber ? randomNumber.toString() : ""}</p>
        </div>
    </div>
    );
};

export default RandomNumberForm;