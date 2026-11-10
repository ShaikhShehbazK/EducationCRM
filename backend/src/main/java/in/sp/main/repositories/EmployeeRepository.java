package in.sp.main.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.sp.main.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long>
{
	Optional<Employee> findByEmail(String email);
}
