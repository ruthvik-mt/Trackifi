//package com.finance.tracker;
//
//import com.finance.tracker.model.Role;
//import com.finance.tracker.model.User;
//import com.finance.tracker.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@SpringBootApplication
//public class TrackerApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(TrackerApplication.class, args);
//	}
//
//	@Bean
//	public CommandLineRunner seedDefaultUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//		return args -> {
//			// Seed Admin user
//			userRepository.findByEmail("admin@example.com").ifPresentOrElse(
//					admin -> System.out.println("Admin user already exists."),
//					() -> {
//						User admin = User.builder()
//								.email("admin@example.com")
//								.password(passwordEncoder.encode("admin123"))
//								.fullName("Admin User")
//								.role(Role.ADMIN)
//								.build();
//						userRepository.save(admin);
//						System.out.println("🛡️ Admin user created: admin@example.com / admin123");
//					}
//			);
//
//			// Seed Regular user
//			userRepository.findByEmail("user@example.com").ifPresentOrElse(
//					user -> System.out.println("Regular user already exists."),
//					() -> {
//						User user = User.builder()
//								.email("user@example.com")
//								.password(passwordEncoder.encode("user123"))
//								.fullName("Regular User")
//								.role(Role.USER)
//								.build();
//						userRepository.save(user);
//						System.out.println("👤 Regular user created: user@example.com / user123");
//					}
//			);
//		};
//	}
//}

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
