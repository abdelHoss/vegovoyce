from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage
import os
from emailTemplate import generate_template


def send_email(email, name, url):
    load_dotenv()
    email_sender = os.getenv("VEGOVOYCE_EMAIL")
    email_password = os.getenv("EMAIL_PASSWORD")
    print(email_sender)
    message = EmailMessage()
    message["Subject"] = "VegoVoyce eBook"
    message["From"] = email_sender
    message["To"] = email
    message.set_content(generate_template(name, url), subtype="html")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smpt:
        smpt.login(email_sender, email_password)
        smpt.send_message(message)
