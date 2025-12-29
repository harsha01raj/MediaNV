const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const TodoModel = mongoose.model('todo', todoSchema);

module.exports = { TodoModel };