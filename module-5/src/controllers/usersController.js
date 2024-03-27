import usersService from "../services/usersService.js";
import { parseRequestBody } from "../utils/parseRequestBody.js";

const getUsers = (req, res) => {
  try {
    const users = usersService.getUsers();

    const responseWithLinks = users.map((user) => {
      return {
        user,
        links: {
          self: `/api/users/${user.id}`,
          hobbies: `/api/users/${user.id}/hobbies`,
        },
      };
    });

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-control": "public, max-age=3600",
    });
    res.write(JSON.stringify({ data: responseWithLinks, error: null }));
    res.end();
  } catch (error) {
    res.writeHead(error.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: [], error: error.message }));
    res.end();
  }
};

const createUser = async (req, res) => {
  try {
    const payload = await parseRequestBody(req);
    const createdUser = usersService.createUser(payload);

    const responseWithLinks = {
      user: createdUser,
      links: {
        self: `/api/users/${createdUser.id}`,
        hobbies: `/api/users/${createdUser.id}/hobbies`,
      },
    };

    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: responseWithLinks, error: null }));
    res.end();
  } catch (error) {
    res.writeHead(error.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: {}, error: error.message }));
    res.end();
  }
};

const deleteUser = (req, res) => {
  try {
    usersService.deleteUser(req.url.split("/")[3]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: { success: true }, error: null }));
    res.end();
  } catch (error) {
    res.writeHead(error.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: null, error: error.message }));
    res.end();
  }
};

const getUserHobbies = (req, res) => {
  try {
    const userId = req.url.split("/")[3];
    const userHobbies = usersService.getUserHobbies(userId);

    const responseWithLinks = {
      hobbies: userHobbies,
      links: {
        self: `/api/users/${userId}/hobbies`,
        user: `/api/users/${userId}`,
      },
    };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-control": "private, max-age=3600",
    });
    res.write(JSON.stringify({ data: responseWithLinks, error: null }));
    res.end();
  } catch (error) {
    res.writeHead(error.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: null, error: error.message }));
    res.end();
  }
};

const updateUserHobbies = async (req, res) => {
  try {
    const payload = await parseRequestBody(req);
    const userId = req.url.split("/")[3];
    const hobbies = usersService.updateUserHobbies(userId, payload);

    const responseWithLinks = {
      hobbies,
      links: {
        self: `/api/users/${userId}/hobbies`,
        user: `/api/users/${userId}`,
      },
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: responseWithLinks, error: null }));
    res.end();
  } catch (error) {
    res.writeHead(error.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ data: null, error: error.message }));
    res.end();
  }
};

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUserHobbies,
  getUserHobbies,
};
