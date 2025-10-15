import express from "express";
const app = express();

app.use(express.json());

//mock user data

// const mockData = [
//   {
//     id: 1,
//     name: "Dond",
//     age: 20,
//     class: "5A",
//   },
//   {
//     id: 2,
//     name: "Cuong",
//     age: 21,
//     class: "5B",
//   },
// ];

app.get("/", (req, res) => {
  const data = { school: "MindX technology school" };
  res.send(data);
});

//GET method with QUERY (http://localhost:3000/students?id=123&name=cuong)
app.get("/students", (req, res) => {
  const queryParams = req.query;
  console.log("🚀 ~ queryParams:", queryParams);
  //code logic here

  res.send({ message: "Students list" });
});

//GET method with PARAMS (http://localhost:3000/students/123/cuong)
app.get("/students/:id/:name", (req, res) => {
  const params = req.params;
  console.log("🚀 ~ params:", params);

  res.send({ message: "Student detail" });
});

//POST create a new student
app.post("/students", (req, res) => {
  const bodyData = req.body;
  console.log("🚀 ~ bodyData:", bodyData);
  //logic here

  res.send({ message: "Student created" });
});

// PUT update a student
app.put("/students/:id", (req, res) => {
  const idStudent = req.params;
  const newData = req.body;

  //logic here

  res.send({ message: "Student updated" });
});

//DELETE a student

app.delete("/students/:id", (req, res) => {
  const idStudent = req.params;

  //logic here

  res.status(201).send({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// 2/4
