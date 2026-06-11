# Acceptance Criteria – Phase 20 (Responsiveness)

- Auf einem Handy (~360 px Breite) gibt es auf **keiner** Seite horizontales Scrollen.
- Die **Navbar** klappt unter dem mobile-Breakpoint zu einem Menü (Hamburger) zusammen;
  alle Links inkl. rollenabhängiger Einträge und Login/Logout sind darüber erreichbar,
  der Aktiv-Zustand bleibt sichtbar.
- Inhalte (Detail-Header, Formular-Aktionen, Filter, Admin-Listen) **stapeln** auf schmaler
  Breite statt sich zu überlappen oder abgeschnitten zu werden.
- Karten-Grid ist auf dem Handy einspaltig und gut lesbar.
- Breakpoints sind **zentral** definiert (ein Mixin/Token), keine verstreuten Magic Numbers.
- Styles bleiben BEM auf `--mat-sys-*`-Variablen, Einheiten in `rem` (px nur für Hairlines).
- Layout getestet bei 360 / 414 / 768 px; `npm run build` + `npm run lint` laufen fehlerfrei.
