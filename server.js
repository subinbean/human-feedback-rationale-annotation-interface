const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const Question = require("./schema.js");

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(cors());
app.use(express.static("build"));

// routes
// app.get('/api/questions', (request, response) => {
//     Question.find({}).then(questions => {
//         response.json(questions)
//     })
// })

// route redirection for react router
app.get("/questions", (request, response) => {
    response.sendFile(path.join(__dirname, "/build/index.html"));
});

// get all questions and claim data from a specific annotator (given an id)
app.get("/api/questions/:annotator_id", (request, response) => {
    Question.findOne({ assigned: false })
        .then((question) => {
            Question.findByIdAndUpdate(question._id, {
                $set: {
                    assigned: true,
                    annotator_id: request.params.annotator_id,
                },
            })
                .then((result) => response.json(result))
                .catch((error) => response.json(error));
        })
        .catch((error) => response.json(error));
});

// complete question
app.patch("/api/annotate/question/:question_id", (request, response) => {
    const body = request.body;
    Question.findByIdAndUpdate(request.params.question_id, {
        $set: { completed: body.completed },
    })
        .then((question) => {
            response.json(question);
        })
        .catch((error) => response.json(error));
});

// annotate claim
app.patch(
    "/api/annotate/question/:question_id/rationale/:rationale_id",
    (request, response) => {
        const key = `rationales.${request.params.rationale_id}`;
        const body = request.body;
        Question.findByIdAndUpdate(request.params.question_id, {
            $set: {
                [key + ".sufficiency"]: body.sufficiency,
                [key + ".faithfulness"]: body.faithfulness,
                [key + ".predicted_answer_correct"]:
                    body.predicted_answer_correct,
                [key + ".nl_feedback_error"]: body.nl_feedback_error,
                [key + ".nl_feedback_fix"]: body.nl_feedback_fix,
                [key + ".feedback_ease"]: body.feedback_ease,
                [key + ".time_taken"]: body.time_taken,
            },
        })
            .then((question) => {
                response.json(question);
            })
            .catch((error) => response.json(error));
    }
);

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
