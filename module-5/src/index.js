import http from "http";
import usersController from "./controllers/usersController.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/api/users":
          return usersController.getUsers(req, res);
        case url.match(/^\/api\/users\/[^\/]+\/hobbies$/)?.input:
          return usersController.getUserHobbies(req, res);
      }
    case "POST":
      switch (url) {
        case "/api/users":
          return usersController.createUser(req, res);
      }
    case "DELETE":
      switch (url) {
        case url.match(/^\/api\/users\/[^\/]+$/)?.input:
          return usersController.deleteUser(req, res);
      }
    case "PATCH":
      switch (url) {
        case url.match(/^\/api\/users\/[^\/]+\/hobbies$/)?.input:
          return usersController.updateUserHobbies(req, res);
      }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
