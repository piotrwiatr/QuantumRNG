import React, {useContext, useState} from 'react';
import { GeneratorContext } from '../context/GeneratorContext';
import backend from '../api/backend';
import { redirect } from 'react-router-dom';

const RandomNumberForm = () => {
    const {generatorType, setGeneratorType} = useContext(GeneratorContext);

    const [lowerBound, setLowerBound] = useState("");
    const [upperBound, setUpperBound] = useState("");

    const [randomNumber, setRandomNumber] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await backend.post("/", {
            generator_type: generatorType,
            lower_bound: lowerBound,
            upper_bound: upperBound
        });

        console.log(response);
    }

    return (
    <div className="generator-form">
        <form action="">
            <div class="form-group">
                <p className="label">Generate a:</p>
                <div className="centered">
                    <p onClick={() => setGeneratorType("unsigned")} className={generatorType === "unsigned" ? "generatorType active" : "generatorType"}>Unsigned Integer</p>
                    <p>or</p>
                    <p onClick={() => setGeneratorType("signed")} className={generatorType === "signed" ? "generatorType active" : "generatorType"}>Signed Integer</p>
                </div>
                {/* Generate a Unsigned Integer or Signed Integer */}
            </div>
            <div class="form-group">
                {/* text fields */}
            </div>
            <div class="form-group">
                {/* generate button*/}
            </div>
        </form>
        <div class="output">
            {/* output random number */}
        </div>
    </div>
    );
};

export default RandomNumberForm;