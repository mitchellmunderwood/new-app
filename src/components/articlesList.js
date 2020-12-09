import React from "react";
import Grid from '@material-ui/core/Grid';
import ArticleCard from "./ArticleCard/index";

const ArticleList = props => {
  return (
    <Grid container spacing={4}>
      {props.articles.map((article, index) => (
        <ArticleCard article={article} key={article.title + index} />
      ))}
      </Grid>

  );
};

export default ArticleList;
