# Portfolio v3

Personal portfolio site built with React 19, TypeScript, and GSAP — styled with a Death Stranding 2 inspired dark aesthetic.

## Tech Stack

- **React 19** + TypeScript
- **Vite** for bundling
- **GSAP** + ScrollTrigger for scroll-based animations
- **Tailwind CSS** for styling
- **EmailJS** for the contact form

## Sections

- **Hero** — Canvas particle field, orbiting circle with moon glow, animated intro
- **Profile** — Bio, stats, social links
- **Tech Stack** — Skills grid (Frontend, Backend, Infrastructure, Tools)
- **Education** — Mechatronics Engineering background
- **Currently Exploring** — Go microservices, DevOps, system design
- **Projects** — Featured project showcase with video previews
- **Work Experience** — Timeline with bridge panel UI
- **Contact** — Transmission-style contact form

## Getting Started

```bash
git clone https://github.com/myothiha97/portfolio-v3.git
cd portfolio-v3
npm install
```

Create a `.env` file:

```env
VITE_APP_EMAILJS_USERID=your_emailjs_user_id
VITE_APP_EMAILJS_TEMPLATEID=your_emailjs_template_id
VITE_APP_EMAILJS_RECEIVERID=your_emailjs_receiver_id
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

## License

MIT
