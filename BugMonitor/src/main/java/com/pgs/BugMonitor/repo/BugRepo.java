package com.pgs.BugMonitor.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgs.BugMonitor.entity.Bug;

import java.util.List;

public interface BugRepo extends JpaRepository<Bug, Integer> {

    List<Bug> findByProject_ProjectId(int projectId);

    List<Bug> findByAssignedTo_UserID(int developerId);

    List<Bug> findByCreatedBy_UserID(int testerId);
}
