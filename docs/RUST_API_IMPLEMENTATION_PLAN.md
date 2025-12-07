# Rust API Implementation Plan for Fault Reporter

**Project Name:** fault-reporter-api
**Framework:** Axum (with Shuttle.rs runtime)
**Database:** PostgreSQL (DigitalOcean)
**Authentication:** Firebase Authentication
**Architecture:** Clean Architecture with Repository Pattern
**API Style:** RESTful API with OpenAPI documentation
**Hosting:** Shuttle.rs (Free tier with built-in PostgreSQL)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Why Rust + Shuttle.rs?](#why-rust--shuttlers)
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
13. [Deployment with Shuttle](#deployment-with-shuttle)

---

## Project Overview

### Purpose

Build a high-performance, memory-safe RESTful API using Rust to support the Fault Reporter mobile application, leveraging Shuttle.rs for simplified deployment and built-in PostgreSQL integration.

### Key Features

- ✅ Blazing-fast equipment management (CRUD operations)
- ✅ Location tracking and navigation
- ✅ Alert/Work order management
- ✅ AI fault detection integration (future)
- ✅ Real-time IoT data monitoring
- ✅ User authentication via Firebase
- ✅ Asset reliability analytics
- ✅ Compile-time safety guarantees

### Non-Functional Requirements

- **Performance:** Response time < 100ms for 95% of requests
- **Memory Safety:** Zero-cost abstractions, no runtime overhead
- **Scalability:** Support 10,000+ concurrent connections
- **Availability:** 99.9% uptime
- **Security:** Type-safe Firebase JWT validation, guaranteed no SQL injection
- **Deployment:** One-command deployment with Shuttle

---

## Why Rust + Shuttle.rs?

### Rust Advantages

**Performance Benefits:**

- ⚡ **3-5x faster than .NET** for typical workloads
- ⚡ **10-15x faster than Python** for I/O operations
- ⚡ Zero-cost abstractions - no garbage collection pauses
- ⚡ Compile to native code with LLVM optimizations

**Memory Safety:**

- 🛡️ **No null pointer exceptions** - Option<T> instead of null
- 🛡️ **No data races** - Ownership system prevents concurrent modification
- 🛡️ **No buffer overflows** - Bounds checking at compile time
- 🛡️ **No use-after-free** - Lifetime system tracks memory

**Type Safety:**

- ✅ **Compile-time query validation** with SQLx
- ✅ **Exhaustive pattern matching** - compiler ensures all cases handled
- ✅ **Strong type system** - prevents many runtime errors
- ✅ **Trait-based polymorphism** - safe abstractions

**Developer Experience:**

- 📦 **Cargo** - Best-in-class package manager and build tool
- 📖 **Rustdoc** - Excellent documentation generation
- 🧪 **Built-in testing** - Unit and integration tests integrated
- 🔧 **Clippy** - Powerful linter for best practices

### Shuttle.rs Advantages

**Why Shuttle is Perfect for Rust:**

1. **Zero-Config Infrastructure**

   ```rust
   // Automatic PostgreSQL provisioning
   #[shuttle_runtime::main]
   async fn main(
       #[shuttle_shared_db::Postgres] pool: PgPool,
   ) -> shuttle_axum::ShuttleAxum {
       // Database automatically created and connected!
   }
   ```

2. **Free Tier Benefits**
   - ✅ Free PostgreSQL database included
   - ✅ Free HTTPS/SSL certificates
   - ✅ Free custom domains
   - ✅ No credit card required
   - ✅ Always-on (no sleep mode)

3. **Rust-Native Deployment**

   ```bash
   cargo shuttle deploy
   # That's it! Your API is live.
   ```

4. **Built-in Secrets Management**

   ```bash
   # Secrets stored securely, injected at runtime
   cargo shuttle secrets add FIREBASE_PROJECT_ID=my-project
   ```

5. **Local Development Parity**

   ```bash
   # Run exactly as it will in production
   cargo shuttle run
   ```

6. **Performance**
   - 🚀 Native Rust binary (10-20MB)
   - 🚀 Minimal memory footprint (~50MB)
   - 🚀 Instant cold starts
   - 🚀 Global CDN for static assets

**Comparison with Other Hosts:**

| Feature              | Shuttle.rs  | Railway    | Fly.io    | Render     |
| -------------------- | ----------- | ---------- | --------- | ---------- |
| **Rust-native**      | ✅ Yes      | ⚠️ Docker  | ⚠️ Docker | ⚠️ Docker  |
| **Free PostgreSQL**  | ✅ Included | ⚠️ Limited | ❌ No     | ⚠️ 90 days |
| **Always-on (free)** | ✅ Yes      | ❌ Sleeps  | ✅ Yes    | ❌ Sleeps  |
| **One-cmd deploy**   | ✅ Yes      | ⚠️ Config  | ⚠️ Config | ⚠️ Config  |
| **HTTPS**            | ✅ Auto     | ✅ Auto    | ✅ Auto   | ✅ Auto    |
| **Custom domains**   | ✅ Free     | ✅ Free    | ✅ Free   | ✅ Free    |

---

## Architecture & Design Principles

### Clean Architecture in Rust

```
┌─────────────────────────────────────────────┐
│      Presentation Layer (Handlers)          │  ← HTTP routes, validation
├─────────────────────────────────────────────┤
│      Application Layer (Services)           │  ← Business logic
├─────────────────────────────────────────────┤
│      Infrastructure Layer (Repositories)    │  ← Database, external APIs
├─────────────────────────────────────────────┤
│      Domain Layer (Models/Entities)         │  ← Core business types
└─────────────────────────────────────────────┘
```

### Rust-Specific Principles

**Ownership & Borrowing:**

```rust
// Data ownership prevents memory issues
fn process_equipment(equipment: Equipment) -> Result<(), Error> {
    // equipment is moved here, caller can't use it anymore
}

fn read_equipment(equipment: &Equipment) -> String {
    // Borrowed immutably, can be used multiple times
    equipment.name.clone()
}

fn update_equipment(equipment: &mut Equipment) {
    // Borrowed mutably, exclusive access guaranteed
    equipment.status = EquipmentStatus::Maintenance;
}
```

**Error Handling:**

```rust
// Result<T, E> for recoverable errors
async fn get_equipment(id: Uuid) -> Result<Equipment, ApiError> {
    let equipment = repository.find_by_id(id).await?;
    Ok(equipment)
}

// Option<T> for optional values
fn find_location(&self, id: Uuid) -> Option<&Location> {
    self.locations.get(&id)
}
```

**Trait-Based Design:**

```rust
// Define behavior contracts
#[async_trait]
pub trait Repository<T> {
    async fn find_by_id(&self, id: Uuid) -> Result<Option<T>, DbError>;
    async fn save(&self, entity: &T) -> Result<T, DbError>;
    async fn delete(&self, id: Uuid) -> Result<(), DbError>;
}

// Implement for specific types
#[async_trait]
impl Repository<Equipment> for EquipmentRepository {
    async fn find_by_id(&self, id: Uuid) -> Result<Option<Equipment>, DbError> {
        // Implementation
    }
}
```

### Design Patterns in Rust

1. **Repository Pattern** - Abstract data access
2. **Dependency Injection** - Via struct composition and traits
3. **Builder Pattern** - For complex object construction
4. **Newtype Pattern** - Type-safe wrappers around primitives
5. **State Machine** - Encode state transitions in types

---

## Project Structure

### Recommended Cargo Workspace Structure

```
fault-reporter-api/
│
├── Cargo.toml                    # Workspace configuration
├── Shuttle.toml                  # Shuttle deployment config
├── .gitignore
├── README.md
│
├── src/
│   ├── main.rs                   # Application entry point (Shuttle runtime)
│   ├── lib.rs                    # Library root (for testing)
│   │
│   ├── handlers/                 # HTTP request handlers (routes)
│   │   ├── mod.rs
│   │   ├── equipment.rs
│   │   ├── alerts.rs
│   │   ├── locations.rs
│   │   ├── work_orders.rs
│   │   ├── auth.rs
│   │   └── health.rs
│   │
│   ├── services/                 # Business logic layer
│   │   ├── mod.rs
│   │   ├── equipment_service.rs
│   │   ├── alert_service.rs
│   │   ├── location_service.rs
│   │   ├── work_order_service.rs
│   │   └── auth_service.rs
│   │
│   ├── repositories/             # Data access layer
│   │   ├── mod.rs
│   │   ├── traits.rs             # Repository trait definitions
│   │   ├── equipment_repository.rs
│   │   ├── alert_repository.rs
│   │   ├── location_repository.rs
│   │   └── work_order_repository.rs
│   │
│   ├── models/                   # Domain models and entities
│   │   ├── mod.rs
│   │   ├── equipment.rs
│   │   ├── alert.rs
│   │   ├── location.rs
│   │   ├── work_order.rs
│   │   ├── user.rs
│   │   ├── iot_data.rs
│   │   ├── enums.rs              # Status, Priority, etc.
│   │   └── value_objects.rs      # Coordinates, WarrantyInfo, etc.
│   │
│   ├── dto/                      # Data Transfer Objects
│   │   ├── mod.rs
│   │   ├── requests/
│   │   │   ├── mod.rs
│   │   │   ├── equipment.rs
│   │   │   ├── alert.rs
│   │   │   └── work_order.rs
│   │   ├── responses/
│   │   │   ├── mod.rs
│   │   │   ├── equipment.rs
│   │   │   ├── alert.rs
│   │   │   ├── pagination.rs
│   │   │   └── api_response.rs
│   │   └── mappers/              # Model <-> DTO conversions
│   │       ├── mod.rs
│   │       └── equipment.rs
│   │
│   ├── middleware/               # Axum middleware
│   │   ├── mod.rs
│   │   ├── auth.rs               # Firebase JWT validation
│   │   ├── logging.rs            # Request/response logging
│   │   └── error_handler.rs     # Global error handling
│   │
│   ├── validators/               # Input validation
│   │   ├── mod.rs
│   │   ├── equipment.rs
│   │   └── alert.rs
│   │
│   ├── database/                 # Database setup and migrations
│   │   ├── mod.rs
│   │   ├── migrations.rs
│   │   └── schema.sql
│   │
│   ├── config/                   # Configuration management
│   │   ├── mod.rs
│   │   └── settings.rs
│   │
│   ├── errors/                   # Error types
│   │   ├── mod.rs
│   │   ├── api_error.rs
│   │   └── db_error.rs
│   │
│   └── utils/                    # Utility functions
│       ├── mod.rs
│       ├── datetime.rs
│       ├── pagination.rs
│       └── geo.rs
│
├── migrations/                   # SQLx migrations
│   ├── 20250101000000_initial_schema.sql
│   ├── 20250102000000_add_iot_data.sql
│   └── ...
│
├── tests/                        # Integration tests
│   ├── common/
│   │   └── mod.rs               # Test utilities
│   ├── equipment_tests.rs
│   ├── alert_tests.rs
│   └── auth_tests.rs
│
└── benches/                      # Performance benchmarks
    └── api_benchmarks.rs
```

---

## Naming Conventions

### Rust Naming Standards

#### Modules, Structs, Enums, Traits

```rust
// snake_case for modules
mod equipment_service;
mod alert_repository;

// PascalCase for types
pub struct Equipment { }
pub enum EquipmentStatus { }
pub trait Repository { }
```

#### Functions and Variables

```rust
// snake_case for functions and variables
pub async fn get_equipment_by_id(id: Uuid) -> Result<Equipment, ApiError> { }

let equipment_code = "EQ-001";
let total_count = equipments.len();
```

#### Constants and Statics

```rust
// SCREAMING_SNAKE_CASE for constants
pub const MAX_PAGE_SIZE: usize = 100;
pub const DEFAULT_CACHE_DURATION: Duration = Duration::from_secs(300);
```

#### Type Parameters

```rust
// Single uppercase letter or PascalCase
fn process<T>(item: T) -> T { }
fn map<TInput, TOutput>(input: TInput) -> TOutput { }
```

#### Lifetimes

```rust
// Single lowercase letter with apostrophe
fn get_name<'a>(equipment: &'a Equipment) -> &'a str {
    &equipment.name
}
```

### API Naming Conventions

#### Route Naming (REST Standards)

```rust
// Use plural nouns, kebab-case
Router::new()
    .route("/api/v1/equipment", get(get_all_equipment))
    .route("/api/v1/work-orders", get(get_all_work_orders))
    .route("/api/v1/technical-diagrams", get(get_diagrams))
```

#### HTTP Method Usage

```rust
Router::new()
    // GET - Retrieve resources
    .route("/api/v1/equipment", get(get_all))
    .route("/api/v1/equipment/:id", get(get_by_id))
    .route("/api/v1/equipment/:id/location", get(get_location))

    // POST - Create new resource
    .route("/api/v1/equipment", post(create_equipment))

    // PUT - Full update
    .route("/api/v1/equipment/:id", put(update_equipment))

    // PATCH - Partial update
    .route("/api/v1/equipment/:id/status", patch(update_status))

    // DELETE - Remove resource
    .route("/api/v1/equipment/:id", delete(delete_equipment))
```

### Database Naming Conventions

Same as .NET plan - PostgreSQL tables use snake_case:

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

-- Foreign keys: {table}_id
location_id
equipment_id
```

---

## Database Schema Design

### Same Schema as .NET Plan

The database schema is identical to the .NET implementation plan. Rust's SQLx will work with the same PostgreSQL tables.

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

### Same Endpoints as .NET Plan

The REST API endpoints are identical to the .NET implementation:

- `GET /health` - Health check
- `POST /api/v1/auth/verify` - Verify Firebase token
- `GET /api/v1/equipment` - List equipment (paginated)
- `GET /api/v1/equipment/:id` - Get equipment details
- `GET /api/v1/equipment/:id/location` - Get location
- `POST /api/v1/equipment` - Create equipment
- `PUT /api/v1/equipment/:id` - Update equipment
- `DELETE /api/v1/equipment/:id` - Delete equipment
- `GET /api/v1/alerts` - List alerts
- `GET /api/v1/work-orders` - List work orders
- ... (see .NET plan for complete list)

**Refer to .NET plan for complete endpoint documentation.**

---

## Implementation Phases

### Phase 1: Project Setup & Shuttle Configuration (Week 1)

**Objectives:**

- ✅ Initialize Rust project with Cargo
- ✅ Set up Shuttle.rs runtime
- ✅ Configure PostgreSQL connection
- ✅ Set up basic Axum server
- ✅ Implement health check endpoint

**Tasks:**

1. **Install Rust and Shuttle CLI**

   ```bash
   # Install Rust (if not already installed)
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

   # Install Shuttle CLI
   cargo install cargo-shuttle

   # Login to Shuttle (creates free account)
   cargo shuttle login
   ```

2. **Initialize Shuttle Project**

   ```bash
   # Create new Shuttle project
   cargo shuttle init --template axum fault-reporter-api
   cd fault-reporter-api
   ```

3. **Update Cargo.toml Dependencies**

   ```toml
   [package]
   name = "fault-reporter-api"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   # Shuttle runtime
   shuttle-runtime = "0.47.0"
   shuttle-axum = "0.47.0"
   shuttle-shared-db = { version = "0.47.0", features = ["postgres"] }

   # Web framework
   axum = { version = "0.7", features = ["macros"] }
   tower = "0.4"
   tower-http = { version = "0.5", features = ["cors", "trace"] }

   # Database
   sqlx = { version = "0.8", features = ["runtime-tokio", "postgres", "uuid", "time", "json"] }

   # Serialization
   serde = { version = "1.0", features = ["derive"] }
   serde_json = "1.0"

   # Async runtime
   tokio = { version = "1.40", features = ["full"] }

   # Error handling
   anyhow = "1.0"
   thiserror = "1.0"

   # UUID
   uuid = { version = "1.11", features = ["v4", "serde"] }

   # DateTime
   time = { version = "0.3", features = ["serde", "macros"] }

   # Validation
   validator = { version = "0.18", features = ["derive"] }

   # Firebase auth
   jsonwebtoken = "9.3"
   reqwest = { version = "0.12", features = ["json"] }

   # Logging
   tracing = "0.1"
   tracing-subscriber = { version = "0.3", features = ["env-filter"] }

   # Environment
   dotenvy = "0.15"

   [dev-dependencies]
   tower = { version = "0.4", features = ["util"] }
   http-body-util = "0.1"
   ```

4. **Create Basic main.rs with Shuttle**

   ```rust
   use axum::{routing::get, Router};
   use sqlx::PgPool;

   #[shuttle_runtime::main]
   async fn main(
       #[shuttle_shared_db::Postgres] pool: PgPool,
   ) -> shuttle_axum::ShuttleAxum {
       // Run migrations
       sqlx::migrate!("./migrations")
           .run(&pool)
           .await
           .expect("Failed to run migrations");

       // Build router
       let router = Router::new()
           .route("/health", get(health_check))
           .with_state(pool);

       Ok(router.into())
   }

   async fn health_check() -> &'static str {
       "OK"
   }
   ```

5. **Create Shuttle.toml**

   ```toml
   name = "fault-reporter-api"
   ```

6. **Test Local Deployment**

   ```bash
   # Run locally (Shuttle provisions local PostgreSQL)
   cargo shuttle run

   # Test health endpoint
   curl http://localhost:8000/health
   ```

**Deliverables:**

- ✅ Rust project with Shuttle runtime
- ✅ Local PostgreSQL connected
- ✅ Health check endpoint working
- ✅ Project compiles and runs

---

### Phase 2: Database Models & SQLx Setup (Week 1-2)

**Objectives:**

- ✅ Define all Rust structs for database entities
- ✅ Create SQLx migrations
- ✅ Implement compile-time query checking
- ✅ Set up database connection pool

**Tasks:**

1. **Create SQLx Migration Files**

   ```bash
   # Create migrations directory
   mkdir migrations

   # Create initial migration
   sqlx migrate add initial_schema
   ```

2. **Define Rust Models**

   ```rust
   // src/models/equipment.rs
   use sqlx::FromRow;
   use serde::{Deserialize, Serialize};
   use time::OffsetDateTime;
   use uuid::Uuid;

   #[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
   pub struct Equipment {
       pub id: Uuid,
       pub equipment_code: String,
       pub equipment_name: String,
       pub description: Option<String>,
       pub status: EquipmentStatus,
       pub location_id: Option<Uuid>,

       // Specifications
       pub asset_number: Option<String>,
       pub installation_date: Option<time::Date>,
       pub capacity: Option<String>,
       pub model: Option<String>,
       pub manufacturer: Option<String>,
       pub serial_number: Option<String>,

       // Metadata
       pub metadata: Option<serde_json::Value>,

       // Audit
       #[sqlx(default)]
       pub created_at: OffsetDateTime,
       pub updated_at: Option<OffsetDateTime>,
       pub created_by: Option<Uuid>,
       pub is_deleted: bool,
   }

   #[derive(Debug, Clone, Copy, Serialize, Deserialize, sqlx::Type)]
   #[sqlx(type_name = "VARCHAR", rename_all = "SCREAMING_SNAKE_CASE")]
   pub enum EquipmentStatus {
       Online,
       Offline,
       Maintenance,
       Error,
   }
   ```

3. **Create Initial Migration SQL**

   ```sql
   -- migrations/20250101000000_initial_schema.sql
   -- Copy schema from .NET plan and adapt for SQLx

   CREATE TABLE equipment (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       equipment_code VARCHAR(50) UNIQUE NOT NULL,
       equipment_name VARCHAR(200) NOT NULL,
       -- ... rest of schema
   );
   ```

4. **Set up SQLx Compile-Time Checking**

   ```bash
   # Set DATABASE_URL for compile-time checks
   export DATABASE_URL="postgres://postgres:postgres@localhost/faultreporter"

   # Prepare SQLx metadata for offline compilation
   cargo sqlx prepare
   ```

**Deliverables:**

- ✅ All Rust models defined
- ✅ Database migrations created
- ✅ Compile-time query validation working
- ✅ Models match PostgreSQL schema

---

### Phase 3: Repository Layer (Week 2)

**Objectives:**

- ✅ Implement repository pattern with traits
- ✅ Create SQLx query implementations
- ✅ Add compile-time query verification

**Tasks:**

1. **Define Repository Traits**

   ```rust
   // src/repositories/traits.rs
   use async_trait::async_trait;
   use uuid::Uuid;
   use crate::errors::DbError;

   #[async_trait]
   pub trait Repository<T>: Send + Sync {
       async fn find_by_id(&self, id: Uuid) -> Result<Option<T>, DbError>;
       async fn find_all(&self, page: i64, page_size: i64) -> Result<Vec<T>, DbError>;
       async fn create(&self, entity: &T) -> Result<T, DbError>;
       async fn update(&self, entity: &T) -> Result<T, DbError>;
       async fn delete(&self, id: Uuid) -> Result<(), DbError>;
       async fn count(&self) -> Result<i64, DbError>;
   }
   ```

2. **Implement Equipment Repository**

   ```rust
   // src/repositories/equipment_repository.rs
   use async_trait::async_trait;
   use sqlx::PgPool;
   use uuid::Uuid;
   use crate::models::Equipment;
   use crate::repositories::traits::Repository;
   use crate::errors::DbError;

   #[derive(Clone)]
   pub struct EquipmentRepository {
       pool: PgPool,
   }

   impl EquipmentRepository {
       pub fn new(pool: PgPool) -> Self {
           Self { pool }
       }

       pub async fn find_by_code(&self, code: &str) -> Result<Option<Equipment>, DbError> {
           let equipment = sqlx::query_as!(
               Equipment,
               r#"
               SELECT id, equipment_code, equipment_name, description,
                      status as "status: EquipmentStatus",
                      location_id, asset_number, installation_date,
                      capacity, model, manufacturer, serial_number,
                      metadata, created_at, updated_at, created_by, is_deleted
               FROM equipment
               WHERE equipment_code = $1 AND is_deleted = false
               "#,
               code
           )
           .fetch_optional(&self.pool)
           .await?;

           Ok(equipment)
       }
   }

   #[async_trait]
   impl Repository<Equipment> for EquipmentRepository {
       async fn find_by_id(&self, id: Uuid) -> Result<Option<Equipment>, DbError> {
           let equipment = sqlx::query_as!(
               Equipment,
               r#"
               SELECT id, equipment_code, equipment_name, description,
                      status as "status: EquipmentStatus",
                      location_id, asset_number, installation_date,
                      capacity, model, manufacturer, serial_number,
                      metadata, created_at, updated_at, created_by, is_deleted
               FROM equipment
               WHERE id = $1 AND is_deleted = false
               "#,
               id
           )
           .fetch_optional(&self.pool)
           .await?;

           Ok(equipment)
       }

       async fn find_all(&self, page: i64, page_size: i64) -> Result<Vec<Equipment>, DbError> {
           let offset = (page - 1) * page_size;

           let equipment = sqlx::query_as!(
               Equipment,
               r#"
               SELECT id, equipment_code, equipment_name, description,
                      status as "status: EquipmentStatus",
                      location_id, asset_number, installation_date,
                      capacity, model, manufacturer, serial_number,
                      metadata, created_at, updated_at, created_by, is_deleted
               FROM equipment
               WHERE is_deleted = false
               ORDER BY created_at DESC
               LIMIT $1 OFFSET $2
               "#,
               page_size,
               offset
           )
           .fetch_all(&self.pool)
           .await?;

           Ok(equipment)
       }

       async fn create(&self, entity: &Equipment) -> Result<Equipment, DbError> {
           let equipment = sqlx::query_as!(
               Equipment,
               r#"
               INSERT INTO equipment (
                   equipment_code, equipment_name, description, status,
                   location_id, asset_number, manufacturer, model
               )
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
               RETURNING id, equipment_code, equipment_name, description,
                         status as "status: EquipmentStatus",
                         location_id, asset_number, installation_date,
                         capacity, model, manufacturer, serial_number,
                         metadata, created_at, updated_at, created_by, is_deleted
               "#,
               entity.equipment_code,
               entity.equipment_name,
               entity.description,
               entity.status as EquipmentStatus,
               entity.location_id,
               entity.asset_number,
               entity.manufacturer,
               entity.model
           )
           .fetch_one(&self.pool)
           .await?;

           Ok(equipment)
       }

       async fn update(&self, entity: &Equipment) -> Result<Equipment, DbError> {
           let equipment = sqlx::query_as!(
               Equipment,
               r#"
               UPDATE equipment
               SET equipment_name = $2,
                   description = $3,
                   status = $4,
                   location_id = $5,
                   updated_at = NOW()
               WHERE id = $1 AND is_deleted = false
               RETURNING id, equipment_code, equipment_name, description,
                         status as "status: EquipmentStatus",
                         location_id, asset_number, installation_date,
                         capacity, model, manufacturer, serial_number,
                         metadata, created_at, updated_at, created_by, is_deleted
               "#,
               entity.id,
               entity.equipment_name,
               entity.description,
               entity.status as EquipmentStatus,
               entity.location_id
           )
           .fetch_one(&self.pool)
           .await?;

           Ok(equipment)
       }

       async fn delete(&self, id: Uuid) -> Result<(), DbError> {
           sqlx::query!(
               "UPDATE equipment SET is_deleted = true, deleted_at = NOW() WHERE id = $1",
               id
           )
           .execute(&self.pool)
           .await?;

           Ok(())
       }

       async fn count(&self) -> Result<i64, DbError> {
           let result = sqlx::query!(
               "SELECT COUNT(*) as count FROM equipment WHERE is_deleted = false"
           )
           .fetch_one(&self.pool)
           .await?;

           Ok(result.count.unwrap_or(0))
       }
   }
   ```

**Deliverables:**

- ✅ Repository trait defined
- ✅ Equipment repository implemented with SQLx
- ✅ Compile-time query validation working
- ✅ All queries type-safe

---

### Phase 4: Service Layer & DTOs (Week 2-3)

**Objectives:**

- ✅ Create DTOs for requests and responses
- ✅ Implement service layer with business logic
- ✅ Add validation

**Tasks:**

1. **Create Request DTOs**

   ```rust
   // src/dto/requests/equipment.rs
   use serde::Deserialize;
   use validator::Validate;
   use uuid::Uuid;

   #[derive(Debug, Deserialize, Validate)]
   pub struct CreateEquipmentRequest {
       #[validate(length(min = 1, max = 50))]
       #[validate(regex = "^[A-Z0-9-]+$")]
       pub equipment_code: String,

       #[validate(length(min = 1, max = 200))]
       pub equipment_name: String,

       pub description: Option<String>,
       pub location_id: Option<Uuid>,
       pub manufacturer: Option<String>,
       pub model: Option<String>,
   }

   #[derive(Debug, Deserialize, Validate)]
   pub struct UpdateEquipmentRequest {
       #[validate(length(min = 1, max = 200))]
       pub equipment_name: Option<String>,
       pub description: Option<String>,
       pub status: Option<String>,
       pub location_id: Option<Uuid>,
   }

   #[derive(Debug, Deserialize)]
   pub struct EquipmentQuery {
       #[serde(default = "default_page")]
       pub page: i64,

       #[serde(default = "default_page_size")]
       pub page_size: i64,

       pub status: Option<String>,
       pub search: Option<String>,
   }

   fn default_page() -> i64 { 1 }
   fn default_page_size() -> i64 { 20 }
   ```

2. **Create Response DTOs**

   ```rust
   // src/dto/responses/equipment.rs
   use serde::Serialize;
   use time::OffsetDateTime;
   use uuid::Uuid;
   use crate::models::{Equipment, EquipmentStatus};

   #[derive(Debug, Serialize)]
   pub struct EquipmentResponse {
       pub id: Uuid,
       pub equipment_code: String,
       pub equipment_name: String,
       pub description: Option<String>,
       pub status: EquipmentStatus,
       pub location_id: Option<Uuid>,
       pub manufacturer: Option<String>,
       pub model: Option<String>,
       pub created_at: OffsetDateTime,
       pub updated_at: Option<OffsetDateTime>,
   }

   impl From<Equipment> for EquipmentResponse {
       fn from(equipment: Equipment) -> Self {
           Self {
               id: equipment.id,
               equipment_code: equipment.equipment_code,
               equipment_name: equipment.equipment_name,
               description: equipment.description,
               status: equipment.status,
               location_id: equipment.location_id,
               manufacturer: equipment.manufacturer,
               model: equipment.model,
               created_at: equipment.created_at,
               updated_at: equipment.updated_at,
           }
       }
   }

   #[derive(Debug, Serialize)]
   pub struct PaginatedResponse<T> {
       pub success: bool,
       pub data: Vec<T>,
       pub pagination: PaginationInfo,
   }

   #[derive(Debug, Serialize)]
   pub struct PaginationInfo {
       pub page: i64,
       pub page_size: i64,
       pub total_pages: i64,
       pub total_count: i64,
       pub has_next: bool,
       pub has_previous: bool,
   }
   ```

3. **Implement Equipment Service**

   ```rust
   // src/services/equipment_service.rs
   use uuid::Uuid;
   use crate::repositories::equipment_repository::EquipmentRepository;
   use crate::repositories::traits::Repository;
   use crate::dto::requests::equipment::{CreateEquipmentRequest, UpdateEquipmentRequest};
   use crate::dto::responses::equipment::EquipmentResponse;
   use crate::models::{Equipment, EquipmentStatus};
   use crate::errors::ApiError;

   #[derive(Clone)]
   pub struct EquipmentService {
       repository: EquipmentRepository,
   }

   impl EquipmentService {
       pub fn new(repository: EquipmentRepository) -> Self {
           Self { repository }
       }

       pub async fn get_by_id(&self, id: Uuid) -> Result<EquipmentResponse, ApiError> {
           let equipment = self.repository
               .find_by_id(id)
               .await?
               .ok_or(ApiError::NotFound(format!("Equipment {} not found", id)))?;

           Ok(EquipmentResponse::from(equipment))
       }

       pub async fn get_all(&self, page: i64, page_size: i64) -> Result<Vec<EquipmentResponse>, ApiError> {
           let equipment_list = self.repository
               .find_all(page, page_size)
               .await?;

           let responses = equipment_list
               .into_iter()
               .map(EquipmentResponse::from)
               .collect();

           Ok(responses)
       }

       pub async fn create(&self, request: CreateEquipmentRequest) -> Result<EquipmentResponse, ApiError> {
           // Check if code already exists
           if let Some(_) = self.repository.find_by_code(&request.equipment_code).await? {
               return Err(ApiError::Conflict(
                   format!("Equipment with code {} already exists", request.equipment_code)
               ));
           }

           let equipment = Equipment {
               id: Uuid::new_v4(),
               equipment_code: request.equipment_code,
               equipment_name: request.equipment_name,
               description: request.description,
               status: EquipmentStatus::Online,
               location_id: request.location_id,
               manufacturer: request.manufacturer,
               model: request.model,
               // ... other fields with defaults
               created_at: time::OffsetDateTime::now_utc(),
               updated_at: None,
               created_by: None,
               is_deleted: false,
               // ... rest of fields
           };

           let created = self.repository.create(&equipment).await?;
           Ok(EquipmentResponse::from(created))
       }

       pub async fn update(&self, id: Uuid, request: UpdateEquipmentRequest) -> Result<EquipmentResponse, ApiError> {
           let mut equipment = self.repository
               .find_by_id(id)
               .await?
               .ok_or(ApiError::NotFound(format!("Equipment {} not found", id)))?;

           // Update fields if provided
           if let Some(name) = request.equipment_name {
               equipment.equipment_name = name;
           }
           if let Some(desc) = request.description {
               equipment.description = Some(desc);
           }
           // ... update other fields

           let updated = self.repository.update(&equipment).await?;
           Ok(EquipmentResponse::from(updated))
       }

       pub async fn delete(&self, id: Uuid) -> Result<(), ApiError> {
           self.repository.delete(id).await?;
           Ok(())
       }

       pub async fn count(&self) -> Result<i64, ApiError> {
           let count = self.repository.count().await?;
           Ok(count)
       }
   }
   ```

**Deliverables:**

- ✅ All DTOs defined with validation
- ✅ Service layer implemented
- ✅ Business logic separated from HTTP layer

---

### Phase 5: API Handlers (Axum Routes) (Week 3)

**Objectives:**

- ✅ Implement Axum HTTP handlers
- ✅ Add request validation
- ✅ Configure routing
- ✅ Add error handling

**Tasks:**

1. **Create Equipment Handlers**

   ```rust
   // src/handlers/equipment.rs
   use axum::{
       extract::{Path, Query, State},
       http::StatusCode,
       response::IntoResponse,
       Json,
   };
   use uuid::Uuid;
   use validator::Validate;
   use crate::services::equipment_service::EquipmentService;
   use crate::dto::requests::equipment::{CreateEquipmentRequest, UpdateEquipmentRequest, EquipmentQuery};
   use crate::dto::responses::api_response::ApiResponse;
   use crate::errors::ApiError;

   pub async fn get_all_equipment(
       State(service): State<EquipmentService>,
       Query(query): Query<EquipmentQuery>,
   ) -> Result<impl IntoResponse, ApiError> {
       let equipment_list = service.get_all(query.page, query.page_size).await?;
       let total = service.count().await?;

       let response = ApiResponse::success_with_pagination(
           equipment_list,
           query.page,
           query.page_size,
           total,
       );

       Ok(Json(response))
   }

   pub async fn get_equipment_by_id(
       State(service): State<EquipmentService>,
       Path(id): Path<Uuid>,
   ) -> Result<impl IntoResponse, ApiError> {
       let equipment = service.get_by_id(id).await?;
       Ok(Json(ApiResponse::success(equipment)))
   }

   pub async fn create_equipment(
       State(service): State<EquipmentService>,
       Json(request): Json<CreateEquipmentRequest>,
   ) -> Result<impl IntoResponse, ApiError> {
       // Validate request
       request.validate()
           .map_err(|e| ApiError::ValidationError(e.to_string()))?;

       let equipment = service.create(request).await?;
       Ok((StatusCode::CREATED, Json(ApiResponse::success(equipment))))
   }

   pub async fn update_equipment(
       State(service): State<EquipmentService>,
       Path(id): Path<Uuid>,
       Json(request): Json<UpdateEquipmentRequest>,
   ) -> Result<impl IntoResponse, ApiError> {
       request.validate()
           .map_err(|e| ApiError::ValidationError(e.to_string()))?;

       let equipment = service.update(id, request).await?;
       Ok(Json(ApiResponse::success(equipment)))
   }

   pub async fn delete_equipment(
       State(service): State<EquipmentService>,
       Path(id): Path<Uuid>,
   ) -> Result<impl IntoResponse, ApiError> {
       service.delete(id).await?;
       Ok(StatusCode::NO_CONTENT)
   }
   ```

2. **Update main.rs with Routes**

   ```rust
   use axum::{
       routing::{get, post, put, delete},
       Router,
   };
   use sqlx::PgPool;
   use tower_http::cors::CorsLayer;
   use tower_http::trace::TraceLayer;

   mod handlers;
   mod services;
   mod repositories;
   mod models;
   mod dto;
   mod errors;
   mod middleware;

   #[shuttle_runtime::main]
   async fn main(
       #[shuttle_shared_db::Postgres] pool: PgPool,
   ) -> shuttle_axum::ShuttleAxum {
       // Run migrations
       sqlx::migrate!("./migrations")
           .run(&pool)
           .await
           .expect("Failed to run migrations");

       // Initialize repositories
       let equipment_repo = repositories::equipment_repository::EquipmentRepository::new(pool.clone());

       // Initialize services
       let equipment_service = services::equipment_service::EquipmentService::new(equipment_repo);

       // Build router
       let app = Router::new()
           // Health check
           .route("/health", get(handlers::health::health_check))

           // Equipment routes
           .route("/api/v1/equipment", get(handlers::equipment::get_all_equipment))
           .route("/api/v1/equipment", post(handlers::equipment::create_equipment))
           .route("/api/v1/equipment/:id", get(handlers::equipment::get_equipment_by_id))
           .route("/api/v1/equipment/:id", put(handlers::equipment::update_equipment))
           .route("/api/v1/equipment/:id", delete(handlers::equipment::delete_equipment))

           // Add services to state
           .with_state(equipment_service)

           // Add middleware
           .layer(CorsLayer::permissive())
           .layer(TraceLayer::new_for_http());

       Ok(app.into())
   }
   ```

3. **Implement Error Handling**

   ```rust
   // src/errors/api_error.rs
   use axum::{
       http::StatusCode,
       response::{IntoResponse, Response},
       Json,
   };
   use serde_json::json;
   use thiserror::Error;

   #[derive(Debug, Error)]
   pub enum ApiError {
       #[error("Not found: {0}")]
       NotFound(String),

       #[error("Validation error: {0}")]
       ValidationError(String),

       #[error("Conflict: {0}")]
       Conflict(String),

       #[error("Database error: {0}")]
       DatabaseError(#[from] sqlx::Error),

       #[error("Internal server error")]
       InternalError,
   }

   impl IntoResponse for ApiError {
       fn into_response(self) -> Response {
           let (status, message) = match self {
               ApiError::NotFound(msg) => (StatusCode::NOT_FOUND, msg),
               ApiError::ValidationError(msg) => (StatusCode::BAD_REQUEST, msg),
               ApiError::Conflict(msg) => (StatusCode::CONFLICT, msg),
               ApiError::DatabaseError(e) => {
                   tracing::error!("Database error: {:?}", e);
                   (StatusCode::INTERNAL_SERVER_ERROR, "Database error".to_string())
               }
               ApiError::InternalError => {
                   (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string())
               }
           };

           let body = Json(json!({
               "success": false,
               "error": {
                   "message": message,
               }
           }));

           (status, body).into_response()
       }
   }
   ```

**Deliverables:**

- ✅ All HTTP handlers implemented
- ✅ Request validation working
- ✅ Error handling with proper status codes
- ✅ Routes configured

---

### Phase 6: Firebase Authentication (Week 3-4)

**Objectives:**

- ✅ Implement Firebase JWT validation middleware
- ✅ Extract user claims from tokens
- ✅ Protect endpoints

**Tasks:**

1. **Firebase Auth Middleware**

   ```rust
   // src/middleware/auth.rs
   use axum::{
       extract::Request,
       http::{HeaderMap, StatusCode},
       middleware::Next,
       response::Response,
   };
   use jsonwebtoken::{decode, decode_header, Algorithm, DecodingKey, Validation};
   use serde::{Deserialize, Serialize};
   use reqwest;

   #[derive(Debug, Serialize, Deserialize)]
   pub struct FirebaseClaims {
       pub sub: String,  // Firebase UID
       pub email: Option<String>,
       pub exp: usize,
   }

   pub async fn firebase_auth_middleware(
       headers: HeaderMap,
       mut request: Request,
       next: Next,
   ) -> Result<Response, StatusCode> {
       // Extract Authorization header
       let auth_header = headers
           .get("Authorization")
           .and_then(|h| h.to_str().ok())
           .ok_or(StatusCode::UNAUTHORIZED)?;

       if !auth_header.starts_with("Bearer ") {
           return Err(StatusCode::UNAUTHORIZED);
       }

       let token = &auth_header[7..];

       // Decode token header to get kid
       let header = decode_header(token)
           .map_err(|_| StatusCode::UNAUTHORIZED)?;

       let kid = header.kid
           .ok_or(StatusCode::UNAUTHORIZED)?;

       // Fetch Firebase public keys
       let public_keys = fetch_firebase_public_keys().await
           .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

       let public_key = public_keys.get(&kid)
           .ok_or(StatusCode::UNAUTHORIZED)?;

       // Verify token
       let mut validation = Validation::new(Algorithm::RS256);
       validation.set_audience(&[std::env::var("FIREBASE_PROJECT_ID").unwrap()]);

       let decoding_key = DecodingKey::from_rsa_pem(public_key.as_bytes())
           .map_err(|_| StatusCode::UNAUTHORIZED)?;

       let token_data = decode::<FirebaseClaims>(token, &decoding_key, &validation)
           .map_err(|_| StatusCode::UNAUTHORIZED)?;

       // Add claims to request extensions
       request.extensions_mut().insert(token_data.claims);

       Ok(next.run(request).await)
   }

   async fn fetch_firebase_public_keys() -> Result<std::collections::HashMap<String, String>, reqwest::Error> {
       let url = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
       let response = reqwest::get(url).await?;
       let keys: std::collections::HashMap<String, String> = response.json().await?;
       Ok(keys)
   }
   ```

2. **Protect Routes**

   ```rust
   // In main.rs
   use axum::middleware::from_fn;

   let protected_routes = Router::new()
       .route("/api/v1/equipment", post(handlers::equipment::create_equipment))
       .route("/api/v1/equipment/:id", put(handlers::equipment::update_equipment))
       .route("/api/v1/equipment/:id", delete(handlers::equipment::delete_equipment))
       .layer(from_fn(middleware::auth::firebase_auth_middleware));

   let app = Router::new()
       .route("/health", get(handlers::health::health_check))
       .route("/api/v1/equipment", get(handlers::equipment::get_all_equipment))
       .route("/api/v1/equipment/:id", get(handlers::equipment::get_equipment_by_id))
       .merge(protected_routes);
   ```

**Deliverables:**

- ✅ Firebase JWT validation working
- ✅ Protected endpoints require authentication
- ✅ User claims extracted from tokens

---

### Phase 7: Testing (Week 4-5)

**Objectives:**

- ✅ Write unit tests for services
- ✅ Write integration tests for handlers
- ✅ Achieve >80% code coverage

**Tasks:**

1. **Unit Tests for Services**

   ```rust
   // src/services/equipment_service.rs
   #[cfg(test)]
   mod tests {
       use super::*;

       #[tokio::test]
       async fn test_get_by_id_existing() {
           // Mock repository
           // Test service method
       }

       #[tokio::test]
       async fn test_get_by_id_not_found() {
           // Test not found scenario
       }

       #[tokio::test]
       async fn test_create_duplicate_code() {
           // Test conflict scenario
       }
   }
   ```

2. **Integration Tests**

   ```rust
   // tests/equipment_tests.rs
   use axum::body::Body;
   use axum::http::{Request, StatusCode};
   use tower::ServiceExt;

   #[tokio::test]
   async fn test_get_all_equipment() {
       let app = create_test_app().await;

       let response = app
           .oneshot(Request::builder()
               .uri("/api/v1/equipment")
               .body(Body::empty())
               .unwrap())
           .await
           .unwrap();

       assert_eq!(response.status(), StatusCode::OK);
   }
   ```

**Deliverables:**

- ✅ Comprehensive test suite
- ✅ >80% code coverage
- ✅ All tests passing

---

### Phase 8: Deployment to Shuttle (Week 5)

**Objectives:**

- ✅ Deploy API to Shuttle.rs
- ✅ Configure production secrets
- ✅ Test production endpoint

**Tasks:**

1. **Add Production Secrets**

   ```bash
   # Add Firebase project ID
   cargo shuttle secrets add FIREBASE_PROJECT_ID=your-project-id

   # Add any other secrets
   cargo shuttle secrets add API_KEY=your-api-key
   ```

2. **Deploy to Shuttle**

   ```bash
   # Deploy to production
   cargo shuttle deploy

   # Check deployment status
   cargo shuttle status

   # View logs
   cargo shuttle logs
   ```

3. **Get Production URL**

   ```bash
   # Shuttle provides a URL like:
   # https://fault-reporter-api.shuttleapp.rs
   ```

4. **Update Mobile App**
   ```bash
   # Update React Native .env
   EXPO_PUBLIC_API_BASE_URL=https://fault-reporter-api.shuttleapp.rs
   EXPO_PUBLIC_USE_MOCK_API=false
   ```

**Deliverables:**

- ✅ API deployed to Shuttle
- ✅ Production URL working
- ✅ Mobile app connected
- ✅ End-to-end flow tested

---

## Technology Stack

### Core Framework

- **Axum 0.7** - Web framework (from Tokio team)
- **Tokio 1.40** - Async runtime
- **Tower 0.4** - Middleware and service abstractions
- **Shuttle Runtime 0.47** - Deployment platform

### Database

- **SQLx 0.8** - Async PostgreSQL driver with compile-time checking
- **PostgreSQL 16** - Database (provided by Shuttle or DigitalOcean)

### Serialization

- **Serde 1.0** - Serialization/deserialization
- **serde_json 1.0** - JSON support

### Authentication

- **jsonwebtoken 9.3** - JWT validation
- **reqwest 0.12** - HTTP client for Firebase key fetching

### Validation

- **validator 0.18** - Request validation

### Error Handling

- **anyhow 1.0** - Flexible error handling
- **thiserror 1.0** - Custom error types

### Logging

- **tracing 0.1** - Structured logging
- **tracing-subscriber 0.3** - Log formatting

### Testing

- **tokio::test** - Async test runtime
- **tower::ServiceExt** - Testing utilities

### Utilities

- **uuid 1.11** - UUID generation
- **time 0.3** - Date/time handling

---

## Configuration & Environment

### Shuttle Secrets

```bash
# Add secrets via CLI
cargo shuttle secrets add FIREBASE_PROJECT_ID=fault-reporter-prod
cargo shuttle secrets add DATABASE_URL=postgres://... (optional, Shuttle provides one)
```

### Access Secrets in Code

```rust
use shuttle_runtime::SecretStore;

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool,
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> shuttle_axum::ShuttleAxum {
    let firebase_project_id = secrets.get("FIREBASE_PROJECT_ID")
        .expect("FIREBASE_PROJECT_ID must be set");

    // Use secret in app configuration
}
```

---

## Security Considerations

### 1. Memory Safety

- ✅ **Rust compiler guarantees** - No buffer overflows, null pointers, or data races
- ✅ **Ownership system** - Memory automatically freed when variables go out of scope
- ✅ **No garbage collection** - Deterministic memory management

### 2. Type Safety

- ✅ **Compile-time query validation** - SQLx verifies queries against database schema
- ✅ **Exhaustive pattern matching** - Compiler ensures all enum variants handled
- ✅ **Strong typing** - No implicit conversions

### 3. SQL Injection Prevention

```rust
// SQLx uses parameterized queries automatically
// This is SAFE - SQLx prevents injection
let equipment = sqlx::query_as!(
    Equipment,
    "SELECT * FROM equipment WHERE code = $1",
    code
)
.fetch_one(&pool)
.await?;
```

### 4. Authentication

- ✅ Firebase JWT validation in middleware
- ✅ Token expiration checked
- ✅ Claims extracted and validated

### 5. CORS

```rust
use tower_http::cors::CorsLayer;

let app = Router::new()
    .layer(CorsLayer::permissive()); // Configure as needed
```

---

## Testing Strategy

Same as .NET plan - unit tests, integration tests, >80% coverage.

---

## Deployment with Shuttle

### Local Development

```bash
# Run locally (Shuttle provides local PostgreSQL)
cargo shuttle run

# Access at http://localhost:8000
```

### Production Deployment

```bash
# Deploy to production
cargo shuttle deploy

# Deploy with specific name
cargo shuttle deploy --name fault-reporter-api

# Check status
cargo shuttle status

# View logs
cargo shuttle logs

# Delete deployment
cargo shuttle delete
```

### Custom Domain

```bash
# Add custom domain
cargo shuttle domain add api.faultreporter.com

# Verify DNS
cargo shuttle domain verify api.faultreporter.com
```

---

## Comparison: Rust vs .NET

| Aspect                | Rust + Shuttle       | .NET + Railway       |
| --------------------- | -------------------- | -------------------- |
| **Performance**       | ⚡⚡⚡⚡⚡ (fastest) | ⚡⚡⚡⚡ (very fast) |
| **Memory Usage**      | 🟢 ~50MB             | 🟡 ~100MB            |
| **Compile Time**      | 🔴 Slow (2-5 min)    | 🟢 Fast (30s-1min)   |
| **Learning Curve**    | 🔴 Steep             | 🟡 Moderate          |
| **Development Speed** | 🟡 Moderate          | 🟢 Fast              |
| **Type Safety**       | ⚡⚡⚡⚡⚡           | ⚡⚡⚡⚡             |
| **Free Hosting**      | ✅ Shuttle (best)    | ✅ Railway           |
| **Deployment**        | ✅ One command       | ✅ Auto from Git     |
| **Ecosystem**         | 🟡 Growing           | 🟢 Mature            |

---

## When to Choose Rust

**Choose Rust if:**

- ✅ Performance is critical (real-time systems, high-throughput APIs)
- ✅ You want guaranteed memory safety
- ✅ You need minimal memory footprint
- ✅ You're building long-running services
- ✅ You want to learn Rust
- ✅ You have time for longer compile cycles

**Choose .NET if:**

- ✅ You need faster development
- ✅ You want a mature ecosystem
- ✅ You need enterprise features (background jobs, caching, etc.)
- ✅ Performance is "good enough" (not extreme)
- ✅ You prefer familiar C# syntax

---

## Next Steps

### Before Implementation

1. **Review This Plan** ✅
2. **Install Rust and Shuttle CLI**
3. **Decide: Rust or .NET?** (Compare both plans)
4. **Prepare DigitalOcean PostgreSQL** (or use Shuttle's free DB)

### Ready to Start?

Once approved, we begin with **Phase 1: Project Setup & Shuttle Configuration**.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-25
**Status:** Ready for Review
**Estimated Timeline:** 5-6 weeks
**Estimated Effort:** 180-220 hours
**Difficulty:** Advanced (Rust learning curve)
