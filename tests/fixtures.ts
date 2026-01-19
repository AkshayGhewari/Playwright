import {test as base} from '@playwright/test'

type MyFixture = {
    helloWorld: any
}

export const test = base.extend <MyFixture>({
    helloWorld: async ({}, use)=>{
        console.log('hello world!')
        await use()
        console.log('Goodbye!')
    }
})