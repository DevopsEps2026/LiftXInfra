# LiftX Infra Website

Responsive, multi-page static website for LiftX Infra, built with HTML, CSS and vanilla JavaScript. It has no package manager, build step, server-side code, or database.

## Current implementation status

- Eight public HTML pages share navigation, LXI branding and footer behavior.
- Six pages use the light-blue theme. Technology and Crane IoT Monitoring retain their original dark navy designs.
- Technology content is aligned across the dropdown, Technology page, Services overview and Careers listings.
- The 12-crane dashboard is an interactive browser simulation, not a connected fleet system.
- Contact and job application actions open email drafts or WhatsApp; there is no submission backend.

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
| `brand-colors.css` | Final shared semantic color layer: infrastructure Navy/Gold, technology Blue/Cyan, content links and table borders |
| `technology-menu.css` | Shared Technology dropdown styles and responsive behavior |
| `script.js` | Shared navigation, dropdown, slideshow, client carousel, enquiry form and footer-year behavior |
| `assets/` | Local service and supporting images used by site pages |
| `assets/liftx-logo.png` | Supplied navy/gold LXI logo, cropped to remove excess white margins, used in the top-left header on all eight pages |
| `assets/technology-network.svg` | Original decorative cloud/network artwork in the Technology menu |
| `assets/crane-dashboard-reference.png` | Supplied dashboard reference image, displayed in an expandable monitoring section |
| `images/` | Local crane and civil images used in the homepage hero slideshow |
| `Clients/` | Client logo images used by the homepage client carousel |

Keep these paths and filenames in place when publishing: the HTML pages refer to them with relative URLs.

## Features and behavior

### Shared navigation and branding

- Menu order: Home, About Us, Services, Projects, Crane IoT Monitoring, Technology, Contact, Careers, Get a Quote. Monitoring and Technology are immediately adjacent.
- The former Clients menu entry was replaced by Crane IoT Monitoring; the homepage client carousel remains.
- Every header places the supplied LXI image at the far-left edge, separate from the LiftX Infra name and tagline. Footer text branding remains unchanged.
- Mobile navigation opens with the menu button and closes when a link is selected.
- The Technology button opens an eight-category mega-menu. Its top-left Back button closes the menu without navigating away and restores focus to Technology. Outside click and Escape also close it; Escape restores focus to the button.
- The menu uses a navy introduction sidebar, local cloud/network artwork, colored vector icons and a pale-blue action bar linking monitoring and the Technology overview.
- Wide desktop menus use four service columns/two rows beside the sidebar. Smaller desktops use two columns; tablets stack the introduction above two columns. Mobile uses one or two columns within scrollable navigation. The menu height is capped to the viewport.
- Menu action links use `#464feb` without underlines. Service descriptions are informational text, not inactive links.
- The footer year is set by `script.js`.

### Color themes and stylesheet order

| Pages | Theme |
| --- | --- |
| Home, About, Services, Projects, Contact, Careers | Light-blue canvas `#eef6fd`, alternate sections `#e2effb`, white cards and navy headings |
| Technology | Dark navy sections retained, with white text and Blue/Cyan technology accents |
| Crane IoT master and individual views | Dark monitoring panels retained, cyan/periwinkle chart lines and clearly labeled demo notices; status/warning colors retain their meaning |

Load `style.css` and `technology-menu.css` on every page. Load `theme.css` on the six light-themed pages after inline page styles. Do not add it to `technology.html` or `crane-monitoring.html`; their dark backgrounds are intentional. Monitoring also loads `crane-monitoring.css`. Load `brand-colors.css` last on all eight pages so semantic accent rules apply consistently.

Infrastructure (crane, JCB, civil/construction and real estate) retains Navy `#062544` and Gold `#ffc928`. Get a Quote navigation buttons remain gold on every page. Technology menus, AI/technology service cards, IoT services, technology careers and technology actions use Blue `#175ea8` and Cyan `#4ddcf5`; dark cyan `#08758b` is used for small text on light surfaces. The LXI logo and company wordmark keep their existing branding.

Content paragraph links and text links use `#464feb` without underlines on light surfaces; dark-page links use high-contrast cyan. Navigation, branded buttons and image-overlay links retain their component colors. Tables have `1px solid #e6e6e6` cell borders and `#f5f5f5` headers by default; monitoring tables retain dark headers and appropriate dark-theme borders for legibility.

Photo overlays, primary buttons, status badges and the navy footer retain contrasting colors. Responsive layouts use CSS media queries; carousel animation respects `prefers-reduced-motion`.

### Homepage, About and Projects

- The homepage hero rotates six local images every **2 seconds**, with previous, next and numbered controls. The first image is `images/100 Ton&500 Ton.png`; the remaining slides are `Civil1.png`, `Civil2.png`, `Civil3.png`, `Crane.jpg` and `Hydra crane.jpg` in the same folder. HTML URLs encode spaces and special characters.
- Hero autoplay pauses when the page is hidden or its controls are hovered/focused, and does not autoplay for reduced-motion visitors.
- The client carousel contains **17 local logos**, displays multiple logos per row and advances every **5 seconds**. It pauses on hover/focus or hidden pages and responds to resizing and reduced-motion preferences.
- About is a separate page with company background, core values, founder Mr. Amarnath Rai and a prominent GSTIN card showing exactly `07BRGPR7548C2ZI`. Its profile covers crane/JCB, civil construction, real estate, all eight Technology service areas, industrial automation and the proposed Crane IoT integration. Links lead to Services, Technology and monitoring. The existing combined-experience statement and tagline remain; the monitoring paragraph explicitly distinguishes the 12-crane simulation from live deployment and retains read-only safety limitations.
- Projects presents six portfolio/capability cards. Review project descriptions, imagery and claims before publication.

### Technology and Services

The Technology page has eight individually headed sections with six service descriptions each (**48 total**), matching all eight copies of the shared mega-menu:

| Category | Technology page anchor |
| --- | --- |
| Internet of Things (IoT) | `technology.html#iot` |
| Managed IT Services | `technology.html#managed-it` |
| Cybersecurity | `technology.html#cybersecurity` |
| Cloud & Infrastructure | `technology.html#cloud-infrastructure` |
| Software Development | `technology.html#software-development` |
| Automation & Industry 4.0 | `technology.html#automation` |
| Data & Analytics | `technology.html#data-analytics` |
| Networking & Connectivity | `technology.html#networking` |

- Quick-jump links navigate to each Technology section. Two-column service lists stack on small screens.
- The IoT section links to the simulated fleet dashboard and states that real gateway telemetry is not connected. AI workflow, cloud/data and Looking Ahead sections remain below.
- Services retains five original cards: Crane Services, JCB Services, Civil Works, Real Estate and AI & Technology Base Solutions.
- Its dedicated `#iot-technology` section adds eight technology specialty cards linking to the matching anchors above, plus a Crane IoT Monitoring & Integration overview.
- The crane overview covers planned passive CAN/J1939, sensors, LTE/GNSS gateways, dashboards and diagnostics. It links to the demo and Contact and explicitly distinguishes simulation from a live deployment.

### Careers and applications

- Five original openings remain: Crane Operator, JCB Operator, Civil Engineer, Civil Workers and Supervisor.
- `careers.html#technology-careers` contains nine further cards: IoT & Embedded Systems Engineer; IT Support & Systems Engineer; Cybersecurity Analyst / Security Engineer; Cloud & DevOps Engineer; Software Developer / UI/UX Designer; Industrial Automation Engineer; Data Engineer / BI & AI Analyst; Network & Connectivity Engineer; and Crane IoT Integration Engineer / Field Technician.
- These cover all eight Technology categories and their 48 service descriptions, plus Crane IoT field integration. Each card includes responsibilities, relevant requirements/skills and a distinct application email subject: **14 career cards total**.
- Applications open an email draft or WhatsApp. Candidates can supply their CV, specialization, experience, location, certificates and portfolio/project links. No CV upload or applicant-tracking system exists.
- Benefits and application contacts are shared below the listings; role availability and assignments are discussed during recruitment.
- The Crane IoT listing describes planned OEM-approved, passive integration, not an existing live installation. It retains the simulation disclaimer and read-only safety requirements.

### Contact details and form limitations

| Item | Published value |
| --- | --- |
| Email | `liftxinfra@gmail.com` |
| Phone / WhatsApp | `+91 83696 49443` |
| WhatsApp destination | `https://wa.me/918369649443` |
| Office | D-27/1, Block, Gurunanak Dev Colony, Bhalswa Dairy, Delhi - 110042 |
| GSTIN | `07BRGPR7548C2ZI` |

- Existing service-specific links use `contact.html?service=...` to prefill a matching service option. The new general IoT enquiry link opens Contact without a preselection; visitors can select AI & Technology Base Solutions or describe their requirements.
- The form validates required fields in the browser and prepares an email draft. It does not send data to a server, store enquiries or confirm delivery.
- Email actions require a configured email handler. WhatsApp and the embedded map require their external services. A production submission service would need separate implementation and privacy handling.

## Run locally

1. Open the project folder in Visual Studio Code or a file browser.
2. Open `index.html` directly in a browser, or serve the folder using any local static-file server.
3. Use the navigation to review each page and test the mobile layout by resizing the browser.

No dependencies need to be installed. Google Fonts, Unsplash images used on some pages, and the embedded Google Map require an internet connection. The homepage hero and the image folders described above use local files.

## Updating the site

- **Navigation:** Update the shared `<nav>` in each HTML page when adding or renaming a page.
- **Technology taxonomy:** Keep the eight menu copies, Technology headings/lists, Services summary links and Careers service coverage synchronized. Preserve the existing anchor IDs or update all incoming links together.
- **Themes:** Change shared light-blue backgrounds in `theme.css`, semantic accent/link/table colors in `brand-colors.css`, and dark layout surfaces in Technology's inline styles or `crane-monitoring.css`. Keep `brand-colors.css` last. Avoid changing infrastructure gold or status/warning colors when adjusting technology accents.
- **Header logo:** All eight page headers position `assets/liftx-logo.png` at the far-left edge, separately from the LiftX Infra name and tagline, while retaining the same home link. Shared `.site-header .brand-logo` and `.brand-text` rules in `style.css` reserve space to prevent overlap at desktop/mobile sizes. Footer text branding is unchanged.
- **Homepage hero:** Keep the `.hero-slide` images and `[data-slide-to]` buttons in `index.html` in the same order and count. Change the autoplay interval in `script.js` if the timing should change.
- **Client logos:** Add or replace images in `Clients/` and update the client-slide markup in `index.html` as needed. The carousel timing is configured in `script.js`.
- **Contact details:** Keep the business email, phone, WhatsApp link, website and office address consistent across `contact.html` and `careers.html`. Check other pages before changing business-wide contact information.
- **Images:** Use local, web-optimized files where possible. Update the corresponding relative image paths in HTML/CSS whenever a file is renamed or moved.
- **Enquiry form:** Its current `mailto:` behavior depends on a configured email application. For reliable production submissions, connect a secure form provider or backend and document its handling of personal data.
- **Careers:** Confirm hiring availability before publishing. Keep role-specific email subjects, requirements, application guidance and Crane IoT demo/safety statements accurate.

## Validation

There is no configured automated test or build command. Before publishing, check:

1. All eight pages open and all navigation links work.
2. Images load, including filenames with spaces or special characters.
3. Both homepage carousels advance and their controls work on desktop and mobile.
4. The Technology dropdown, service-to-contact links, email links, WhatsApp links and map behave as intended.
5. The contact information, GSTIN, job details and company claims are approved and correct.
6. The site is usable by keyboard and with reduced-motion preferences enabled.
7. Technology has eight sections/48 items; Services has eight linked technology summaries and a crane integration section; Careers has five original and nine technology/IoT cards with working application links.
8. The six light pages retain their blue backgrounds, while both the Technology page and all monitoring views retain dark colors and readable text.
9. Check desktop/tablet/mobile widths, including 1440, 768, 375 and 320 pixels, for overflow and reachable menus. Check all eight quick-jump targets.

Run `git diff --check` for patch whitespace errors. Browser checks and lightweight HTML/reference checks have been used during development; they are not a committed automated regression suite.

## Crane IoT monitoring

Open the primary Crane IoT Monitoring link, the Technology menu action, the Technology page's IoT section or the Services page's crane demo link.

### Implemented website functionality

- The dashboard follows the supplied reference image's dark panel layout. The original image is included in `assets/crane-dashboard-reference.png`, inside an expandable reference section.
- All readings, equipment states, chart points and alerts are explicitly SIMULATED. No physical crane, gateway, broker, backend API or database is connected. The implementation architecture is a design, not deployed infrastructure.
- The Master Dashboard lists 12 sample IDs, H-01 through H-12, with manufacturer, gateway and explicitly simulated Operating/Idle/Maintenance/Offline status indicators. It shows fleet-wide status totals and zero actual live connections.
- Search by crane ID, manufacturer, gateway ID or status, combined with a status filter. Result counts, an empty-result message and Clear filters support fleet lookup.
- Each crane opens a dedicated, bookmarkable URL such as `crane-monitoring.html?crane=H-01`. One shared HTML template renders its engine, hydraulic, load, fuel, gateway and diagnostics panels. The crane selector navigates to another asset; Back to Master Dashboard returns to the complete fleet. Invalid IDs show an error and the fleet list without substitute readings.
- Start demo generates samples every 2 seconds; Pause freezes them; Reset restores the selected asset's initial values and clears its chart and events. Opening a different asset starts fresh and does not carry readings or test alerts across cranes.
- The sample fleet covers ACE Hydra, Escorts Kubota / Farana, TIL and Manitowoc as illustrative examples, not validated model integrations. Each asset has a sample gateway ID and distinct synthetic baseline readings; these are not manufacturer specifications.
- Operating examples vary; idle examples remain unloaded; maintenance examples have their simulated engine stopped. Offline examples show unavailable readings, hide their gauges and disable Start, rather than presenting missing data as zero or healthy. All actual gateway connectivity and ECU diagnostics remain unconnected/unavailable, even for the demo's online scenarios.
- Adjust `fleetDefinitions` in `crane-monitoring.js` to change sample fleet size, model assignments or scenarios. IDs, sample gateways, cards, selector options and status totals are derived from this list. Update hard-coded fleet counts in the monitoring, Technology, Services and Careers pages and this README together. Real inventory and telemetry require the separate authenticated backend described below.
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
