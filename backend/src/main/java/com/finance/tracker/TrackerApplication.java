package com.finance.tracker;

import com.finance.tracker.model.Role;
import com.finance.tracker.model.User;
import com.finance.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class TrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrackerApplication.class, args);
	}

	/**
	 * Seed only admin user — only in 'dev' profile.
	 * User must register manually.
	 */
	@Bean
	@Profile("dev")
	public CommandLineRunner seedAdminUser(UserRepository userRepo,
										   PasswordEncoder encoder) {
		return args -> {
			userRepo.findByEmail("admin@example.com").ifPresentOrElse(
					u -> System.out.println("Admin already exists."),
					() -> {
						User admin = User.builder()
								.email("admin@example.com")
								.password(encoder.encode("admin123"))
								.fullName("Admin User")
								.role(Role.ADMIN)
								.build();
						userRepo.save(admin);
						System.out.println("Admin created");
					}
			);
		};
	}
}
