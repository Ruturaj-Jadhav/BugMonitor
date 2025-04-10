package com.pgs.BugMonitor.controller;
import com.pgs.BugMonitor.entity.Bug;
import com.pgs.BugMonitor.repo.BugRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pgs.BugMonitor.entity.Project;
import com.pgs.BugMonitor.repo.ProjectRepo;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bugs")
public class TesterController {

    @Autowired
    private BugRepo bugRepo;

    // Get all bugs
    @GetMapping
    public List<Bug> getAllBugs() {
        return bugRepo.findAll();
    }

    // Get bug by ID
    @GetMapping("/bugs/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable int id) {
        Optional<Bug> bug = bugRepo.findById(id);
        return bug.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get bugs by Project ID
    @GetMapping("/bugs/project/{projectId}")
    public List<Bug> getBugsByProjectId(@PathVariable int projectId) {
        return bugRepo.findByProject_ProjectId(projectId);
    }

    // Get bugs assigned to Developer by ID
    @GetMapping("/bugs/developer/{developerId}")
    public List<Bug> getBugsByDeveloperId(@PathVariable int developerId) {
        return bugRepo.findByAssignedTo_UserID(developerId);
    }

    // Get bugs created by Tester
    @GetMapping("/bugs/tester/{testerId}")
    public List<Bug> getBugsByTesterId(@PathVariable int testerId) {
        return bugRepo.findByCreatedBy_UserID(testerId);
    }

    // Create a new bug
    @PostMapping("/bugs")
    public Bug createBug(@RequestBody Bug bug) {
        return bugRepo.save(bug);
    }

    // Update a bug
    @PutMapping("/bugs/{id}")
    public ResponseEntity<Bug> updateBug(@PathVariable int id, @RequestBody Bug bugDetails) {
        Optional<Bug> bugOptional = bugRepo.findById(id);
        if (bugOptional.isPresent()) {
            Bug bug = bugOptional.get();
            bug.setTitle(bugDetails.getTitle());
            bug.setCategory(bugDetails.getCategory());
            bug.setDescription(bugDetails.getDescription());
            bug.setPriority(bugDetails.getPriority());
            bug.setStatus(bugDetails.getStatus());
            bug.setResolvedDate(bugDetails.getResolvedDate());
            bug.setDue(bugDetails.getDue());
            bug.setAssignedTo(bugDetails.getAssignedTo());
            bug.setCreatedBy(bugDetails.getCreatedBy());
            bug.setProject(bugDetails.getProject());
            return ResponseEntity.ok(bugRepo.save(bug));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a bug
    @DeleteMapping("/bugs/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable int id) {
        if (bugRepo.existsById(id)) {
            bugRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

