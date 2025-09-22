
import mongoose from 'mongoose';

export interface ITestcase {
    input: string;
    output: string;
}

export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    createdAt: Date;
    updatedAt: Date;
    editorial?: string;
    testcases: ITestcase[];  
}

const testcaseSchema = new mongoose.Schema<ITestcase>({
    input: {
        type: String,
        required: [true, "Input is required"],
        trim: true,
    },
    output: {
        type: String,
        required: [true, "Output is required"],
        trim: true,
    },
},
{
    // _id: false, can be enabled or not
}
);

const problemSchema = new mongoose.Schema<IProblem>({

    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title must be less than 100 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    difficulty: {
        type: String,
        required: [true, "Difficulty is required"],
        enum:{
            values: ["easy", "medium", "hard"],
            message: "Difficulty must be easy, medium or hard",
        },
        default: "easy",
       
    },
    editorial: {
        type: String,
        trim: true,
    },  
    testcases: [testcaseSchema],
    
},

{
    timestamps: true,
});

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);