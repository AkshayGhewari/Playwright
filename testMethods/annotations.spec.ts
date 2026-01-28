//Annotation

//test.only
//test.skip()- skips the test case
//test.fail()- runs the test case and marks the test as failing
//test.fixme()- marks the test as failing but does not run this
//test.slow()- marks as a slow test and triples test timeout

//test.describe()- providing global test title
//test.describe.configure()- configuration at file level----//timeout, mode, retries
//test.step('title of the step')


import {test, expect} from '@playwright/test';

test.describe.configure({mode:'parallel', retries:2, timeout:10000})

test.describe('Annotations tests', async function(){

test('test1', ({page})=>{
    test.step('login into app', async()=>{
        console.log('login');
    })
    test.step('enter creds', async()=>{
        console.log('enter creds');
    })
    test.step('validate login', async()=>{
        console.log('validate login');
    })
    
})

test.fail('test2', ({})=>{
    console.log('test2');
})

test.fixme('test3', ({})=>{
    console.log('test3')
})

test.skip('test4', ({})=>{
    test.slow()
    console.log('test4')
})

test('test5',{tag: '@smoke'}, ({})=>{
    console.log('test5')
})

test('test6',{tag: ['@smoke', '@regression']}, ({page})=>{
    console.log('test6')
})

})

