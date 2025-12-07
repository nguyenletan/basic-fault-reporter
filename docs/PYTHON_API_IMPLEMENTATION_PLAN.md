# Python (FastAPI) Implementation Plan for Fault Reporter

**Project Name:** fault-reporter-api
**Framework:** FastAPI 0.115+
**Database:** PostgreSQL (DigitalOcean)
**Authentication:** Firebase Authentication
**Architecture:** Clean Architecture with Repository Pattern
**API Style:** RESTful API with Auto-generated OpenAPI documentation
**Hosting:** Railway.app / Render.com (Free tier options)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Why Python + FastAPI?](#why-python--fastapi)
3. [Architecture & Design Principles](#architecture--design-principles)
4. [Project Structure](#project-structure)
5. [Naming Conventions](#naming-conventions)
6. [Database Schema Design](#database-schema-design)
7. [API Endpoints Specification](#api-endpoints-specification)
8. [Implementation Phases](#implementation-phases)
9. [Technology Stack](#technology-stack)
10. [Configuration & Environment](#configuration--environment)
11. [Security Considerations](#security-considerations)
12. [Testing Strategy](#testing-strategy)
13. [Deployment Options](#deployment-options)

---

## Project Overview

### Purpose

Build a developer-friendly, rapidly deployable RESTful API using Python and FastAPI to support the Fault Reporter mobile application, with excellent support for AI/ML integration.

### Key Features

- ✅ Fast development with Python's simplicity
- ✅ Equipment management (CRUD operations)
- ✅ Location tracking and navigation
- ✅ Alert/Work order management
- ✅ **Native AI fault detection integration** (OpenAI, Gemini, Grok)
- ✅ Real-time IoT data monitoring
- ✅ User authentication via Firebase
- ✅ Asset reliability analytics
- ✅ Auto-generated interactive API documentation

### Non-Functional Requirements

- **Development Speed:** Fastest time-to-market among all options
- **Performance:** Response time < 300ms for 95% of requests (acceptable for mobile)
- **Scalability:** Support 1000+ concurrent users
- **Availability:** 99.5% uptime
- **AI/ML Ready:** Seamless integration with ML libraries
- **Documentation:** Auto-generated, always up-to-date

---

## Why Python + FastAPI?

### Python Advantages

**Development Speed:**

- 🚀 **Fastest development** - 2-3x faster than .NET, 5x faster than Rust
- 🚀 **Minimal boilerplate** - Clean, readable code
- 🚀 **Huge ecosystem** - 400,000+ packages on PyPI
- 🚀 **Easy debugging** - Dynamic typing speeds up prototyping

**AI/ML Excellence:**

- 🤖 **Best ML ecosystem** - TensorFlow, PyTorch, scikit-learn
- 🤖 **Native AI integration** - Direct API calls to OpenAI, Gemini, etc.
- 🤖 **Data processing** - pandas, NumPy for analytics
- 🤖 **Computer vision** - OpenCV, Pillow for image analysis
- 🤖 **Perfect for fault detection** - Your AI feature is core to the app!

**Developer Friendly:**

- 📖 **Easy to learn** - Readable, intuitive syntax
- 📖 **Rapid prototyping** - Test ideas quickly
- 📖 **Great tooling** - VS Code, PyCharm, Jupyter
- 📖 **Massive community** - Stack Overflow, tutorials

**Database Support:**

- 🗄️ **Excellent PostgreSQL** - SQLAlchemy is mature and powerful
- 🗄️ **Async support** - asyncpg for high-performance queries
- 🗄️ **ORM flexibility** - SQLAlchemy or raw SQL
- 🗄️ **Migration tools** - Alembic for schema changes

### FastAPI Advantages

**Why FastAPI is Perfect:**

1. **Modern Python Framework**

   ```python
   # Incredibly clean and readable
   @app.get("/equipment/{equipment_id}")
   async def get_equipment(equipment_id: UUID) -> EquipmentResponse:
       equipment = await equipment_service.get_by_id(equipment_id)
       return equipment
   # That's it! Type hints, validation, docs - all automatic!
   ```

2. **Auto-Generated Documentation**
   - ✅ **Swagger UI** at `/docs` - Interactive API testing
   - ✅ **ReDoc** at `/redoc` - Beautiful API documentation
   - ✅ **OpenAPI 3.0** - Industry standard
   - ✅ **Always in sync** - Docs generated from code

3. **Type Safety with Pydantic**

   ```python
   from pydantic import BaseModel, EmailStr, constr

   class CreateEquipmentRequest(BaseModel):
       equipment_code: constr(min_length=1, max_length=50)
       equipment_name: constr(min_length=1, max_length=200)
       manufacturer: Optional[str] = None

       class Config:
           json_schema_extra = {
               "example": {
                   "equipment_code": "EQ-001",
                   "equipment_name": "Chiller Unit"
               }
           }
   # Automatic validation, serialization, and example generation!
   ```

4. **Async/Await Support**

   ```python
   # Built on Starlette - same async foundation as Node.js
   async def get_equipment(equipment_id: UUID):
       # Non-blocking I/O for database, HTTP calls
       equipment = await db.fetch_one(query)
       iot_data = await external_api.get_iot_data(equipment_id)
       return {"equipment": equipment, "iot_data": iot_data}
   ```

5. **Dependency Injection**

   ```python
   # Clean, testable dependency injection
   @app.get("/equipment/{equipment_id}")
   async def get_equipment(
       equipment_id: UUID,
       service: EquipmentService = Depends(get_equipment_service),
       user: User = Depends(get_current_user)
   ):
       return await service.get_by_id(equipment_id, user)
   ```

6. **Performance**
   - ⚡ **One of the fastest Python frameworks** (comparable to Node.js)
   - ⚡ **Async I/O** - Handle thousands of concurrent connections
   - ⚡ **Faster than Flask/Django** - 2-3x performance improvement
   - ⚡ **Production ready** - Used by Microsoft, Netflix, Uber

### Comparison with Other Python Frameworks

| Feature            | FastAPI      | Flask       | Django        | Django REST Framework |
| ------------------ | ------------ | ----------- | ------------- | --------------------- |
| **Performance**    | ⚡⚡⚡⚡⚡   | ⚡⚡⚡      | ⚡⚡          | ⚡⚡⚡                |
| **Async Support**  | ✅ Native    | ⚠️ Limited  | ⚠️ Limited    | ⚠️ Limited            |
| **Type Hints**     | ✅ Required  | ❌ No       | ❌ No         | ⚠️ Optional           |
| **Auto Docs**      | ✅ Built-in  | ❌ No       | ❌ No         | ✅ Manual             |
| **Validation**     | ✅ Automatic | ❌ Manual   | ⚠️ Forms      | ⚠️ Serializers        |
| **Learning Curve** | 🟢 Easy      | 🟢 Easy     | 🔴 Steep      | 🟡 Moderate           |
| **API-First**      | ✅ Yes       | ⚠️ Flexible | ❌ Full-stack | ✅ Yes                |
| **Modern**         | 🆕 2018      | 📅 2010     | 📅 2005       | 📅 2011               |

**FastAPI is the clear winner for modern REST APIs.**

---

## Architecture & Design Principles

### Clean Architecture in Python

```
┌─────────────────────────────────────────────┐
│      API Layer (Routers/Endpoints)          │  ← FastAPI routes, Pydantic models
├─────────────────────────────────────────────┤
│      Application Layer (Services)           │  ← Business logic, orchestration
├─────────────────────────────────────────────┤
│      Infrastructure Layer (Repositories)    │  ← SQLAlchemy, external APIs
├─────────────────────────────────────────────┤
│      Domain Layer (Models/Schemas)          │  ← Core business entities
└─────────────────────────────────────────────┘
```

### Python-Specific Principles

**Type Hints for Safety:**

```python
from typing import Optional, List
from uuid import UUID

async def get_equipment_by_id(equipment_id: UUID) -> Optional[Equipment]:
    # Type hints help IDEs and static analyzers
    equipment = await repository.find_by_id(equipment_id)
    return equipment

async def get_all_equipment(page: int = 1, page_size: int = 20) -> List[Equipment]:
    return await repository.find_all(page, page_size)
```

**Pydantic for Validation:**

```python
from pydantic import BaseModel, Field, validator

class CreateEquipmentRequest(BaseModel):
    equipment_code: str = Field(..., min_length=1, max_length=50, regex="^[A-Z0-9-]+$")
    equipment_name: str = Field(..., min_length=1, max_length=200)
    location_id: Optional[UUID] = None

    @validator('equipment_code')
    def code_must_be_uppercase(cls, v):
        if not v.isupper():
            raise ValueError('Equipment code must be uppercase')
        return v
```

**Async/Await Pattern:**

```python
# Async for I/O operations
async def create_equipment(request: CreateEquipmentRequest) -> Equipment:
    # Check if exists (async database call)
    existing = await repository.find_by_code(request.equipment_code)
    if existing:
        raise HTTPException(status_code=409, detail="Equipment code already exists")

    # Create (async database call)
    equipment = await repository.create(request)

    # Log to external service (async HTTP call)
    await audit_service.log_creation(equipment)

    return equipment
```

**Dependency Injection:**

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

# Database session dependency
async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session

# Service dependency
def get_equipment_service(db: AsyncSession = Depends(get_db)) -> EquipmentService:
    repository = EquipmentRepository(db)
    return EquipmentService(repository)

# Use in route
@router.get("/{equipment_id}")
async def get_equipment(
    equipment_id: UUID,
    service: EquipmentService = Depends(get_equipment_service)
):
    return await service.get_by_id(equipment_id)
```

### Design Patterns in Python

1. **Repository Pattern** - Abstract data access
2. **Dependency Injection** - Via FastAPI's `Depends()`
3. **Schema Pattern** - Pydantic models for validation
4. **Factory Pattern** - For creating complex objects
5. **Singleton Pattern** - For database connections, config

---

## Project Structure

### Recommended Project Structure

```
fault-reporter-api/
│
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry point
│   │
│   ├── api/                       # API layer (routers)
│   │   ├── __init__.py
│   │   ├── deps.py               # Shared dependencies
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py         # Main v1 router
│   │   │   └── endpoints/
│   │   │       ├── __init__.py
│   │   │       ├── equipment.py
│   │   │       ├── alerts.py
│   │   │       ├── locations.py
│   │   │       ├── work_orders.py
│   │   │       ├── auth.py
│   │   │       └── health.py
│   │
│   ├── services/                  # Business logic layer
│   │   ├── __init__.py
│   │   ├── equipment_service.py
│   │   ├── alert_service.py
│   │   ├── location_service.py
│   │   ├── work_order_service.py
│   │   ├── auth_service.py
│   │   └── ai_fault_detection_service.py
│   │
│   ├── repositories/              # Data access layer
│   │   ├── __init__.py
│   │   ├── base.py               # Base repository class
│   │   ├── equipment_repository.py
│   │   ├── alert_repository.py
│   │   ├── location_repository.py
│   │   └── work_order_repository.py
│   │
│   ├── models/                    # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── base.py               # Base model class
│   │   ├── equipment.py
│   │   ├── alert.py
│   │   ├── location.py
│   │   ├── work_order.py
│   │   ├── user.py
│   │   ├── iot_data.py
│   │   └── enums.py              # Status, Priority, etc.
│   │
│   ├── schemas/                   # Pydantic schemas (DTOs)
│   │   ├── __init__.py
│   │   ├── equipment.py          # EquipmentCreate, EquipmentResponse, etc.
│   │   ├── alert.py
│   │   ├── location.py
│   │   ├── work_order.py
│   │   ├── user.py
│   │   ├── common.py             # ApiResponse, PaginatedResponse
│   │   └── ai_detection.py       # AI fault detection schemas
│   │
│   ├── core/                      # Core configuration and utilities
│   │   ├── __init__.py
│   │   ├── config.py             # Settings (Pydantic BaseSettings)
│   │   ├── security.py           # Firebase auth, password hashing
│   │   ├── logging.py            # Logging configuration
│   │   └── exceptions.py         # Custom exceptions
│   │
│   ├── db/                        # Database setup
│   │   ├── __init__.py
│   │   ├── base.py               # SQLAlchemy base
│   │   ├── session.py            # Database session
│   │   └── init_db.py            # Database initialization
│   │
│   ├── middleware/                # Custom middleware
│   │   ├── __init__.py
│   │   ├── auth.py               # Firebase auth middleware
│   │   ├── logging.py            # Request logging
│   │   └── error_handler.py      # Global error handling
│   │
│   ├── utils/                     # Utility functions
│   │   ├── __init__.py
│   │   ├── pagination.py
│   │   ├── datetime.py
│   │   └── validators.py
│   │
│   └── ai/                        # AI/ML integration (YOUR ADVANTAGE!)
│       ├── __init__.py
│       ├── openai_client.py
│       ├── gemini_client.py
│       ├── grok_client.py
│       └── fault_analyzer.py
│
├── alembic/                       # Database migrations
│   ├── versions/
│   ├── env.py
│   └── script.py.mako
│
├── tests/                         # Test suite
│   ├── __init__.py
│   ├── conftest.py               # Pytest fixtures
│   ├── unit/
│   │   ├── test_services.py
│   │   └── test_repositories.py
│   ├── integration/
│   │   ├── test_equipment_api.py
│   │   ├── test_alerts_api.py
│   │   └── test_auth.py
│   └── e2e/
│       └── test_workflows.py
│
├── scripts/                       # Utility scripts
│   ├── seed_db.py                # Seed database with test data
│   └── backup_db.py              # Database backup script
│
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example environment file
├── .gitignore
├── requirements.txt               # Production dependencies
├── requirements-dev.txt           # Development dependencies
├── pyproject.toml                 # Project metadata (Poetry/pip)
├── alembic.ini                    # Alembic configuration
├── Dockerfile                     # Docker image
├── docker-compose.yml             # Local development with Docker
├── Procfile                       # For Heroku/Railway deployment
├── railway.json                   # Railway configuration
├── render.yaml                    # Render configuration
└── README.md
```

---

## Naming Conventions

### Python Naming Standards (PEP 8)

#### Modules and Packages

```python
# snake_case for modules
import equipment_service
from repositories import equipment_repository
```

#### Classes

```python
# PascalCase for classes
class EquipmentService:
    pass

class EquipmentRepository:
    pass

class CreateEquipmentRequest(BaseModel):
    pass
```

#### Functions and Variables

```python
# snake_case for functions and variables
async def get_equipment_by_id(equipment_id: UUID) -> Equipment:
    pass

equipment_code = "EQ-001"
total_count = len(equipments)
user_email = "user@example.com"
```

#### Constants

```python
# SCREAMING_SNAKE_CASE for constants
MAX_PAGE_SIZE = 100
DEFAULT_PAGE_SIZE = 20
API_VERSION = "v1"
DATABASE_URL = "postgresql://..."
```

#### Private Members

```python
class EquipmentService:
    def __init__(self, repository: EquipmentRepository):
        self._repository = repository  # Single underscore for "private"

    async def get_by_id(self, equipment_id: UUID):
        return await self._repository.find_by_id(equipment_id)

    def __internal_helper(self):  # Double underscore for name mangling
        pass
```

### FastAPI Route Naming

```python
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/equipment", tags=["equipment"])

# RESTful route naming
@router.get("")  # GET /api/v1/equipment
async def get_all_equipment():
    pass

@router.post("")  # POST /api/v1/equipment
async def create_equipment():
    pass

@router.get("/{equipment_id}")  # GET /api/v1/equipment/{id}
async def get_equipment():
    pass

@router.put("/{equipment_id}")  # PUT /api/v1/equipment/{id}
async def update_equipment():
    pass

@router.delete("/{equipment_id}")  # DELETE /api/v1/equipment/{id}
async def delete_equipment():
    pass

@router.get("/{equipment_id}/location")  # GET /api/v1/equipment/{id}/location
async def get_equipment_location():
    pass
```

### Database Naming Conventions

Same as .NET/Rust plans - PostgreSQL tables use snake_case:

```sql
-- Tables: plural, snake_case
equipment
alerts
work_orders
locations

-- Columns: snake_case
equipment_code
created_at
is_active
```

---

## Database Schema Design

### Same Schema as .NET/Rust Plans

The database schema is identical to .NET and Rust implementations. SQLAlchemy will work with the same PostgreSQL tables.

**Key tables:**

1. `users` - User accounts and Firebase UID mapping
2. `locations` - Building/room/floor information
3. `equipment` - Equipment registry with specifications
4. `alerts` - Fault alerts and notifications
5. `work_orders` - Maintenance work orders
6. `iot_data` - Sensor readings and telemetry
7. `technical_diagrams` - Equipment diagrams/schematics
8. `energy_consumption` - Energy usage by quarter
9. `asset_reliability` - MTBF, MTTR, costs by quarter
10. `user_equipment_assignments` - User-to-equipment mapping
11. `audit_logs` - Change tracking

**Refer to .NET plan for complete SQL schema.**

---

## API Endpoints Specification

### Same Endpoints as .NET/Rust Plans

The REST API endpoints are identical to the other implementations:

- `GET /health` - Health check
- `POST /api/v1/auth/verify` - Verify Firebase token
- `GET /api/v1/equipment` - List equipment (paginated)
- `GET /api/v1/equipment/{id}` - Get equipment details
- `POST /api/v1/equipment` - Create equipment
- `PUT /api/v1/equipment/{id}` - Update equipment
- `DELETE /api/v1/equipment/{id}` - Delete equipment
- `GET /api/v1/alerts` - List alerts
- `GET /api/v1/work-orders` - List work orders
- **`POST /api/v1/ai/analyze-fault`** - AI fault detection (Python advantage!)
- ... (see .NET plan for complete list)

**Refer to .NET plan for complete endpoint documentation.**

---

## Implementation Phases

### Phase 1: Project Setup & FastAPI Configuration (Week 1)

**Objectives:**

- ✅ Initialize Python project with virtual environment
- ✅ Set up FastAPI application
- ✅ Configure PostgreSQL connection with SQLAlchemy
- ✅ Set up Alembic for migrations
- ✅ Implement health check endpoint
- ✅ Configure auto-generated documentation

**Tasks:**

1. **Install Python and Create Virtual Environment**

   ```bash
   # Ensure Python 3.11+ is installed
   python --version

   # Create project directory
   mkdir fault-reporter-api
   cd fault-reporter-api

   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   # Upgrade pip
   pip install --upgrade pip
   ```

2. **Install Core Dependencies**

   ```bash
   # Create requirements.txt
   pip install fastapi[all]==0.115.0
   pip install uvicorn[standard]==0.30.0
   pip install sqlalchemy==2.0.35
   pip install asyncpg==0.29.0
   pip install alembic==1.13.0
   pip install pydantic[email]==2.9.0
   pip install pydantic-settings==2.5.0
   pip install python-dotenv==1.0.0
   pip install firebase-admin==6.5.0
   pip install python-jose[cryptography]==3.3.0
   pip install passlib[bcrypt]==1.7.4
   pip install python-multipart==0.0.9

   # Save dependencies
   pip freeze > requirements.txt
   ```

3. **Create Basic Project Structure**

   ```bash
   mkdir -p app/api/v1/endpoints
   mkdir -p app/core
   mkdir -p app/db
   mkdir -p app/models
   mkdir -p app/schemas
   mkdir -p app/services
   mkdir -p app/repositories
   mkdir -p tests

   touch app/__init__.py
   touch app/main.py
   touch app/core/config.py
   touch .env
   touch .env.example
   ```

4. **Create Configuration (app/core/config.py)**

   ```python
   from pydantic_settings import BaseSettings
   from typing import Optional

   class Settings(BaseSettings):
       # API
       PROJECT_NAME: str = "Fault Reporter API"
       VERSION: str = "1.0.0"
       API_V1_PREFIX: str = "/api/v1"

       # Database
       DATABASE_URL: str

       # Firebase
       FIREBASE_PROJECT_ID: str
       FIREBASE_SERVICE_ACCOUNT_PATH: Optional[str] = None

       # Security
       SECRET_KEY: str = "your-secret-key-change-in-production"
       ALGORITHM: str = "HS256"
       ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

       # CORS
       BACKEND_CORS_ORIGINS: list[str] = ["*"]

       # Pagination
       DEFAULT_PAGE_SIZE: int = 20
       MAX_PAGE_SIZE: int = 100

       class Config:
           env_file = ".env"
           case_sensitive = True

   settings = Settings()
   ```

5. **Create Main Application (app/main.py)**

   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from app.core.config import settings
   from app.api.v1.router import api_router

   app = FastAPI(
       title=settings.PROJECT_NAME,
       version=settings.VERSION,
       openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
       docs_url="/docs",
       redoc_url="/redoc"
   )

   # CORS middleware
   app.add_middleware(
       CORSMiddleware,
       allow_origins=settings.BACKEND_CORS_ORIGINS,
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

   # Health check
   @app.get("/health")
   async def health_check():
       return {"status": "healthy", "version": settings.VERSION}

   # Include API router
   app.include_router(api_router, prefix=settings.API_V1_PREFIX)

   if __name__ == "__main__":
       import uvicorn
       uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
   ```

6. **Create .env File**

   ```bash
   # .env
   DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/faultreporter
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-adminsdk.json
   SECRET_KEY=your-super-secret-key-change-this
   ```

7. **Test Basic Setup**

   ```bash
   # Run the application
   uvicorn app.main:app --reload

   # Visit:
   # http://localhost:8000/health
   # http://localhost:8000/docs (Swagger UI)
   # http://localhost:8000/redoc (ReDoc)
   ```

**Deliverables:**

- ✅ FastAPI app running
- ✅ Auto-generated docs at /docs
- ✅ Health check endpoint working
- ✅ Configuration loaded from .env

---

### Phase 2: Database Setup with SQLAlchemy (Week 1)

**Objectives:**

- ✅ Configure SQLAlchemy with async support
- ✅ Create database models
- ✅ Set up Alembic migrations
- ✅ Create initial schema

**Tasks:**

1. **Database Session Setup (app/db/session.py)**

   ```python
   from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
   from sqlalchemy.orm import declarative_base
   from app.core.config import settings

   # Create async engine
   engine = create_async_engine(
       settings.DATABASE_URL,
       echo=True,  # Log SQL queries (disable in production)
       future=True,
       pool_pre_ping=True,
   )

   # Create async session maker
   AsyncSessionLocal = async_sessionmaker(
       engine,
       class_=AsyncSession,
       expire_on_commit=False,
       autocommit=False,
       autoflush=False,
   )

   # Base class for models
   Base = declarative_base()

   # Dependency for getting database session
   async def get_db() -> AsyncSession:
       async with AsyncSessionLocal() as session:
           try:
               yield session
           finally:
               await session.close()
   ```

2. **Create Equipment Model (app/models/equipment.py)**

   ```python
   from sqlalchemy import Column, String, Text, Boolean, DateTime, ForeignKey, Enum as SQLEnum
   from sqlalchemy.dialects.postgresql import UUID, JSONB
   from sqlalchemy.orm import relationship
   from sqlalchemy.sql import func
   import uuid
   import enum
   from app.db.session import Base

   class EquipmentStatus(str, enum.Enum):
       ONLINE = "ONLINE"
       OFFLINE = "OFFLINE"
       MAINTENANCE = "MAINTENANCE"
       ERROR = "ERROR"

   class Equipment(Base):
       __tablename__ = "equipment"

       id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
       equipment_code = Column(String(50), unique=True, nullable=False, index=True)
       equipment_name = Column(String(200), nullable=False)
       description = Column(Text, nullable=True)
       status = Column(SQLEnum(EquipmentStatus), nullable=False, default=EquipmentStatus.ONLINE)
       location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=True)

       # Specifications
       asset_number = Column(String(100), nullable=True)
       manufacturer = Column(String(200), nullable=True)
       model = Column(String(200), nullable=True)
       serial_number = Column(String(200), nullable=True)

       # Metadata
       metadata = Column(JSONB, nullable=True)

       # Audit fields
       created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
       updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)
       created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
       is_deleted = Column(Boolean, default=False, nullable=False)
       deleted_at = Column(DateTime(timezone=True), nullable=True)

       # Relationships
       location = relationship("Location", back_populates="equipment")
       alerts = relationship("Alert", back_populates="equipment", cascade="all, delete-orphan")
       iot_data = relationship("IoTData", back_populates="equipment", cascade="all, delete-orphan")

       def __repr__(self):
           return f"<Equipment {self.equipment_code}: {self.equipment_name}>"
   ```

3. **Initialize Alembic**

   ```bash
   # Initialize Alembic
   alembic init alembic

   # Update alembic/env.py to use async
   ```

4. **Update alembic/env.py for Async**

   ```python
   from logging.config import fileConfig
   from sqlalchemy import pool
   from sqlalchemy.ext.asyncio import async_engine_from_config
   from alembic import context
   from app.db.session import Base
   from app.core.config import settings

   # Import all models here
   from app.models.equipment import Equipment
   from app.models.location import Location
   from app.models.alert import Alert
   # ... import all models

   config = context.config
   config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

   target_metadata = Base.metadata

   def run_migrations_online() -> None:
       connectable = async_engine_from_config(
           config.get_section(config.config_ini_section),
           prefix="sqlalchemy.",
           poolclass=pool.NullPool,
       )

       async with connectable.connect() as connection:
           await connection.run_sync(do_run_migrations)

   def do_run_migrations(connection):
       context.configure(connection=connection, target_metadata=target_metadata)
       with context.begin_transaction():
           context.run_migrations()
   ```

5. **Create Initial Migration**

   ```bash
   # Generate migration
   alembic revision --autogenerate -m "Initial schema"

   # Apply migration
   alembic upgrade head
   ```

**Deliverables:**

- ✅ SQLAlchemy configured with async
- ✅ All database models created
- ✅ Alembic migrations working
- ✅ Database schema created

---

### Phase 3: Pydantic Schemas (DTOs) (Week 1-2)

**Objectives:**

- ✅ Create Pydantic schemas for all entities
- ✅ Add validation rules
- ✅ Configure serialization

**Tasks:**

1. **Create Equipment Schemas (app/schemas/equipment.py)**

   ```python
   from pydantic import BaseModel, Field, validator
   from typing import Optional
   from uuid import UUID
   from datetime import datetime
   from app.models.equipment import EquipmentStatus

   # Base schema with common fields
   class EquipmentBase(BaseModel):
       equipment_code: str = Field(..., min_length=1, max_length=50, pattern="^[A-Z0-9-]+$")
       equipment_name: str = Field(..., min_length=1, max_length=200)
       description: Optional[str] = None
       manufacturer: Optional[str] = Field(None, max_length=200)
       model: Optional[str] = Field(None, max_length=200)

   # Create request schema
   class EquipmentCreate(EquipmentBase):
       location_id: Optional[UUID] = None
       status: EquipmentStatus = EquipmentStatus.ONLINE

       class Config:
           json_schema_extra = {
               "example": {
                   "equipment_code": "EQ-001",
                   "equipment_name": "Chiller Unit - Main Building",
                   "description": "Primary chiller for HVAC system",
                   "manufacturer": "Carrier",
                   "model": "30XA-1002",
                   "status": "ONLINE"
               }
           }

   # Update request schema
   class EquipmentUpdate(BaseModel):
       equipment_name: Optional[str] = Field(None, min_length=1, max_length=200)
       description: Optional[str] = None
       status: Optional[EquipmentStatus] = None
       location_id: Optional[UUID] = None

   # Response schema
   class EquipmentResponse(EquipmentBase):
       id: UUID
       status: EquipmentStatus
       location_id: Optional[UUID]
       created_at: datetime
       updated_at: Optional[datetime]

       class Config:
           from_attributes = True  # Allows creation from ORM model

   # Detailed response with relationships
   class EquipmentDetailResponse(EquipmentResponse):
       location: Optional["LocationResponse"] = None
       alert_count: int = 0
       latest_iot_data: Optional["IoTDataResponse"] = None

   # List response with pagination
   class EquipmentListResponse(BaseModel):
       items: list[EquipmentResponse]
       total: int
       page: int
       page_size: int
       total_pages: int

   # Query parameters
   class EquipmentQueryParams(BaseModel):
       page: int = Field(1, ge=1)
       page_size: int = Field(20, ge=1, le=100)
       status: Optional[EquipmentStatus] = None
       search: Optional[str] = None
   ```

2. **Create Common Schemas (app/schemas/common.py)**

   ```python
   from pydantic import BaseModel
   from typing import Generic, TypeVar, Optional
   from datetime import datetime

   T = TypeVar('T')

   class ApiResponse(BaseModel, Generic[T]):
       success: bool
       data: Optional[T] = None
       message: Optional[str] = None
       timestamp: datetime = datetime.utcnow()

   class PaginationInfo(BaseModel):
       page: int
       page_size: int
       total_pages: int
       total_count: int
       has_next: bool
       has_previous: bool

   class PaginatedResponse(BaseModel, Generic[T]):
       success: bool = True
       data: list[T]
       pagination: PaginationInfo
       timestamp: datetime = datetime.utcnow()

   class ErrorResponse(BaseModel):
       success: bool = False
       error: dict
       timestamp: datetime = datetime.utcnow()
   ```

**Deliverables:**

- ✅ All Pydantic schemas created
- ✅ Validation rules configured
- ✅ Request/response models defined

---

### Phase 4: Repository Layer (Week 2)

**Objectives:**

- ✅ Create base repository class
- ✅ Implement specific repositories
- ✅ Add async database operations

**Tasks:**

1. **Base Repository (app/repositories/base.py)**

   ```python
   from typing import Generic, TypeVar, Type, Optional, List
   from sqlalchemy.ext.asyncio import AsyncSession
   from sqlalchemy import select, func, update, delete
   from sqlalchemy.orm import selectinload
   from uuid import UUID
   from app.db.session import Base

   ModelType = TypeVar("ModelType", bound=Base)

   class BaseRepository(Generic[ModelType]):
       def __init__(self, model: Type[ModelType], db: AsyncSession):
           self.model = model
           self.db = db

       async def get_by_id(self, id: UUID) -> Optional[ModelType]:
           """Get entity by ID"""
           query = select(self.model).where(self.model.id == id, self.model.is_deleted == False)
           result = await self.db.execute(query)
           return result.scalar_one_or_none()

       async def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
           """Get all entities with pagination"""
           query = select(self.model).where(self.model.is_deleted == False).offset(skip).limit(limit)
           result = await self.db.execute(query)
           return result.scalars().all()

       async def create(self, entity: ModelType) -> ModelType:
           """Create new entity"""
           self.db.add(entity)
           await self.db.commit()
           await self.db.refresh(entity)
           return entity

       async def update(self, id: UUID, values: dict) -> Optional[ModelType]:
           """Update entity"""
           query = (
               update(self.model)
               .where(self.model.id == id, self.model.is_deleted == False)
               .values(**values)
               .returning(self.model)
           )
           result = await self.db.execute(query)
           await self.db.commit()
           return result.scalar_one_or_none()

       async def delete(self, id: UUID) -> bool:
           """Soft delete entity"""
           from datetime import datetime
           query = (
               update(self.model)
               .where(self.model.id == id, self.model.is_deleted == False)
               .values(is_deleted=True, deleted_at=datetime.utcnow())
           )
           result = await self.db.execute(query)
           await self.db.commit()
           return result.rowcount > 0

       async def count(self) -> int:
           """Count total entities"""
           query = select(func.count()).select_from(self.model).where(self.model.is_deleted == False)
           result = await self.db.execute(query)
           return result.scalar()
   ```

2. **Equipment Repository (app/repositories/equipment_repository.py)**

   ```python
   from typing import Optional, List
   from sqlalchemy import select, or_
   from sqlalchemy.ext.asyncio import AsyncSession
   from app.models.equipment import Equipment, EquipmentStatus
   from app.repositories.base import BaseRepository

   class EquipmentRepository(BaseRepository[Equipment]):
       def __init__(self, db: AsyncSession):
           super().__init__(Equipment, db)

       async def get_by_code(self, code: str) -> Optional[Equipment]:
           """Get equipment by code"""
           query = select(Equipment).where(
               Equipment.equipment_code == code,
               Equipment.is_deleted == False
           )
           result = await self.db.execute(query)
           return result.scalar_one_or_none()

       async def search(
           self,
           search: Optional[str] = None,
           status: Optional[EquipmentStatus] = None,
           skip: int = 0,
           limit: int = 20
       ) -> List[Equipment]:
           """Search equipment with filters"""
           query = select(Equipment).where(Equipment.is_deleted == False)

           if search:
               query = query.where(
                   or_(
                       Equipment.equipment_code.ilike(f"%{search}%"),
                       Equipment.equipment_name.ilike(f"%{search}%")
                   )
               )

           if status:
               query = query.where(Equipment.status == status)

           query = query.offset(skip).limit(limit).order_by(Equipment.created_at.desc())

           result = await self.db.execute(query)
           return result.scalars().all()

       async def count_by_filters(
           self,
           search: Optional[str] = None,
           status: Optional[EquipmentStatus] = None
       ) -> int:
           """Count equipment with filters"""
           query = select(func.count()).select_from(Equipment).where(Equipment.is_deleted == False)

           if search:
               query = query.where(
                   or_(
                       Equipment.equipment_code.ilike(f"%{search}%"),
                       Equipment.equipment_name.ilike(f"%{search}%")
                   )
               )

           if status:
               query = query.where(Equipment.status == status)

           result = await self.db.execute(query)
           return result.scalar()
   ```

**Deliverables:**

- ✅ Base repository implemented
- ✅ Equipment repository with search
- ✅ All async database operations

---

### Phase 5: Service Layer (Week 2-3)

**Objectives:**

- ✅ Implement business logic in services
- ✅ Add error handling
- ✅ Coordinate between repositories

**Tasks:**

1. **Custom Exceptions (app/core/exceptions.py)**

   ```python
   from fastapi import HTTPException, status

   class NotFoundException(HTTPException):
       def __init__(self, detail: str):
           super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

   class ConflictException(HTTPException):
       def __init__(self, detail: str):
           super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)

   class ValidationException(HTTPException):
       def __init__(self, detail: str):
           super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
   ```

2. **Equipment Service (app/services/equipment_service.py)**

   ```python
   from typing import Optional, List
   from uuid import UUID
   from app.repositories.equipment_repository import EquipmentRepository
   from app.schemas.equipment import EquipmentCreate, EquipmentUpdate, EquipmentResponse
   from app.models.equipment import Equipment
   from app.core.exceptions import NotFoundException, ConflictException
   from sqlalchemy.ext.asyncio import AsyncSession

   class EquipmentService:
       def __init__(self, db: AsyncSession):
           self.repository = EquipmentRepository(db)

       async def get_by_id(self, equipment_id: UUID) -> Equipment:
           """Get equipment by ID"""
           equipment = await self.repository.get_by_id(equipment_id)
           if not equipment:
               raise NotFoundException(f"Equipment with ID {equipment_id} not found")
           return equipment

       async def get_all(
           self,
           page: int = 1,
           page_size: int = 20,
           search: Optional[str] = None,
           status: Optional[str] = None
       ) -> tuple[List[Equipment], int]:
           """Get all equipment with pagination"""
           skip = (page - 1) * page_size
           equipment_list = await self.repository.search(search, status, skip, page_size)
           total = await self.repository.count_by_filters(search, status)
           return equipment_list, total

       async def create(self, data: EquipmentCreate) -> Equipment:
           """Create new equipment"""
           # Check if code already exists
           existing = await self.repository.get_by_code(data.equipment_code)
           if existing:
               raise ConflictException(
                   f"Equipment with code {data.equipment_code} already exists"
               )

           equipment = Equipment(**data.model_dump())
           return await self.repository.create(equipment)

       async def update(self, equipment_id: UUID, data: EquipmentUpdate) -> Equipment:
           """Update equipment"""
           # Check if exists
           equipment = await self.get_by_id(equipment_id)

           # Update fields
           update_data = data.model_dump(exclude_unset=True)
           if not update_data:
               return equipment

           updated = await self.repository.update(equipment_id, update_data)
           if not updated:
               raise NotFoundException(f"Equipment with ID {equipment_id} not found")

           return updated

       async def delete(self, equipment_id: UUID) -> bool:
           """Delete equipment"""
           deleted = await self.repository.delete(equipment_id)
           if not deleted:
               raise NotFoundException(f"Equipment with ID {equipment_id} not found")
           return True
   ```

**Deliverables:**

- ✅ Service layer implemented
- ✅ Business logic separated from HTTP
- ✅ Error handling with custom exceptions

---

### Phase 6: API Endpoints (FastAPI Routers) (Week 3)

**Objectives:**

- ✅ Create FastAPI routers
- ✅ Implement all endpoints
- ✅ Add dependency injection

**Tasks:**

1. **Equipment Router (app/api/v1/endpoints/equipment.py)**

   ```python
   from fastapi import APIRouter, Depends, Query, Path, status
   from sqlalchemy.ext.asyncio import AsyncSession
   from typing import Optional
   from uuid import UUID
   from app.db.session import get_db
   from app.services.equipment_service import EquipmentService
   from app.schemas.equipment import (
       EquipmentCreate,
       EquipmentUpdate,
       EquipmentResponse,
       EquipmentQueryParams
   )
   from app.schemas.common import ApiResponse, PaginatedResponse, PaginationInfo

   router = APIRouter(prefix="/equipment", tags=["Equipment"])

   def get_equipment_service(db: AsyncSession = Depends(get_db)) -> EquipmentService:
       return EquipmentService(db)

   @router.get("", response_model=PaginatedResponse[EquipmentResponse])
   async def get_all_equipment(
       page: int = Query(1, ge=1),
       page_size: int = Query(20, ge=1, le=100),
       search: Optional[str] = Query(None),
       status: Optional[str] = Query(None),
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """
       Get all equipment with pagination and filtering.

       - **page**: Page number (starts at 1)
       - **page_size**: Number of items per page (max 100)
       - **search**: Search by code or name
       - **status**: Filter by status (ONLINE, OFFLINE, MAINTENANCE, ERROR)
       """
       equipment_list, total = await service.get_all(page, page_size, search, status)

       total_pages = (total + page_size - 1) // page_size

       return PaginatedResponse(
           data=[EquipmentResponse.model_validate(eq) for eq in equipment_list],
           pagination=PaginationInfo(
               page=page,
               page_size=page_size,
               total_pages=total_pages,
               total_count=total,
               has_next=page < total_pages,
               has_previous=page > 1
           )
       )

   @router.get("/{equipment_id}", response_model=ApiResponse[EquipmentResponse])
   async def get_equipment(
       equipment_id: UUID = Path(...),
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """Get equipment by ID"""
       equipment = await service.get_by_id(equipment_id)
       return ApiResponse(
           success=True,
           data=EquipmentResponse.model_validate(equipment)
       )

   @router.post("", response_model=ApiResponse[EquipmentResponse], status_code=status.HTTP_201_CREATED)
   async def create_equipment(
       data: EquipmentCreate,
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """Create new equipment"""
       equipment = await service.create(data)
       return ApiResponse(
           success=True,
           data=EquipmentResponse.model_validate(equipment),
           message="Equipment created successfully"
       )

   @router.put("/{equipment_id}", response_model=ApiResponse[EquipmentResponse])
   async def update_equipment(
       equipment_id: UUID = Path(...),
       data: EquipmentUpdate = ...,
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """Update equipment"""
       equipment = await service.update(equipment_id, data)
       return ApiResponse(
           success=True,
           data=EquipmentResponse.model_validate(equipment),
           message="Equipment updated successfully"
       )

   @router.delete("/{equipment_id}", status_code=status.HTTP_204_NO_CONTENT)
   async def delete_equipment(
       equipment_id: UUID = Path(...),
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """Delete equipment"""
       await service.delete(equipment_id)
       return None
   ```

2. **Main V1 Router (app/api/v1/router.py)**

   ```python
   from fastapi import APIRouter
   from app.api.v1.endpoints import equipment, alerts, locations, work_orders, auth

   api_router = APIRouter()

   api_router.include_router(equipment.router)
   api_router.include_router(alerts.router)
   api_router.include_router(locations.router)
   api_router.include_router(work_orders.router)
   api_router.include_router(auth.router)
   ```

**Deliverables:**

- ✅ All API endpoints implemented
- ✅ Dependency injection working
- ✅ Auto-generated docs complete

---

### Phase 7: AI Fault Detection Integration (Week 3-4) 🤖

**This is Python's Killer Feature! Native AI/ML integration.**

**Objectives:**

- ✅ Integrate OpenAI, Gemini, and Grok APIs
- ✅ Create fault detection service
- ✅ Add image analysis endpoints

**Tasks:**

1. **AI Client (app/ai/openai_client.py)**

   ```python
   import openai
   from typing import List
   from app.core.config import settings

   openai.api_key = settings.OPENAI_API_KEY

   async def analyze_equipment_image(image_urls: List[str], equipment_type: str) -> dict:
       """Analyze equipment images for faults using GPT-4 Vision"""
       prompt = f"""
       You are an expert equipment maintenance technician.
       Analyze the provided {equipment_type} images for potential faults, defects, or maintenance issues.

       Please provide:
       1. Overall equipment status and condition
       2. Identified components visible in the images
       3. Potential issues or defects detected
       4. Maintenance recommendations
       5. Severity assessment (low/medium/high/critical)
       """

       messages = [
           {
               "role": "user",
               "content": [
                   {"type": "text", "text": prompt},
                   *[{"type": "image_url", "image_url": {"url": url}} for url in image_urls]
               ]
           }
       ]

       response = await openai.ChatCompletion.acreate(
           model="gpt-4o",
           messages=messages,
           max_tokens=1500,
           temperature=0.7
       )

       return {
           "analysis": response.choices[0].message.content,
           "model": "gpt-4o",
           "provider": "openai"
       }
   ```

2. **Fault Detection Service (app/services/ai_fault_detection_service.py)**

   ```python
   from typing import List
   from app.ai.openai_client import analyze_equipment_image as openai_analyze
   from app.ai.gemini_client import analyze_equipment_image as gemini_analyze
   from app.schemas.ai_detection import FaultAnalysisRequest, FaultAnalysisResponse

   class AIFaultDetectionService:
       async def analyze_fault(self, request: FaultAnalysisRequest) -> FaultAnalysisResponse:
           """Analyze equipment fault using specified AI provider"""

           if request.provider == "openai":
               result = await openai_analyze(request.image_urls, request.equipment_type)
           elif request.provider == "gemini":
               result = await gemini_analyze(request.image_urls, request.equipment_type)
           elif request.provider == "grok":
               result = await grok_analyze(request.image_urls, request.equipment_type)
           else:
               raise ValueError(f"Unknown provider: {request.provider}")

           # Parse analysis to extract structured data
           issues = self._extract_issues(result["analysis"])
           recommendations = self._extract_recommendations(result["analysis"])
           severity = self._determine_severity(result["analysis"])

           return FaultAnalysisResponse(
               success=True,
               provider=request.provider,
               analysis=result["analysis"],
               detected_issues=issues,
               recommendations=recommendations,
               severity=severity,
               confidence=0.85
           )

       def _extract_issues(self, text: str) -> List[str]:
           # Parse AI response for issues
           # (Same logic as TypeScript version)
           pass

       def _extract_recommendations(self, text: str) -> List[str]:
           # Parse AI response for recommendations
           pass

       def _determine_severity(self, text: str) -> str:
           # Determine severity from text
           pass
   ```

3. **AI Endpoint (app/api/v1/endpoints/ai.py)**

   ```python
   from fastapi import APIRouter, Depends, UploadFile, File
   from app.services.ai_fault_detection_service import AIFaultDetectionService
   from app.schemas.ai_detection import FaultAnalysisRequest, FaultAnalysisResponse

   router = APIRouter(prefix="/ai", tags=["AI Fault Detection"])

   @router.post("/analyze-fault", response_model=FaultAnalysisResponse)
   async def analyze_fault(
       request: FaultAnalysisRequest,
       service: AIFaultDetectionService = Depends()
   ):
       """
       Analyze equipment images for faults using AI.

       Supports multiple providers:
       - OpenAI (GPT-4 Vision)
       - Google Gemini
       - Grok Vision
       """
       return await service.analyze_fault(request)
   ```

**Deliverables:**

- ✅ AI client integrations (OpenAI, Gemini, Grok)
- ✅ Fault detection service
- ✅ Image analysis endpoint
- ✅ **This is Python's unique advantage!**

---

### Phase 8: Firebase Authentication (Week 4)

**Objectives:**

- ✅ Implement Firebase JWT validation
- ✅ Create auth middleware
- ✅ Protect endpoints

**Tasks:**

1. **Firebase Auth (app/core/security.py)**

   ```python
   import firebase_admin
   from firebase_admin import credentials, auth
   from fastapi import Depends, HTTPException, status
   from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
   from app.core.config import settings

   # Initialize Firebase
   cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
   firebase_admin.initialize_app(cred)

   security = HTTPBearer()

   async def get_current_user(
       credentials: HTTPAuthorizationCredentials = Depends(security)
   ) -> dict:
       """Validate Firebase JWT token and return user info"""
       token = credentials.credentials

       try:
           # Verify Firebase token
           decoded_token = auth.verify_id_token(token)

           return {
               "uid": decoded_token["uid"],
               "email": decoded_token.get("email"),
               "email_verified": decoded_token.get("email_verified", False)
           }

       except auth.InvalidIdTokenError:
           raise HTTPException(
               status_code=status.HTTP_401_UNAUTHORIZED,
               detail="Invalid authentication token"
           )
       except auth.ExpiredIdTokenError:
           raise HTTPException(
               status_code=status.HTTP_401_UNAUTHORIZED,
               detail="Authentication token has expired"
           )
       except Exception as e:
           raise HTTPException(
               status_code=status.HTTP_401_UNAUTHORIZED,
               detail=f"Authentication failed: {str(e)}"
           )
   ```

2. **Protect Endpoints**

   ```python
   from app.core.security import get_current_user

   @router.post("/equipment")
   async def create_equipment(
       data: EquipmentCreate,
       current_user: dict = Depends(get_current_user),  # Protected!
       service: EquipmentService = Depends(get_equipment_service)
   ):
       """Create new equipment (requires authentication)"""
       equipment = await service.create(data)
       return ApiResponse(success=True, data=equipment)
   ```

**Deliverables:**

- ✅ Firebase auth integrated
- ✅ JWT validation working
- ✅ Endpoints protected

---

### Phase 9: Testing (Week 4-5)

**Objectives:**

- ✅ Write unit tests for services
- ✅ Write integration tests for endpoints
- ✅ Achieve >80% coverage

**Tasks:**

1. **Install Test Dependencies**

   ```bash
   pip install pytest==8.3.0
   pip install pytest-asyncio==0.24.0
   pip install httpx==0.27.0
   pip install pytest-cov==5.0.0
   ```

2. **Test Configuration (tests/conftest.py)**

   ```python
   import pytest
   import asyncio
   from httpx import AsyncClient
   from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
   from app.main import app
   from app.db.session import Base, get_db

   # Test database URL
   TEST_DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/faultreporter_test"

   @pytest.fixture(scope="session")
   def event_loop():
       loop = asyncio.get_event_loop_policy().new_event_loop()
       yield loop
       loop.close()

   @pytest.fixture(scope="function")
   async def db_session():
       engine = create_async_engine(TEST_DATABASE_URL)
       async with engine.begin() as conn:
               await conn.run_sync(Base.metadata.create_all)

       async with AsyncSession(engine) as session:
           yield session

       async with engine.begin() as conn:
           await conn.run_sync(Base.metadata.drop_all)

   @pytest.fixture
   async def client(db_session):
       def override_get_db():
           yield db_session

       app.dependency_overrides[get_db] = override_get_db
       async with AsyncClient(app=app, base_url="http://test") as ac:
           yield ac
   ```

3. **Equipment Tests (tests/integration/test_equipment_api.py)**

   ```python
   import pytest
   from httpx import AsyncClient

   @pytest.mark.asyncio
   async def test_get_all_equipment(client: AsyncClient):
       response = await client.get("/api/v1/equipment")
       assert response.status_code == 200
       assert "data" in response.json()

   @pytest.mark.asyncio
   async def test_create_equipment(client: AsyncClient):
       equipment_data = {
           "equipment_code": "EQ-TEST-001",
           "equipment_name": "Test Equipment",
           "status": "ONLINE"
       }
       response = await client.post("/api/v1/equipment", json=equipment_data)
       assert response.status_code == 201
       assert response.json()["success"] == True

   @pytest.mark.asyncio
   async def test_create_duplicate_equipment(client: AsyncClient):
       # First create
       equipment_data = {
           "equipment_code": "EQ-DUP-001",
           "equipment_name": "Duplicate Test",
           "status": "ONLINE"
       }
       await client.post("/api/v1/equipment", json=equipment_data)

       # Try to create duplicate
       response = await client.post("/api/v1/equipment", json=equipment_data)
       assert response.status_code == 409  # Conflict
   ```

4. **Run Tests with Coverage**

   ```bash
   # Run tests
   pytest

   # Run with coverage
   pytest --cov=app --cov-report=html

   # View coverage report
   open htmlcov/index.html
   ```

**Deliverables:**

- ✅ Comprehensive test suite
- ✅ >80% code coverage
- ✅ All tests passing

---

### Phase 10: Deployment (Week 5)

**Objectives:**

- ✅ Deploy to Railway/Render
- ✅ Configure production settings
- ✅ Test production endpoint

**Tasks:**

1. **Create requirements.txt**

   ```bash
   pip freeze > requirements.txt
   ```

2. **Create Procfile (for Railway)**

   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Deploy to Railway**

   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login
   railway login

   # Initialize project
   railway init

   # Add PostgreSQL
   railway add

   # Deploy
   railway up

   # Set environment variables
   railway variables set FIREBASE_PROJECT_ID=your-project-id
   railway variables set SECRET_KEY=your-secret-key
   ```

4. **Update React Native App**
   ```bash
   # .env
   EXPO_PUBLIC_API_BASE_URL=https://your-app.railway.app
   EXPO_PUBLIC_USE_MOCK_API=false
   ```

**Deliverables:**

- ✅ API deployed to Railway/Render
- ✅ Production URL working
- ✅ Mobile app connected

---

## Technology Stack

### Core Framework

- **FastAPI 0.115+** - Modern, fast web framework
- **Uvicorn 0.30+** - ASGI server
- **Pydantic 2.9+** - Data validation
- **Python 3.11+** - Latest Python version

### Database

- **SQLAlchemy 2.0+** - Async ORM
- **asyncpg 0.29+** - Async PostgreSQL driver
- **Alembic 1.13+** - Database migrations
- **PostgreSQL 16** - Database

### Authentication

- **firebase-admin 6.5+** - Firebase Admin SDK
- **python-jose 3.3+** - JWT handling
- **passlib 1.7+** - Password hashing

### AI/ML (Python's Advantage!)

- **openai 1.50+** - OpenAI API client
- **google-generativeai** - Gemini API
- **anthropic** - Claude API (optional)
- **pillow** - Image processing
- **numpy** - Numerical computing
- **pandas** - Data analysis (for analytics)

### Testing

- **pytest 8.3+** - Test framework
- **pytest-asyncio 0.24+** - Async test support
- **httpx 0.27+** - Async HTTP client for testing
- **pytest-cov 5.0+** - Code coverage

### Development

- **black** - Code formatter
- **flake8** - Linter
- **mypy** - Static type checker
- **isort** - Import sorter

---

## Configuration & Environment

### .env File Structure

```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:password@host:port/database

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-adminsdk.json

# Security
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI APIs (Python advantage!)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
GROK_API_KEY=...

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://your-app.com"]

# Environment
ENVIRONMENT=development  # development, production
DEBUG=True
```

---

## Security Considerations

Same as .NET/Rust - Firebase JWT, input validation, SQL injection prevention, CORS, HTTPS.

---

## Testing Strategy

Same as .NET/Rust - unit tests, integration tests, >80% coverage.

---

## Deployment Options

### Option 1: Railway.app (Recommended)

- ✅ Free tier: 500 hours + $5 credit
- ✅ Auto-deploy from GitHub
- ✅ PostgreSQL addon available
- ✅ Easy environment variables

### Option 2: Render.com

- ✅ Free tier: 750 hours
- ✅ PostgreSQL free for 90 days
- ✅ Auto-deploy from GitHub
- ✅ Slower cold starts

### Option 3: Fly.io

- ✅ Free tier: 3 VMs
- ✅ Always-on
- ✅ Docker-based
- ✅ Global deployment

### Option 4: PythonAnywhere (Python-specific)

- ✅ Free tier: 1 web app
- ✅ Python-optimized
- ⚠️ No HTTPS on free tier
- ⚠️ Limited features

---

## Python vs .NET vs Rust

| Aspect                  | Python + FastAPI        | .NET + EF Core            | Rust + Shuttle      |
| ----------------------- | ----------------------- | ------------------------- | ------------------- |
| **Development Speed**   | ⚡⚡⚡⚡⚡ (fastest)    | ⚡⚡⚡⚡                  | ⚡⚡                |
| **Runtime Performance** | ⚡⚡⚡                  | ⚡⚡⚡⚡                  | ⚡⚡⚡⚡⚡          |
| **AI/ML Integration**   | 🤖🤖🤖🤖🤖              | 🤖🤖                      | 🤖                  |
| **Learning Curve**      | 🟢 Easy                 | 🟡 Moderate               | 🔴 Hard             |
| **Type Safety**         | 🟡 Runtime              | 🟢 Compile                | 🟢 Compile          |
| **Ecosystem**           | 🟢 Huge (400k packages) | 🟢 Mature                 | 🟡 Growing          |
| **Free Hosting**        | 🟢 Good (Railway)       | 🟢 Good (Railway)         | 🟢 Best (Shuttle)   |
| **Auto Docs**           | ✅ Built-in             | ⚠️ Swagger                | ⚠️ Manual           |
| **Memory Usage**        | ~150MB                  | ~100MB                    | ~50MB               |
| **Best For**            | AI features, rapid dev  | Enterprise, full features | Performance, safety |

---

## When to Choose Python

**Choose Python + FastAPI if:**

- ✅ **AI/ML is core to your app** (fault detection feature!)
- ✅ You want **fastest time-to-market**
- ✅ You need **rapid prototyping**
- ✅ Your team knows Python
- ✅ You want **easiest learning curve**
- ✅ You need **data processing** (pandas, NumPy)
- ✅ You value **auto-generated docs**
- ✅ You want **modern async Python**

**Choose .NET if:**

- You need enterprise features (background jobs, caching)
- You want compile-time safety
- Performance is critical (but AI isn't)

**Choose Rust if:**

- You need maximum performance
- You want guaranteed memory safety
- You have time for steep learning curve

---

## Next Steps

1. **Review This Plan** ✅
2. **Compare with .NET and Rust Plans**
3. **Make Your Decision:**
   - **Python:** Fastest development, best for AI/ML
   - **.NET:** Enterprise-ready, strongly typed
   - **Rust:** Maximum performance, memory safety

4. **My Recommendation for Your App:**
   **Python + FastAPI** because:
   - ✅ Your app has **AI fault detection** as a core feature
   - ✅ You can ship **2-3x faster**
   - ✅ Auto-generated docs are amazing for mobile team
   - ✅ Easy to add more AI features later
   - ✅ Good enough performance for mobile app

---

**Document Version:** 1.0
**Last Updated:** 2025-11-25
**Status:** Ready for Review
**Estimated Timeline:** 5 weeks
**Estimated Effort:** 150-180 hours
**Difficulty:** Easy-Moderate
