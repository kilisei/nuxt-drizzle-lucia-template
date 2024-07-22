# Project Setup

This guide will help you set up and run the project with the following tech stack:

- Lucia
- Drizzle
- Nuxt 3.12
- VueUse
- Vee-Validate
- Radix UI
- Tailwind CSS
- Nuxt Fonts
- tRPC / tRPC-Nuxt
- ESLint
- Antfu ESLint Config
- ESLint Formatter

## Prerequisites

Make sure you have the following installed:

- Docker
- pnpm

## Setup Instructions

Follow these steps to set up and run the project:

1. **Start the Database**

   You can use Docker to start your database:

   ```sh
   docker compose up
   ```

   Alternatively, you can start your own database if you prefer.

2. **Install Dependencies**

   Install the project dependencies using pnpm:

   ```sh
   pnpm i
   ```

3. **Generate Necessary Files**

   Run the following command to generate any necessary files or configurations:

   ```sh
   pnpm generate
   ```

4. **Push to the Database**

   Push the generated files or configurations to your database:

   ```sh
   pnpm push
   ```

5. **Start the Development Server**

   Finally, start the development server:

   ```sh
   pnpm dev
   ```

## Project Structure

- **Lucia**: Authentication library
- **Drizzle**: ORM for database interactions
- **Nuxt 3.12**: Vue.js framework for building modern web applications
- **VueUse**: Collection of essential Vue Composition Utilities
- **Vee-Validate**: Form validation library for Vue.js
- **Radix UI**: Primitives for building accessible, high-quality UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Nuxt Fonts**: Module for easily using custom fonts in Nuxt projects
- **tRPC / tRPC-Nuxt**: End-to-end typesafe APIs for full-stack applications
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript
- **Antfu ESLint Config**: ESLint configuration by Anthony Fu
- **ESLint Formatter**: Formatter for ESLint output

and yes chatgpt wrote this
