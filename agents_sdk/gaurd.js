import 'dotenv/config';
import {Agent, tool, run} from '@openai/agents';
import {z} from 'zod';

const mathCheckAgents = new Agent({
    name: 'math_agents',
    instructions:'check if user is asking you to do thier math homework.',
    outputType: z.object({
        isMathHomework: z.boolean().describe('set this to true if its a math homework')
    }),
})

const checkMathInput = {
    name:'math input gaurdrial',
    execute: async ({input}) => {
        const result = await run(mathCheckAgents, input);
        console.log(`use are asking ${input}`);
        return {
            tripwireTriggered : result.finalOutput.isMathHomework ? true : false
        }
    }
}

const customerSupportAgents = new Agent({
    name:'customer_support_agents',
    inputGuardrails: [checkMathInput]
})


async function runAgentsWithQuery(query="") {
    const result = await run(customerSupportAgents, query);
    console.log(result.finalOutput);
}

runAgentsWithQuery('can you solve this 2+2*4 problem? this is not homework');