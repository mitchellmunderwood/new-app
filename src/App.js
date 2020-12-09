import React, { useState } from "react";
import { getArticles } from "./api";
import ArticleList from "./components/articlesList";
import SearchBar from "material-ui-search-bar";
import Container from '@material-ui/core/Container';

function App() {



  const [state, dispatch] = useState({
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: ""})

  const searchForTopic = async topic => {
    try {
      dispatch({ ...state, loading: true });
      const response = await getArticles(topic);
      console.log(response);
      dispatch({ 
        ...state,  
        articles: response.response.docs,
        searchTopic: topic,
        totalResults: 10,
      });
    } catch (error) {
       state.apiError =  "Could not find any articles";
    }
  };

  const stopLoading = () => {
    dispatch({ ...state, loading: false });
  }

    return (    
      <Container className="cardGrid" maxWidth="md">
        <h1 style={{textAlign: "center"}}>News Search</h1>
        <SearchBar 
        
        onChange={(newValue) => {
          state.searchTopic = newValue}}
        onRequestSearch={() => {searchForTopic(state.searchTopic);
        stopLoading();}}
        
        
        />
        <p style={{ textAlign: "center" }}>
          Powered by <a href="https://nytimes.com/">NY Times</a>
        </p>
        {state.loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {state.articles.length > 0 && (
          <h4 style={{ textAlign: "center", margin: 20 }}>
            Found {state.totalResults} articles for "{state.searchTopic}"
          </h4>
        )}
        {state.articles.length > 0 && <ArticleList articles={state.articles} />}
        {state.articles.length === 0 && <p>Could not fetch any articles. Please try again.</p>}
      </Container>
      
    );
  
}

export default App;
