from . import db

class Admin(db.Model):
    user_name = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.Integer, nullable=False)
    