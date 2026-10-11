# AI Use Disclosure

Student: Gad Niyibigira
Registration number: 25/26951
Course: SWE 3409 - Mobile Application Development
Assignment: Individual Assignment 2
App: GadPortfolio

## Summary

I used AI assistance during this assignment. I want to be transparent about what was AI-assisted and what I did myself.

## What was AI-assisted

- Code scaffolding and structure - an AI assistant helped me structure the TypeScript project, propose a folder layout, and draft the initial versions of reusable components.
- Debugging - when I hit errors (Expo SDK 57 API changes, a circular import between theme files, a Gradle resource linking failure on EAS Build), the AI helped me diagnose them from the error messages.
- Documentation drafting - the README, UI/UX PDF, and test log were drafted with AI assistance based on my instructions and the actual state of the project.
- Design suggestions - the warm palette (Paper/Ink/Ember/Moss/Gold), the choice of Fraunces and Geist as fonts, and the dark Photography section treatment came out of a design conversation with an AI assistant.

## What I did myself

- All design and content decisions - I chose the app name, the design direction, the projects to include, the skills to list, and what the app should and shouldn't do. The AI gave options; I chose.
- The portfolio content - every skill, project description, and educational entry is real, based on my own work and studies at INES-Ruhengeri. The AI did not invent these; I supplied them.
- Building and testing - I ran every terminal command, installed the APK on my Samsung Galaxy A04e (Android 14), executed all eight device tests, and recorded the demo video myself.
- Reviewing the code - I read through the code the AI helped produce, ran npx tsc --noEmit after every change to catch type errors, and tested each feature on the installed app.
- Responding to failures - when the first APK build failed with a Gradle error, I read the log, pasted it back to the AI, and together we identified that the splash-screen plugin was missing a drawable reference. I made the fix and rebuilt.

## What I take responsibility for

I understand every part of the final application. If asked, I can explain:

- How the navigation is structured (bottom tabs plus a native stack for the project detail screen).
- How AsyncStorage persistence works in src/storage/ and why images are copied into the app's document directory instead of relying on the image-picker cache URI.
- How the validation rules in the Profile Editor work and what field-level messages appear when a rule fails.
- How the mixed-ratio masonry layout in the Photography tab computes each tile's height from the image's real dimensions.
- How the project detail screen receives its parameters through the typed navigation stack.

## What the AI did not do

- It did not invent any project, skill, education entry, or achievement. All portfolio content came from me.
- It did not falsify any test result. The eight PASS results in the test log reflect what actually happened on the installed APK.
- It did not produce the final APK or run the device tests. I did.

## Statement

I am comfortable defending this work. The AI was a tool - like an IDE, a linter, or a search engine - that helped me move faster and catch mistakes. Every decision that matters is mine, and I take responsibility for the final result.

Signed: Gad Niyibigira
Date: 11 October 2026