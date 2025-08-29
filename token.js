import {Tiktoken} from 'js-tiktoken/lite'
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);
const userQuery = 'Hey there, Im a Anurag!';

const tokens = enc.encode(userQuery);

console.log("Tokens==>>",tokens)

const inputTokens = [
    25216, 1354,   11,
     3133,  261, 1689,
      330,  348,    0
  ];

const decoded = enc.decode(inputTokens);
console.log("InputDecoded==>>", decoded)

function pridictNextToken(tokens){
    return 6677;
}

while(true){
    const nextToken = pridictNextToken(tokens)
    if(nextToken === END) break;
    tokens.push(nextToken);
}