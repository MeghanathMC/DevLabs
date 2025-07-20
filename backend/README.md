# DevLabs Backend API

A comprehensive Node.js/Express backend API for the DevLabs platform - a developer portfolio aggregation system for showcasing hackathon projects and achievements.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with refresh tokens
- **User Management**: Profile management, settings, avatar upload
- **Project Management**: CRUD operations for hackathon projects
- **Achievement Tracking**: Certificate and achievement management
- **Portfolio Generation**: Dynamic portfolio creation with multiple templates
- **File Upload**: Secure file upload with Cloudinary integration
- **Analytics**: Portfolio performance tracking and insights
- **Email Notifications**: Automated email service for user engagement

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Joi
- **Testing**: Jest + Supertest
- **Security**: Helmet, CORS, Rate Limiting

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── app.ts           # Main application file
├── tests/               # Test files
├── uploads/             # Local file uploads (dev only)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── jest.config.js       # Jest configuration
├── .env.example         # Environment variables template
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MongoDB (local or cloud)
- Cloudinary account
- SMTP email service

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devlabs-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devlabs
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| GET | `/auth/verify` | Verify JWT token |

### User Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update user profile |
| POST | `/users/avatar` | Upload avatar |
| PUT | `/users/settings` | Update user settings |
| DELETE | `/users/account` | Delete account |

### Project Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get user projects |
| POST | `/projects` | Create new project |
| GET | `/projects/:id` | Get specific project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Achievement Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/achievements` | Get user achievements |
| POST | `/achievements` | Create new achievement |
| GET | `/achievements/:id` | Get specific achievement |
| PUT | `/achievements/:id` | Update achievement |
| DELETE | `/achievements/:id` | Delete achievement |

### Portfolio Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/portfolio/data` | Get portfolio data |
| PUT | `/portfolio/settings` | Update portfolio settings |
| GET | `/portfolio/public/:slug` | Get public portfolio |
| POST | `/portfolio/export` | Export portfolio as PDF |
| GET | `/portfolio/templates` | Get available templates |

### Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/dashboard` | Get dashboard statistics |

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run seed         # Seed database with sample data
```

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Use meaningful commit messages

### Database

The application uses MongoDB with Mongoose ODM. Models are defined in `src/models/`:

- **User**: User profiles, settings, and preferences
- **Project**: Hackathon projects with rich metadata
- **Achievement**: Certificates and achievements
- **Analytics**: Portfolio performance tracking

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `SMTP_HOST` | SMTP server host | Yes |
| `SMTP_USER` | SMTP username | Yes |
| `SMTP_PASS` | SMTP password | Yes |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints and database operations
- **E2E Tests**: Test complete user workflows

## 🔒 Security

### Implemented Security Measures

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable salt rounds
- **Input Validation**: Joi schema validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Proper cross-origin resource sharing
- **Helmet**: Security headers
- **File Upload Security**: File type and size validation

### Security Best Practices

- Use environment variables for sensitive data
- Implement proper error handling
- Validate all user inputs
- Use HTTPS in production
- Regular security audits

## 📊 Monitoring & Logging

### Logging

- Request logging with Morgan
- Error logging with stack traces
- Custom application logs

### Health Checks

```bash
GET /health
```

Returns server status and basic metrics.

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set up Cloudinary production credentials
4. Configure production SMTP settings
5. Set strong JWT secrets

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- Authentication and user management
- Project and achievement tracking
- Portfolio generation
- File upload system
- Email notifications 