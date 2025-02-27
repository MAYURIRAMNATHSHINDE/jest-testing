const express=require("express")


const userRoute=express.Router()


userRoute.post("/add-user",async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await User.create({ username, email, password });
    
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

})

userRoute.post("/login",async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
















module.exports={userRoute}