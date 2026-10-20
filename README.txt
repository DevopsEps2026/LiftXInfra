# LiftX Infra Website

Responsive, multi-page static website for LiftX Infra, built with HTML, CSS and vanilla JavaScript. It has no package manager, build step, server-side code, or database.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `index.html` | Homepage, hero image slider, company overview, client carousel and homepage sections |
| `about.html` | Company profile, core values, founder details and GSTIN |
| `services.html` | Crane, JCB, civil works, real estate, and technology services |
| `projects.html` | Project and capability portfolio |
| `technology.html` | Technology capabilities, AI workflow and cloud/data information |
| `crane-monitoring.html` | Searchable master fleet dashboard, individual crane monitoring views and proposed fleet implementation design |
| `crane-monitoring.css`, `crane-monitoring.js` | Scoped dashboard styles and browser-only simulator |
| `contact.html` | Company contact details, map and email-draft enquiry form |
| `careers.html` | Open roles, qualifications, benefits and application links |
| `style.css` | Shared site layout, design tokens, components and responsive rules |
| `theme.css` | Shared light-blue palette for six pages; Technology and Crane IoT Monitoring retain their original dark themes |
| `technology-menu.css` | Shared Technology dropdown styles and responsive behavior |
| `script.js` | Shared navigation, dropdown, slideshow, client carousel, enquiry form and footer-year behavior |
| `assets/` | Local service and supporting images used by site pages |
| `assets/liftx-logo.png` | Supplied navy/gold LXI logo, cropped to remove excess white margins, used in the top-left header on all eight pages |
| `images/` | Local crane and civil images used in the homepage hero slideshow |
| `Clients/` | Client logo images used by the homepage client carousel |

Keep these paths and filenames in place when publishing: the HTML pages refer to them with relative URLs.

## Features and behavior

- Shared responsive navigation links all eight pages, including Crane IoT Monitoring under Technology. On narrow screens, the menu opens from the menu button and closes when a link is selected.
- The Technology navigation dropdown toggles by button, closes when clicking outside, and closes on Escape.
- Its shared design follows the supplied mega-menu reference: a navy introduction sidebar with original local cloud/network artwork (`assets/technology-network.svg`), eight service categories with colored vector icons, and a pale-blue action bar linking monitoring and the Technology overview. Categories are Internet of Things (IoT), Managed IT Services, Cybersecurity, Cloud & Infrastructure, Software Development, Automation & Industry 4.0, Data & Analytics, and Networking & Connectivity. Each has six service descriptions (48 total), identical across all eight pages.
- Wide desktop menus use a four-column/two-row service grid beside the sidebar. Smaller desktop screens use two service columns; on tablet the introduction stacks above two columns. Mobile uses scrollable navigation with one or two service columns. Desktop height is capped to the viewport, with all categories and footer actions reachable by scrolling. Menu action links use `#464feb` without underlines; existing site-wide links and tables are unchanged. Service lists remain informational rather than displaying misleading links. The existing LXI logo and LiftX Infra header branding remain unchanged.
- The homepage hero slideshow uses the six local images in `images/`, advances every **2 seconds**, and has previous, next and numbered controls. Autoplay pauses while the page is hidden, while a control is hovered/focused, or when the visitor requests reduced motion.
- The homepage client carousel displays multiple logos per row according to available width and advances every **5 seconds**. It pauses while hovered/focused or when the page is hidden, responds to resizing, and respects reduced-motion preferences.
- Service links can open the Contact page with the selected service prefilled.
- The Contact form validates required fields in the browser and prepares an email draft to `liftxinfra@gmail.com`. It does not send form data to a server.
- Careers application links open an email draft or WhatsApp conversation using the published contact details.
- Services includes a dedicated `#iot-technology` section with eight technology specialty cards linking to the matching Technology page anchors, plus a Crane IoT integration overview linking to the dashboard and Contact. It retains the five existing service cards and light-blue theme. The crane overview explicitly identifies the dashboard as simulated and live telemetry as requiring hardware and backend deployment.
- Home, About, Services, Projects, Contact and Careers load `theme.css` last, after shared and page-specific styles. It supplies the light-blue canvas (`#eef6fd`), alternate blue sections (`#e2effb`), white cards and navy headings. Technology and Crane IoT Monitoring deliberately do not load this stylesheet: they retain their original dark navy backgrounds, panels, text, charts and notices. Keep photo overlays, status badges, primary buttons and the navy footer for contrast; simulation/live labels and behavior are unchanged.
- Careers retains five crane/construction openings and adds nine technology career cards: one for each of the eight Technology service areas (covering all 48 service descriptions), plus Crane IoT integration engineering/field installation. Each card has responsibilities, relevant qualifications/skills and a role-specific email subject. Availability is discussed during recruitment. Applications can include a CV, specialization, certifications and project/portfolio links.
- The Crane IoT career card describes planned OEM-approved, passive CAN/J1939 integration and field work; it explicitly labels the current 12-crane dashboard as a browser simulation without connected live telemetry. Keep this distinction accurate when updating recruitment content.
- The footer copyright year is set by JavaScript.
- The Technology page presents eight individually titled service sections, matching the eight menu categories and all 48 service descriptions. A quick-jump navigation links to each section, with responsive two-column service lists that stack on small screens. The IoT section retains the simulated crane dashboard link and explicitly notes that live gateway telemetry is not connected. Supporting AI workflow and cloud/data sections remain below.
- Responsive layouts use CSS media queries. Slideshow and carousel animation respect the browser's `prefers-reduced-motion` setting.

## Run locally

1. Open the project folder in Visual Studio Code or a file browser.
2. Open `index.html` directly in a browser, or serve the folder using any local static-file server.
3. Use the navigation to review each page and test the mobile layout by resizing the browser.

No dependencies need to be installed. Google Fonts, Unsplash images used on some pages, and the embedded Google Map require an internet connection. The homepage hero and the image folders described above use local files.

## Updating the site

- **Navigation:** Update the shared `<nav>` in each HTML page when adding or renaming a page.
- The primary navigation's former Clients link is now Crane IoT Monitoring on all eight pages. Crane IoT Monitoring sits immediately before Technology, with Projects before both items. The homepage client carousel remains in place; monitoring is also accessible through Technology.
- **Header logo:** All eight page headers position `assets/liftx-logo.png` at the far-left edge, separately from the LiftX Infra name and tagline, while retaining the same home link. Shared `.site-header .brand-logo` and `.brand-text` rules in `style.css` reserve space to prevent overlap at desktop/mobile sizes. Footer text branding is unchanged.
- **Homepage hero:** Keep the `.hero-slide` images and `[data-slide-to]` buttons in `index.html` in the same order and count. Change the autoplay interval in `script.js` if the timing should change.
- **Client logos:** Add or replace images in `Clients/` and update the client-slide markup in `index.html` as needed. The carousel timing is configured in `script.js`.
- **Contact details:** Keep the business email, phone, WhatsApp link, website and office address consistent across `contact.html` and `careers.html`. Check other pages before changing business-wide contact information.
- **Images:** Use local, web-optimized files where possible. Update the corresponding relative image paths in HTML/CSS whenever a file is renamed or moved.
- **Enquiry form:** Its current `mailto:` behavior depends on a configured email application. For reliable production submissions, connect a secure form provider or backend and document its handling of personal data.

## Validation

There is no configured automated test or build command. Before publishing, check:

1. All eight pages open and all navigation links work.
2. Images load, including filenames with spaces or special characters.
3. Both homepage carousels advance and their controls work on desktop and mobile.
4. The Technology dropdown, service-to-contact links, email links, WhatsApp links and map behave as intended.
5. The contact information, GSTIN, job details and company claims are approved and correct.
6. The site is usable by keyboard and with reduced-motion preferences enabled.

## Crane IoT monitoring

Open Technology > Crane IoT Monitoring, or follow the link on the Technology page's Monitoring card.

### Implemented website functionality

- The dashboard follows the supplied reference image's dark panel layout. The original image is included in `assets/crane-dashboard-reference.png`, inside an expandable reference section.
- All readings, equipment states, chart points and alerts are explicitly SIMULATED. No physical crane, gateway, broker, backend API or database is connected. The implementation architecture is a design, not deployed infrastructure.
- The Master Dashboard lists 12 sample IDs, H-01 through H-12, with manufacturer, gateway and explicitly simulated Operating/Idle/Maintenance/Offline status indicators. It shows fleet-wide status totals and zero actual live connections.
- Search by crane ID, manufacturer, gateway ID or status, combined with a status filter. Result counts, an empty-result message and Clear filters support fleet lookup.
- Each crane opens a dedicated, bookmarkable URL such as `crane-monitoring.html?crane=H-01`. One shared HTML template renders its engine, hydraulic, load, fuel, gateway and diagnostics panels. The crane selector navigates to another asset; Back to Master Dashboard returns to the complete fleet. Invalid IDs show an error and the fleet list without substitute readings.
- Start demo generates samples every 2 seconds; Pause freezes them; Reset restores the selected asset's initial values and clears its chart and events. Opening a different asset starts fresh and does not carry readings or test alerts across cranes.
- The sample fleet covers ACE Hydra, Escorts Kubota / Farana, TIL and Manitowoc as illustrative examples, not validated model integrations. Each asset has a sample gateway ID and distinct synthetic baseline readings; these are not manufacturer specifications.
- Operating examples vary; idle examples remain unloaded; maintenance examples have their simulated engine stopped. Offline examples show unavailable readings, hide their gauges and disable Start, rather than presenting missing data as zero or healthy. All actual gateway connectivity and ECU diagnostics remain unconnected/unavailable, even for the demo's online scenarios.
- Adjust `fleetDefinitions` in `crane-monitoring.js` to change sample fleet size, model assignments or scenarios. IDs, sample gateways, cards, selector options and status totals are derived from this list. Update the introductory example count and Technology card text if changing fleet size. Real inventory and telemetry require the separate authenticated backend described below.
- The trend keeps the last 30 samples. Pressure and load use independent normalized display scales (250 bar and 5 t), not capacity or safety limits.
- Test alert adds a clearly marked local test event; Clear demo alerts only clears the browser's demo log. No notification or machine command is sent. The most recent 10 test events are shown.
- The simulation does not auto-start and pauses when the page is hidden. Nothing is persisted after refresh. No sensor data or location is collected by this simulator.
- The page uses shared navigation from `script.js`; load `crane-monitoring.js` after the HTML and shared script. No extra libraries are required.

Fleet validation: check all 12 crane links and direct URLs, refresh/back navigation, combined search/status filtering, no-match recovery, per-asset readings and resets, offline unavailable states, two-second sampling, and the mobile layout. Neither fleet statuses nor diagnostics may imply a real device connection.

### Proposed field and backend implementation

For the existing CAN/J1939 fleet of more than 10 cranes, the page documents:

1. A serial-number/model/controller survey and OEM authorization before installation or hardware selection.
2. One rugged, vehicle-power-compatible, isolated listen-only CAN/J1939 gateway per crane, with GNSS, LTE, approved optional sensor inputs, signed updates, unique credentials and an encrypted offline queue (initial target: 72 hours).
3. Existing OEM engine signals first; hydraulic, load, boom and outrigger signals only from approved interfaces or professionally specified and calibrated sensors. Not every value is on J1939. Outriggers may not be fitted. Load is not calculated from generic pressure.
4. Gateway -> MQTT/TLS -> authenticated ingestion and quality validation -> time-series storage, registry and alert history -> authenticated API/SSE -> dashboard. This backend must be implemented separately; the public static website must not contain device credentials.
5. Separate demo/production identities, topics, permissions and storage. Production services enforce asset mapping and source provenance. Missing live data must never fall back to simulation or numeric zero.
6. Per-signal units, quality, source, decoder/calibration version and timestamps. Backfill must retain measurement time and not mark old data fresh. Deduplicate by device/session/sequence.
7. Initial targets of 2-second running samples, 5-second publish batches and 30-second heartbeats. A 10-second stale signal target and 60-second offline heartbeat target need validation against each signal's actual rate; these are not safety deadlines.
8. Bench qualification, a representative 2-3 crane pilot plus coverage for untested variants, OEM-agreed acceptance tolerances, outage/replay tests and fleet rollout in batches of 3-5.

An illustrative telemetry JSON contract and detailed sensor-source table are on `crane-monitoring.html`. The proposed pilot stack is Mosquitto, a Node.js ingestion worker, PostgreSQL/TimescaleDB, OIDC authentication and HTTPS API/SSE behind a reverse proxy. The page defines proposed assets/latest/history/event-stream routes; no such endpoints exist in this static repository. Initial retention is proposed at 90 days of raw samples and 12 months of hourly aggregates, subject to policy and measured storage costs.

Final endpoints, hardware vendors, bill of materials, hosting and budgets depend on the OEM survey, site connectivity and procurement requirements; none is represented as already provisioned.

The solution is read-only monitoring. It must not transmit CAN requests, control cranes, bypass LMI/SLI systems or replace certified safety equipment and operator procedures. Qualified OEM-approved technicians must perform installation and commissioning.

## Publishing

This is a static site and can be hosted by any provider that serves HTML, CSS, JavaScript and image files. Upload the project files and folders while preserving their directory structure. Configure the domain and HTTPS through the selected hosting provider. If using both `liftxinfra.com` and `www.liftxinfra.com`, configure a canonical domain and redirect the alternate hostname.

Do not change DNS records until the hosting provider is selected. Save the current DNS records before making domain changes. After deployment, test the published site on desktop and mobile, and verify HTTPS, page navigation, local images and external services.

## Launch checklist

- Confirm the public contact details and office address.
- Confirm the GSTIN, company information, client references, job openings and project descriptions are accurate and approved for publication.
- Replace any sample project content or imagery that should not be public.
- Verify rights and permissions for all logos, photographs, fonts and other third-party content.
- Publish an appropriate privacy notice and any required legal terms, especially before connecting a form service.
- The current enquiry form only creates an email draft; it does not securely transmit, store or track submissions.
