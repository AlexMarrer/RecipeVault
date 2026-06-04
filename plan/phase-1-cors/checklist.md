# Checkliste – Phase 1

- [ ] `.cors(Customizer.withDefaults())` in `SecurityConfig`
- [ ] `CorsConfigurationSource`-Bean (Origin :4200, GET/POST/PUT/DELETE/OPTIONS, Authorization+Content-Type)
- [ ] `app.cors.allowed-origins` in `application.yaml`
- [ ] Origin aus Property eingelesen (nicht hart codiert)
