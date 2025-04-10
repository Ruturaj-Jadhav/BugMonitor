package com.pgs.BugMonitor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "Bug")
public class Bug {

    @Id
    @Column(name = "BugID")
    private int bugId;

    @Column(name = "Title")
    private String title;

    @Column(name = "Category")
    private String category;

    @Column(name = "Description")
    private String description;

    @Column(name = "Priority")
    private String priority;

    @Column(name = "Status")
    private String status;

    @Column(name = "RESOLVEDDATE")
    private java.sql.Date resolvedDate;

    @Column(name = "DUE")
    private java.sql.Date due;

    @ManyToOne
    @JoinColumn(name = "ASSIGNEDTO", referencedColumnName = "UserID")
    private Users assignedTo;

    @ManyToOne
    @JoinColumn(name = "CREATEDBY", referencedColumnName = "UserID")
    private Users createdBy;

    @ManyToOne
    @JoinColumn(name = "ProjectID", referencedColumnName = "ProjectID")
    private Project project;

    // No-argument constructor
    public Bug() {
    }

    // Parameterized constructor
    public Bug(int bugId, String title, String category, String description, String priority, String status, java.sql.Date resolvedDate, java.sql.Date due, Users assignedTo, Users createdBy, Project project) {
        this.bugId = bugId;
        this.title = title;
        this.category = category;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.resolvedDate = resolvedDate;
        this.due = due;
        this.assignedTo = assignedTo;
        this.createdBy = createdBy;
        this.project = project;
    }

    // Getters and Setters
    public int getBugId() {
        return bugId;
    }

    public void setBugId(int bugId) {
        this.bugId = bugId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public java.sql.Date getResolvedDate() {
        return resolvedDate;
    }

    public void setResolvedDate(java.sql.Date resolvedDate) {
       this.resolvedDate = resolvedDate;
    }

    public java.sql.Date getDue() {
        return due;
    }

    public void setDue(java.sql.Date due) {
        this.due = due;
    }

    public Users getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Users assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Users getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Users createdBy) {
        this.createdBy = createdBy;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
