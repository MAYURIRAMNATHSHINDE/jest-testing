const mongoose = require("mongoose");


beforeAll(async () => {
    
   await mongoose.connect(process.env.MONGO_URI)
});

afterAll(async () => {
    
    await mongoose.connection.close();
  
});

describe("Auth Routes", () => {
    test("should register a new user successfully", async () => {
        const res = await request(app).post("/user/add-user").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
    });

    

    test("should login with valid credentials", async () => {
        await request(app).post("/user/login").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

   

    it("should block access to protected routes without a token", async () => {
        const res = await request(app).get("/api/todos");

        expect(res.statusCode).toBe(401);
    });
});
