import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    isAdmin: true,
  },
  {
    name: "Sai Teja",
    email: "sai@gmail.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "Srija",
    email: "srija@gmail.com",
    password: "123456",
    isAdmin: true,
  },
  {
    name: "Rohan",
    email: "rohan@gmail.com",
    password: "123456",
    isAdmin: true,
  },
];

export default users;
