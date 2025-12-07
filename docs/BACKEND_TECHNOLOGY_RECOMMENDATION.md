# Backend Technology Recommendation for Fault Reporter

**Date:** 2025-11-25
**Project:** Fault Reporter Mobile App
**Database:** PostgreSQL
**Frontend:** React Native (Expo) with Firebase Authentication

---

## Executive Summary

**Recommendation: ASP.NET Core (.NET 8+)**

After analyzing the Fault Reporter application requirements, current architecture, and future scalability needs, **ASP.NET Core** is the recommended backend technology. This recommendation balances developer productivity, performance, enterprise-grade features, and excellent PostgreSQL integration.

---

## Current Application Context

The Fault Reporter mobile app includes:

- **Firebase Authentication** (already integrated)
- **Equipment location tracking**
- **Asset management**
- **AI fault detection**
- **Subsystem verification**
- **Multi-platform support** (iOS, Android, Web via Expo)

---

## Technology Comparison

### 1. .NET (ASP.NET Core) ⭐ **RECOMMENDED**

#### Strengths

- ✅ **Excellent PostgreSQL Support**: Entity Framework Core with Npgsql provider
  - Type-safe LINQ queries
  - Automatic migrations
  - Excellent performance with compiled queries
  - Advanced features: JSON columns, full-text search, spatial data

- ✅ **Firebase Integration**: Official Firebase Admin SDK
  - Validate Firebase Auth tokens from mobile app
  - Server-side authentication
  - User management

- ✅ **Enterprise-Ready Features**
  - Built-in dependency injection
  - Comprehensive logging (Serilog, NLog)
  - Health checks and monitoring
  - Background job processing (Hangfire, Quartz.NET)
  - Distributed caching (Redis integration)

- ✅ **Performance**
  - Native compilation (not interpreted)
  - ~1-2ms average response time for CRUD operations
  - Efficient memory management
  - Async/await throughout

- ✅ **Developer Experience**
  - Strong typing with C# prevents runtime errors
  - Excellent IDE support (Visual Studio, Rider, VS Code)
  - Auto-generated OpenAPI/Swagger documentation
  - Rich ecosystem of NuGet packages

- ✅ **Production Deployment**
  - Docker support
  - Azure/AWS/Google Cloud native support
  - Self-contained deployments
  - Cross-platform (Linux, Windows, macOS)

#### Weaknesses

- ❌ Larger deployment footprint (~100MB base)
- ❌ Learning curve if unfamiliar with C#
- ❌ More verbose than Python for simple scripts

#### Best For

- Production-grade enterprise applications
- Long-term maintainability
- Teams that will scale
- Applications requiring robust error handling and logging

#### Performance Metrics (Approximate)

- **Response Time**: 1-2ms for typical CRUD
- **Memory Usage**: ~100MB base, ~200-300MB under load
- **Throughput**: 20,000-50,000 requests/second (single instance)

---

### 2. Python (FastAPI)

#### Strengths

- ✅ **Rapid Development**: Python's simplicity accelerates initial development
- ✅ **AI/ML Excellence**: Native integration with:
  - TensorFlow, PyTorch for ML models
  - Scikit-learn for analytics
  - Pandas, NumPy for data processing
  - **Perfect for AI fault detection feature**

- ✅ **PostgreSQL Support**
  - SQLAlchemy (mature ORM)
  - asyncpg (high-performance async driver)
  - psycopg3 (traditional driver)

- ✅ **Modern Features**
  - Async/await support
  - Type hints with Pydantic (runtime validation)
  - Auto-generated OpenAPI documentation
  - WebSocket support

- ✅ **Firebase Integration**: Firebase Admin SDK for Python

#### Weaknesses

- ❌ **Performance**: 2-3x slower than .NET for typical workloads
- ❌ **Dynamic Typing**: Runtime errors despite type hints
- ❌ **Deployment Complexity**:
  - Virtual environment management
  - Dependency conflicts
  - Slower cold starts

- ❌ **Concurrency**: GIL limits CPU-bound tasks (though FastAPI is async)
- ❌ **Enterprise Tooling**: Less mature than .NET for logging, monitoring, background jobs

#### Best For

- AI/ML-heavy applications
- Data science teams
- Rapid prototyping
- Applications where AI fault detection is the primary feature

#### Performance Metrics (Approximate)

- **Response Time**: 3-5ms for typical CRUD
- **Memory Usage**: ~150MB base, ~300-500MB under load
- **Throughput**: 5,000-15,000 requests/second (single instance with Gunicorn/Uvicorn)

---

### 3. Rust (Actix-web / Axum)

#### Strengths

- ✅ **Maximum Performance**
  - 3-5x faster than .NET
  - 10-15x faster than Python
  - Zero-cost abstractions
  - No garbage collection overhead

- ✅ **Memory Safety**: Compiler prevents entire classes of bugs
  - No null pointer exceptions
  - No data races
  - No use-after-free errors

- ✅ **PostgreSQL Support**
  - SQLx: Compile-time query verification
  - Diesel: Type-safe ORM
  - Tokio-postgres: Async driver

- ✅ **Deployment**
  - Tiny binaries (~10-20MB)
  - Minimal memory footprint (~50MB)
  - No runtime dependencies

#### Weaknesses

- ❌ **Steep Learning Curve**: Ownership, lifetimes, borrow checker
- ❌ **Development Speed**: 2-3x slower than .NET, 5x slower than Python
- ❌ **Limited Ecosystem**:
  - Fewer libraries than .NET/Python
  - **No official Firebase Admin SDK** (community crates only)
  - Less mature ORMs

- ❌ **Team Scaling**: Hard to find Rust developers
- ❌ **Overkill**: Benefits mainly appear at massive scale (100k+ req/s)

#### Best For

- High-performance microservices
- Systems programming
- WebAssembly compilation
- Learning Rust as a skill investment

#### Performance Metrics (Approximate)

- **Response Time**: 0.3-0.8ms for typical CRUD
- **Memory Usage**: ~50MB base, ~100MB under load
- **Throughput**: 50,000-150,000 requests/second (single instance)

---

## Detailed Comparison Matrix

| Feature                    | .NET       | Python (FastAPI) | Rust       |
| -------------------------- | ---------- | ---------------- | ---------- |
| **Development Speed**      | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐       | ⭐⭐       |
| **Runtime Performance**    | ⭐⭐⭐⭐   | ⭐⭐⭐           | ⭐⭐⭐⭐⭐ |
| **PostgreSQL Integration** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐         | ⭐⭐⭐⭐   |
| **Firebase Support**       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐         | ⭐⭐       |
| **Type Safety**            | ⭐⭐⭐⭐⭐ | ⭐⭐⭐           | ⭐⭐⭐⭐⭐ |
| **AI/ML Integration**      | ⭐⭐⭐     | ⭐⭐⭐⭐⭐       | ⭐⭐       |
| **Enterprise Features**    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐           | ⭐⭐⭐     |
| **Learning Curve**         | ⭐⭐⭐     | ⭐⭐⭐⭐⭐       | ⭐         |
| **Ecosystem Maturity**     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐         | ⭐⭐⭐     |
| **Deployment Simplicity**  | ⭐⭐⭐⭐   | ⭐⭐⭐           | ⭐⭐⭐⭐⭐ |
| **Community Support**      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐       | ⭐⭐⭐⭐   |
| **Cost Efficiency**        | ⭐⭐⭐⭐   | ⭐⭐⭐           | ⭐⭐⭐⭐⭐ |

---

## Recommended Architecture

### Hybrid Approach (Best of Both Worlds)

```
┌─────────────────────────────────┐
│   React Native Mobile App       │
│   (Expo + Firebase Auth)        │
└────────────┬────────────────────┘
             │ HTTPS + JWT Tokens
             ▼
┌─────────────────────────────────┐
│   ASP.NET Core Web API          │
│   (Main Application Server)     │
│                                 │
│   • Equipment Management        │
│   • Alert Management            │
│   • User Management             │
│   • Asset Tracking              │
│   • Subsystem Verification      │
└────────┬──────────┬─────────────┘
         │          │
         │          │ gRPC/HTTP
         │          ▼
         │    ┌──────────────────┐
         │    │  Python FastAPI  │
         │    │  AI Microservice │
         │    │                  │
         │    │  • Fault         │
         │    │    Detection     │
         │    │  • Pattern       │
         │    │    Analysis      │
         │    │  • Predictions   │
         │    └──────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   PostgreSQL Database           │
│                                 │
│   • Equipment                   │
│   • Alerts                      │
│   • Users                       │
│   • Fault History               │
│   • Analytics                   │
└─────────────────────────────────┘
```

### Why This Architecture?

1. **.NET handles CRUD operations** (what it excels at)
2. **Python handles AI/ML** (what it excels at)
3. **PostgreSQL stores everything** (single source of truth)
4. **Firebase Auth** remains unchanged (mobile app integration)

---

## Technology Stack Details

### Recommended .NET Stack

```
ASP.NET Core 8.0+
├── Entity Framework Core 8.0+ (ORM)
├── Npgsql.EntityFrameworkCore.PostgreSQL (PostgreSQL provider)
├── FirebaseAdmin 3.0+ (Firebase Auth validation)
├── Serilog (Structured logging)
├── Swashbuckle (OpenAPI/Swagger)
├── FluentValidation (Input validation)
├── AutoMapper (DTO mapping)
├── Polly (Resilience & transient-fault-handling)
├── Hangfire (Background jobs)
└── xUnit + Moq (Testing)
```

### Optional Python Microservice Stack

```
FastAPI 0.110+
├── SQLAlchemy 2.0+ (ORM, if needed)
├── Pydantic 2.0+ (Data validation)
├── TensorFlow / PyTorch (ML models)
├── scikit-learn (Traditional ML)
├── pandas (Data processing)
├── httpx (HTTP client for .NET communication)
└── pytest (Testing)
```

---

## Project Structure

### ASP.NET Core API Structure

```
FaultReporter.API/
├── Controllers/              # API endpoints
│   ├── EquipmentController.cs
│   ├── AlertsController.cs
│   ├── AssetsController.cs
│   ├── LocationController.cs
│   └── FaultDetectionController.cs
│
├── Services/                 # Business logic
│   ├── Interfaces/
│   │   ├── IEquipmentService.cs
│   │   ├── IAlertService.cs
│   │   └── IFaultDetectionService.cs
│   ├── EquipmentService.cs
│   ├── AlertService.cs
│   └── FaultDetectionService.cs
│
├── Data/                     # Database layer
│   ├── ApplicationDbContext.cs
│   ├── Repositories/
│   │   ├── IRepository.cs
│   │   ├── EquipmentRepository.cs
│   │   └── AlertRepository.cs
│   └── Migrations/
│
├── Models/                   # Domain entities
│   ├── Equipment.cs
│   ├── Alert.cs
│   ├── Asset.cs
│   ├── Location.cs
│   └── User.cs
│
├── DTOs/                     # API contracts
│   ├── Requests/
│   │   ├── CreateEquipmentRequest.cs
│   │   └── UpdateAlertRequest.cs
│   └── Responses/
│       ├── EquipmentResponse.cs
│       └── AlertResponse.cs
│
├── Middleware/
│   ├── FirebaseAuthMiddleware.cs
│   ├── ExceptionHandlingMiddleware.cs
│   └── RequestLoggingMiddleware.cs
│
├── Configuration/
│   ├── DatabaseConfiguration.cs
│   ├── FirebaseConfiguration.cs
│   └── SwaggerConfiguration.cs
│
├── Validators/
│   ├── CreateEquipmentValidator.cs
│   └── UpdateAlertValidator.cs
│
├── Mappings/
│   └── AutoMapperProfile.cs
│
├── appsettings.json
├── appsettings.Development.json
├── appsettings.Production.json
├── Program.cs
└── FaultReporter.API.csproj

FaultReporter.Tests/
├── Unit/
│   ├── Services/
│   └── Controllers/
└── Integration/
    └── Controllers/
```

---

## Implementation Roadmap

### Phase 1: Core API Setup (Week 1-2)

- [ ] Create ASP.NET Core Web API project
- [ ] Configure PostgreSQL with Entity Framework Core
- [ ] Set up Firebase Authentication middleware
- [ ] Implement base repository pattern
- [ ] Create equipment and alert entities
- [ ] Set up logging and error handling
- [ ] Configure Swagger/OpenAPI

### Phase 2: Core Endpoints (Week 2-3)

- [ ] Implement Equipment endpoints (CRUD)
- [ ] Implement Alert endpoints (CRUD)
- [ ] Implement Location endpoints
- [ ] Implement Asset endpoints
- [ ] Add authentication to all endpoints
- [ ] Write unit tests

### Phase 3: Advanced Features (Week 3-4)

- [ ] Implement subsystem verification endpoints
- [ ] Add background job processing
- [ ] Set up database migrations
- [ ] Implement caching strategy
- [ ] Add pagination and filtering

### Phase 4: AI Integration (Week 4-5)

- [ ] Create Python FastAPI microservice
- [ ] Implement fault detection ML model
- [ ] Create gRPC/HTTP communication layer
- [ ] Integrate AI service with main API
- [ ] Test AI predictions

### Phase 5: Production Readiness (Week 5-6)

- [ ] Set up Docker containers
- [ ] Configure CI/CD pipelines
- [ ] Implement health checks
- [ ] Add monitoring and alerting
- [ ] Performance testing
- [ ] Security audit
- [ ] Deploy to staging environment

---

## Sample Code Examples

### 1. Program.cs (ASP.NET Core Entry Point)

```csharp
using Microsoft.EntityFrameworkCore;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Serilog;
using FaultReporter.API.Data;
using FaultReporter.API.Services;
using FaultReporter.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Firebase
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("firebase-adminsdk.json")
});

// Register services
builder.Services.AddScoped<IEquipmentService, EquipmentService>();
builder.Services.AddScoped<IAlertService, AlertService>();
builder.Services.AddScoped<IFaultDetectionService, FaultDetectionService>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<FirebaseAuthMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### 2. ApplicationDbContext.cs

```csharp
using Microsoft.EntityFrameworkCore;
using FaultReporter.API.Models;

namespace FaultReporter.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Equipment configuration
            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.EquipmentCode).IsRequired().HasMaxLength(50);
                entity.Property(e => e.EquipmentName).IsRequired().HasMaxLength(200);
                entity.HasIndex(e => e.EquipmentCode).IsUnique();

                // JSON column for metadata
                entity.Property(e => e.Metadata).HasColumnType("jsonb");
            });

            // Alert configuration
            modelBuilder.Entity<Alert>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.Title).IsRequired().HasMaxLength(200);
                entity.HasOne(a => a.Equipment)
                    .WithMany(e => e.Alerts)
                    .HasForeignKey(a => a.EquipmentId);

                entity.HasIndex(a => a.CreatedAt);
                entity.HasIndex(a => a.Status);
            });

            // Location configuration
            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(l => l.Id);
                entity.Property(l => l.BuildingName).HasMaxLength(200);
                entity.Property(l => l.Floor).HasMaxLength(50);

                // PostgreSQL point type for coordinates
                entity.Property(l => l.Coordinates).HasColumnType("point");
            });
        }
    }
}
```

### 3. Equipment Model

```csharp
using System.ComponentModel.DataAnnotations;

namespace FaultReporter.API.Models
{
    public class Equipment
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string EquipmentCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string EquipmentName { get; set; } = string.Empty;

        public string? Description { get; set; }

        public Guid LocationId { get; set; }
        public Location Location { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // JSON column for flexible metadata
        public Dictionary<string, object>? Metadata { get; set; }

        // Navigation properties
        public ICollection<Alert> Alerts { get; set; } = new List<Alert>();
    }
}
```

### 4. Equipment Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using FaultReporter.API.Services;
using FaultReporter.API.DTOs.Requests;
using FaultReporter.API.DTOs.Responses;

namespace FaultReporter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _equipmentService;
        private readonly ILogger<EquipmentController> _logger;

        public EquipmentController(
            IEquipmentService equipmentService,
            ILogger<EquipmentController> logger)
        {
            _equipmentService = equipmentService;
            _logger = logger;
        }

        /// <summary>
        /// Get all equipment with optional filtering
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipmentResponse>>> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? search = null)
        {
            try
            {
                var equipment = await _equipmentService.GetAllAsync(page, pageSize, search);
                return Ok(equipment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving equipment list");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Get equipment by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<EquipmentResponse>> GetById(Guid id)
        {
            var equipment = await _equipmentService.GetByIdAsync(id);

            if (equipment == null)
                return NotFound($"Equipment with ID {id} not found");

            return Ok(equipment);
        }

        /// <summary>
        /// Get equipment location details
        /// </summary>
        [HttpGet("{id}/location")]
        public async Task<ActionResult<LocationResponse>> GetLocation(Guid id)
        {
            var location = await _equipmentService.GetLocationAsync(id);

            if (location == null)
                return NotFound($"Location not found for equipment {id}");

            return Ok(location);
        }

        /// <summary>
        /// Create new equipment
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<EquipmentResponse>> Create(
            [FromBody] CreateEquipmentRequest request)
        {
            try
            {
                var equipment = await _equipmentService.CreateAsync(request);
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = equipment.Id },
                    equipment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Update equipment
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<EquipmentResponse>> Update(
            Guid id,
            [FromBody] UpdateEquipmentRequest request)
        {
            try
            {
                var equipment = await _equipmentService.UpdateAsync(id, request);

                if (equipment == null)
                    return NotFound($"Equipment with ID {id} not found");

                return Ok(equipment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Delete equipment
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _equipmentService.DeleteAsync(id);

            if (!result)
                return NotFound($"Equipment with ID {id} not found");

            return NoContent();
        }
    }
}
```

### 5. Firebase Authentication Middleware

```csharp
using FirebaseAdmin.Auth;
using System.Security.Claims;

namespace FaultReporter.API.Middleware
{
    public class FirebaseAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<FirebaseAuthMiddleware> _logger;

        public FirebaseAuthMiddleware(
            RequestDelegate next,
            ILogger<FirebaseAuthMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Skip auth for health checks, swagger, etc.
            if (context.Request.Path.StartsWithSegments("/health") ||
                context.Request.Path.StartsWithSegments("/swagger"))
            {
                await _next(context);
                return;
            }

            var authHeader = context.Request.Headers.Authorization.FirstOrDefault();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Missing or invalid authorization header");
                return;
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();

            try
            {
                // Verify Firebase token
                var decodedToken = await FirebaseAuth.DefaultInstance
                    .VerifyIdTokenAsync(token);

                // Add claims to context
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, decodedToken.Uid),
                    new Claim(ClaimTypes.Email, decodedToken.Claims.GetValueOrDefault("email")?.ToString() ?? "")
                };

                var identity = new ClaimsIdentity(claims, "Firebase");
                context.User = new ClaimsPrincipal(identity);

                await _next(context);
            }
            catch (FirebaseAuthException ex)
            {
                _logger.LogWarning(ex, "Firebase token validation failed");
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid or expired token");
            }
        }
    }
}
```

### 6. appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=faultreporter;Username=postgres;Password=your_password"
  },
  "Firebase": {
    "ProjectId": "your-firebase-project-id"
  },
  "Serilog": {
    "Using": ["Serilog.Sinks.Console", "Serilog.Sinks.File"],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      { "Name": "Console" },
      {
        "Name": "File",
        "Args": {
          "path": "logs/log-.txt",
          "rollingInterval": "Day"
        }
      }
    ]
  }
}
```

---

## Database Schema Example

```sql
-- Equipment table
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_code VARCHAR(50) UNIQUE NOT NULL,
    equipment_name VARCHAR(200) NOT NULL,
    description TEXT,
    location_id UUID REFERENCES locations(id),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Alerts table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'open',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Locations table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_name VARCHAR(200),
    building_address TEXT,
    floor VARCHAR(50),
    room VARCHAR(100),
    zone VARCHAR(100),
    coordinates POINT,
    access_instructions TEXT,
    safety_notes TEXT[],
    nearby_landmarks TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_equipment_code ON equipment(equipment_code);
CREATE INDEX idx_alerts_equipment_id ON alerts(equipment_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);
```

---

## Deployment Considerations

### Docker Setup

**Dockerfile for ASP.NET Core**

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FaultReporter.API/FaultReporter.API.csproj", "FaultReporter.API/"]
RUN dotnet restore "FaultReporter.API/FaultReporter.API.csproj"
COPY . .
WORKDIR "/src/FaultReporter.API"
RUN dotnet build "FaultReporter.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FaultReporter.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FaultReporter.API.dll"]
```

**docker-compose.yml**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: faultreporter
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_secure_password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '5000:80'
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=faultreporter;Username=postgres;Password=your_secure_password
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./firebase-adminsdk.json:/app/firebase-adminsdk.json

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## Cost Comparison (Cloud Hosting)

### Small Scale (1,000 users, 100k requests/day)

| Technology | Cloud VM      | Database         | Total/Month |
| ---------- | ------------- | ---------------- | ----------- |
| .NET       | $20 (2GB RAM) | $25 (PostgreSQL) | **$45**     |
| Python     | $30 (3GB RAM) | $25 (PostgreSQL) | **$55**     |
| Rust       | $15 (1GB RAM) | $25 (PostgreSQL) | **$40**     |

### Medium Scale (10,000 users, 1M requests/day)

| Technology | Cloud VM      | Database         | Total/Month |
| ---------- | ------------- | ---------------- | ----------- |
| .NET       | $50 (4GB RAM) | $75 (PostgreSQL) | **$125**    |
| Python     | $80 (6GB RAM) | $75 (PostgreSQL) | **$155**    |
| Rust       | $40 (3GB RAM) | $75 (PostgreSQL) | **$115**    |

_Note: Prices are approximate for AWS/DigitalOcean_

---

## Free and Budget Hosting Options for Testing

### ⭐ Recommended Free Tier Stack for Testing

**Best Free Combination:**

```
API: Railway.app (Free tier: 500 hrs/month, $5 credit)
Database: Neon (Free tier: 0.5GB storage, 1 compute)
Total Cost: $0/month for testing
```

### Detailed Free Hosting Options by Technology

#### 1. .NET (ASP.NET Core) Hosting

##### Option A: Railway.app ⭐ BEST FOR .NET

- **Free Tier**: 500 execution hours/month + $5 starter credit
- **Specs**: 512MB RAM, 1GB storage
- **Features**:
  - ✅ Native .NET support (no Docker needed)
  - ✅ Auto-deploy from GitHub
  - ✅ Environment variables
  - ✅ Custom domains
  - ✅ HTTPS included
  - ✅ Easy PostgreSQL integration
- **Setup**: Connect GitHub repo, Railway auto-detects .NET
- **Limitations**: Sleeps after 30min inactivity (free tier)
- **Perfect for**: Development and testing
- **Website**: https://railway.app

##### Option B: Azure App Service (Free Tier)

- **Free Tier**: F1 tier - 1GB RAM, 1GB storage
- **Specs**: 60 CPU minutes/day
- **Features**:
  - ✅ Native .NET hosting (Microsoft's platform)
  - ✅ CI/CD with GitHub Actions
  - ✅ Custom domains (HTTPS requires paid tier)
  - ✅ Easy scaling when ready
- **Limitations**:
  - ❌ Shared infrastructure (slower)
  - ❌ Limited CPU time
  - ❌ No always-on (sleeps after idle)
- **Perfect for**: Microsoft ecosystem integration
- **Website**: https://azure.microsoft.com/free

##### Option C: Render.com

- **Free Tier**: 750 hours/month (individual services)
- **Specs**: 512MB RAM, shared CPU
- **Features**:
  - ✅ Docker support (works with .NET)
  - ✅ Auto-deploy from Git
  - ✅ Free SSL
  - ✅ Free PostgreSQL (90 days, then expires)
- **Limitations**:
  - ❌ Spins down after 15min inactivity
  - ❌ Slow cold starts (30-60 seconds)
  - ❌ Database expires after 90 days on free tier
- **Website**: https://render.com

##### Option D: Fly.io

- **Free Tier**: 3 shared-cpu VMs (256MB RAM each)
- **Specs**: 160GB outbound data transfer
- **Features**:
  - ✅ Excellent Docker support
  - ✅ Global deployment
  - ✅ Always-on (doesn't sleep)
  - ✅ Free SSL
- **Limitations**: Limited to 3 small VMs
- **Website**: https://fly.io

---

#### 2. Python (FastAPI) Hosting

##### Option A: Railway.app ⭐ BEST FOR PYTHON

- **Free Tier**: Same as .NET (500 hrs/month + $5 credit)
- **Specs**: 512MB RAM, 1GB storage
- **Features**:
  - ✅ Native Python support
  - ✅ Requirements.txt auto-detection
  - ✅ All Railway features listed above
- **Perfect for**: Python APIs with minimal setup

##### Option B: Render.com

- **Free Tier**: 750 hours/month
- **Better for Python than .NET** (faster cold starts)
- **Same features** as listed above

##### Option C: PythonAnywhere

- **Free Tier**: 1 web app, 512MB storage
- **Specs**: Limited CPU, 100k hits/day
- **Features**:
  - ✅ Python-specific hosting
  - ✅ Web-based IDE
  - ✅ Scheduled tasks
- **Limitations**:
  - ❌ No HTTPS on free tier
  - ❌ Restricted outbound HTTPS connections
  - ❌ Limited to specific Python versions
- **Website**: https://www.pythonanywhere.com

##### Option D: Heroku Alternatives (since Heroku free tier ended)

- **Koyeb**: 512MB RAM, free tier similar to Render
- **Deta Space**: Free serverless Python hosting (limited features)

---

#### 3. Rust Hosting

##### Option A: Fly.io ⭐ BEST FOR RUST

- **Why**: Rust compiles to tiny binaries (~10MB)
- **Free Tier**: 3 VMs × 256MB = perfect for Rust
- **Benefits**: Rust uses minimal memory, fits free tier perfectly

##### Option B: Railway.app

- **Docker support**: Works great with Rust
- **Smaller footprint** = better free tier value

##### Option C: Shuttle.rs ⭐ RUST-SPECIFIC

- **Free Tier**: Purpose-built for Rust
- **Specs**: Limited resources but optimized for Rust
- **Features**:
  - ✅ Native Rust deployment (cargo shuttle deploy)
  - ✅ Free PostgreSQL included
  - ✅ Automatic HTTPS
- **Website**: https://www.shuttle.rs

---

### PostgreSQL Database Hosting (Free Tier)

#### Option A: Neon ⭐ BEST FREE POSTGRES

- **Free Tier**:
  - 0.5GB storage
  - 1 compute (autoscaling)
  - Unlimited databases
  - No credit card required
- **Features**:
  - ✅ Serverless PostgreSQL
  - ✅ Branching (like Git for databases)
  - ✅ Auto-scaling
  - ✅ Always-on
  - ✅ Modern interface
- **Limitations**: 0.5GB storage limit
- **Perfect for**: Development and testing
- **Website**: https://neon.tech

#### Option B: Supabase

- **Free Tier**:
  - 500MB database
  - Unlimited API requests
  - 50MB file storage
  - 2GB bandwidth
- **Features**:
  - ✅ PostgreSQL + RESTful API
  - ✅ Real-time subscriptions
  - ✅ Built-in authentication (alternative to Firebase)
  - ✅ Storage buckets
  - ✅ Auto-generated API
- **Bonus**: Could replace Firebase Auth + provide database
- **Limitations**: Projects pause after 1 week inactivity (free tier)
- **Website**: https://supabase.com

#### Option C: ElephantSQL

- **Free Tier (Tiny Turtle)**:
  - 20MB storage
  - 5 concurrent connections
  - Shared CPU
- **Features**:
  - ✅ Simple PostgreSQL hosting
  - ✅ No credit card required
  - ✅ Easy connection string
- **Limitations**: Very limited storage (20MB)
- **Website**: https://www.elephantsql.com

#### Option D: Railway.app PostgreSQL

- **Free Tier**: Included with Railway free credits
- **Features**:
  - ✅ One-click PostgreSQL addon
  - ✅ Same network as your API (faster)
  - ✅ Auto-backup
- **Best if**: You're already using Railway for API

#### Option E: Render.com PostgreSQL

- **Free Tier**: 90 days free trial
- **After 90 days**: Database deleted
- **Good for**: Short-term testing only

---

### Complete Free Testing Stacks

#### Stack 1: Maximum Free Features (Recommended)

```
API:      Railway.app (500hrs + $5 credit)
Database: Neon (0.5GB, always-on)
Auth:     Firebase (Existing - already free tier)

Total: $0/month
Limitations: Railway sleeps after inactivity, Neon 0.5GB storage
Good for: Development, QA testing, demos
```

#### Stack 2: Postgres Alternative with Built-in Auth

```
API:      Railway.app (500hrs + $5 credit)
Backend:  Supabase (500MB DB + Auth + Storage + API)

Total: $0/month
Benefits: Replace Firebase + PostgreSQL with one platform
Trade-off: Need to migrate from Firebase Auth
Good for: New projects, reducing services
```

#### Stack 3: Microsoft Ecosystem

```
API:      Azure App Service (F1 Free tier)
Database: Azure Database for PostgreSQL (Trial credits)
Auth:     Firebase (Existing)

Total: $0 for first month (with Azure $200 trial credit)
After trial: Need to migrate or pay
Good for: Short-term testing, Azure learning
```

#### Stack 4: All-Railway (Simplest Setup)

```
API:      Railway.app
Database: Railway PostgreSQL addon
Auth:     Firebase

Total: $0 with $5 starter credit (~1-2 months testing)
Benefits: Single platform, easy setup, same network
Good for: Quick prototyping, learning
```

#### Stack 5: Rust Optimized

```
API:      Fly.io (3 × 256MB VMs)
Database: Neon (0.5GB)
Auth:     Firebase

Total: $0/month
Benefits: Always-on, Rust's small footprint fits perfectly
Good for: Performance testing, production-like environment
```

---

### Step-by-Step: Deploy .NET API for Free

#### Using Railway.app + Neon (Recommended)

**1. Set up Neon Database (2 minutes)**

```bash
# Visit https://neon.tech
# Sign up with GitHub (no credit card)
# Create new project: "fault-reporter"
# Copy connection string (looks like):
postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb
```

**2. Prepare Your .NET Project**

```bash
# Add environment variable support to Program.cs
builder.Configuration.AddEnvironmentVariables();

# Update connection string to use environment variable
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        Environment.GetEnvironmentVariable("DATABASE_URL") ??
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));
```

**3. Deploy to Railway (5 minutes)**

```bash
# Visit https://railway.app
# Sign up with GitHub
# Click "New Project" → "Deploy from GitHub repo"
# Select your fault-reporter backend repo
# Railway auto-detects .NET project
# Add environment variable:
#   DATABASE_URL = [paste Neon connection string]
#   ASPNETCORE_ENVIRONMENT = Production
# Railway builds and deploys automatically
# Copy your app URL: https://your-app.railway.app
```

**4. Run Database Migrations**

```bash
# Update your .NET project to run migrations on startup
# Add to Program.cs:
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}
```

**5. Update React Native App**

```bash
# Update .env file
EXPO_PUBLIC_API_BASE_URL=https://your-app.railway.app
EXPO_PUBLIC_USE_MOCK_API=false

# Test your endpoints!
```

---

### Free Tier Comparison Table

| Service         | Free Tier   | Always-On   | Storage   | Database         | Best For         |
| --------------- | ----------- | ----------- | --------- | ---------------- | ---------------- |
| **Railway.app** | 500hrs + $5 | ❌ (sleeps) | 1GB       | PostgreSQL addon | .NET, Python     |
| **Fly.io**      | 3×256MB     | ✅ Yes      | 3GB total | External needed  | Rust, always-on  |
| **Render**      | 750hrs      | ❌ (sleeps) | 512MB     | 90 days free     | Python           |
| **Azure Free**  | F1 tier     | ❌ (sleeps) | 1GB       | Trial credits    | .NET (Microsoft) |
| **Neon**        | Database    | ✅ Yes      | 0.5GB     | PostgreSQL only  | Best free DB     |
| **Supabase**    | Database+   | ⚠️ (pauses) | 500MB     | PostgreSQL + API | All-in-one       |
| **Shuttle.rs**  | Limited     | ✅ Yes      | Limited   | Included         | Rust-specific    |

---

### Budget Hosting ($5-10/month)

If you have a small budget, these paid options offer better reliability:

#### Railway.app - $5/month

- **What you get**: Remove sleep mode, $5 usage credit
- **Total**: Always-on API
- **Best value**: If you're already on free tier

#### DigitalOcean App Platform - $5/month

- **Specs**: 512MB RAM, always-on
- **Includes**: Auto-deploy, metrics, alerts
- **Plus**: $200 free credit for new users (60 days)

#### Render.com - $7/month

- **Specs**: 512MB RAM, always-on
- **No sleep**: Professional tier benefits

#### Fly.io - $1.94/month

- **What you get**: 1 shared-cpu VM (256MB RAM, always-on)
- **Perfect for**: Rust APIs (tiny footprint)

#### Hetzner Cloud - €4.49/month (~$5)

- **Specs**: 2GB RAM, 20GB SSD, 1 vCPU
- **Best value**: European VPS, run anything (Docker)
- **Manual setup**: Not PaaS, but incredible value

---

### My Testing Recommendation

**For .NET API Testing (Zero Budget):**

```
Phase 1: Free Development (0-3 months)
├── API: Railway.app (500hrs + $5 credit)
├── Database: Neon (0.5GB)
├── Auth: Firebase (existing, free tier)
└── Cost: $0/month

Phase 2: If Testing Goes Well (month 3+)
├── API: Railway.app ($5/month for always-on)
├── Database: Neon (still free, or upgrade to $19/month for 10GB)
├── Auth: Firebase (still free for small usage)
└── Cost: $5-24/month

Phase 3: Production Ready (when revenue starts)
├── API: DigitalOcean App Platform ($12/month)
├── Database: Managed PostgreSQL ($15/month)
├── Auth: Firebase (pay-as-you-go)
└── Cost: ~$30-50/month
```

---

### Important Tips for Free Tier Hosting

1. **Prevent Sleep Issues**:

   ```bash
   # Option 1: Free uptime monitoring pings your API
   # Use: UptimeRobot (50 monitors free)
   # https://uptimerobot.com

   # Option 2: Scheduled ping from GitHub Actions
   # Add .github/workflows/keep-alive.yml
   ```

2. **Monitor Free Tier Limits**:
   - Railway: Check usage in dashboard (500hrs = ~20 days if always-on)
   - Neon: Monitor storage usage
   - Set up email alerts before hitting limits

3. **Database Migrations**:
   - Always test migrations locally first
   - Free tiers have limited storage - clean up test data regularly

4. **Optimize for Free Tier**:
   - Enable response compression (reduces bandwidth)
   - Use caching (reduces database queries)
   - Implement rate limiting (prevents abuse)

5. **Backup Strategy**:
   - Free tiers can delete data unexpectedly
   - Use `pg_dump` to backup Neon database weekly
   - Store backups in GitHub or Google Drive

---

### Quick Start: Deploy in 10 Minutes

**Fastest path to testing your API online:**

1. **Sign up** (2 min)
   - Railway.app (with GitHub)
   - Neon.tech (with GitHub)

2. **Create Database** (2 min)
   - Neon: New Project → Copy connection string

3. **Deploy API** (5 min)
   - Railway: New Project → GitHub Repo
   - Add DATABASE_URL environment variable
   - Railway auto-deploys

4. **Test** (1 min)
   - Copy Railway URL
   - Update React Native .env
   - Test your API!

**Total time: ~10 minutes**
**Total cost: $0**

---

---

## Decision Framework

### Choose .NET if you answer "Yes" to most of these:

- [ ] You need production-ready code quickly
- [ ] You value strong typing and compile-time safety
- [ ] You want excellent PostgreSQL integration
- [ ] You need enterprise features (logging, monitoring, background jobs)
- [ ] You plan to scale your development team
- [ ] You want official Firebase Admin SDK support
- [ ] You're comfortable with C# or willing to learn
- [ ] You need robust error handling and debugging

### Choose FastAPI if you answer "Yes" to most of these:

- [ ] AI/ML is your core differentiator
- [ ] You have Python expertise on your team
- [ ] You want the fastest initial development
- [ ] You need to process data with pandas/numpy
- [ ] You're comfortable with dynamic typing trade-offs
- [ ] You don't need complex background job processing

### Choose Rust if you answer "Yes" to most of these:

- [ ] You need extreme performance (100k+ req/s per instance)
- [ ] You're building performance-critical microservices
- [ ] You want minimal memory footprint
- [ ] You have time for a steeper learning curve
- [ ] You're willing to build some tooling yourself
- [ ] You can work without official Firebase SDK

---

## Final Recommendation Summary

**Primary Stack: ASP.NET Core + PostgreSQL**

**Rationale:**

1. **Best PostgreSQL integration** with Entity Framework Core
2. **Official Firebase Admin SDK** for seamless auth
3. **Enterprise-grade reliability** for fault monitoring systems
4. **Strong typing prevents runtime errors** in critical systems
5. **Mature ecosystem** for monitoring, logging, and alerting
6. **Future-proof** with Microsoft's continued investment

**Optional Enhancement: Python AI Microservice**

If AI fault detection becomes complex, add a Python FastAPI microservice later. This gives you:

- .NET's reliability for core CRUD operations
- Python's ML ecosystem for AI features
- Flexibility to evolve architecture

**Starting Point:**
Begin with .NET for all features. Only add Python microservice if/when AI complexity justifies it.

---

## Next Steps

1. **Set up development environment**
   - Install .NET 8 SDK
   - Install PostgreSQL 16
   - Set up Firebase project and download service account key

2. **Create initial project**

   ```bash
   dotnet new webapi -n FaultReporter.API
   cd FaultReporter.API
   dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
   dotnet add package FirebaseAdmin
   dotnet add package Serilog.AspNetCore
   ```

3. **Follow implementation roadmap** (outlined above)

4. **Connect React Native app**
   - Update `EXPO_PUBLIC_API_BASE_URL` to point to .NET API
   - Send Firebase tokens in Authorization header
   - Update service layer to use real endpoints

---

## Additional Resources

### .NET Learning Resources

- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core Tutorial](https://learn.microsoft.com/en-us/ef/core/)
- [Firebase Admin .NET SDK](https://firebase.google.com/docs/admin/setup#dotnet)

### PostgreSQL with .NET

- [Npgsql Documentation](https://www.npgsql.org/efcore/)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)

### Tools

- [Visual Studio Code](https://code.visualstudio.com/) (Free)
- [JetBrains Rider](https://www.jetbrains.com/rider/) (Paid, excellent for .NET)
- [Postman](https://www.postman.com/) (API testing)
- [pgAdmin](https://www.pgadmin.org/) (PostgreSQL GUI)

---

## Conclusion

For your Fault Reporter application with PostgreSQL and Firebase Authentication, **ASP.NET Core** provides the optimal balance of:

- Development productivity
- Runtime performance
- Enterprise features
- Long-term maintainability
- Excellent PostgreSQL and Firebase integration

Start with .NET for the full stack. If AI becomes a major focus, add a Python microservice later.

This approach gives you a solid foundation today with flexibility to evolve tomorrow.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-25
**Author:** Backend Architecture Recommendation
