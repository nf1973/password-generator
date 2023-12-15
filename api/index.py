from flask import Flask
app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"


@app.route('/api/neil', methods=['GET'])
def hello_neil():
    return "Hello, Neil!"

if __name__ == '__main__':
    app.run(port=5328)