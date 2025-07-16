package com.finance.tracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Frontend origin
                .allowedMethods("*")                     // Allow GET, POST, PUT, DELETE
                .allowedHeaders("*")                     // Allow all headers
                .allowCredentials(true);                 // Allow cookies/JWT in headers
    }
}
