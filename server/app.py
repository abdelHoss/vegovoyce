from flask import Flask, request, render_template, flash, url_for
from flask_cors import CORS
# from validate_email import validate_email
from pyisemail import is_email
from emailSender import send_email
from tokenManager import generate_token, confirm_token
from jsonModel import email_stored, add_email
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app)
load_dotenv()
app.secret_key = os.getenv("TOKEN_SECRET_KEY")
app.config['SESSION_TYPE'] = 'filesystem'


@app.route("/verify/email", methods=["POST"])
def verify_email():
    value = request.json
    email = value["email"]
    name = value["name"] if value["name"] else email.split("@")[0]
    email_valid = is_email(email, check_dns=True)
    if email_valid:
        token = generate_token(email)
        confirm_url = url_for("confirm_email", token=token, _external=True)
        print(confirm_url)
        # send_email(email, name, confirm_url)
    return str(email_valid)


@app.route("/confirm/email/<token>", methods=["GET"])
def confirm_email(token):
    email = confirm_token(token)
    if email:
        is_email_stored = email_stored(email)
        if not is_email_stored:
            add_email(email)
            return render_template("download.html")
        else:
            return render_template("link_error.html", registered=True)

    else:
        return render_template("link_error.html", registered=False)
    

       





@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html")
