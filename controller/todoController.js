const mongoose = require('mongoose');
const todoModel = require('../models/todoModel');

//get all todos
const getTodos = async function(req,res){
     try {
        // { createdAt: -1 }  will sort them in descending order
        //  .sort method is used for sorting 
        const allTodos = await todoModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}

//get a single todo
const getSingle = async function(req,res){
    const id = req.params.id;
    try {
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo is not found in records' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Invalid Id" });
    }
}

// post a single todo
const createTodo = async function(req,res){
    // new <ModelName> just creates a new instance of the model
    const newTodo = new todoModel({
        title:req.body.title,
        completed: false
    });

    try {
        const savedTodo = await newTodo.save();
        // 201 - POST request
        res.status(201).json(savedTodo)
    } catch (error) {
        res.status(400).json({error:"Some error occured!"})
    }
}

// update a todo by id
const updateTodo = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true, runValidators: true };

    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(id, updates, options);
        if (!updatedTodo) {
            return res.status(404).json({ message: "No such Todo found" });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delete a todo by id
const deleteTodo = async function(req,res){
    const id = req.params.id;
    try {
        const deletedtodo = await todoModel.findByIdAndDelete(id);
        
        if (!deletedtodo) {
            return res.status(404).json({ message: 'Todo is not found in records' });
        }
        res.status(200).json({message: "Todo is deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Invalid Id" });
    }
}

module.exports = {
    getTodos,
    getSingle,
    createTodo, 
    deleteTodo,
    updateTodo
}