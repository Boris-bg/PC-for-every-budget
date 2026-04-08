package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.User;
import bg.pcbudget.backend.repositories.UserRepository;
import bg.pcbudget.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  // ── Login ──────────────────────────────────────────
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String username = body.get("username");
    String password = body.get("password");

    return userRepository.findByUsername(username)
      .filter(u -> passwordEncoder.matches(password, u.getPassword()))
      .map(u -> ResponseEntity.ok(Map.of(
        "token",    jwtUtil.generate(u.getUsername(), u.getRole().name()),
        "username", u.getUsername(),
        "role",     u.getRole().name(),
        "id",       u.getId()
      )))
      .orElse(ResponseEntity.status(401).body(Map.of("error", "Грешно потребителско име или парола")));
  }

  // ── Register ───────────────────────────────────────
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String username = body.get("username");
    String password = body.get("password");

    if (username == null || username.trim().length() < 3)
      return ResponseEntity.badRequest().body(Map.of("error", "Потребителското име трябва да е поне 3 символа"));
    if (password == null || password.length() < 6)
      return ResponseEntity.badRequest().body(Map.of("error", "Паролата трябва да е поне 6 символа"));
    if (userRepository.findByUsername(username).isPresent())
      return ResponseEntity.badRequest().body(Map.of("error", "Потребителското име вече е заето"));

    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(User.Role.USER);
    userRepository.save(user);

    return ResponseEntity.ok(Map.of("message", "Регистрацията е успешна"));
  }

  // ── Change password ────────────────────────────────
  @PostMapping("/change-password")
  public ResponseEntity<?> changePassword(
    @RequestHeader("Authorization") String authHeader,
    @RequestBody Map<String, String> body) {

    String token       = authHeader.substring(7);
    String username    = jwtUtil.getUsername(token);
    String currentPass = body.get("currentPassword");
    String newPass     = body.get("newPassword");

    if (newPass == null || newPass.length() < 6)
      return ResponseEntity.badRequest().body(Map.of("error", "Новата парола трябва да е поне 6 символа"));

    return userRepository.findByUsername(username)
      .filter(u -> passwordEncoder.matches(currentPass, u.getPassword()))
      .map(u -> {
        u.setPassword(passwordEncoder.encode(newPass));
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("message", "Паролата е сменена успешно"));
      })
      .orElse(ResponseEntity.status(400).body(Map.of("error", "Текущата парола е грешна")));
  }
}
