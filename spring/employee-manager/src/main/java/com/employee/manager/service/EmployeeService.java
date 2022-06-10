package com.employee.manager.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.manager.exception.UserNotFoundException;
import com.employee.manager.model.Employee;
import com.employee.manager.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	private final EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeService(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	public Employee add(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepository.save(employee);
	}

	public Employee update(Employee employee) {
		return employeeRepository.save(employee);
	}

	public List<Employee> findAll() {
		return employeeRepository.findAll();
	}
	
	public Employee findById(Long id) {
		return employeeRepository.findById(id).orElseThrow(() -> new UserNotFoundException());
	}
	
	public void delete(Long id) {
		employeeRepository.deleteById(id);
	}
	
}
