# api/utils.py
import openai
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.APIKEY)

def send_code_to_api(code):
    try:
        res = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an experienced developer who explains code concisely and accurately."},
                {"role": "user", "content": f"Analyze this code and explain what it does, what language it's written in, and any potential issues:\n\n{code}"},
            ],
        )
        return res.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API: {str(e)}")
        return f"Error: {str(e)}"