# ecommerce-app
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# User database (in production, you would store this data securely in a database)
users = [
    {
        'id': 1,
        'username': 'user1',
        'password': generate_password_hash('password1'),
        'email': 'user1@email.com'
    },
    {
        'id': 2,
        'username': 'user2',
        'password': generate_password_hash('password2'),
        'email': 'user2@email.com'
    }
]

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    
    # Check if user exists and password matches
    user = next((user for user in users if user['username'] == auth.username), None)
    if not user or not check_password_hash(user['password'], auth.password):
        return jsonify({'message': 'Invalid username or password'}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'user_id': user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, app.config['SECRET_KEY'])
    
    return jsonify({'token': token.decode('UTF-8')})

# Protected endpoint
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization').split(' ')[1]
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'])
        return jsonify({'user_id': data['user_id']})
    except:
        return jsonify({'message': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run()
