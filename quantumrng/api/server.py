from flask import Flask, request
import random

app = Flask(__name__)

@app.route('/api/v1/generateRandomNumber')
def generate_random_number():
    lower_bound = request.args.get('lowerBound', default = 0, type = int)
    upper_bound = request.args.get('upperBound', default = 0, type = int)
    return {
        "randomNumber": random.randint(lower_bound, upper_bound)
    }