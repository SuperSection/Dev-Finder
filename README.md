# DevFinder Web App
For pair programming with random developers online in video call rooms.

## You can get started with:

First, clone this github repo:

```bash
git clone https://github.com/SuperSection/dev-finder.git
cd dev-finder
```

Run the docker image:

```bash
docker compose up
```

Push the defined schema to the drizzle database:

```bash
npm run db:push
```

Then, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can have access to the database in drizzle studio

```bash
npm run db:studio
```
Open [https://local.drizzle.studio](https://local.drizzle.studio) with your browser to see the result.

---

You can also contribute and give suggestions or add features into this project, I'd love to get feedbacks or thoughts regarding this project.

Check out the live [DevFinder](https://dev-finder.up.railway.app) web application. It's deployed on [railway.app](https://railway.app).

---
## Features of the Application
- Google OAuth implemented using NextAuth and Google Dev Console
- Create Room (as Public or Private): Provide name, description, tags, github repo, and if private then password is required for the room.
- Tags based searching - which can be programming language, library, framework, or any tech stack
- User can Edit or Delete their own room
- Join any public room or private room with password
- Video and Voice call with screen sharing implemented using [getstream.io](https://getstream.io)
- User can delete their own account

## Tech Stack used:
- [Nextjs](https://nextjs.org)
- TailwindCSS
- [shadcn-ui](https://ui.shadcn.com/)
- [DrizzleORM](https://orm.drizzle.team)
- PostgreSQL setup with Docker
- [getstream.io](https://getstream.io)
- For Deployment: [railway.app](https://railway.app)
