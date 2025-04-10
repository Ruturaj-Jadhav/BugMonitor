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
@RequestMapping("/projects")
public class ProjectManagerController {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private BugRepo bugRepo;

    // Get all bugs
    @GetMapping("/bugs")
    public List<Bug> getAllBugs() {
        return bugRepo.findAll();
    }

    // View all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    // View a single project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable int id) {
        Optional<Project> project = projectRepo.findById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new project
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    // Update an existing project
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable int id, @RequestBody Project projectDetails) {
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setName(projectDetails.getName());
            project.setDescription(projectDetails.getDescription());
            project.setProjectManager(projectDetails.getProjectManager());
            project.setStartDate(projectDetails.getStartDate());
            return ResponseEntity.ok(projectRepo.save(project));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable int id) {
        if (projectRepo.existsById(id)) {
            projectRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

