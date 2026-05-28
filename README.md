# Orynd Frontend

Orynd is a 100% offline, cross-platform (Android-first) application functioning as a cognitive prosthetic designed for individuals managing ADHD or executive dysfunction. It transforms unstructured, chaotic streams of consciousness into organized, actionable outputs using localized AI.

This repository (`orynd-frontend`) contains the React Native (Expo) user interface.

## 🎯 Product Vision
Orynd acts as an offline cognitive prosthetic. It offloads executive function entirely to the device, ensuring maximum privacy and zero cognitive friction. The core philosophy is simple: **You speak, the machine sorts.**

## ✨ Core Features
- **Zero-Friction Voice Capture:** A single, dominant "Hold to Speak" button that records audio.
- **The Universal Vault:** A unified, visually muted inbox where parsed inputs are displayed automatically in their categorized state (Tasks, Events, Notes) without requiring user intervention.
- **Air-Gapped Operation:** The application requires zero internet connection post-installation. All data remains isolated within the device's sandboxed storage.

## 🎨 Design System
Our interface is built on a "Sleep mode" philosophy—visually calming, heavily muted, and designed to prevent sensory overstimulation.

- **Branding:** The logo consists purely of the word *Orynd* rendered in the Alqest font.
- **Background Surfaces:** Deep, flat slate (`#121212`) for the background, with muted charcoal (`#1E1E1E`) for task cards.
- **Typography:** Primary text is soft off-white (`#E0E0E0`), secondary text is dim gray (`#888888`). No harsh pure whites.
- **Semantic Accents (Low Saturation):**
  - **Tasks:** Soft Sage (`#7C9681`)
  - **Events:** Muted Lavender (`#8A8696`)
  - **Notes:** Dust Blue (`#6B7A8F`)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Android Studio (for emulator / physical device testing)
- The [Orynd Core](https://github.com/ORYND/Orynd-core) engine must be linked.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ORYND/Orynd-Frontend.git
   cd Orynd-Frontend
   ```
2. Install dependencies (which will link the local `orynd-core` backend):
   ```bash
   npm install
   ```
3. Prebuild the native Android project:
   ```bash
   npx expo prebuild --clean -p android
   ```
4. Run locally on your device or emulator:
   ```bash
   npx expo run:android
   ```

*Note: Since the backend relies on heavy C++ ML bindings, standard "Expo Go" will not work. You must compile the native binary using `run:android`.*
