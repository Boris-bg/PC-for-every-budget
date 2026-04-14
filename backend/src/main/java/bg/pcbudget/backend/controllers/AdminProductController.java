package bg.pcbudget.backend.controllers;

import bg.pcbudget.backend.models.*;
import bg.pcbudget.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminProductController {

  private final ProductRepository productRepository;
  private final CPURepository cpuRepository;
  private final GPURepository gpuRepository;
  private final RAMRepository ramRepository;
  private final ROMRepository romRepository;
  private final MotherboardRepository motherboardRepository;
  private final CoolerRepository coolerRepository;
  private final PSURepository psuRepository;
  private final BoxRepository boxRepository;
  private final OSRepository osRepository;
  private final AccessoryRepository accessoryRepository;
  private final PeripheralAccessoryRepository peripheralRepository;
  private final SocketRepository socketRepository;
  private final NetworkInterfaceRepository interfaceRepository;

  @PostMapping
  @Transactional
  public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> body) {
    String category = (String) body.get("category");
    if (category == null) return ResponseEntity.badRequest()
      .body(Map.of("error", "Category is required"));

    try {
      return switch (category) {
        case "CPU"         -> ResponseEntity.ok(createCpu(body));
        case "GPU"         -> ResponseEntity.ok(createGpu(body));
        case "RAM"         -> ResponseEntity.ok(createRam(body));
        case "ROM"         -> ResponseEntity.ok(createRom(body));
        case "Motherboard" -> ResponseEntity.ok(createMotherboard(body));
        case "Cooler"      -> ResponseEntity.ok(createCooler(body));
        case "PSU"         -> ResponseEntity.ok(createPsu(body));
        case "Box"         -> ResponseEntity.ok(createBox(body));
        case "OS"          -> ResponseEntity.ok(createOs(body));
        case "Accessory"   -> ResponseEntity.ok(createAccessory(body));
        case "Peripheral"  -> ResponseEntity.ok(createPeripheral(body));
        default -> ResponseEntity.badRequest()
          .body(Map.of("error", "Unknown category: " + category));
      };
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError()
        .body(Map.of(
          "error",  e.getMessage(),
          "cause",  e.getCause() != null ? e.getCause().getMessage() : "none",
          "class",  e.getClass().getSimpleName()
        ));
    }
  }

  @PatchMapping("/{id}")
  @Transactional
  public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                         @RequestBody Map<String, Object> body) {
    String category = (String) body.get("category");
    if (category == null) return ResponseEntity.badRequest()
      .body(Map.of("error", "Category is required"));

    try {
      return switch (category) {
        case "CPU"         -> ResponseEntity.ok(updateCpu(id, body));
        case "GPU"         -> ResponseEntity.ok(updateGpu(id, body));
        case "RAM"         -> ResponseEntity.ok(updateRam(id, body));
        case "ROM"         -> ResponseEntity.ok(updateRom(id, body));
        case "Motherboard" -> ResponseEntity.ok(updateMotherboard(id, body));
        case "Cooler"      -> ResponseEntity.ok(updateCooler(id, body));
        case "PSU"         -> ResponseEntity.ok(updatePsu(id, body));
        case "Box"         -> ResponseEntity.ok(updateBox(id, body));
        case "OS"          -> ResponseEntity.ok(updateOs(id, body));
        case "Accessory"   -> ResponseEntity.ok(updateAccessory(id, body));
        case "Peripheral"  -> ResponseEntity.ok(updatePeripheral(id, body));
        default -> ResponseEntity.badRequest()
          .body(Map.of("error", "Unknown category: " + category));
      };
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError()
        .body(Map.of("error", e.getMessage()));
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getProductById(@PathVariable Long id) {
    String dtype = getDtype(id);
    if (dtype == null) return ResponseEntity.notFound().build();

    return switch (dtype) {
      case "CPU"                -> cpuRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "GPU"                -> gpuRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "RAM"                -> ramRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "ROM"                -> romRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "Motherboard"        -> motherboardRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "Cooler"             -> coolerRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "PSU"                -> psuRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "Box"                -> boxRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "OS"                 -> osRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "Accessory"          -> accessoryRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      case "PeripheralAccessory"-> peripheralRepository.findById(id)
        .map(p -> ResponseEntity.ok((Object) p))
        .orElse(ResponseEntity.notFound().build());
      default -> ResponseEntity.badRequest()
        .body(Map.of("error", "Unknown dtype: " + dtype));
    };
  }

  @SuppressWarnings("unchecked")
  private String getDtype(Long id) {
    var result = productRepository.findAllBasicInfo().stream()
      .filter(m -> {
        Object mid = m.get("id");
        return mid != null && Long.parseLong(mid.toString()) == id;
      })
      .findFirst();
    return result.map(m -> (String) m.get("category")).orElse(null);
  }

  // ── Update methods ─────────────────────────────────────────
  private CPU updateCpu(Long id, Map<String, Object> b) {
    CPU p = cpuRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("CPU not found"));
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setModel((String) b.get("model"));
    p.setFrequencyGHz(toDouble(b.get("frequencyGHz")));
    p.setCores(toInt(b.get("cores")));
    p.setThreads(toInt(b.get("threads")));
    p.setIntegratedGraphicsModel((String) b.get("integratedGraphicsModel"));
    p.setTdpWatts(toInt(b.get("tdpWatts")));
    return cpuRepository.save(p);
  }

  private GPU updateGpu(Long id, Map<String, Object> b) {
    GPU p = gpuRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("GPU not found"));
    fillBase(p, b);
    p.setChipBrand((String) b.get("chipBrand"));
    p.setGraphicsProcessor((String) b.get("graphicsProcessor"));
    p.setInterfaceType(getInterface(b.get("interfaceTypeId")));
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setMemoryType((String) b.get("memoryType"));
    p.setSlotWidth(toInt(b.get("slotWidth")));
    p.setDirectXVersion((String) b.get("directXVersion"));
    return gpuRepository.save(p);
  }

  private RAM updateRam(Long id, Map<String, Object> b) {
    RAM p = ramRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("RAM not found"));
    fillBase(p, b);
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setType((String) b.get("type"));
    p.setSpeedMHz(toInt(b.get("speedMHz")));
    p.setIsKIT((Boolean) b.getOrDefault("isKIT", false));
    p.setIsRGB((Boolean) b.getOrDefault("isRGB", false));
    return ramRepository.save(p);
  }

  private ROM updateRom(Long id, Map<String, Object> b) {
    ROM p = romRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("ROM not found"));
    fillBase(p, b);
    p.setStorageType((String) b.get("storageType"));
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setInterfaceType(getInterface(b.get("interfaceTypeId")));
    return romRepository.save(p);
  }

  private Motherboard updateMotherboard(Long id, Map<String, Object> b) {
    Motherboard p = motherboardRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Motherboard not found"));
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setChipset((String) b.get("chipset"));
    p.setSupportedRamType((String) b.get("supportedRamType"));
    p.setRamSlots(toInt(b.get("ramSlots")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setHasBuiltInWifi((Boolean) b.getOrDefault("hasBuiltInWifi", false));
    p.setHasBuiltInBluetooth((Boolean) b.getOrDefault("hasBuiltInBluetooth", false));
    p.setPorts((String) b.getOrDefault("ports", ""));
    return motherboardRepository.save(p);
  }

  private Cooler updateCooler(Long id, Map<String, Object> b) {
    Cooler p = coolerRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Cooler not found"));
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setCoolingType((String) b.get("coolingType"));
    p.setFanWidthMM(toInt(b.get("fanWidthMM")));
    return coolerRepository.save(p);
  }

  private PSU updatePsu(Long id, Map<String, Object> b) {
    PSU p = psuRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("PSU not found"));
    fillBase(p, b);
    p.setPowerWatts(toInt(b.get("powerWatts")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setEfficiency((String) b.get("efficiency"));
    p.setCategory((String) b.get("category"));
    p.setHasPfc((Boolean) b.getOrDefault("hasPfc", false));
    p.setWiringType((String) b.get("wiringType"));
    return psuRepository.save(p);
  }

  private Box updateBox(Long id, Map<String, Object> b) {
    Box p = boxRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Box not found"));
    fillBase(p, b);
    p.setMotherboardFormFactor((String) b.get("motherboardFormFactor"));
    p.setBoxFormFactor((String) b.get("boxFormFactor"));
    p.setColor((String) b.get("color"));
    p.setMaxGPULengthMM(toInt(b.get("maxGPULengthMM")));
    p.setMaxCPUCoolerHeightMM(toInt(b.get("maxCPUCoolerHeightMM")));
    p.setPsuType((String) b.get("psuType"));
    return boxRepository.save(p);
  }

  private OS updateOs(Long id, Map<String, Object> b) {
    OS p = osRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("OS not found"));
    fillBase(p, b);
    p.setOsType((String) b.get("osType"));
    return osRepository.save(p);
  }

  private Accessory updateAccessory(Long id, Map<String, Object> b) {
    Accessory p = accessoryRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Accessory not found"));
    fillBase(p, b);
    p.setAccessoryType((String) b.get("accessoryType"));
    p.setFanWidthMM(b.get("fanWidthMM") != null ? toInt(b.get("fanWidthMM")) : null);
    return accessoryRepository.save(p);
  }

  private PeripheralAccessory updatePeripheral(Long id, Map<String, Object> b) {
    PeripheralAccessory p = peripheralRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Peripheral not found"));
    fillBase(p, b);
    p.setAccessoryType((String) b.get("accessoryType"));
    return peripheralRepository.save(p);
  }

  // ── Helpers ────────────────────────────────────────────
  private void fillBase(Product p, Map<String, Object> b) {
    p.setName((String) b.get("name"));
    p.setPrice(toDouble(b.get("price")));
    p.setBrand((String) b.get("brand"));
    p.setAvailability(toInt(b.get("availability")));
//    p.setRating(toDouble(b.get("rating")));  // не е необходимо, DEFAULT CONSTRAINT в SQL
    p.setAdditionalDetails((String) b.getOrDefault("additionalDetails", ""));
    p.setImageUrl((String) b.getOrDefault("imageUrl", ""));
    p.setImageAltText((String) b.getOrDefault("imageAltText", ""));
    p.setWarrantyPeriod(toInt(b.get("warrantyPeriod")));
  }

  private Socket getSocket(Object id) {
    return socketRepository.findById(toLong(id))
      .orElseThrow(() -> new RuntimeException("Socket not found"));
  }

  private ItemInterface getInterface(Object id) {
    return interfaceRepository.findById(toLong(id))
      .orElseThrow(() -> new RuntimeException("Interface not found"));
  }

  private double toDouble(Object v) {
    if (v == null) return 0.0;
    if (v instanceof String) return Double.parseDouble((String) v);
    return ((Number) v).doubleValue();
  }

  private int toInt(Object v) {
    if (v == null) return 0;
    if (v instanceof String) return Integer.parseInt((String) v);
    return ((Number) v).intValue();
  }

  private long toLong(Object v) {
    if (v == null) return 0L;
    if (v instanceof String) return Long.parseLong((String) v);
    return ((Number) v).longValue();
  }

  // ── Category creators ───────────────────────────────────
  private CPU createCpu(Map<String, Object> b) {
    CPU p = new CPU();
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setModel((String) b.get("model"));
    p.setFrequencyGHz(toDouble(b.get("frequencyGHz")));
    p.setCores(toInt(b.get("cores")));
    p.setThreads(toInt(b.get("threads")));
    p.setIntegratedGraphicsModel((String) b.get("integratedGraphicsModel"));
    p.setTdpWatts(toInt(b.get("tdpWatts")));
    return cpuRepository.save(p);
  }

  private GPU createGpu(Map<String, Object> b) {
    GPU p = new GPU();
    fillBase(p, b);
    p.setChipBrand((String) b.get("chipBrand"));
    p.setGraphicsProcessor((String) b.get("graphicsProcessor"));
    p.setInterfaceType(getInterface(b.get("interfaceTypeId")));
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setMemoryType((String) b.get("memoryType"));
    p.setSlotWidth(toInt(b.get("slotWidth")));
    p.setDirectXVersion((String) b.get("directXVersion"));
    return gpuRepository.save(p);
  }

  private RAM createRam(Map<String, Object> b) {
    RAM p = new RAM();
    fillBase(p, b);
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setType((String) b.get("type"));
    p.setSpeedMHz(toInt(b.get("speedMHz")));
    p.setIsKIT((Boolean) b.getOrDefault("isKIT", false));
    p.setIsRGB((Boolean) b.getOrDefault("isRGB", false));
    return ramRepository.save(p);
  }

  private ROM createRom(Map<String, Object> b) {
    ROM p = new ROM();
    fillBase(p, b);
    p.setStorageType((String) b.get("storageType"));
    p.setMemorySizeGB(toInt(b.get("memorySizeGB")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setInterfaceType(getInterface(b.get("interfaceTypeId")));
    return romRepository.save(p);
  }

  private Motherboard createMotherboard(Map<String, Object> b) {
    Motherboard p = new Motherboard();
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setChipset((String) b.get("chipset"));
    p.setSupportedRamType((String) b.get("supportedRamType"));
    p.setRamSlots(toInt(b.get("ramSlots")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setHasBuiltInWifi((Boolean) b.getOrDefault("hasBuiltInWifi", false));
    p.setHasBuiltInBluetooth((Boolean) b.getOrDefault("hasBuiltInBluetooth", false));
    p.setPorts((String) b.getOrDefault("ports", ""));
    return motherboardRepository.save(p);
  }

  private Cooler createCooler(Map<String, Object> b) {
    Cooler p = new Cooler();
    fillBase(p, b);
    p.setSocket(getSocket(b.get("socketId")));
    p.setCoolingType((String) b.get("coolingType"));
    p.setFanWidthMM(toInt(b.get("fanWidthMM")));
    return coolerRepository.save(p);
  }

  private PSU createPsu(Map<String, Object> b) {
    PSU p = new PSU();
    fillBase(p, b);
    p.setPowerWatts(toInt(b.get("powerWatts")));
    p.setFormFactor((String) b.get("formFactor"));
    p.setEfficiency((String) b.get("efficiency"));
    p.setCategory((String) b.get("category"));
    p.setHasPfc((Boolean) b.getOrDefault("hasPfc", false));
    p.setWiringType((String) b.get("wiringType"));
    return psuRepository.save(p);
  }

  private Box createBox(Map<String, Object> b) {
    Box p = new Box();
    fillBase(p, b);
    p.setMotherboardFormFactor((String) b.get("motherboardFormFactor"));
    p.setBoxFormFactor((String) b.get("boxFormFactor"));
    p.setColor((String) b.get("color"));
    p.setMaxGPULengthMM(toInt(b.get("maxGPULengthMM")));
    p.setMaxCPUCoolerHeightMM(toInt(b.get("maxCPUCoolerHeightMM")));
    p.setPsuType((String) b.get("psuType"));
    return boxRepository.save(p);
  }

  private OS createOs(Map<String, Object> b) {
    OS p = new OS();
    fillBase(p, b);
    p.setOsType((String) b.get("osType"));
    return osRepository.save(p);
  }

  private Accessory createAccessory(Map<String, Object> b) {
    Accessory p = new Accessory();
    fillBase(p, b);
    p.setAccessoryType((String) b.get("accessoryType"));
    p.setFanWidthMM(b.get("fanWidthMM") != null ? toInt(b.get("fanWidthMM")) : null);
    return accessoryRepository.save(p);
  }

  private PeripheralAccessory createPeripheral(Map<String, Object> b) {
    PeripheralAccessory p = new PeripheralAccessory();
    fillBase(p, b);
    p.setAccessoryType((String) b.get("accessoryType"));
    return peripheralRepository.save(p);
  }
}
