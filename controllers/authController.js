const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'kanzu123';

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users..', details: error.message });
    }
};


const register = async (req, res) => {
    const { username, password, email } = req.body;
    console.log('Request body:', req.body);

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, password: hashedPassword, email },
        });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        // console.log(user);
        // console.log(user.password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials..' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials..' });
        }

        // if (password !== user.password) {
        //     return res.status(401).json({ error: 'Invalid credentials..' });
        // }

        // Create and send a token as a response
        const token = jwt.sign({ userId: user.id, userRole: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

module.exports = { getUsers, register, login };