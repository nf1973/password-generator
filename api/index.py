from flask import Flask
import string
import secrets

def generate_password(length):
    alphabet = string.ascii_letters + string.digits + "!$%&()+*#-_.,;"
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return {"password": password}


app = Flask(__name__)

@app.route('/api/getpassword', methods=['GET'])
def hello_world():
    return generate_password(24)


@app.route('/api/neil', methods=['GET'])
def hello_neil():
    return "Hello, Neil!"

if __name__ == '__main__':
    app.run(port=5328)