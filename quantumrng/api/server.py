from flask import Flask, request
from flask_cors import CORS, cross_origin
import ast
from quantum import QuantumRandomNumberGenerator
import random

app = Flask(__name__)
# extra cors stuff for development testing
cors = CORS(app)

generator = QuantumRandomNumberGenerator()

@app.route('/api/v1/generateRandomNumber', methods=["POST"])
@cross_origin()
def generate_random_number():
    try:
        data = ast.literal_eval(request.data.decode("UTF-8"))

        lower_bound = int(data["lower_bound"])
    except Exception as e:
        return {"origin": "lower_bound", "error": "Invalid number"}, 400

    try:
        upper_bound = int(data["upper_bound"])
    except Exception as e:
        return {"origin": "upper_bound", "error": "Invalid number"}, 400
    
    try:
        isSigned = "signed" == data["generator_type"]
    except Exception as e:
        return {"origin": "lower_bound", "error": "temp error"}, 400

    return {
        "randomNumber": generator.generateQuantumRandomNumber(lower_bound, upper_bound, isSigned)
    }
    