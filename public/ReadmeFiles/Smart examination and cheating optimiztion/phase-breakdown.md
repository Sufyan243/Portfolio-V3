# Phase Breakdown







## Task 8: Create Sample University Data Generator

Build utility to generate realistic dummy data for demonstration:

- Create `UniversityDataGenerator` utility class with methods to generate sample students
- Generate roll numbers in format: 2023F-BSE-001 to 2024S-BSE-150 (covering all sections)
- Use realistic SE subjects: DSA, Discrete Mathematics, Communication Skills, SRE, OOP, Database Systems, Web Engineering
- Create sample CSV files for different scenarios: single batch, mixed batches, overflow scenarios
- Add endpoint `GET /api/demo/generate-sample-data?batch=2024F&sections=3&studentsPerSection=50` in `e:\Java DSA\Smart Examination Anti-Cheating & Seating Optimization System\src\main\java\com\examseating\anticheating\controller\SeatingController.java`


## Task 9: Update Documentation and README with University Context

Update project documentation to reflect university-specific implementation:

- Update `e:\Java DSA\Smart Examination Anti-Cheating & Seating Optimization System\README.md` with university roll number format examples and validation rules
- Add section on batch/semester filtering capabilities
- Document overflow management workflow with screenshots
- Update CSV format documentation with university-specific examples
- Add "University Configuration" section explaining section ranges and batch filtering
- Update API documentation with new filtering and overflow endpoints