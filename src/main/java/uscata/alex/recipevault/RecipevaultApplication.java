package uscata.alex.recipevault;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class RecipevaultApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipevaultApplication.class, args);
	}

}
