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
| `contact.html` | Company contact details, map and email-draft enquiry form |
| `careers.html` | Open roles, qualifications, benefits and application links |
| `style.css` | Shared site layout, design tokens, components and responsive rules |
| `technology-menu.css` | Shared Technology dropdown styles and responsive behavior |
| `script.js` | Shared navigation, dropdown, slideshow, client carousel, enquiry form and footer-year behavior |
| `assets/` | Local service and supporting images used by site pages |
| `images/` | Local crane and civil images used in the homepage hero slideshow |
| `Clients/` | Client logo images used by the homepage client carousel |

Keep these paths and filenames in place when publishing: the HTML pages refer to them with relative URLs.

## Features and behavior

- Shared responsive navigation links all seven pages. On narrow screens, the menu opens from the menu button and closes when a link is selected.
- The Technology navigation dropdown toggles by button, closes when clicking outside, and closes on Escape.
- The homepage hero slideshow uses the six local images in `images/`, advances every **2 seconds**, and has previous, next and numbered controls. Autoplay pauses while the page is hidden, while a control is hovered/focused, or when the visitor requests reduced motion.
- The homepage client carousel displays multiple logos per row according to available width and advances every **5 seconds**. It pauses while hovered/focused or when the page is hidden, responds to resizing, and respects reduced-motion preferences.
- Service links can open the Contact page with the selected service prefilled.
- The Contact form validates required fields in the browser and prepares an email draft to `liftxinfra@gmail.com`. It does not send form data to a server.
- Careers application links open an email draft or WhatsApp conversation using the published contact details.
- The footer copyright year is set by JavaScript.
- Responsive layouts use CSS media queries. Slideshow and carousel animation respect the browser's `prefers-reduced-motion` setting.

## Run locally

1. Open the project folder in Visual Studio Code or a file browser.
2. Open `index.html` directly in a browser, or serve the folder using any local static-file server.
3. Use the navigation to review each page and test the mobile layout by resizing the browser.

No dependencies need to be installed. Google Fonts, Unsplash images used on some pages, and the embedded Google Map require an internet connection. The homepage hero and the image folders described above use local files.

## Updating the site

- **Navigation:** Update the shared `<nav>` in each HTML page when adding or renaming a page.
- **Homepage hero:** Keep the `.hero-slide` images and `[data-slide-to]` buttons in `index.html` in the same order and count. Change the autoplay interval in `script.js` if the timing should change.
- **Client logos:** Add or replace images in `Clients/` and update the client-slide markup in `index.html` as needed. The carousel timing is configured in `script.js`.
- **Contact details:** Keep the business email, phone, WhatsApp link, website and office address consistent across `contact.html` and `careers.html`. Check other pages before changing business-wide contact information.
- **Images:** Use local, web-optimized files where possible. Update the corresponding relative image paths in HTML/CSS whenever a file is renamed or moved.
- **Enquiry form:** Its current `mailto:` behavior depends on a configured email application. For reliable production submissions, connect a secure form provider or backend and document its handling of personal data.

## Validation

There is no configured automated test or build command. Before publishing, check:

1. All seven pages open and all navigation links work.
2. Images load, including filenames with spaces or special characters.
3. Both homepage carousels advance and their controls work on desktop and mobile.
4. The Technology dropdown, service-to-contact links, email links, WhatsApp links and map behave as intended.
5. The contact information, GSTIN, job details and company claims are approved and correct.
6. The site is usable by keyboard and with reduced-motion preferences enabled.

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
