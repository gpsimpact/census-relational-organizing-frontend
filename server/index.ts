import * as express from "express";
import * as next from "next";
import { AdminPaths, TeamPaths } from '../paths';

const PORT = process.env.PORT || 5000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.set('trust proxy', 1);

    server.get(`${AdminPaths.teams.detail}/:teamSlug`, (req, res) => {
      const actualPage = '/a/teams/detail';
      const queryParams = { teamSlug: req.params.teamSlug};
      app.render(req, res, actualPage, queryParams);
    })

    server.get(`${TeamPaths.index}/:teamSlug`, (req, res) => {
      const actualPage = '/t/home';
      const queryParams = { teamSlug: req.params.teamSlug };
      app.render(req, res, actualPage, queryParams);
    })

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
