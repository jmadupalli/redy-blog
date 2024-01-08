package com.redy.blogbackend.repositories;

import com.redy.blogbackend.entities.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Integer> {
}
