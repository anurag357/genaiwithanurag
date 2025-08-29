import 'dotenv/config';
import {Agent, tool, run} from '@openai/agents'

let database = [];
const customerSupportAgents = new Agent({
    name:'customer_support_agents',
    instructions:` you are a helpfull customer support agnet`,
})


async function runAgentsWithQuery(query="") {
    const result = await run(customerSupportAgents,
        database.concat({ role:'user', content:query}),
    );
    database = result.history;
    console.log(result.finalOutput);
    console.log('database', database)

}

runAgentsWithQuery('Hey, my name is anurag!').then(()=>{
    runAgentsWithQuery('what is my name?')
});