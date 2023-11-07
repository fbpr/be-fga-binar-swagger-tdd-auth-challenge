const request = require("supertest");
const app = require("../"); 

describe("Transactions API Tests", () => {
  it("should respond a list of all transactions data", async () => {
      const response = await request(app).get("/api/v1/transactions");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('success');
      expect(response.body.data).toBeTruthy();
      expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should get a specific transaction by ID (Positive Testing)", async () => {
      const transactionId = 1; // Replace with an existing transaction ID

      const response = await request(app).get(
        `/api/v1/transactions/${transactionId}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe(200);
      expect(response.body.data).toBeTruthy();
      ['id', 'source_account_id', 'destination_account_id', 'amount', 'createdAt'].forEach((prop) =>
        expect(response.body.data).toHaveProperty(prop)
      );
  });
  // Negative Testing
  it("should add a new transaction", async () => {
      const newTransaction = {
        "source_account_id": 1,
        "destination_account_id": 8,
        "amount": 2000
    }; 

      const response = await request(app).post(
        `/api/v1/transactions`
      ).send(newTransaction);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe('success');
      expect(response.body.data).toBeTruthy();
      expect(response.body.data).toHaveProperty('id');
  });
});