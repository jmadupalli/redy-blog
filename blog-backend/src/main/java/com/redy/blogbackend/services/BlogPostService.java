package com.redy.blogbackend.services;

import com.redy.blogbackend.controllers.dto.BlogPostDTO;
import com.redy.blogbackend.entities.BlogPost;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.entities.projections.BlogPostsUser;
import com.redy.blogbackend.repositories.BlogPostRepository;
import com.redy.blogbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository;

    public Page<BlogPost> getPosts(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.DESC, "createdAt");
        return blogPostRepository.findAll(pageable);
    }

    public BlogPost getPost(int postId) throws Exception{
         return blogPostRepository.findById(postId).orElseThrow(() -> new Exception("Post Not Found"));
    }

    public List<BlogPostsUser> getUserPosts() throws Exception {
        User user = getUserFromContext();
        return blogPostRepository.findAllUserPosts();
    }

    public void createPost(BlogPostDTO blogPostDTO) throws Exception {
        User user =  getUserFromContext();

        BlogPost blog = BlogPost.builder()
                .title(blogPostDTO.getTitle())
                .description(blogPostDTO.getDescription())
                .content(blogPostDTO.getContent())
                .keywords(blogPostDTO.getKeywords())
                .user(user)
                .build();
        blogPostRepository.save(blog);
    }

    public void updatePost(BlogPostDTO blogPostDTO, int postId) throws Exception {
        User user =  getUserFromContext();

        BlogPost blog = BlogPost.builder()
                .id(postId)
                .title(blogPostDTO.getTitle())
                .description(blogPostDTO.getDescription())
                .content(blogPostDTO.getContent())
                .keywords(blogPostDTO.getKeywords())
                .user(user)
                .build();
        blogPostRepository.save(blog);
    }

    public void deletePost(int postId) throws Exception {
        User user = getUserFromContext();
        blogPostRepository.deleteById(postId);
    }

    private User getUserFromContext() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow( () -> new Exception("User not logged in!"));
    }
}
