# Backend Setup

## Setup

1. `npm install`
2. Datenbank & Prisma-Client einrichten:
   - `npx prisma migrate dev --name init`
   - `npx prisma generate`
3. Server starten: `npm run dev`

## Endpunkte
- POST `/api/v1/users/register` – User registrieren
- POST `/api/v1/users/login` – Login
