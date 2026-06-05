# Checkliste – Phase 14b

- [ ] Globale Basis in `styles.scss`: Layout-Container + Spacing-/Radius-Skala (BEM)
      *(box-sizing-Reset bereits gesetzt; Container existiert in `app.scss`)*
- [x] Keine hartkodierten Farben mehr in eigenen Komponenten → `--mat-sys-*`-Variablen
- [ ] App-Shell: Navbar als `mat-toolbar`, zentrierter Content-Container
      *(Navbar aktuell BEM, aber bereits theme-coloriert)*
- [ ] Karten → `mat-card` *(Buttons → `matButton` ✓ und Icons → `mat-icon` ✓ bereits erledigt)*
- [x] Filter/Formulare → `mat-form-field` + `mat-select`
- [ ] Lade-Spinner (`mat-progress-spinner`), Leer-/Fehlerzustände einheitlich
- [x] Nachhol Phase 9: StarRating, RecipeCard, ConfirmDialog an Theme angeglichen
- [x] Nachhol Phase 10: RecipeList, RecipeFilter, RecipeDetail an Theme angeglichen
- [ ] Responsive geprüft (Karten-Grid, Toolbar, Formulare)
- [ ] `npm run build` + `npm run lint` grün, `anyComponentStyle`-Budget (<8kB) eingehalten
