# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for the "Department of Computing & Informatics" at Bugema University. This is a university assignment — a multi-page site built with vanilla HTML5, external CSS3, and minimal JavaScript.

## Development

No build system, package manager, or dependencies. To view the site, open `index.html` directly in a modern browser. The original monolithic file is preserved as `index1.html` for reference.

## Architecture

- **HTML pages** (7 pages, shared header/nav/footer):
  - `index.html` — home (highlights, quick nav, favourite lists, external links)
  - `about.html` — mission/vision, dept history, student profile, timetable
  - `programs.html` — undergrad/postgrad programs, course table, admission criteria (accordion UI)
  - `faculty.html` — 5 faculty profiles with qualifications, research, publications
  - `research.html` — research areas, publications table, downloadable resources
  - `news.html` — news articles, upcoming events, achievements
  - `contact.html` — contact info, inquiry form, social media links
- **CSS**: `css/styles.css` — single external stylesheet, responsive (768px/480px breakpoints), hamburger menu on mobile
- **JavaScript**: `js/main.js` — hamburger toggle, active nav highlighting, form handlers (demo), accordion
- **Navigation**: 7-item nav bar: HOME | ABOUT | PROGRAMS | FACULTY | RESEARCH | NEWS & EVENTS | CONTACT
- **Accessibility**: semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`), skip-to-content link, ARIA labels, proper alt text, visible focus styles
- **Images**: Stored in `images/` directory with relative paths
- **Forms**: Inquiry form and registration form are demo-only (no backend)
- **Legacy**: `index1.html` — original single-file version (preserved, not modified)

## Color Scheme

- Primary Blue: `#003399`
- Secondary Blue: `#1e90ff`
- Light Blue Background: `#f0f8ff`
- Typography: Segoe UI, Roboto (system fonts)
