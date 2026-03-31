# Smart Examination Anti-Cheating & Seating Optimization System

## Overview
University-focused algorithm visualization + decision system for intelligent exam seat allocation using DSA (Graph Coloring, Greedy Algorithms). Designed specifically for Software Engineering Department with batch-based student management and section-wise organization.

## Technology Stack
- **Backend**: Java 17, Spring Boot 3.2.x
- **Frontend**: React 19, Vite, Tailwind CSS
- **Build Tool**: Maven with frontend-maven-plugin
- **Libraries**: Apache POI (CSV), iText (PDF), Lombok

## University Configuration

### Roll Number Format
The system uses standardized university roll numbers in the format: `YYYY[F/S]-BSE-XXX`
- **YYYY**: Year (e.g., 2024, 2023)
- **[F/S]**: Semester (F = Fall, S = Spring)
- **BSE**: Department code (Bachelor of Software Engineering)
- **XXX**: Sequential number (001-999)

**Examples:**
- `2024F-BSE-001` - Fall 2024, BSE, Roll #1
- `2023S-BSE-150` - Spring 2023, BSE, Roll #150

### Section Assignment Rules
- **Section A**: Roll numbers 001-050
- **Section B**: Roll numbers 051-100
- **Section C**: Roll numbers 101-150
- **Section D**: Roll numbers 151-200
- **Section E**: Roll numbers 201-250
- **Section F**: Roll numbers 251-300

### Supported Subjects
- Data Structures & Algorithms (DSA)
- Discrete Mathematics
- Communication Skills
- Software Requirements Engineering (SRE)
- Object-Oriented Programming (OOP)
- Database Systems
- Web Engineering

## Technology Stack
- **Backend**: Java 17, Spring Boot 3.2.x
- **Frontend**: React 19, Vite, Tailwind CSS
- **Build Tool**: Maven with frontend-maven-plugin
- **Libraries**: Apache POI (CSV), iText (PDF), Lombok

## Project Structure
- `model/` - Domain models (Student, Seat, ExamHall)
- `service/` - Core DSA algorithms
- `controller/` - REST API endpoints
- `src/main/resources/frontend/` - React + Vite frontend
- `src/main/resources/static/` - Built frontend assets (auto-generated)

## Running the Application

### Production Build (Recommended)
```bash
mvn clean package
mvn spring-boot:run
```
Access at: http://localhost:8080

### Development Mode
**Backend:**
```bash
mvn spring-boot:run
```

**Frontend (separate terminal):**
```bash
cd src/main/resources/frontend
npm install
npm run dev
```
Frontend dev server: http://localhost:5173 (proxies API to backend)



### Core Algorithm Approach
- **Graph Coloring Algorithm**: Models students as nodes and same-subject relationships as edges, ensuring optimal separation
- **Greedy Optimization**: Minimizes cheating risk through distance-based penalty calculation and conflict detection

### Key Outcomes
- **Risk Reduction**: Quantified risk scoring with color-coded visualization (referenced in riskReport.totalRiskScore)
- **Fairness**: Equal distribution across all subjects using algorithmic optimization
- **Automation**: Processes 1000+ students in seconds vs hours of manual work


## Key Features
- Intelligent seat allocation using Graph Coloring
- Anti-cheating risk detection (color-coded visualization)
- Before vs After optimization comparison
- Multi-hall management
- CSV upload & PDF export

## API Documentation

### CSV Upload & Management

#### Upload Students CSV
```bash
POST /api/seating/upload-csv
Content-Type: multipart/form-data

curl -X POST -F "file=@students.csv" http://localhost:8080/api/seating/upload-csv
```

**CSV Format Requirements:**
- Header: `RollNo,Name,Subject`
- Roll numbers must follow university format: `YYYY[F/S]-BSE-XXX`
- No duplicate roll numbers allowed
- Maximum 1000 rows
- File size limit: 10MB

**University CSV Example:**
```csv
RollNo,Name,Subject
2024F-BSE-001,Ahmed Khan,DSA
2024F-BSE-002,Fatima Ali,Database Systems
2024F-BSE-051,Hassan Shah,Web Engineering
2023S-BSE-025,Ayesha Malik,OOP
```

**Response (200 OK):**
```json
[
  {
    "rollNo": "2024F-BSE-001",
    "name": "Ahmed Khan",
    "subject": "DSA",
    "batch": "2024F",
    "section": "A",
    "department": "BSE"
  }
]
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Duplicate student found",
  "errorDetails": "Duplicate roll number found: S001",
  "lineNumber": 3
}
```

#### Download Sample CSV
```bash
GET /api/demo/sample-csv?batch=2024F&sections=3&studentsPerSection=50

curl -O "http://localhost:8080/api/demo/sample-csv?batch=2024F&sections=3&studentsPerSection=50"
```

#### Generate Sample University Data
```bash
GET /api/demo/generate-sample-data?batch=2024F&sections=3&studentsPerSection=50

curl "http://localhost:8080/api/demo/generate-sample-data?batch=2024F&sections=3&studentsPerSection=50"
```

### Batch/Section Filtering

#### Filter Students by Criteria
```bash
GET /api/students/filter?batch=2024F&section=A&subject=DSA

curl "http://localhost:8080/api/students/filter?batch=2024F&section=A&subject=DSA"
```

#### Allocate Seats by Batch
```bash
POST /api/seating/allocate-by-batch
Content-Type: application/json

curl -X POST -H "Content-Type: application/json" -d '{
  "students": [...],
  "hallId": "HALL_001",
  "batch": "2024F",
  "section": "A",
  "useOptimization": true
}' http://localhost:8080/api/seating/allocate-by-batch
```

### Overflow Management

#### Get Overflow Students
```bash
GET /api/seating/overflow/{hallId}

curl http://localhost:8080/api/seating/overflow/HALL_001
```

#### Move Overflow Students
```bash
POST /api/seating/move-overflow
Content-Type: application/json

curl -X POST -H "Content-Type: application/json" -d '{
  "sourceHallId": "HALL_001",
  "targetHallIds": ["HALL_002", "HALL_003"],
  "overflowStudents": [...]
}' http://localhost:8080/api/seating/move-overflow
```

### Seat Allocation

#### Allocate Seats
```bash
POST /api/seating/allocate
Content-Type: application/json

curl -X POST -H "Content-Type: application/json" -d '{
  "students": [
    {"rollNo": "2024F-BSE-001", "name": "Ahmed Khan", "subject": "DSA"},
    {"rollNo": "2024F-BSE-002", "name": "Fatima Ali", "subject": "Database Systems"}
  ],
  "hallId": "HALL_001",
  "rows": 5,
  "cols": 5,
  "useOptimization": true
}' http://localhost:8080/api/seating/allocate
```

**Response:**
```json
{
  "hallId": "HALL_001",
  "seats": [[...]], 
  "riskReport": {
    "totalRiskScore": 15.5,
    "totalConflicts": 2,
    "occupiedSeats": 10,
    "totalSeats": 25
  },
  "success": true,
  "message": "Seats allocated successfully"
}
```

### PDF Export

#### Export Seating Chart
```bash
GET /api/export/pdf/{hallId}

curl -O http://localhost:8080/api/export/pdf/HALL_001
```

**Response:** PDF file download with seating chart

### Hall Management

#### Get All Halls
```bash
GET /api/halls

curl http://localhost:8080/api/halls
```

#### Create Hall
```bash
POST /api/halls?hallId=HALL_002&rows=6&cols=8

curl -X POST "http://localhost:8080/api/halls?hallId=HALL_002&rows=6&cols=8"
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (validation errors) |
| 404 | Hall not found |
| 413 | File too large (>10MB) |
| 415 | Unsupported file type |
| 500 | Internal server error |

## CSV Validation Rules

| Rule | Validation | Error Type |
|------|------------|------------|
| File extension | Must be .csv | 415 Unsupported Media Type |
| File size | Max 10MB | 413 Payload Too Large |
| Header format | RollNo,Name,Subject | InvalidCSVStructureException |
| Column count | Exactly 3 columns | CSVRowValidationException |
| Roll number format | Must match YYYY[F/S]-BSE-XXX | CSVRowValidationException |
| Roll number uniqueness | Must be unique | DuplicateStudentException |
| Name | Not empty | CSVRowValidationException |
| Subject | Must be valid SE subject | CSVRowValidationException |
| Max rows | 1000 rows | CSVParsingException |
| Empty file | Must have content | EmptyCSVException |

## University Features

### Batch Management
- **Automatic Parsing**: Roll numbers are automatically parsed to extract batch, section, and department
- **Filtering**: Filter students by batch (e.g., 2024F, 2023S) for targeted allocation
- **Statistics**: Generate batch-wise and section-wise statistics in PDFs

### Section Organization
- **Auto-Assignment**: Sections are automatically determined from roll number ranges
- **Section Headers**: Bulk admit cards include section-wise organization with headers
- **Distribution Reports**: View student distribution across sections

### Overflow Management
- **Detection**: Identify students who cannot be allocated due to capacity or conflicts
- **Redistribution**: Move overflow students to compatible halls automatically
- **Compatibility Analysis**: Get suggestions for compatible halls based on student criteria

### Enhanced PDF Generation
- **University Branding**: All PDFs include "Software Engineering Department" branding
- **Batch Information**: Headers include batch information (e.g., "Batch 2024F")
- **Section Grouping**: Bulk admit cards are organized by sections with statistics
- **Comprehensive Statistics**: Overall and section-wise statistics pages