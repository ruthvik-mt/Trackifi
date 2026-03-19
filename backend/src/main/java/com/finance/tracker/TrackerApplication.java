package com.finance.tracker;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class TrackerApplication {

	public static void main(String[] args) {
		// Try loading from current directory first (if run from backend), then fallback
		// to 'backend' (if run from root)
		Dotenv dotenv = Dotenv.configure()
				.ignoreIfMissing()
				.load();

		if (!dotenv.entries().iterator().hasNext()) {
			dotenv = Dotenv.configure()
					.directory("backend")
					.ignoreIfMissing()
					.load();
		}

		// Force override system properties with values from .env
		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});

		SpringApplication.run(TrackerApplication.class, args);
	}
}
