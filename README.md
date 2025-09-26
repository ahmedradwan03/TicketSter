# 🎟️ TicketSter – Fullstack Ticket Booking Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socket.io&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat&logo=opensourceinitiative&logoColor=white"/>
</p>


## Overview

**TicketSter** is a full-stack ticket booking platform built with **Next.js, TypeScript, Prisma, and PostgreSQL**.

Users can browse matches, book tickets, and pay securely, while administrators can manage stadiums, teams, matches, and ticket sales through an intuitive dashboard.

**Key Features:**

- Authentication and role-based access control (User / Admin)
- Stadium and team management (CRUD)
- Match scheduling with categories, gates, and pricing
- Ticket booking with availability control
- Secure payments powered by Stripe
- Cloudinary integration for team and stadium images
- Real-time updates and notifications with Socket.IO
- Clean UI with TailwindCSS

---

## Tech Stack

- **Framework:** Next.js (React 18 + App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Payments:** Stripe
- **File Uploads:** Cloudinary
- **Real-Time:** Socket.IO
- **Styling:** TailwindCSS
- **Other:** ts-node, ESLint, React Icons

---

## Features

- 🔑 User signup, login, logout
- 👤 Role-based access: Admin / User
- 🏟️ Stadium management (CRUD with location, capacity)
- ⚽ Team management (CRUD, images, country)
- 📅 Match creation (teams, stadium, categories, gates, price)
- 🎟️ Ticket categories (CAT1, CAT2, CAT3) with availability tracking
- 💳 Stripe payment integration for secure checkout
- 🔔 Real-time updates (e.g., ticket availability) via Socket.IO
- 📊 Admin dashboard to manage bookings, users, matches

---

## Project Structure

```bash
TicketSter/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── matches/
│   │   │   ├── stadiums/
│   │   │   ├── teams/
│   │   │   └── users/
│   │   │
│   │   ├── lib/
│   │   │   ├── dtos/
│   │   │   ├── fetcher.ts
│   │   │   └── utils/
│   │   │
│   │   └──
│   │
│   └── components/
│
├── public/
│
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

```

---

## Installation & Setup

### Clone & Navigate

```bash
git clone https://github.com/ahmedradwan03/TicketSter.git
cd ticketster
```

### Install Dependencies

```bash
npm install
```

### Database & Migrations

```bash
npx prisma migrate dev
npx prisma db seed
```

### Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file with:

```
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/ticketster?schema=public"

# App
SITE_DOMAIN=http://localhost:3000
SITE_NAME="TicketSter"
SESSION_SECRET="your_session_secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## API Modules & Endpoints

### 1. **Auth**

- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login user
- `POST /api/auth/logout` – Logout user

### 2. **Users**

- `GET /api/users` – Get all users (Admin only)
- `GET /api/users/:id` – Get user details
- `PUT /api/users/:id/adminRole` – Promote user to Admin
- `PUT /api/users/:id/deactivate` – Deactivate user

### 3. **Stadiums**

- `GET /api/stadiums` – List all stadiums
- `POST /api/stadiums` – Create stadium (Admin)
- `PATCH /api/stadiums/:id` – Update stadium (Admin)
- `DELETE /api/stadiums/:id` – Delete stadium (Admin)

### 4. **Teams**

- `GET /api/teams` – List all teams
- `POST /api/teams` – Create team (Admin)
- `PATCH /api/teams/:id` – Update team (Admin)
- `DELETE /api/teams/:id` – Delete team (Admin)

### 5. **Matches**

- `GET /api/matches` – List all matches
- `GET /api/matches/:id` – Match details
- `POST /api/matches` – Create match (Admin)
- `PATCH /api/matches/:id` – Update match (Admin)
- `DELETE /api/matches/:id` – Delete match (Admin)

### 6. **Bookings**

- `POST /api/booking` – Create booking (with Stripe payment)

---

## **Contributing**

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push (`git push origin feature/new`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.
