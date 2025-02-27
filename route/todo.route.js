const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const todoRoute=express.Router()

todoRoute.post("/", authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.create({ user: req.user.userId, title: req.body.title });
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


todoRoute.get("/", authMiddleware, async (req, res) => {
    const todos = await Todo.find({ user: req.user.userId });
    res.json(todos);
});


todoRoute.put("/:id", authMiddleware,async (req, res) => {
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        { completed: req.body.completed },
        { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json(todo);
})


todoRoute.delete("/:id", authMiddleware, async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted" });
});



module.exports={todoRoute}