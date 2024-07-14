# AlgoArena
## An Online coding judge to solve DSA problems

## About Project

- The project is divided into two parts `frontend` and `backend`
- `Frontend` is written in modern React, only functional components with hooks.
- Developed UI using customizable components of [shadcn/ui](https://ui.shadcn.com/docs/components/select) and added [Recoil.js](https://recoiljs.org/) for state management
- Used Vite for optimised build and reduced bundle size
- `Backend` is written using Typescript utilizing [NodeJS](https://nodejs.org/) and [Express](https://expressjs.com/)
- Followed [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and used [SOLID principles](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- Used [DrizzleORM](https://orm.drizzle.team/) to query and mutate Postgres DB.
- Deployed into [Oracle Cloud Servers](https://www.oracle.com/in/cloud/) using [Coolify](https://coolify.io/) for self-hosting.

## Running the project locally

- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `algoarena`.
- Clone the repository `git clone git@github.com:Subrahmanyam-B/online-judge.git`
- Create an `.env` files in both `online-judge/frontend` and `online-judge/backend` folders.
- In `online-judge/frontend/.env` add
```bash
VITE_API_URL = 'http://localhost:9000'
```

- In `online-judge/backend/.env` add
```bash
DB_URL = 'postgresDB_URL'
REFRESH_TOKEN_SECRET = 'random'
ACCESS_TOKEN_SECRET = 'random'
```

- `cd backend && npm i && npm run dev`
- `cd ../frontend && npm i && npm run dev`
- App should now be running on `http://localhost:8080/`

## Contributing

Fork the repository and create PR if you have done any fixes or improvements. [contributing guideines (will be added soon.)]()
