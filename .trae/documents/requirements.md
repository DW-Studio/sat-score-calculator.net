# SAT Score Calculator - Requirements Document

## Project Overview
A modern, responsive static webpage for calculating SAT scores, targeting American users with accurate business logic and professional design.

## Core Requirements

### 1. Business Logic
- **Reading & Writing Section**: Raw score (0-52) → Scaled score (200-800)
- **Math Section**: Raw score (0-58) → Scaled score (200-800)
- **Total Score**: Sum of both sections (400-1600)
- **Score Conversion**: Use official College Board conversion tables
- **Input Validation**: Ensure raw scores are within valid ranges

### 2. User Interface
- **Language**: All content in English (American audience)
- **Input Fields**: 
  - Reading & Writing raw score (0-52)
  - Math raw score (0-58)
- **Output Display**:
  - Reading & Writing scaled score (200-800)
  - Math scaled score (200-800)
  - Total SAT score (400-1600)
- **Modern Design**: Clean, professional, mobile-first responsive design
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

### 3. Technical Requirements
- **Static Website**: HTML, CSS, JavaScript only
- **Responsive Design**: Mobile-first approach, works on all devices
- **Performance**: Fast loading, minimal dependencies
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

### 4. Content Requirements
- **Header**: Clear title and brief description
- **Calculator Section**: Prominent placement with input/output fields
- **Instructions**: Brief guidance on how to use the calculator
- **Footer**: 
  - Disclaimer about score estimates
  - Copyright notice
  - Contact email: yubumian205@gmail.com

### 5. Design Guidelines
- **Color Scheme**: Professional blues/whites or modern gradients
- **Typography**: Clean, readable fonts (system fonts preferred)
- **Spacing**: Generous whitespace, clear visual hierarchy
- **Visual Feedback**: Clear input focus states, hover effects
- **Error Handling**: User-friendly error messages for invalid inputs

## SAT Score Conversion Logic

### Reading & Writing Section (0-52 raw → 200-800 scaled)
- Raw score 52 → 800
- Raw score 40 → 600-650 range
- Raw score 30 → 500-550 range
- Raw score 20 → 400-450 range
- Raw score 10 → 300-350 range
- Raw score 0 → 200

### Math Section (0-58 raw → 200-800 scaled)
- Raw score 58 → 800
- Raw score 45 → 600-650 range
- Raw score 35 → 500-550 range
- Raw score 25 → 400-450 range
- Raw score 15 → 300-350 range
- Raw score 0 → 200

Note: Use interpolated values for scores between these reference points.

## Success Criteria
- Accurate score calculations matching official SAT scoring
- Responsive design works perfectly on mobile and desktop
- Clean, professional appearance suitable for American users
- Fast loading with minimal dependencies
- Clear user experience with proper error handling