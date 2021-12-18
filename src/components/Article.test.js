import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
const initialArticle = {
    id:"",
    headline: "",
    author: "",
    summary: "",
    body: ""
};

const testArticle =  {
    id: "xILAV",
    headline: "A Articles",
    createdOn:'2021-12-15T12:09:37-08:00',
    author:"Alex Harris",
    image: '',
    summary: "summary",
    body: "body"   
};

const testArticle1 =  {
    id: "xILAV",
    headline: "A Articles",
    createdOn:'2021-12-15T12:09:37-08:00',
    author:"",
    image: '',
    summary: "summary",
    body: "body"   
};

test('renders component without errors', ()=> {
    render(<Article article={initialArticle}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>);

    const headline = screen.queryByTestId('headline'); 

    expect(headline).toBeInTheDocument();
    expect(headline).toBeTruthy();
    // expect(headline).toHaveTextContent(/headline/i);//err
    expect(headline).toHaveTextContent(/A Articles/i);

    const author = screen.queryByTestId(/author/i); 
    // console.log("author", author)
    expect(author).toBeInTheDocument();
    // expect(author).toBeTruthy();
    expect(author).toHaveTextContent(/Alex Harris/i);
    expect(author).toHaveTextContent(/By Alex Harris/i);
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle1}/>);

    const author = screen.queryByTestId('author'); 

    // console.log("author", author)
    expect(author).toHaveTextContent(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const fakehandleDelete = jest.fn();
    render(<Article article={testArticle1} handleDelete={fakehandleDelete}/>); 

    const button = screen.queryByTestId('deleteButton'); 
    const headline = screen.queryByTestId('headline');  

    userEvent.click(button);
    expect(fakehandleDelete).toBeCalledTimes(1);




});

//Task List: 
//1. Complete all above tests. Create test article data when needed.