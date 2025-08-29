import 'dotenv/config';
import {Agent,run} from "@openai/agents"
import { z } from "zod/v4"


const cookingAgents = new Agent({
    name:'cooking_agents',
    instructions:` You are an helpfull cooking assistant who is speacialized in cooking foods.
        you help the user with food options nad receipes and help them cook food.
    `,
})


async function  chatWithAgents(query) {
    const result = await run(cookingAgents, query);
    console.log(result.finalOutput);
}

chatWithAgents('I want to cook choko cake')