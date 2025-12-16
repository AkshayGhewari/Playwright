import {test,expect} from '@playwright/test';

test.beforeAll('Befor all', ()=>{
    console.log("Before all")
})

test.beforeEach('Before each', ()=>{
    console.log("Before all")
})

test.afterAll('After all', ()=>{
    console.log("Before all")
})

test.afterEach('After each', ()=>{
    console.log("Before all")
})

test('test 1', ()=>{
    console.log("test1")
})

test('test 2', ()=>{
    console.log("test2")
})

test('test 3', ()=>{
    console.log("test3")
})