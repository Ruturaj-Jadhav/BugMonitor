package com.pgs.BugMonitor.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pgs.BugMonitor.entity.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {

	Users findByEmail(String username);
	
}
