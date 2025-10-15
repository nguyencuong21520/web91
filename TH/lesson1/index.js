import http from "http";
import { customers, orders } from "./data.js";

const app = http.createServer((request, response) => {
  const endPoint = request.url;
  const splitEndPoint = endPoint.split("/");
  console.log("🚀 ~ splitEndPoint:", splitEndPoint);

  // Bài 1
  if (endPoint === "/customers") {
    return response.end(JSON.stringify(customers));
  }

  // Bài 2: /customers/:customerId
  if (splitEndPoint[1] === "customers" && splitEndPoint.length === 3) {
    const customerId = endPoint.split("/")[2];

    const customer = customers.find((customer) => customer.id === customerId);
    if (customer) {
      return response.end(JSON.stringify(customer));
    }
    return response.end(JSON.stringify({ message: "Customer not found" }));
  }

  //Bài 3: Endpoint: /customers/:customerId/orders

  if (splitEndPoint[1] === "customers" && splitEndPoint[3] === "orders") {
    const customerId = endPoint.split("/")[2];

    const ordersResult = orders.filter(
      (order) => order.customerId === customerId
    );

    if (ordersResult.length > 0) {
      return response.end(JSON.stringify(ordersResult));
    }
    return response.end(JSON.stringify({ message: "Orders not found" }));
  }

  //Bài 4: Endpoint: /orders/highvalue
  if (endPoint === "/orders/highvalue") {
    const highValueOrders = orders.filter(
      (order) => order.totalPrice > 9000000
    );
    return response.end(JSON.stringify(highValueOrders));
  }

  return response.end(
    JSON.stringify({ message: "Hello! Server is running now" })
  );
});

app.listen(8080, () => {
  console.log("Server is running!");
});
