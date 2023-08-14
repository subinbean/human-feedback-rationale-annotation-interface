const mongoose = require("mongoose");

const rationale = new mongoose.Schema({
    rationale_string: String,
    rationale_format: String,
    predicted_answer: String,
    sufficiency: String,
    faithfulness: String,
    predicted_answer_correct: String,
    nl_feedback_error: String,
    nl_feedback_fix: String,
    feedback_ease: String,
    interpretability: String,
    trustworthiness: String,
    time_taken: Number,
});

const question = new mongoose.Schema({
    completed: Boolean,
    assigned: Boolean,
    data_source: String,
    context: String,
    question: String,
    reference_answer: String,
    annotator_id: String,
    comments: String,
    rationales: [rationale],
});

module.exports = mongoose.model("Question", question, "quoref-incorrect");
