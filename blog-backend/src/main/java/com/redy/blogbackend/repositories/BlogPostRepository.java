package com.redy.blogbackend.repositories;

import com.redy.blogbackend.entities.BlogPost;
import com.redy.blogbackend.entities.projections.BlogPostsUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Integer> {
    @Query("SELECT b FROM BlogPost b ORDER BY b.createdAt DESC")
    List<BlogPostsUser> findAllUserPosts();

    @Query("SELECT b FROM BlogPost b WHERE b.user.id = :userId ORDER BY b.createdAt DESC")
    List<BlogPostsUser> findAllUserPosts(Integer userId);
}
