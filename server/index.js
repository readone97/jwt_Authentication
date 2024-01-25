const express = require("express")
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const JWT_SECRET = "kjadkjkkewjndlekjdlkewkjs"
const app = express();

app.use(cors());
app.use(bodyParser.json())

const users = [
    {
        username: "admin",
        password: "123456",
        role: "admin"
    },
    {
        username: "abdulkareem umar",
        password: "123456",
        role: "user"
    },
    {
        username: "ridwan abdullateef",
        password: "123456",
        role: "user"
    },
    {
        username: "jamiu abdullateef",
        password: "123456",
        role: "user"
    },
    {
        username: "abdullahi abdullateef",
        password: "123456",
        role: "user"
    },
]

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1d' });
};
const requireAdmin = (req, res, next) => {
    let token = req.header("Authorization")
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Invalid Authentication" })
    }

    try {
        token = token.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role != 'admin') {
            return res.status(403).json({ success: false, message: `Forbidden` });
        }
        const user = users.find((u) => u.username === decoded.id)
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token.' });
    }

    next();
}

app.get('/', (req, res) => {
    return res.send("Hello");
})

app.post("/login", (req, res) => {
    const { username, password } = req.body

    const user = users.find((u => u.username == username))

    if (user) {
        if (user.password == password)
            return res.json({ accessToken: generateToken(user.username, user.role) })
        else
            return res.status(401).json({ message: "invalid password" })
    } else {
        return res.status(404).json({ message: "user not found" })
    }
})

app.get('/users', requireAdmin, (req, res) => {
    return res.json(users);
})

const PORT = 3005
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
