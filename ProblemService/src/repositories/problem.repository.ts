import { IProblem, Problem} from "../models/problem.mode";

export interface IProblemRepository {
    createProblem(problem: Partial<IProblem>): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getAllProblems(): Promise<{problems: IProblem[], total: number}>;
    updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findbyDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
    searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository {
    async createProblem(problem: Partial<IProblem>): Promise<IProblem> {
        const newProblem = await Problem.create(problem);
        return newProblem;
    }
    async getProblemById(id: string): Promise<IProblem | null> {
        return await Problem.findById(id);
    }
    async getAllProblems(): Promise<{problems: IProblem[], total: number}> {
        const problems = await Problem.find().sort({createdAt: -1});
        const total = await Problem.countDocuments();
        return {problems, total};
    }
    async updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null> {
        return await Problem.findByIdAndUpdate(id, updateData, {new: true});
    }
    async deleteProblem(id: string): Promise<boolean> {
        const result = await Problem.findByIdAndDelete(id);
        return result !== null;
    }
    async findbyDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await Problem.find({difficulty});
    }
    async searchProblems(search: string): Promise<IProblem[]> {
        return await Problem.find({$or: [{title: {$regex: search, $options: "i"}}, {description: {$regex: search, $options: "i"}}, {difficulty: {$regex: search, $options: "i"}}, {tags: {$regex: search, $options: "i"}}, {editorial: {$regex: search, $options: "i"}}, {testcases: {$regex: search, $options: "i"}}]});
    }
}
