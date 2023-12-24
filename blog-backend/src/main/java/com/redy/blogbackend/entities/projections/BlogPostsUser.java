package com.redy.blogbackend.entities.projections;

public interface BlogPostsUser{
    Integer getId();
    String getTitle();
    String getDescription();
    long getCreatedAt();
    long getUpdatedAt();
}
