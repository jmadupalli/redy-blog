package com.redy.blogbackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;

@Table(name = "site_settings")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SiteSettings {
    @Column(unique = true)
    @Id
    @Builder.Default
    private Integer id = 1;
    private String siteName;
    private String siteCaption;
    @Builder.Default
    private Integer pageSize = 5;
    @Builder.Default
    private Boolean showLogin = true;
}
