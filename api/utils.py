import openai
from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key = settings.APIKEY)


def send_code_to_api(code):
    res = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are an experienced developer."},
            {"role": "user", "content": f"Tell me what language is this code written? {code}"},
        ],
    )
    return res.choices[0].message.content