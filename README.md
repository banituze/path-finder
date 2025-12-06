# ![PathFinder](https://img.shields.io/badge/PathFinder-FFD700?style=for-the-badge&logo=compass&logoColor=black)

An interactive web application designed to help new BSE (Bachelor of Software Engineering) students at African Leadership College of Higher Education discover their ideal specialisation through a neural-pathway inspired assessment.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Project Overview

PathFinder guides students through a carefully crafted 10-question assessment that evaluates their interests, problem-solving style, and career aspirations to recommend one of four BSE specialisations :

- **Low-Level Programming** - Systems programming, embedded systems, performance optimization
- **AR/VR Development** - Immersive experiences, 3D graphics, spatial computing
- **Full-Stack Web Development** - Web applications, databases, cloud services
- **Machine Learning** - Data science, neural networks, AI systems

## Features

### Landing Page
- Animated neural network particle background (Canvas API)
- Typing effect hero text animation
- Floating specialisation icons
- Animated statistics counters
- Responsive card grid showcasing all four specialisations
- Process timeline explaining how the assessment works

### Quiz Page
- **10 Diverse Question Types:**
  1. Visual Card Selection - Project preference
  2. Interactive Slider - Abstraction level preference
  3. Icon-Based Selection - Joy triggers in coding
  4. Visual Cards - Dream job scenarios
  5. Word Cloud Selection - Gut reaction to concepts
  6. Multi-Select Checkboxes - Skill interests (exactly 3)
  7. Scenario-Based Options - Problem-solving approach
  8. Click-to-Rank System - Value prioritization
  9. Philosophy Quotes - Coding philosophy alignment
  10. Sentence Completion - Final reflection

- Progress bar with percentage indicator
- Input validation with error messages
- Weighted scoring algorithm
- Animated results page with:
  - Compatibility matrix visualization
  - Personalized reasoning
  - Actionable next steps
  - Shareable result card

### Contact Page
- Terminal-style developer profile
- Interactive contact form with validation
- Honeypot spam protection
- FAQ accordion section
- Social links with icons

## Technical Implementation

### HTML
- Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Diverse form elements (radio, checkbox, range, select, textarea, hidden inputs)
- Accessible navigation with ARIA labels
- SVG icons for visual elements

### CSS
- CSS Custom Properties (variables) for theming
- Flexbox and CSS Grid layouts
- Responsive design with media queries
- CSS animations and transitions:
  - Typing cursor animation
  - Slide-up entrance animations
  - Floating icon animations
  - Progress bar transitions
  - Card hover effects
  - Score bar animations
- Mobile-first approach
- Print styles
- Reduced motion support

### JavaScript
- Event handling for all interactive elements
- DOM manipulation for dynamic content
- Scoring logic with weighted calculations
- Input validation:
  - Required field validation
  - Regex pattern matching for names and emails
  - Checkbox count limits
  - Ranking completion validation
- Canvas API for particle animation
- Intersection Observer for scroll animations
- Debounce function for performance optimization
- Local state management for quiz progress

## File Structure

```
path-finder/
├── index.html          # Landing page
├── quiz.html           # Assessment page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
└── script.js           # JavaScript functionality
```

## Design Theme

**Tech-Noir Aesthetic**
- Primary Colors : Golden Yellow (#FFD700) and Black (#0A0A0A)
- Typography : System UI fonts for performance
- Dark theme with yellow accents
- Neural network/constellation visual motif
- Glowing effects and subtle animations

## Getting Started

### Prerequisites
- Modern web browser (Brave, Edge, Chrome, Firefox, Safari)
- No additional dependencies required

### Installation

1. Clone the repository:
```
git clone https://github.com/banituze/path-finder.git
```

2. Navigate to the project directory:
```
cd path-finder
```

3. Open `index.html` in your browser or use a local server:
```
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

4. Visit `http://localhost:8000` in your browser

## Responsive Breakpoints

- **Desktop** : 992px and above
- **Tablet** : 768px - 991px
- **Mobile** : Below 768px
- **Small Mobile** : Below 480px

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Reduced motion media query support
- Sufficient color contrast ratios
- Screen reader compatible

## Privacy

PathFinder runs entirely client-side. No data is stored on any server, all responses are processed locally in the browser and results are generated on the fly.

## Author

[Winebald Banituze](https://github.com/banituze)

## Live Demo

https://banituze.github.io/path-finder

## Acknowledgments

- African Leadership College of Higher Education for the project requirements
- The BSE programme for inspiring the specialisation categories
- All future BSE students who will use this tool