import http from "http";

const app = http.createServer((request, response) => {
  const endPoint = request.url;

  const listStudent = [
    {
      id: 1,
      fullName: "Jackie",
      age: 5,
      class: "5A",
    },
    {
      id: 2,
      fullName: "Juli MTP",
      age: 5,
      class: "5A",
    },
    {
      id: 3,
      fullName: "Denis",
      age: 5,
      class: "5B",
    },
  ];

  if (endPoint === "/login") {
    return response.end(JSON.stringify({ message: "Login successful" }));
  }

  if (endPoint === "/register") {
    return response.end(JSON.stringify({ message: "Register successful" }));
  }

  if (endPoint === "/students") {
    return response.end(JSON.stringify(listStudent));
  }

  return response.end(JSON.stringify({ school: "MindX Technology" }));
});

app.listen(8080, () => {
  console.log("Server is running!");
});

// C U R D

// C: Create : POST
// R: Read : GET
// U: Update : PUT
// D: Delete : DELETE
