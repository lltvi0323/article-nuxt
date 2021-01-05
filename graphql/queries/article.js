import gql from "graphql-tag";

export const getArticles = gql`
  query {
    articles: get_articles {
      id
      title
      url
      content
      created_at
    }
  }
`;

export const getArticle = gql`
  query($id: ID!) {
    curArticle: get_article(id: $id) {
      id
      title
      content
    }
  }
`;

