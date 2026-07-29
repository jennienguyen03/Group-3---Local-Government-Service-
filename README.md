# Smart Civic — Local Government Service Request Portal

Starter project for the Smart Civic app (COMP 3018, Group 3).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma ORM
- PostgreSQL (hosted on Neon)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your database (Neon)

1. Go to [neon.tech](https://neon.tech) and create a free account.
2. Create a new project (e.g. "smart-civic").
3. In the Neon dashboard, go to **Connection Details** and copy the **pooled connection string**.
4. Open the `.env` file in this project and replace the placeholder with your real connection string:

```
DATABASE_URL="postgresql://<user>:<password>@<host>/<dbname>?sslmode=require"
```

Each teammate should use their own `.env` (it's already in `.gitignore`, so it won't be committed) — either share one Neon project's connection string as a team, or each set up your own for local dev.

### 3. Push the schema to your database

```bash
npx prisma generate
npx prisma db push
```

This creates the `users`, `issues`, `issues_history`, and `attachments` tables in your Neon database based on `prisma/schema.prisma`.

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) — you should see the Smart Civic homepage. It will show "No issues reported yet" until you add some data.

### 5. (Optional) Browse your data visually

```bash
npm run db:studio
```

Opens Prisma Studio in your browser — a simple UI to view/add/edit rows in your database without writing SQL.

## Project structure

```
prisma/
  schema.prisma       # Database schema: User, Issue, IssueHistory, Attachment
src/
  server/
    db.ts             # Prisma client (import `db` anywhere to query the database)
  app/
    page.tsx           # Homepage — lists recent issues
```

## Database schema overview

| Table | Purpose |
|---|---|
| `users` | Residents, staff, and admins. Has a `role` field for role-based permissions. |
| `issues` | Core reported issues — title, description, type, status, location, who reported/is assigned. |
| `issues_history` | Log of status changes over time for each issue. |
| `attachments` | Photos/files linked to an issue. |

## Next steps (suggested build order)

1. Add a "Report an issue" form (resident-facing) — insert into `issues` table.
2. Add authentication (e.g. NextAuth.js) so `role` actually restricts access.
3. Add a staff dashboard — list/filter/assign issues.
4. Add the interactive map (Leaflet + OpenStreetMap) to visualise issue locations.
5. Add duplicate detection logic (check nearby issues of same type before creating a new one).
6. Add email notifications on status change (SendGrid/Twilio).
