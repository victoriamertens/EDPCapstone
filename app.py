from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model from disk
with open('salary_predict.pkl', 'rb') as file:
    model = pickle.load(file)

print(type(model))
@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the request data
    data = request.get_json(force=True)
    role = data['role']
    location = data['location']
    input_df = pd.DataFrame({'role': [role], 'location': [location]})

     # Ensure the data is a list (even if it's just one dictionary)
    #if isinstance(data, dict):
    #    data = [data]

    # Make a prediction
    prediction = model.predict(input_df)

    # Return the prediction
    return jsonify({'predicted_salary': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000)