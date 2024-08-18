// import fs from 'node:fs';

import { DasAuge } from "./providers/DasAuge"

// const test = fs.readFileSync('./dist/dasAuge.html', 'utf-8')

const request = (block: ()=>void)=>{
    block()
}
request(async ()=>{
    await new DasAuge().request("")
})