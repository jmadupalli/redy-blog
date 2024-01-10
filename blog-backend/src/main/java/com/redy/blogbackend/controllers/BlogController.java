package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.BlogPostDTO;
import com.redy.blogbackend.entities.BlogPost;
import com.redy.blogbackend.entities.projections.BlogPostsUser;
import com.redy.blogbackend.services.BlogPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class BlogController {
    private final BlogPostService blogPostService;

    @GetMapping(path = "/", params = {"page"})
    public Page<BlogPost> getPosts(@RequestParam("page") int page) {
        return blogPostService.getPosts(page);
    }

    @GetMapping("/{id}")
    public BlogPost getPost(@PathVariable("id") int postId) throws Exception {
        return blogPostService.getPost(postId);
    }

    @PostMapping("/like/{id}")
    public void likePost(@PathVariable("id") int postId) {
        blogPostService.likePost(postId);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping(path="/user")
    public List<BlogPostsUser> getUserPosts() throws Exception{
        return blogPostService.getUserPosts();
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@Valid @RequestBody BlogPostDTO blogPostDTO) throws Exception {
        blogPostService.createPost(blogPostDTO);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updatePost(@Valid @RequestBody BlogPostDTO blogPostDTO, @PathVariable("id") int postId) throws Exception{
        blogPostService.updatePost(blogPostDTO, postId);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable("id") int postId) throws Exception{
        blogPostService.deletePost(postId);
    }
}
