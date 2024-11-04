import openai
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
openai.api_key = "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"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/login'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    password = db.Column(db.String(100))

    def _init_(self, fname, body):
        self.name = fname
        self.password = body

class AuthSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'password')

article_schema = AuthSchema()
articles_schema = AuthSchema(many=True)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    return response

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']
    payload = {
        'messages': [{'role': 'user', 'content': message}]
    }
    completions = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    reso = completions.choices[0].text.strip()
    return jsonify({'res': reso})

@app.route('/login', methods=['POST'])
def login():
    email = request.json['name']
    password = request.json['password']
    
    article = Auth.query.filter_by(name=email, password=password).first()
    if article:
        return jsonify({'status': 'success', 'id': article.id, 'name': article.name})
    else:
        return jsonify({'status': 'refuse'})


if __name__ == "__main__":
    app.run(host='192.168.1.102', port=3000, debug=True)