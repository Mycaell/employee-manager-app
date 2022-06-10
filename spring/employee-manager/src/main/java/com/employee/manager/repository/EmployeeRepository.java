package com.employee.manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.manager.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	void deleteById(Long id);
	
	Optional<Employee> findById(Long id);
	
}
