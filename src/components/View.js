import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Article from './Article';
import EditForm from './EditForm';

const View = (props) => {
    const {push} = useHistory()
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

    useEffect(()=> {
        // const token = localStorage.getItem("token");
        axios.get(`http://localhost:5000/api/articles`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(resp => {
            // console.log("articles axios.post resp ", resp.data)
            setArticles(resp.data)
            // push('/login');
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleDelete = (id) => {
        console.log("handleClickDelete id", id)
        axios.delete(`http://localhost:5000/api/articles/${id}`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
        //   console.log("axios.delete")
            setArticles(res.data)//
        })
        .catch(err => {
          console.log(err)
        })
    }

    const handleEdit = (article) => {
        console.log("Veiw#### : handleEdit  article.id = ", article.id )
        // console.log("Veiw#### : handleEdit  ids= ", id )
        
        axios.put(`http://localhost:5000/api/articles/${article.id}`, article,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(res=>{
            // setMovie(res.data);
            console.log("handleEdit axios.put", res)
            setArticles(res.data)//
            setEditing(false)
            push('/view');
        })
        .catch(err => {
            //   console.log("axios.delete")
            // setArticles(res.data)//
          })
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }
    console.log("View")

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;