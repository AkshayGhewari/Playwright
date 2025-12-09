import {test, expect} from '@playwright/test'

test('locators',async({page})=>{

    page.getByRole('heading', {name:'Sign up'});

    page.getByRole('checkbox', { name: 'name', exact:true} );

    page.getByText('Enter email');

    page.getByLabel('labelTag')

    page.getByPlaceholder('Email')

    page.getByAltText('altAttribute') //image

    page.getByTitle('titleAttribute')

    page.getByTestId('test-id-attribute')


})