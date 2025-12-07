# .NET 10 API Implementation Plan for Fault Reporter

**Project Name:** FaultReporter.API
**Framework:** ASP.NET Core 10.0 (LTS)
**Database:** PostgreSQL (DigitalOcean)
**Authentication:** Firebase Authentication
**Architecture:** Clean Architecture with Repository Pattern
**API Style:** RESTful API with OpenAPI/Swagger documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design Principles](#architecture--design-principles)
3. [Project Structure](#project-structure)
4. [Naming Conventions](#naming-conventions)
5. [Database Schema Design](#database-schema-design)
6. [API Endpoints Specification](#api-endpoints-specification)
7. [Implementation Phases](#implementation-phases)
8. [Technology Stack](#technology-stack)
9. [Configuration & Environment](#configuration--environment)
10. [Security Considerations](#security-considerations)
11. [Testing Strategy](#testing-strategy)
12. [Deployment Checklist](#deployment-checklist)

---

## Project Overview

### Purpose

Build a production-ready RESTful API to support the Fault Reporter mobile application, providing equipment monitoring, fault detection, work order management, and location services.

### Key Features

- ✅ Equipment management (CRUD operations)
- ✅ Location tracking and navigation
- ✅ Alert/Work order management
- ✅ AI fault detection integration (future)
- ✅ Real-time IoT data monitoring
- ✅ User authentication via Firebase
- ✅ Asset reliability analytics
- ✅ Technical diagram storage

### Non-Functional Requirements

- **Performance:** Response time < 200ms for 95% of requests
- **Scalability:** Support 1000+ concurrent users
- **Availability:** 99.9% uptime
- **Security:** Firebase JWT validation, HTTPS only, SQL injection protection
- **Maintainability:** Clean code, comprehensive logging, automated tests

---

## Architecture & Design Principles

### Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│         API Layer (Controllers)         │  ← HTTP endpoints, validation
├─────────────────────────────────────────┤
│     Application Layer (Services)        │  ← Business logic, orchestration
├─────────────────────────────────────────┤
│    Infrastructure Layer (Repositories)  │  ← Data access, external APIs
├─────────────────────────────────────────┤
│      Domain Layer (Entities/Models)     │  ← Core business entities
└─────────────────────────────────────────┘
```

### Design Principles

**SOLID Principles:**

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Derived classes must be substitutable
- **I**nterface Segregation: Many specific interfaces > one general interface
- **D**ependency Inversion: Depend on abstractions, not concretions

**Additional Principles:**

- **DRY** (Don't Repeat Yourself): Avoid code duplication
- **KISS** (Keep It Simple, Stupid): Simplicity over complexity
- **YAGNI** (You Aren't Gonna Need It): Don't add functionality until needed
- **Separation of Concerns**: Each layer has distinct responsibilities

### Architectural Patterns

1. **Repository Pattern:** Abstract data access logic
2. **Dependency Injection:** Loose coupling, testability
3. **DTO Pattern:** Separate internal models from API contracts
4. **Middleware Pattern:** Cross-cutting concerns (auth, logging, errors)
5. **Options Pattern:** Strongly-typed configuration

---

## Project Structure

### Recommended Folder Structure

```
FaultReporter.API/
│
├── src/
│   └── FaultReporter.API/
│       ├── Controllers/              # API endpoints
│       │   ├── EquipmentController.cs
│       │   ├── AlertsController.cs
│       │   ├── LocationController.cs
│       │   ├── WorkOrdersController.cs
│       │   ├── AuthController.cs
│       │   └── HealthController.cs
│       │
│       ├── Services/                 # Business logic layer
│       │   ├── Interfaces/
│       │   │   ├── IEquipmentService.cs
│       │   │   ├── IAlertService.cs
│       │   │   ├── ILocationService.cs
│       │   │   ├── IWorkOrderService.cs
│       │   │   ├── IAuthService.cs
│       │   │   └── IFaultDetectionService.cs
│       │   ├── EquipmentService.cs
│       │   ├── AlertService.cs
│       │   ├── LocationService.cs
│       │   ├── WorkOrderService.cs
│       │   ├── AuthService.cs
│       │   └── FaultDetectionService.cs
│       │
│       ├── Data/                     # Data access layer
│       │   ├── ApplicationDbContext.cs
│       │   ├── Repositories/
│       │   │   ├── Interfaces/
│       │   │   │   ├── IRepository.cs
│       │   │   │   ├── IEquipmentRepository.cs
│       │   │   │   ├── IAlertRepository.cs
│       │   │   │   ├── ILocationRepository.cs
│       │   │   │   └── IWorkOrderRepository.cs
│       │   │   ├── Repository.cs
│       │   │   ├── EquipmentRepository.cs
│       │   │   ├── AlertRepository.cs
│       │   │   ├── LocationRepository.cs
│       │   │   └── WorkOrderRepository.cs
│       │   ├── Configurations/       # Entity configurations
│       │   │   ├── EquipmentConfiguration.cs
│       │   │   ├── AlertConfiguration.cs
│       │   │   ├── LocationConfiguration.cs
│       │   │   └── WorkOrderConfiguration.cs
│       │   └── Migrations/           # EF Core migrations
│       │
│       ├── Models/                   # Domain entities
│       │   ├── Entities/
│       │   │   ├── Equipment.cs
│       │   │   ├── Alert.cs
│       │   │   ├── Location.cs
│       │   │   ├── WorkOrder.cs
│       │   │   ├── User.cs
│       │   │   ├── TechnicalDiagram.cs
│       │   │   ├── IoTData.cs
│       │   │   └── AuditLog.cs
│       │   ├── Enums/
│       │   │   ├── Priority.cs
│       │   │   ├── Status.cs
│       │   │   ├── EquipmentStatus.cs
│       │   │   └── HealthStatus.cs
│       │   └── ValueObjects/
│       │       ├── Coordinates.cs
│       │       └── WarrantyInfo.cs
│       │
│       ├── DTOs/                     # Data Transfer Objects
│       │   ├── Requests/
│       │   │   ├── Equipment/
│       │   │   │   ├── CreateEquipmentRequest.cs
│       │   │   │   ├── UpdateEquipmentRequest.cs
│       │   │   │   └── EquipmentFilterRequest.cs
│       │   │   ├── Alert/
│       │   │   │   ├── CreateAlertRequest.cs
│       │   │   │   ├── UpdateAlertRequest.cs
│       │   │   │   └── AlertFilterRequest.cs
│       │   │   ├── WorkOrder/
│       │   │   │   ├── CreateWorkOrderRequest.cs
│       │   │   │   └── UpdateWorkOrderRequest.cs
│       │   │   └── Auth/
│       │   │       ├── LoginRequest.cs
│       │   │       └── RefreshTokenRequest.cs
│       │   │
│       │   ├── Responses/
│       │   │   ├── Equipment/
│       │   │   │   ├── EquipmentResponse.cs
│       │   │   │   ├── EquipmentDetailResponse.cs
│       │   │   │   └── EquipmentListResponse.cs
│       │   │   ├── Alert/
│       │   │   │   ├── AlertResponse.cs
│       │   │   │   └── AlertListResponse.cs
│       │   │   ├── Location/
│       │   │   │   └── LocationResponse.cs
│       │   │   ├── WorkOrder/
│       │   │   │   ├── WorkOrderResponse.cs
│       │   │   │   └── WorkOrderListResponse.cs
│       │   │   ├── Common/
│       │   │   │   ├── ApiResponse.cs
│       │   │   │   ├── PagedResponse.cs
│       │   │   │   └── ErrorResponse.cs
│       │   │   └── Auth/
│       │   │       └── AuthResponse.cs
│       │   │
│       │   └── Mappers/              # DTO mapping profiles
│       │       ├── EquipmentProfile.cs
│       │       ├── AlertProfile.cs
│       │       ├── LocationProfile.cs
│       │       └── WorkOrderProfile.cs
│       │
│       ├── Middleware/               # Custom middleware
│       │   ├── FirebaseAuthMiddleware.cs
│       │   ├── ExceptionHandlingMiddleware.cs
│       │   ├── RequestLoggingMiddleware.cs
│       │   └── PerformanceMonitoringMiddleware.cs
│       │
│       ├── Validators/               # FluentValidation validators
│       │   ├── CreateEquipmentValidator.cs
│       │   ├── UpdateEquipmentValidator.cs
│       │   ├── CreateAlertValidator.cs
│       │   └── UpdateAlertValidator.cs
│       │
│       ├── Extensions/               # Extension methods
│       │   ├── ServiceCollectionExtensions.cs
│       │   ├── ApplicationBuilderExtensions.cs
│       │   └── QueryableExtensions.cs
│       │
│       ├── Filters/                  # Action filters
│       │   ├── ValidateModelStateFilter.cs
│       │   └── CacheFilter.cs
│       │
│       ├── Configuration/            # App configuration
│       │   ├── FirebaseSettings.cs
│       │   ├── DatabaseSettings.cs
│       │   ├── CacheSettings.cs
│       │   └── LoggingSettings.cs
│       │
│       ├── Constants/                # Application constants
│       │   ├── ApiRoutes.cs
│       │   ├── CacheKeys.cs
│       │   └── ErrorMessages.cs
│       │
│       ├── Helpers/                  # Utility classes
│       │   ├── DateTimeHelper.cs
│       │   ├── GeoLocationHelper.cs
│       │   └── PaginationHelper.cs
│       │
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       ├── appsettings.Production.json
│       ├── Program.cs
│       └── FaultReporter.API.csproj
│
├── tests/
│   ├── FaultReporter.API.Tests/      # Unit tests
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └── Validators/
│   │
│   └── FaultReporter.API.IntegrationTests/  # Integration tests
│       ├── Controllers/
│       └── Database/
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── DEPLOYMENT_GUIDE.md
│
├── scripts/
│   ├── seed-database.sql
│   └── backup-database.sh
│
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── README.md
└── FaultReporter.sln
```

---

## Naming Conventions

### C# Naming Standards

#### Classes, Interfaces, Properties, Methods

```csharp
// PascalCase for classes, interfaces, public members
public class EquipmentService { }
public interface IEquipmentService { }
public string EquipmentName { get; set; }
public async Task<Equipment> GetEquipmentAsync(Guid id) { }
```

#### Private Fields

```csharp
// _camelCase for private fields
private readonly ILogger<EquipmentService> _logger;
private readonly ApplicationDbContext _context;
```

#### Local Variables and Parameters

```csharp
// camelCase for local variables and parameters
public void ProcessEquipment(string equipmentCode)
{
    var equipment = await GetEquipmentAsync(equipmentCode);
    int totalCount = equipment.Count();
}
```

#### Constants

```csharp
// PascalCase for constants
public const string DefaultCacheDuration = "00:05:00";
public const int MaxPageSize = 100;
```

#### Async Methods

```csharp
// Always suffix async methods with 'Async'
public async Task<EquipmentResponse> GetEquipmentAsync(Guid id)
public async Task<bool> DeleteEquipmentAsync(Guid id)
```

### File Naming

- **Classes:** `EquipmentService.cs` (same as class name)
- **Interfaces:** `IEquipmentService.cs` (I prefix)
- **DTOs:** `CreateEquipmentRequest.cs`, `EquipmentResponse.cs`
- **Tests:** `EquipmentServiceTests.cs` (suffix with Tests)

### API Naming Conventions

#### Route Naming (REST Standards)

```csharp
// Use plural nouns, kebab-case for compound words
[Route("api/equipment")]
[Route("api/work-orders")]
[Route("api/technical-diagrams")]

// Version your API
[Route("api/v1/equipment")]
```

#### HTTP Method Usage

```csharp
// GET - Retrieve resources
[HttpGet]                           // GET /api/equipment
[HttpGet("{id}")]                   // GET /api/equipment/{id}
[HttpGet("{id}/location")]          // GET /api/equipment/{id}/location

// POST - Create new resource
[HttpPost]                          // POST /api/equipment

// PUT - Full update of resource
[HttpPut("{id}")]                   // PUT /api/equipment/{id}

// PATCH - Partial update (optional, use PUT if not needed)
[HttpPatch("{id}")]                 // PATCH /api/equipment/{id}

// DELETE - Remove resource
[HttpDelete("{id}")]                // DELETE /api/equipment/{id}
```

### Database Naming Conventions

#### Table Names

```sql
-- Plural, snake_case
equipment
alerts
work_orders
locations
technical_diagrams
iot_data
```

#### Column Names

```sql
-- snake_case
id
equipment_code
equipment_name
created_at
updated_at
is_active
```

#### Foreign Keys

```sql
-- {related_table}_id
location_id
equipment_id
user_id
```

#### Indexes

```sql
-- idx_{table}_{column(s)}
idx_equipment_code
idx_alerts_status
idx_equipment_location_id
```

---

## Database Schema Design

### Core Tables

#### 1. Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    phone_number VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'technician',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_users_email ON users(email);
```

#### 2. Locations Table

```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_name VARCHAR(200) NOT NULL,
    building_address TEXT,
    floor VARCHAR(50),
    room VARCHAR(100),
    zone VARCHAR(100),
    coordinates POINT,  -- PostgreSQL spatial type (latitude, longitude)
    access_instructions TEXT,
    nearby_landmarks TEXT[],  -- Array of strings
    safety_notes TEXT[],      -- Array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_locations_building_name ON locations(building_name);
CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);
```

#### 3. Equipment Table

```sql
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_code VARCHAR(50) UNIQUE NOT NULL,
    equipment_name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'ONLINE',  -- ONLINE, OFFLINE, MAINTENANCE, ERROR
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,

    -- Specifications
    asset_number VARCHAR(100),
    installation_date DATE,
    capacity VARCHAR(100),
    model VARCHAR(200),
    manufacturer VARCHAR(200),
    serial_number VARCHAR(200),
    plant_rm VARCHAR(100),
    commissioned_date DATE,
    initial_value DECIMAL(15, 2),
    age_years INTEGER,
    expected_lifespan_years INTEGER,
    warranty_expiry_date DATE,

    -- Metadata
    metadata JSONB,  -- Flexible storage for additional data

    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_equipment_code ON equipment(equipment_code);
CREATE INDEX idx_equipment_status ON equipment(status);
CREATE INDEX idx_equipment_location_id ON equipment(location_id);
CREATE INDEX idx_equipment_metadata ON equipment USING GIN(metadata);
CREATE INDEX idx_equipment_created_at ON equipment(created_at DESC);
```

#### 4. Alerts Table

```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id),

    priority VARCHAR(50) NOT NULL DEFAULT 'Medium',  -- Critical, High, Medium, Low, Routine
    status VARCHAR(50) NOT NULL DEFAULT 'New',       -- New, In Progress, Completed, Waiting AI

    plant_system_name VARCHAR(200),
    subsystem_details VARCHAR(200),

    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_date TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,

    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_alerts_code ON alerts(code);
CREATE INDEX idx_alerts_equipment_id ON alerts(equipment_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_priority ON alerts(priority);
CREATE INDEX idx_alerts_assigned_to ON alerts(assigned_to);
CREATE INDEX idx_alerts_created_at ON alerts(created_at DESC);
CREATE INDEX idx_alerts_due_date ON alerts(due_date);
```

#### 5. Work Orders Table

```sql
CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
    alert_id UUID REFERENCES alerts(id),
    location_id UUID REFERENCES locations(id),

    priority VARCHAR(50) NOT NULL DEFAULT 'Medium',
    status VARCHAR(50) NOT NULL DEFAULT 'New',

    scheduled_start TIMESTAMP WITH TIME ZONE,
    scheduled_end TIMESTAMP WITH TIME ZONE,
    actual_start TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,

    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),

    estimated_hours DECIMAL(5, 2),
    actual_hours DECIMAL(5, 2),

    parts_used JSONB,  -- Array of parts with quantities and costs
    labor_cost DECIMAL(10, 2),
    parts_cost DECIMAL(10, 2),
    total_cost DECIMAL(10, 2),

    completion_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_work_orders_code ON work_orders(code);
CREATE INDEX idx_work_orders_equipment_id ON work_orders(equipment_id);
CREATE INDEX idx_work_orders_status ON work_orders(status);
CREATE INDEX idx_work_orders_assigned_to ON work_orders(assigned_to);
CREATE INDEX idx_work_orders_scheduled_start ON work_orders(scheduled_start);
```

#### 6. IoT Data Table

```sql
CREATE TABLE iot_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,

    -- Sensor readings
    temperature_celsius DECIMAL(5, 2),
    temperature_status VARCHAR(20),      -- good, warning, critical
    temperature_trend VARCHAR(20),       -- up, down, stable

    pressure_bar DECIMAL(6, 2),
    pressure_status VARCHAR(20),
    pressure_trend VARCHAR(20),

    flow_rate_lpm DECIMAL(8, 2),
    flow_rate_status VARCHAR(20),
    flow_rate_trend VARCHAR(20),

    energy_use_kwh DECIMAL(10, 2),
    energy_status VARCHAR(20),
    energy_trend VARCHAR(20),

    operating_hours INTEGER,
    operating_hours_status VARCHAR(20),

    -- Metadata
    raw_data JSONB,  -- Store raw sensor payload

    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_iot_data_equipment_id ON iot_data(equipment_id);
CREATE INDEX idx_iot_data_recorded_at ON iot_data(recorded_at DESC);
CREATE INDEX idx_iot_data_equipment_recorded ON iot_data(equipment_id, recorded_at DESC);

-- Partition by month for better performance (optional, advanced)
-- CREATE TABLE iot_data_2025_01 PARTITION OF iot_data
-- FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

#### 7. Technical Diagrams Table

```sql
CREATE TABLE technical_diagrams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,

    title VARCHAR(200) NOT NULL,
    description TEXT,
    diagram_type VARCHAR(50),  -- schematic, wiring, plumbing, electrical, general

    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    file_type VARCHAR(50),
    thumbnail_url TEXT,

    uploaded_by UUID REFERENCES users(id),
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_technical_diagrams_equipment_id ON technical_diagrams(equipment_id);
CREATE INDEX idx_technical_diagrams_type ON technical_diagrams(diagram_type);
```

#### 8. Energy Consumption Table

```sql
CREATE TABLE energy_consumption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,

    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),

    consumption_kwh DECIMAL(12, 2) NOT NULL,
    cost_usd DECIMAL(10, 2),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(equipment_id, year, quarter)
);

CREATE INDEX idx_energy_consumption_equipment_id ON energy_consumption(equipment_id);
CREATE INDEX idx_energy_consumption_year_quarter ON energy_consumption(year, quarter);
```

#### 9. Asset Reliability Table

```sql
CREATE TABLE asset_reliability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,

    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),

    maintenance_cost DECIMAL(10, 2),
    parts_cost DECIMAL(10, 2),
    energy_cost DECIMAL(10, 2),

    mtbf_hours DECIMAL(10, 2),  -- Mean Time Between Failures
    mttr_hours DECIMAL(8, 2),   -- Mean Time To Repair

    downtime_hours DECIMAL(8, 2),
    availability_percent DECIMAL(5, 2),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(equipment_id, year, quarter)
);

CREATE INDEX idx_asset_reliability_equipment_id ON asset_reliability(equipment_id);
CREATE INDEX idx_asset_reliability_year_quarter ON asset_reliability(year, quarter);
```

#### 10. User Equipment Assignments Table

```sql
CREATE TABLE user_equipment_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,

    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID REFERENCES users(id),

    UNIQUE(user_id, equipment_id)
);

CREATE INDEX idx_user_equipment_user_id ON user_equipment_assignments(user_id);
CREATE INDEX idx_user_equipment_equipment_id ON user_equipment_assignments(equipment_id);
```

#### 11. Audit Logs Table

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    entity_type VARCHAR(100) NOT NULL,  -- Equipment, Alert, WorkOrder, etc.
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,        -- CREATE, UPDATE, DELETE

    user_id UUID REFERENCES users(id),
    user_email VARCHAR(255),

    old_values JSONB,
    new_values JSONB,
    changes JSONB,

    ip_address VARCHAR(45),
    user_agent TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

### Database Views (Optional)

#### Equipment Summary View

```sql
CREATE VIEW v_equipment_summary AS
SELECT
    e.id,
    e.equipment_code,
    e.equipment_name,
    e.status,
    l.building_name,
    l.floor,
    l.room,
    COUNT(DISTINCT a.id) AS open_alerts_count,
    COUNT(DISTINCT wo.id) AS open_work_orders_count,
    MAX(iot.recorded_at) AS last_iot_reading,
    e.created_at,
    e.updated_at
FROM equipment e
LEFT JOIN locations l ON e.location_id = l.id
LEFT JOIN alerts a ON e.id = a.equipment_id AND a.status != 'Completed'
LEFT JOIN work_orders wo ON e.id = wo.equipment_id AND wo.status != 'Completed'
LEFT JOIN iot_data iot ON e.id = iot.equipment_id
GROUP BY e.id, l.id;
```

---

## API Endpoints Specification

### Base URL

```
Development: https://localhost:5001/api/v1
Production: https://api.faultreporter.com/api/v1
```

### Authentication

All endpoints (except `/health` and `/auth/*`) require Firebase JWT token in header:

```
Authorization: Bearer {firebase_jwt_token}
```

### Common Response Format

#### Success Response

```json
{
  "success": true,
  "data": {
    /* resource data */
  },
  "message": "Operation completed successfully",
  "timestamp": "2025-11-25T10:30:00Z"
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "EQUIPMENT_NOT_FOUND",
    "message": "Equipment with ID 'abc-123' not found",
    "details": []
  },
  "timestamp": "2025-11-25T10:30:00Z"
}
```

#### Paginated Response

```json
{
  "success": true,
  "data": [
    /* array of resources */
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalCount": 95,
    "hasNext": true,
    "hasPrevious": false
  },
  "timestamp": "2025-11-25T10:30:00Z"
}
```

### Endpoint Definitions

#### 1. Health Check

```
GET /health
Response: 200 OK
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected",
  "timestamp": "2025-11-25T10:30:00Z"
}
```

#### 2. Authentication Endpoints

```
POST /api/v1/auth/verify
Request: { "firebaseToken": "..." }
Response: { "success": true, "user": { "id": "...", "email": "...", "role": "..." } }

GET /api/v1/auth/me
Response: { "success": true, "data": { /* user profile */ } }
```

#### 3. Equipment Endpoints

```
GET /api/v1/equipment
Query params: ?page=1&pageSize=20&status=ONLINE&search=chiller
Response: Paginated list of equipment

GET /api/v1/equipment/{id}
Response: Detailed equipment information

GET /api/v1/equipment/{id}/location
Response: Location details for equipment

GET /api/v1/equipment/{id}/iot-data?from=2025-01-01&to=2025-01-31
Response: IoT sensor data for date range

GET /api/v1/equipment/{id}/work-orders
Response: Work orders associated with equipment

GET /api/v1/equipment/{id}/alerts
Response: Alerts associated with equipment

GET /api/v1/equipment/{id}/diagrams
Response: Technical diagrams for equipment

GET /api/v1/equipment/{id}/energy-consumption?year=2025
Response: Energy consumption data

GET /api/v1/equipment/{id}/reliability?year=2025
Response: Reliability metrics (MTBF, MTTR)

POST /api/v1/equipment
Request: CreateEquipmentRequest
Response: Created equipment

PUT /api/v1/equipment/{id}
Request: UpdateEquipmentRequest
Response: Updated equipment

DELETE /api/v1/equipment/{id}
Response: 204 No Content
```

#### 4. Location Endpoints

```
GET /api/v1/locations
Response: List of all locations

GET /api/v1/locations/{id}
Response: Location details

GET /api/v1/locations/{id}/equipment
Response: Equipment at this location

POST /api/v1/locations
Request: CreateLocationRequest
Response: Created location

PUT /api/v1/locations/{id}
Request: UpdateLocationRequest
Response: Updated location
```

#### 5. Alert Endpoints

```
GET /api/v1/alerts
Query params: ?page=1&pageSize=20&status=New&priority=Critical
Response: Paginated list of alerts

GET /api/v1/alerts/{id}
Response: Alert details

POST /api/v1/alerts
Request: CreateAlertRequest
Response: Created alert

PUT /api/v1/alerts/{id}
Request: UpdateAlertRequest
Response: Updated alert

PATCH /api/v1/alerts/{id}/status
Request: { "status": "In Progress" }
Response: Updated alert

DELETE /api/v1/alerts/{id}
Response: 204 No Content
```

#### 6. Work Order Endpoints

```
GET /api/v1/work-orders
Query params: ?page=1&pageSize=20&status=New&assignedTo={userId}
Response: Paginated list of work orders

GET /api/v1/work-orders/{id}
Response: Work order details

POST /api/v1/work-orders
Request: CreateWorkOrderRequest
Response: Created work order

PUT /api/v1/work-orders/{id}
Request: UpdateWorkOrderRequest
Response: Updated work order

PATCH /api/v1/work-orders/{id}/assign
Request: { "userId": "..." }
Response: Updated work order

PATCH /api/v1/work-orders/{id}/complete
Request: { "completionNotes": "...", "actualHours": 3.5 }
Response: Completed work order
```

#### 7. User Equipment Assignments

```
GET /api/v1/users/{userId}/equipment
Response: Equipment assigned to user

POST /api/v1/users/{userId}/equipment/{equipmentId}
Response: Assignment created

DELETE /api/v1/users/{userId}/equipment/{equipmentId}
Response: 204 No Content

GET /api/v1/equipment/{equipmentId}/assigned-users
Response: Users assigned to equipment
```

#### 8. Fault Detection (Future)

```
POST /api/v1/fault-detection/analyze
Request: { "equipmentId": "...", "images": ["base64..."], "provider": "openai" }
Response: AI analysis results
```

---

## Implementation Phases

### Phase 1: Project Setup & Infrastructure (Week 1)

**Objectives:**

- ✅ Create .NET 10 Web API project
- ✅ Configure PostgreSQL connection to DigitalOcean
- ✅ Set up Entity Framework Core
- ✅ Configure Firebase Authentication
- ✅ Implement basic middleware (auth, logging, error handling)
- ✅ Set up Swagger/OpenAPI documentation
- ✅ Configure dependency injection

**Tasks:**

1. Create solution and project structure

   ```bash
   dotnet new sln -n FaultReporter
   dotnet new webapi -n FaultReporter.API -o src/FaultReporter.API
   dotnet sln add src/FaultReporter.API/FaultReporter.API.csproj
   ```

2. Install required NuGet packages

   ```bash
   dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 10.0.0
   dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.0
   dotnet add package FirebaseAdmin --version 3.1.0
   dotnet add package Serilog.AspNetCore --version 10.0.0
   dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 13.0.0
   dotnet add package FluentValidation.AspNetCore --version 11.3.0
   dotnet add package Swashbuckle.AspNetCore --version 7.2.0
   ```

3. Create `appsettings.json` configuration

4. Implement `Program.cs` with services configuration

5. Create `ApplicationDbContext.cs`

6. Create initial database migration

**Deliverables:**

- ✅ Running .NET 10 API project
- ✅ Connected to DigitalOcean PostgreSQL
- ✅ Swagger UI accessible at `/swagger`
- ✅ Health check endpoint working
- ✅ Firebase auth middleware implemented

---

### Phase 2: Core Domain Models & Database (Week 1-2)

**Objectives:**

- ✅ Define all entity models
- ✅ Create Entity Framework configurations
- ✅ Generate and apply database migrations
- ✅ Seed initial test data

**Tasks:**

1. Create entity classes in `Models/Entities/`
   - User.cs
   - Location.cs
   - Equipment.cs
   - Alert.cs
   - WorkOrder.cs
   - IoTData.cs
   - TechnicalDiagram.cs
   - EnergyConsumption.cs
   - AssetReliability.cs
   - UserEquipmentAssignment.cs
   - AuditLog.cs

2. Create entity configurations in `Data/Configurations/`
   - Define relationships
   - Configure indexes
   - Set up value conversions

3. Generate migrations

   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. Create database seeding script with sample data

**Deliverables:**

- ✅ Complete database schema in PostgreSQL
- ✅ EF Core models match TypeScript interfaces
- ✅ Sample data seeded for testing

---

### Phase 3: Repository Layer (Week 2)

**Objectives:**

- ✅ Implement repository pattern for data access
- ✅ Create generic repository base class
- ✅ Implement specific repositories for each entity

**Tasks:**

1. Create `IRepository<T>` interface

2. Implement `Repository<T>` base class with common CRUD operations

3. Create specific repository interfaces and implementations:
   - IEquipmentRepository / EquipmentRepository
   - IAlertRepository / AlertRepository
   - ILocationRepository / LocationRepository
   - IWorkOrderRepository / WorkOrderRepository
   - IIoTDataRepository / IoTDataRepository

4. Register repositories in DI container

**Deliverables:**

- ✅ Complete repository layer
- ✅ Unit tests for repositories
- ✅ Repository methods return `IQueryable<T>` for flexibility

---

### Phase 4: Service Layer & Business Logic (Week 2-3)

**Objectives:**

- ✅ Implement service layer with business logic
- ✅ Create DTOs for requests/responses
- ✅ Set up AutoMapper profiles

**Tasks:**

1. Create DTO classes in `DTOs/Requests/` and `DTOs/Responses/`

2. Create AutoMapper profiles for entity-DTO mapping

3. Implement service interfaces and classes:
   - IEquipmentService / EquipmentService
   - IAlertService / AlertService
   - ILocationService / LocationService
   - IWorkOrderService / WorkOrderService
   - IAuthService / AuthService

4. Implement business rules and validation logic

5. Register services in DI container

**Deliverables:**

- ✅ Complete service layer
- ✅ Unit tests for services
- ✅ Business logic separated from controllers

---

### Phase 5: API Controllers & Endpoints (Week 3)

**Objectives:**

- ✅ Implement all API controllers
- ✅ Add request validation
- ✅ Configure routing and versioning

**Tasks:**

1. Create controllers:
   - HealthController
   - AuthController
   - EquipmentController
   - AlertsController
   - LocationController
   - WorkOrdersController

2. Implement FluentValidation validators for all request DTOs

3. Add XML documentation comments for Swagger

4. Test all endpoints with Postman/Thunder Client

**Deliverables:**

- ✅ All endpoints implemented and documented
- ✅ Request validation working
- ✅ Swagger UI shows all endpoints with examples

---

### Phase 6: Advanced Features (Week 4)

**Objectives:**

- ✅ Implement pagination, filtering, sorting
- ✅ Add caching layer
- ✅ Implement audit logging
- ✅ Add performance monitoring

**Tasks:**

1. Create pagination helper and extension methods

2. Implement filtering and sorting for list endpoints

3. Add Redis caching for frequently accessed data

4. Implement audit logging for all data modifications

5. Add request/response logging middleware

6. Implement performance monitoring middleware

**Deliverables:**

- ✅ Efficient list endpoints with pagination
- ✅ Caching improves response times
- ✅ Audit trail for all changes
- ✅ Performance metrics logged

---

### Phase 7: Testing (Week 4-5)

**Objectives:**

- ✅ Write comprehensive unit tests
- ✅ Write integration tests
- ✅ Achieve >80% code coverage

**Tasks:**

1. Create unit tests for:
   - Services
   - Repositories
   - Validators
   - Helpers

2. Create integration tests for:
   - Controllers
   - Database operations
   - Authentication flow

3. Set up code coverage reporting

4. Fix bugs discovered during testing

**Deliverables:**

- ✅ >80% unit test coverage
- ✅ Integration tests for critical paths
- ✅ All tests passing in CI/CD

---

### Phase 8: Deployment Preparation (Week 5)

**Objectives:**

- ✅ Prepare for production deployment
- ✅ Configure Docker
- ✅ Set up CI/CD pipeline
- ✅ Performance testing

**Tasks:**

1. Create Dockerfile and docker-compose.yml

2. Configure environment-specific settings

3. Set up GitHub Actions for CI/CD

4. Perform load testing

5. Security audit

6. Create deployment documentation

**Deliverables:**

- ✅ Docker image builds successfully
- ✅ CI/CD pipeline deploys to staging
- ✅ Load tests pass
- ✅ Security vulnerabilities addressed

---

### Phase 9: Production Deployment (Week 6)

**Objectives:**

- ✅ Deploy to production
- ✅ Monitor and optimize
- ✅ Update mobile app to use production API

**Tasks:**

1. Deploy API to Railway/DigitalOcean

2. Configure production database connection

3. Set up monitoring and alerting

4. Update React Native app environment variables

5. Test end-to-end flow

6. Create runbooks for operations

**Deliverables:**

- ✅ API running in production
- ✅ Mobile app connected to production API
- ✅ Monitoring dashboards configured
- ✅ Documentation complete

---

## Technology Stack

### Core Framework

- **ASP.NET Core 10.0** (LTS) - Web API framework
- **C# 13** - Programming language
- **.NET SDK 10.0** - Runtime and SDK

### Database

- **PostgreSQL 16** - Primary database (DigitalOcean)
- **Entity Framework Core 10.0** - ORM
- **Npgsql 10.0** - PostgreSQL provider for EF Core

### Authentication

- **FirebaseAdmin 3.1+** - Firebase Authentication SDK
- **Microsoft.AspNetCore.Authentication.JwtBearer** - JWT middleware

### Validation

- **FluentValidation 11.3+** - Request validation
- **FluentValidation.AspNetCore** - ASP.NET Core integration

### Mapping

- **AutoMapper 13.0+** - Object-to-object mapping
- **AutoMapper.Extensions.Microsoft.DependencyInjection** - DI integration

### Logging

- **Serilog.AspNetCore 10.0+** - Structured logging
- **Serilog.Sinks.Console** - Console logging
- **Serilog.Sinks.File** - File logging
- **Serilog.Sinks.Seq** (optional) - Centralized log viewer

### API Documentation

- **Swashbuckle.AspNetCore 7.2+** - Swagger/OpenAPI generation
- **Microsoft.AspNetCore.OpenApi** - OpenAPI support

### Caching (Optional)

- **StackExchange.Redis** - Redis client
- **Microsoft.Extensions.Caching.Memory** - In-memory cache

### Testing

- **xUnit 2.9+** - Test framework
- **Moq 4.20+** - Mocking library
- **FluentAssertions 7.0+** - Assertion library
- **Microsoft.AspNetCore.Mvc.Testing** - Integration testing
- **Bogus 35.0+** - Fake data generation

### Development Tools

- **Microsoft.EntityFrameworkCore.Design** - EF Core CLI tools
- **dotnet-ef** - EF Core command-line tool

### Additional Libraries

- **Polly 8.0+** (optional) - Resilience and transient-fault-handling
- **Hangfire** (optional) - Background job processing
- **MediatR** (optional) - CQRS pattern implementation

---

## Configuration & Environment

### appsettings.json Structure

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-db.db.ondigitalocean.com;Port=25060;Database=faultreporter;Username=doadmin;Password=your_password;SSL Mode=Require;Trust Server Certificate=true"
  },
  "Firebase": {
    "ProjectId": "your-firebase-project-id",
    "ServiceAccountPath": "firebase-adminsdk.json"
  },
  "ApiSettings": {
    "Version": "1.0.0",
    "Title": "Fault Reporter API",
    "Description": "API for equipment fault monitoring and management",
    "EnableSwagger": true,
    "DefaultPageSize": 20,
    "MaxPageSize": 100
  },
  "CacheSettings": {
    "DefaultCacheDurationMinutes": 5,
    "EquipmentCacheDurationMinutes": 10,
    "LocationCacheDurationMinutes": 30
  },
  "Cors": {
    "AllowedOrigins": ["https://faultreporter.app", "exp://localhost:8081"]
  }
}
```

### appsettings.Development.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=faultreporter_dev;Username=postgres;Password=dev_password"
  },
  "ApiSettings": {
    "EnableSwagger": true
  },
  "Cors": {
    "AllowedOrigins": ["*"]
  }
}
```

### appsettings.Production.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Error"
    }
  },
  "ApiSettings": {
    "EnableSwagger": false
  }
}
```

### Environment Variables (for Production)

```bash
# Database
DATABASE_URL=Host=db.digitalocean.com;Port=25060;Database=faultreporter;Username=doadmin;Password=xxx;SSL Mode=Require

# Firebase
FIREBASE_PROJECT_ID=fault-reporter-prod
FIREBASE_SERVICE_ACCOUNT_PATH=/app/firebase-adminsdk.json

# ASP.NET Core
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:80;https://+:443

# Secrets (use environment variables, not appsettings)
JWT_SECRET=your-jwt-secret-key
ENCRYPTION_KEY=your-encryption-key
```

---

## Security Considerations

### 1. Authentication & Authorization

**Firebase JWT Validation:**

```csharp
// Validate all requests have valid Firebase token
app.UseMiddleware<FirebaseAuthMiddleware>();

// Check user roles for sensitive operations
[Authorize(Roles = "admin,manager")]
public async Task<IActionResult> DeleteEquipment(Guid id)
```

**Best Practices:**

- ✅ Always validate Firebase tokens server-side
- ✅ Never trust client-provided user IDs
- ✅ Implement role-based access control (RBAC)
- ✅ Use claims-based authorization for fine-grained control

### 2. Input Validation

**FluentValidation:**

```csharp
public class CreateEquipmentValidator : AbstractValidator<CreateEquipmentRequest>
{
    public CreateEquipmentValidator()
    {
        RuleFor(x => x.EquipmentCode)
            .NotEmpty()
            .MaximumLength(50)
            .Matches(@"^[A-Z0-9-]+$");

        RuleFor(x => x.EquipmentName)
            .NotEmpty()
            .MaximumLength(200);
    }
}
```

**Best Practices:**

- ✅ Validate all user inputs
- ✅ Sanitize inputs to prevent XSS
- ✅ Use parameterized queries to prevent SQL injection (EF Core handles this)
- ✅ Validate file uploads (type, size)

### 3. SQL Injection Prevention

**Entity Framework Core:**

```csharp
// GOOD - Parameterized query (EF Core does this automatically)
var equipment = await _context.Equipment
    .Where(e => e.EquipmentCode == code)
    .FirstOrDefaultAsync();

// BAD - Never use raw SQL with user input
// var equipment = await _context.Equipment
//     .FromSqlRaw($"SELECT * FROM equipment WHERE code = '{code}'")
//     .FirstOrDefaultAsync();
```

### 4. Sensitive Data Protection

**Connection Strings:**

- ✅ Store in environment variables or Azure Key Vault
- ✅ Never commit to source control
- ✅ Use secrets management in production

**API Keys:**

```csharp
// Use User Secrets in development
dotnet user-secrets set "Firebase:ServiceAccountPath" "path/to/file.json"

// Use environment variables in production
var firebaseConfig = Environment.GetEnvironmentVariable("FIREBASE_CONFIG");
```

### 5. HTTPS Enforcement

```csharp
// Program.cs
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.UseHsts();
}
```

### 6. CORS Configuration

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.WithOrigins(
            builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
```

### 7. Rate Limiting

```csharp
// Add rate limiting to prevent abuse
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.User.Identity?.Name ?? context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});
```

### 8. Security Headers

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});
```

---

## Testing Strategy

### Unit Testing

**Structure:**

```
FaultReporter.API.Tests/
├── Services/
│   ├── EquipmentServiceTests.cs
│   ├── AlertServiceTests.cs
│   └── LocationServiceTests.cs
├── Repositories/
│   └── EquipmentRepositoryTests.cs
├── Validators/
│   └── CreateEquipmentValidatorTests.cs
└── Helpers/
    └── PaginationHelperTests.cs
```

**Example Test:**

```csharp
public class EquipmentServiceTests
{
    private readonly Mock<IEquipmentRepository> _mockRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<ILogger<EquipmentService>> _mockLogger;
    private readonly EquipmentService _service;

    public EquipmentServiceTests()
    {
        _mockRepository = new Mock<IEquipmentRepository>();
        _mockMapper = new Mock<IMapper>();
        _mockLogger = new Mock<ILogger<EquipmentService>>();
        _service = new EquipmentService(_mockRepository.Object, _mockMapper.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsEquipment()
    {
        // Arrange
        var equipmentId = Guid.NewGuid();
        var equipment = new Equipment { Id = equipmentId, EquipmentCode = "EQ-001" };
        var expectedResponse = new EquipmentResponse { Id = equipmentId, EquipmentCode = "EQ-001" };

        _mockRepository.Setup(r => r.GetByIdAsync(equipmentId))
            .ReturnsAsync(equipment);
        _mockMapper.Setup(m => m.Map<EquipmentResponse>(equipment))
            .Returns(expectedResponse);

        // Act
        var result = await _service.GetByIdAsync(equipmentId);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(equipmentId);
        result.EquipmentCode.Should().Be("EQ-001");
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        // Arrange
        var equipmentId = Guid.NewGuid();
        _mockRepository.Setup(r => r.GetByIdAsync(equipmentId))
            .ReturnsAsync((Equipment)null);

        // Act
        var result = await _service.GetByIdAsync(equipmentId);

        // Assert
        result.Should().BeNull();
    }
}
```

### Integration Testing

**Example Integration Test:**

```csharp
public class EquipmentControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public EquipmentControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/v1/equipment");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("success");
    }
}
```

### Test Coverage Goals

- **Unit Tests:** >80% coverage
- **Integration Tests:** Cover all critical endpoints
- **Happy Path:** 100% coverage
- **Edge Cases:** Cover error scenarios, validation failures

---

## Deployment Checklist

### Pre-Deployment

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Code reviewed and approved
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Database migrations prepared
- [ ] Environment variables configured
- [ ] Firebase service account key uploaded
- [ ] SSL certificates configured
- [ ] CORS origins configured
- [ ] Logging configured
- [ ] Monitoring/alerting set up

### Deployment Steps

1. **Database Migration**

   ```bash
   dotnet ef database update --connection "Host=prod-db;..."
   ```

2. **Build Docker Image**

   ```bash
   docker build -t faultreporter-api:v1.0.0 .
   ```

3. **Deploy to Railway/DigitalOcean**

   ```bash
   # Railway CLI
   railway up

   # Or Docker deploy
   docker push registry.digitalocean.com/faultreporter/api:v1.0.0
   ```

4. **Verify Deployment**
   - [ ] Health check endpoint returns 200
   - [ ] Swagger UI accessible (if enabled)
   - [ ] Database connection successful
   - [ ] Authentication working
   - [ ] Test CRUD operations

5. **Update Mobile App**
   - [ ] Update `EXPO_PUBLIC_API_BASE_URL` to production URL
   - [ ] Update `EXPO_PUBLIC_USE_MOCK_API` to `false`
   - [ ] Test end-to-end flow

### Post-Deployment

- [ ] Monitor error logs for 24 hours
- [ ] Check performance metrics
- [ ] Verify all features working
- [ ] Create rollback plan
- [ ] Update documentation
- [ ] Notify stakeholders

---

## Next Steps

### Immediate Actions (Before Implementation)

1. **Review This Plan**
   - ✅ Confirm architecture aligns with requirements
   - ✅ Verify database schema matches mobile app needs
   - ✅ Approve API endpoint structure
   - ✅ Validate technology stack choices

2. **Prepare Environment**
   - [ ] Create DigitalOcean PostgreSQL database
   - [ ] Set up Firebase project (if not already done)
   - [ ] Download Firebase service account key
   - [ ] Install .NET 10 SDK
   - [ ] Install PostgreSQL client tools

3. **Create Repository**
   - [ ] Create new Git repository for API
   - [ ] Add .gitignore for .NET projects
   - [ ] Set up branch protection rules

4. **Documentation Updates**
   - [ ] Review and approve this plan
   - [ ] Note any changes or concerns
   - [ ] Create GitHub issues for each phase

### Ready to Start?

Once you approve this plan, we can begin with **Phase 1: Project Setup & Infrastructure**.

The implementation will follow this sequence:

1. Create project structure
2. Configure database connection
3. Set up Firebase authentication
4. Implement middleware
5. Create initial migration
6. Test basic connectivity

Would you like to proceed with implementation, or would you like to modify any part of this plan first?

---

**Document Version:** 1.0
**Last Updated:** 2025-11-25
**Status:** Ready for Review
**Estimated Timeline:** 6 weeks
**Estimated Effort:** 200-250 hours
