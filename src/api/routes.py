"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
def get_user():
    users = User.query.all()
    user_info = [user.serialize() for user in users]

    return jsonify(user_info), 200


@api.route('/register', methods=["POST"])
def register_user():
    data = request.get_json()

    email = request.json.get('email')
    password = request.json.get('password')


    if not email or  not password:
        return jsonify({"msg" :  "missing data"}), 400
    
    
    exist = User.query.filter_by(email=data["email"]).first()

    if exist:
        return jsonify({'msg': 'User already exists'}), 400
    
    new_user = User(email=data["email"], password=data["password"], is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg' : 'Usuario creado exitosamente'}), 200

@api.route('/login', methods=["POST"])
def login_user():

    data = request.get_json()

    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user is None:
        return jsonify({'msg': "password or email incorrect"}), 400

    access_token = create_access_token(identity=str(user.id))

    return jsonify({'token': access_token, 'user' : user.serialize()}), 200
    


# @api.route('/token', methods=['POST'])
# def create_token():
#     email_request = request.json.get('email', None)
#     password_request = request.json.get('password', None)

#     user = User.query.filter_by(email=email_request, password=password_request).first()

#     if user is None:
#         return jsonify({'msg' : 'Bad email or password'}), 401

#     access_token = create_access_token(identity=str(user.id))

#     return jsonify({'token': access_token, 'user' : user.serialize()})


@api.route('/private', methods=['GET'])
@jwt_required()
def verify():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({'id': user.id, 'email': user.email}), 200