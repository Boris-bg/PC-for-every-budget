package bg.pcbudget.backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

  @RequestMapping(value = {
    "/",
    "/products",
    "/products/**",   // ← покрива всичко под /products/
    "/discounts",
    "/about-us",
    "/contacts"
  })
  public String forwardToAngular() {
    return "forward:/index.html";
  }
}
