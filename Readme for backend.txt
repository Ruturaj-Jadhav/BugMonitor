Project Manager View Apis

1. To Perform CRUD operations on project
2. List of projects 
3. When selected on the project , to get bugs based on the the projectID - seggregation on the basis of the status - to-do(when bug is created , tester can only create bug), in-progress(Once the PM assigns a developer to the bug) - 

Tester view Apis

1.List of Bugs 
2.Ability of perform CRUD ON Bugs


Developer
1. List of assigned bugs 
2. Ability to change the status of bugs from in-progress to complete

--------------------------------------------------------------------------------------------------------------------

Rough Idea about status change

public Bug updateBugStatus(int bugId, String newStatus, Users currentUser) {
    Bug bug = bugRepo.findById(bugId).orElseThrow(...);
    
    // Check role-based status change
    if (newStatus.equalsIgnoreCase("IN_PROGRESS")) {
        if (!currentUser.getRole().equals("PROJECT_MANAGER")) {
            throw new AccessDeniedException("Only PM can move bug to IN_PROGRESS");
        }
    } else if (newStatus.equalsIgnoreCase("COMPLETE")) {
        if (!currentUser.getRole().equals("DEVELOPER") || 
            bug.getAssignedTo().getUserID() != currentUser.getUserID()) {
            throw new AccessDeniedException("Only assigned developer can complete the bug");
        }
    }

    bug.setStatus(newStatus);
    return bugRepo.save(bug);
}

---------------------------------------------------------------------------------------------------------------------

Role Based Access Control

Update UserPrincipal class

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + this.user.getRole()));
}

This makes Spring Security recognize roles like:

ROLE_TESTER

ROLE_PROJECT_MANAGER

ROLE_DEVELOPER

Update SecurityConfig

@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    ...
}

@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/auth/**").permitAll() // Public endpoints like login/signup
        .anyRequest().authenticated()
        .and()
        .exceptionHandling()
        .accessDeniedHandler((request, response, ex) -> {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Access Denied: You do not have permission");
        })
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
}

Update the controller code

@PreAuthorize("hasRole('PROJECT_MANAGER')")
@PostMapping("/projects")
public ResponseEntity<?> createProject(@RequestBody ProjectDto dto) {
    ...
}

Update 

----------------------------------------------------------------------------------------------------------------------


 Filtering, Sorting, Pagination
For example:

/bugs?status=TO_DO&priority=HIGH&page=0&size=10 Use Spring Data JPA’s Pageable + @Query for filtering.

-----------------------------------------------------------------------------------------------------------------------

