package com.redy.blogbackend.services;

import com.redy.blogbackend.config.auth.Role;
import com.redy.blogbackend.controllers.dto.BlogPostDTO;
import com.redy.blogbackend.controllers.dto.SiteSettingsResp;
import com.redy.blogbackend.entities.BlogPost;
import com.redy.blogbackend.entities.SiteSettings;
import com.redy.blogbackend.entities.User;
import com.redy.blogbackend.entities.projections.BlogPostsUser;
import com.redy.blogbackend.repositories.BlogPostRepository;
import com.redy.blogbackend.repositories.SiteSettingsRepository;
import com.redy.blogbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final SiteSettingsRepository siteSettingsRepository;
    private final UserRepository userRepository;

    public Page<BlogPost> getPosts(int pageNumber){
        Optional<SiteSettings> settings = siteSettingsRepository.findById(1);
        int pageSize = 3;
        if(settings.isPresent())
            pageSize = settings.get().getPageSize();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.DESC, "createdAt");
        return blogPostRepository.findAll(pageable);
    }

    public BlogPost getPost(int postId) throws Exception{
         return blogPostRepository.findById(postId).orElseThrow(() -> new Exception("Post Not Found"));
    }

    public void likePost(int postId) {
        Optional<BlogPost> post = blogPostRepository.findById(postId);

        if(post.isPresent()){
            BlogPost retrievedPost = post.get();
            if(retrievedPost.getLikeCount() == null)
                retrievedPost.setLikeCount(1);
            else
                retrievedPost.setLikeCount(retrievedPost.getLikeCount() + 1);
            blogPostRepository.save(retrievedPost);
        }
    }

    public List<BlogPostsUser> getUserPosts() throws Exception {
        User user = getUserFromContext();
        if(user.getRole().equals(Role.ROLE_ADMIN.name()))
            return blogPostRepository.findAllUserPosts();
        return blogPostRepository.findAllUserPosts(user.getId());
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
