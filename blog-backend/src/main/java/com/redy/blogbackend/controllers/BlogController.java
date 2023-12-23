package com.redy.blogbackend.controllers;

import com.redy.blogbackend.controllers.dto.BlogPostDTO;
import com.redy.blogbackend.entities.BlogPost;
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
    @GetMapping(path = "/", params = {"page", "size"})
    public Page<BlogPost> getPosts(@RequestParam("page") int page, @RequestParam("size") int size) {
        return blogPostService.getPosts(page, size);
    }

    @GetMapping("/{id}")
    public BlogPost getPost(@PathVariable("id") int postId) throws Exception {
        return blogPostService.getPost(postId);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@Valid @RequestBody BlogPostDTO blogPostDTO) throws Exception {
        blogPostService.createPost(blogPostDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.OK)
    public void updatePost(@Valid @RequestBody BlogPostDTO blogPostDTO, @PathVariable("id") int postId) throws Exception{
        blogPostService.updatePost(blogPostDTO, postId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable("id") int postId) throws Exception{
        blogPostService.deletePost(postId);
    }
}