package com.capstone.accountteam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AccountteamApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountteamApplication.class, args);
	}

}
