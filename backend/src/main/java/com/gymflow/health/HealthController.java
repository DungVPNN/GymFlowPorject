package com.gymflow.health;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("application", "GymFlow", "message", "GymFlow API is running");
    }
}
