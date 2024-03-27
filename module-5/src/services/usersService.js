import { randomUUID } from "crypto";
import fs from "fs";

const readFromDatabase = () => {
  try {
    return JSON.parse(
      fs.readFileSync(new URL("../database/db.json", import.meta.url))
    );
  } catch {
    throw {
      status: 503,
      message: `Error on reading data from the database`,
    };
  }
};

const writeToDatabase = (DB) => {
  try {
    fs.writeFileSync(
      new URL("../database/db.json", import.meta.url),
      JSON.stringify(DB)
    );
  } catch {
    throw {
      status: 503,
      message: `Error on writing data in the database`,
    };
  }
};

const getUsers = () => {
  const DB = readFromDatabase();
  return DB.users.map(({ name, email, id }) => {
    return { name, email, id };
  });
};

const createUser = (user) => {
  const DB = readFromDatabase();
  const userWithId = { ...user, id: randomUUID() };
  DB.users.push(userWithId);

  writeToDatabase(DB);
  return userWithId;
};

const deleteUser = (id) => {
  const DB = readFromDatabase();
  const indexForDeletion = DB.users.findIndex((user) => user.id === id);

  if (indexForDeletion === -1) {
    throw {
      status: 404,
      message: `User with id ${id} doesn't exist`,
    };
  }
  DB.users.splice(indexForDeletion, 1);

  writeToDatabase(DB);
};

const getUserHobbies = (id) => {
  const DB = readFromDatabase();
  const userIndex = DB.users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    throw {
      status: 404,
      message: `User with id ${id} doesn't exist`,
    };
  }

  return DB.users[userIndex].hobbies || [];
};

const updateUserHobbies = (id, payload) => {
  const DB = readFromDatabase();
  const userIndex = DB.users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    throw {
      status: 404,
      message: `User with provided id doesn't exist`,
    };
  }

  const hobbies = [...(DB.users[userIndex].hobbies || []), ...payload.hobbies];
  const uniqHobbies = [...new Set(hobbies)];

  DB.users[userIndex].hobbies = uniqHobbies;
  writeToDatabase(DB);

  return uniqHobbies;
};

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUserHobbies,
  getUserHobbies,
};
