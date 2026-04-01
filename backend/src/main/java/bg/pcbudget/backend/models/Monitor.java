package bg.pcbudget.backend.models;

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
