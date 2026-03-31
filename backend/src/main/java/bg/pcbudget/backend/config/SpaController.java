package bg.pcbudget.backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

  @RequestMapping(value = {"/"})
  public String index() {
    return "forward:/index.html";
  }
}

