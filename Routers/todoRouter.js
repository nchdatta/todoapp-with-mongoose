const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../Schemas/todoSchema');
const todoRouter = express.Router();
const Todo = mongoose.model('Todo', todoSchema);


// Get all todos 
todoRouter.get('/all', async (req, res) => {
    try {
        const query = {};
        const projection = { _id: 1, __v: 0 };
        const result = await Todo.find(query, projection);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Authentication failed.');
    }
})

// Get by id 
todoRouter.get('/:id', async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const projection = { _id: 1, __v: 0 };
        const result = await Todo.findOne(query, projection);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Authentication failed.');
    }
})

// Post a todo 
todoRouter.post('/', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        const result = await todo.save();
        // console.log(result);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Authentication failed.');
    }
})

// update a todo 
todoRouter.put('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Authentication failed.');
    }
})

// Delete a todo
todoRouter.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).send('Authentication failed.');
    }
})

module.exports = todoRouter;

