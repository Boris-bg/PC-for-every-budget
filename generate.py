import os

BASE = "backend/src/main/java/bg/pcbudget/backend"
MODELS = f"{BASE}/models"
REPOS  = f"{BASE}/repositories"
SVCS   = f"{BASE}/services"
CTRLS  = f"{BASE}/controllers"

for d in [MODELS, REPOS, SVCS, CTRLS]:
    os.makedirs(d, exist_ok=True)

files = {}

files[f"{MODELS}/Socket.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "sockets")
@Getter @Setter @NoArgsConstructor
public class Socket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
"""

files[f"{MODELS}/NetworkInterface.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "interfaces")
@Getter @Setter @NoArgsConstructor
public class NetworkInterface {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
"""

files[f"{MODELS}/User.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    public enum Role { USER, ADMIN }
}
"""

files[f"{MODELS}/CPU.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "cpus")
@Getter @Setter @NoArgsConstructor
public class CPU extends Product {

    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;

    private String model;
    private Double frequencyGHz;
    private Integer cores;
    private Integer threads;
    private String integratedGraphicsModel;
    private Integer tdpWatts;
}
"""

files[f"{MODELS}/GPU.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "gpus")
@Getter @Setter @NoArgsConstructor
public class GPU extends Product {

    private String chipBrand;
    private String graphicsProcessor;
    private String interfaceType;
    private Integer memorySizeGB;
    private String memoryType;
    private Integer slotWidth;
    private String directXVersion;
}
"""

files[f"{MODELS}/Cooler.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "coolers")
@Getter @Setter @NoArgsConstructor
public class Cooler extends Product {

    private String coolingType;

    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;

    private Integer fanWidthMM;
}
"""

files[f"{MODELS}/Motherboard.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "motherboards")
@Getter @Setter @NoArgsConstructor
public class Motherboard extends Product {

    @ManyToOne
    @JoinColumn(name = "socket_id")
    private Socket socket;

    private String chipset;
    private String supportedRamType;
    private Integer ramSlots;
    private String formFactor;
    private Boolean hasBuiltInWifi;
    private Boolean hasBuiltInBluetooth;
    private String interfaces;
    private String ports;
}
"""

files[f"{MODELS}/ROM.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "roms")
@Getter @Setter @NoArgsConstructor
public class ROM extends Product {

    private String storageType;
    private Integer memorySizeGB;
    private String formFactor;
    private String interfaceType;
}
"""

files[f"{MODELS}/PSU.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "psus")
@Getter @Setter @NoArgsConstructor
public class PSU extends Product {

    private Integer powerWatts;
    private String formFactor;
    private String efficiency;
    private String category;
    private Boolean hasPfc;
    private String wiringType;
}
"""

files[f"{MODELS}/Accessory.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "accessories")
@Getter @Setter @NoArgsConstructor
public class Accessory extends Product {

    private String accessoryType;
    private Integer fanWidthMM;
}
"""

files[f"{MODELS}/OS.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "operating_systems")
@Getter @Setter @NoArgsConstructor
public class OS extends Product {

    private String osType;
}
"""

files[f"{MODELS}/Monitor.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "monitors")
@Getter @Setter @NoArgsConstructor
public class Monitor extends Product {

    private Double panelSizeInch;
    private String aspectRatio;
    private String resolution;
    private Integer refreshRateHz;
    private Integer responseTimeMs;
    private String panelType;
    private Integer brightnessNits;
    private String interfaces;
}
"""

files[f"{MODELS}/Keyboard.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "keyboards")
@Getter @Setter @NoArgsConstructor
public class Keyboard extends Product {

    private String interfaceType;
    private String connectionType;
    private Boolean hasBulgarianLayout;
    private String keyboardType;
    private String color;
    private String switches;
    private Boolean hasLighting;
}
"""

files[f"{MODELS}/Mouse.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "mice")
@Getter @Setter @NoArgsConstructor
public class Mouse extends Product {

    private String connectionType;
    private Integer maxDpi;
    private String interfaceType;
    private String color;
    private Boolean suitableForLeftHand;
}
"""

files[f"{MODELS}/PeripheralAccessory.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "peripheral_accessories")
@Getter @Setter @NoArgsConstructor
public class PeripheralAccessory extends Product {

    private String accessoryType;
}
"""

files[f"{MODELS}/PC.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "pcs")
@Getter @Setter @NoArgsConstructor
public class PC extends Product {

    @ManyToOne(optional = false)
    @JoinColumn(name = "cpu_id")
    private CPU cpu;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cooler_id")
    private Cooler cooler;

    @ManyToOne(optional = false)
    @JoinColumn(name = "motherboard_id")
    private Motherboard motherboard;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ram_id")
    private RAM ram;

    @ManyToOne(optional = false)
    @JoinColumn(name = "rom_id")
    private ROM rom;

    @ManyToOne
    @JoinColumn(name = "rom2_id")
    private ROM rom2;

    @ManyToOne
    @JoinColumn(name = "gpu_id")
    private GPU gpu;

    @ManyToOne(optional = false)
    @JoinColumn(name = "psu_id")
    private PSU psu;

    @ManyToOne
    @JoinColumn(name = "os_id")
    private OS os;

    @ManyToOne(optional = false)
    @JoinColumn(name = "box_id")
    private Box box;

    @ManyToOne
    @JoinColumn(name = "accessory1_id")
    private Accessory accessory1;

    @ManyToOne
    @JoinColumn(name = "accessory2_id")
    private Accessory accessory2;

    private String comment;
}
"""

files[f"{MODELS}/Order.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(name = "orders")
@Getter @Setter @NoArgsConstructor
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    public enum Status { PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED }
}
"""

files[f"{MODELS}/OrderItem.java"] = """package bg.pcbudget.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "order_items")
@Getter @Setter @NoArgsConstructor
public class OrderItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double priceAtPurchase;
}
"""

# ── Repositories ──────────────────────────────────────────

repo_extras = {
    "User":        "    java.util.Optional<User> findByUsername(String username);",
    "CPU":         "    java.util.List<CPU> findBySocket_Name(String socketName);\n    java.util.List<CPU> findByCoresGreaterThanEqual(Integer cores);",
    "GPU":         "    java.util.List<GPU> findByChipBrand(String chipBrand);\n    java.util.List<GPU> findByMemoryType(String memoryType);",
    "ROM":         "    java.util.List<ROM> findByStorageType(String storageType);",
    "PSU":         "    java.util.List<PSU> findByPowerWattsGreaterThanEqual(Integer watts);",
    "Order":       "    java.util.List<Order> findByUser_Id(Long userId);\n    java.util.List<Order> findByStatus(Order.Status status);",
    "PC":          "    java.util.List<PC> findByPriceLessThanEqual(Double maxPrice);",
    "NetworkInterface": "",
}

all_models = [
    "Socket", "NetworkInterface", "User", "CPU", "GPU", "Cooler",
    "Motherboard", "ROM", "PSU", "Accessory", "OS", "Monitor",
    "Keyboard", "Mouse", "PeripheralAccessory", "PC",
    "Order", "OrderItem",
]

for model in all_models:
    extra = repo_extras.get(model, "")
    files[f"{REPOS}/{model}Repository.java"] = f"""package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.{model};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface {model}Repository extends JpaRepository<{model}, Long> {{
{extra}
}}
"""

files[f"{REPOS}/ProductRepository.java"] = """package bg.pcbudget.backend.repositories;

import bg.pcbudget.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByBrand(String brand);
    List<Product> findByPriceBetween(Double min, Double max);
}
"""

# ── Services ──────────────────────────────────────────────

simple_svcs = [
    "Socket", "NetworkInterface", "GPU", "Cooler", "Motherboard",
    "ROM", "PSU", "Accessory", "OS", "Monitor", "Keyboard",
    "Mouse", "PeripheralAccessory", "PC", "CPU", "OrderItem",
]

for svc in simple_svcs:
    files[f"{SVCS}/{svc}Service.java"] = f"""package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.{svc};
import bg.pcbudget.backend.repositories.{svc}Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class {svc}Service {{

    private final {svc}Repository repository;

    public List<{svc}> getAll() {{ return repository.findAll(); }}

    public Optional<{svc}> getById(Long id) {{ return repository.findById(id); }}

    public {svc} save({svc} entity) {{ return repository.save(entity); }}

    public void delete(Long id) {{ repository.deleteById(id); }}
}}
"""

files[f"{SVCS}/UserService.java"] = """package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.User;
import bg.pcbudget.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAll() { return repository.findAll(); }

    public Optional<User> getById(Long id) { return repository.findById(id); }

    public Optional<User> getByUsername(String username) {
        return repository.findByUsername(username);
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.USER);
        return repository.save(user);
    }

    public void delete(Long id) { repository.deleteById(id); }
}
"""

files[f"{SVCS}/OrderService.java"] = """package bg.pcbudget.backend.services;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.models.OrderItem;
import bg.pcbudget.backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional @RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;

    public List<Order> getAll() { return repository.findAll(); }

    public List<Order> getByUserId(Long userId) {
        return repository.findByUser_Id(userId);
    }

    public Optional<Order> getById(Long id) { return repository.findById(id); }

    public Order save(Order order) {
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
                item.setPriceAtPurchase(item.getProduct().getPrice());
            }
            double total = order.getItems().stream()
                .mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity())
                .sum();
            order.setTotal(total);
        }
        return repository.save(order);
    }

    public Order updateStatus(Long id, Order.Status status) {
        Order order = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        order.setStatus(status);
        return repository.save(order);
    }

    public void delete(Long id) { repository.deleteById(id); }
}
"""

# ── Controllers ───────────────────────────────────────────

ctrl_map = [
    ("Socket",              "/api/sockets"),
    ("NetworkInterface",    "/api/interfaces"),
    ("GPU",                 "/api/products/gpu"),
    ("Cooler",              "/api/products/coolers"),
    ("Motherboard",         "/api/products/motherboards"),
    ("ROM",                 "/api/products/rom"),
    ("PSU",                 "/api/products/psu"),
    ("Accessory",           "/api/products/accessories"),
    ("OS",                  "/api/products/os"),
    ("Monitor",             "/api/products/monitors"),
    ("Keyboard",            "/api/products/keyboards"),
    ("Mouse",               "/api/products/mice"),
    ("PeripheralAccessory", "/api/products/peripheral-accessories"),
    ("PC",                  "/api/products/pcs"),
    ("CPU",                 "/api/products/cpu"),
]

for model, path in ctrl_map:
    files[f"{CTRLS}/{model}Controller.java"] = f"""package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.{model};
import bg.pcbudget.backend.services.{model}Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("{path}")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class {model}Controller {{

    private final {model}Service service;

    @GetMapping
    public List<{model}> getAll() {{ return service.getAll(); }}

    @GetMapping("/{{id}}")
    public ResponseEntity<{model}> getById(@PathVariable Long id) {{
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }}

    @PostMapping
    public {model} create(@RequestBody {model} entity) {{ return service.save(entity); }}

    @PutMapping("/{{id}}")
    public ResponseEntity<{model}> update(@PathVariable Long id, @RequestBody {model} entity) {{
        if (service.getById(id).isEmpty()) return ResponseEntity.notFound().build();
        entity.setId(id);
        return ResponseEntity.ok(service.save(entity));
    }}

    @DeleteMapping("/{{id}}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {{
        service.delete(id);
        return ResponseEntity.noContent().build();
    }}
}}
"""

files[f"{CTRLS}/UserController.java"] = """package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.User;
import bg.pcbudget.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService service;

    @GetMapping
    public List<User> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) { return service.register(user); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
"""

files[f"{CTRLS}/OrderController.java"] = """package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.Order;
import bg.pcbudget.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService service;

    @GetMapping
    public List<Order> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Order> getByUser(@PathVariable Long userId) {
        return service.getByUserId(userId);
    }

    @PostMapping
    public Order create(@RequestBody Order order) { return service.save(order); }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam Order.Status status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
"""

# ── Write files ────────────────────────────────────────────
count = 0
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    count += 1

print(f"Done! Generated {count} files.")
print("Now commit and push everything to GitHub.")
