# Code Explainer Application

## Overview
Code Explainer is a web application that helps users understand code snippets by analyzing their language and functionality using AI-powered explanations. The application features user authentication with token-based authorization.

## Technologies
- Frontend: Next.js
- Backend: Django
- Authentication: Token-based
- AI Integration: OpenAI ChatGPT API

## Prerequisites
- Python 3.10+
- Node.js 20+
- pip
- npm

## Project Structure
```
code-explainer/
│
├── backend/           # Django backend
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/          # Next.js frontend
    ├── package.json
    └── next.config.js
```

## Setup and Installation

### Backend Setup (Django)
1. Navigate to the backend directory
```bash
cd backend
```

2. Create a virtual environment
```bash
python -m venv venv
```

3. Activate the virtual environment
- On Windows:
```bash
venv\Scripts\activate
```
- On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies
```bash
pip install -r requirements.txt
```

5. Set up environment variables
Create a `.env` file in the backend directory with the following:
```
SECRET_KEY=your_django_secret_key
OPENAI_API_KEY=your_openai_api_key
DEBUG=True
```

6. Run database migrations
```bash
python manage.py migrate
```

7. Start the Django development server
```bash
python manage.py runserver
```

### Frontend Setup (Next.js)
1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with frontend environment variables
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server
```bash
npm run dev
```

## Authentication Flow
1. User registers with email and password
2. Backend generates a token
3. Token is stored in localStorage
4. Subsequent API requests include token in Authorization header

## Key Features
- User registration and login
- Code snippet submission
- AI-powered code explanation
- Support for multiple programming languages
- Secure token-based authentication

## Deployment Considerations
- Use environment variables for sensitive information
- Set `DEBUG=False` in production
- Configure CORS settings
- Use HTTPS
- Implement proper error handling

## Troubleshooting
- Ensure all dependencies are installed
- Check environment variable configurations
- Verify API keys and permissions

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## Notes for Developers
- Secure your OpenAI API key
- Implement rate limiting
- Add comprehensive error handling
- Consider caching AI responses

## Future Enhancements
- Support more programming languages
- Improve AI explanation quality
- Add code formatting and syntax highlighting
