# Docker Compose Application: NestJS + React + PostgreSQL

This is a full-stack application using Docker Compose to orchestrate:
- **Backend**: NestJS API server
- **Frontend**: React application
- **Database**: PostgreSQL

## Architecture

The application uses Docker Compose to create an internal network where:
- React frontend communicates with NestJS backend through Docker's internal network
- NestJS backend connects to PostgreSQL database
- All services are containerized and can communicate using service names

## Prerequisites

- Docker Desktop installed
- Docker Compose installed (comes with Docker Desktop)

## Project Structure

```
.
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml       # Production docker compose
└── docker-compose.dev.yml   # Development docker compose with hot reload

```

## Quick Start

### Development Mode (with hot reload)

1. Start all services:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - PostgreSQL: localhost:5432

3. Stop all services:
```bash
docker-compose -f docker-compose.dev.yml down
```

### Production Mode

1. Build and start all services:
```bash
docker-compose up --build
```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

3. Stop all services:
```bash
docker-compose down
```

## API Endpoints

### Backend (NestJS)

- `GET /` - Returns hello world message with timestamp
- `GET /health` - Health check endpoint

## Database

- **Host**: postgres (internal) / localhost:5432 (external)
- **Database**: nestapp
- **Username**: postgres
- **Password**: postgres

## Docker Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild specific service
```bash
docker-compose up --build backend
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

### Access container shell
```bash
docker exec -it nestjs_backend sh
docker exec -it react_frontend sh
docker exec -it postgres_db psql -U postgres
```

## Environment Variables

### Backend
- `PORT`: API server port (default: 3001)
- `DB_HOST`: PostgreSQL host (default: postgres)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: nestapp)

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: http://backend:3001)

## Troubleshooting

### Port already in use
If you get a port conflict error, either:
1. Stop the service using that port
2. Or change the port in docker-compose.yml

### Database connection issues
Make sure the postgres service is healthy before the backend starts:
```bash
docker-compose ps
```

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Features

- ✅ NestJS backend with TypeORM and PostgreSQL
- ✅ React frontend with Axios for API calls
- ✅ Docker Compose orchestration
- ✅ Internal Docker network communication
- ✅ Hot reload in development mode
- ✅ Production-ready Dockerfiles
- ✅ Nginx for serving React in production
- ✅ Health checks for services
- ✅ Automatic database connection retry

## License

MIT