My name is Gad Niyibigira.

# GadPortfolio

**Registration number:** 25/26951
**Verification code:** MOB-A2-6951
**App name:** GadPortfolio
**Course:** SWE 3409 - Mobile Application Development
**Assignment:** Individual Assignment 2
**Institution:** INES-Ruhengeri

---

## Purpose

GadPortfolio is an independently installable Android portfolio application built with React Native, Expo, and TypeScript. It is designed so a recruiter can install the APK, open it without Expo Go, and understand who I am, what I can build, and what I care about within two minutes. The core content works fully offline.

## Features

- Home - the required "My name is Gad Niyibigira." introduction, a professional headline, a short biography, the verification code, and a hero image or fallback gradient.
- Skills and Education - genuine skills as a two-column card grid with inline brand icons (React, TypeScript, JavaScript, HTML, CSS, Git, Node.js, Python) and colored initial tiles for skills without bundled logos, plus a concise education timeline. Skills can be added, edited, and removed from inside the app; changes persist.
- Projects - two genuine student projects, each with a title, problem, my specific contribution, technology list, and a dedicated detail screen reached through the stack navigator.
- Photography - a dark, mixed-ratio masonry gallery of my own photos. Each photo has a title, description, category, and captured date. Photos are added through the gallery or camera, viewed in a detail sheet, and removed by long-press. Categories are user-managed.
- Profile editor - controlled fields for professional headline, short biography, primary skill, and availability status, with three meaningful validation rules and field-level error messages. A Reset action clears stored profile data.
- About information - folded into the Profile screen: app name, full name, registration number, verification code, version, and a short data-use statement.
- Local persistence - profile data, skills, photos, and photo categories are stored on the device with AsyncStorage. Selected images are copied into a durable app-managed directory so they survive restarts.
- Offline-first - every core feature works in Airplane Mode. No network connection is required.

## Setup and run

Run the following commands in the project root:

- npm install
- npx expo start
- npx tsc --noEmit
- npx expo start --web

## EAS build command

Run the following commands to build an installable Android APK:

- npm install -g eas-cli
- eas login
- eas build -p android --profile preview

The preview profile in eas.json uses buildType apk so it produces an installable APK rather than an Android App Bundle.

## Tested device and environment

- Device tested on: Samsung Galaxy A04e
- Android version: Android 14
- Node version used locally: v24.18.0
- Expo SDK: 57
- Build profile used: preview (APK)

## Repository structure

MOB_A2_2526951/
  App.tsx
  app.json
  eas.json
  index.ts
  package.json
  tsconfig.json
  assets/
    fonts/
    icon.png
    adaptive-icon.png
    splash-icon.png
  src/
    components/
    data/
    navigation/
    screens/
    storage/
    theme/
  docs/
    MOB_A2_2526951_UIUX.pdf
  evidence/
    MOB_A2_2526951_TEST_LOG.pdf
    MOB_A2_2526951_DECLARATION.pdf
    AI_USE.md

## Final commit hash

REPLACE_AFTER_FINAL_COMMIT

## Release link

REPLACE_AFTER_CREATING_GITHUB_RELEASE

## APK download link

REPLACE_AFTER_DOWNLOADING_APK_FROM_EAS

## Known limitations

- The image picker and camera do not work in the web preview. This is a platform limitation of React Native Web. All image features work on the installed Android APK.
- The app is distributed as a direct APK, not through the Google Play Store, as required by the assignment.

## Data use statement

GadPortfolio stores your profile text, skills, photos, and categories only on this device, using AsyncStorage and the app's local document directory. Nothing is uploaded to a server. Removing a photo, skill, or profile image deletes that data from this device. The app works offline; no network connection is required for any core feature.