import axios from "axios";

const p1: Person = {
  name: "jack",
  age: 18,
};

axios
  .get<any>("/login", {
    params: {
      username: "admin",
    },
  })
  .then((data) => {});
