Create database ams1;

CREATE TABLE employee_master (
    employee_id SERIAL PRIMARY KEY,      -- Unique ID for each employee
    first_name VARCHAR(100) NOT NULL,    -- First name of the employee
    last_name VARCHAR(100) NOT NULL,     -- Last name of the employee
    email VARCHAR(150) UNIQUE NOT NULL,  -- Unique email for each employee
    phone_number VARCHAR(15),            -- Optional phone number
    hire_date DATE NOT NULL,             -- Employee hire date
    job_title VARCHAR(100),              -- Job title of the employee
    department VARCHAR(100),             -- Department of the employee
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive')), -- Active or inactive employee
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Record update time
);

-- Create an index on the status column to optimize filtering by active/inactive status
CREATE INDEX idx_employee_status ON employee_master(status);

-- Create an index on the first_name, last_name, and email columns for search capabilities
CREATE INDEX idx_employee_name_search ON employee_master(first_name, last_name, email);



INSERT INTO employee_master (first_name, last_name, email, phone_number, hire_date, job_title, department, status)
VALUES ('John', 'Doe', 'john3.doe@example.com', '123-456-7890', '2024-09-01', 'Software Engineer', 'Engineering', 'active');

Select * from employee_master as tb ORDER BY tb.employee_id DESC

///====================search===================///
SELECT * 
FROM employee_master as tb
WHERE  tb.first_name like '%j%'
ORDER BY employee_id ASC;








