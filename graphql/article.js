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
      url
    }
  }
`;

export const createArticle = gql`
  mutation($input: ArticleInput_Create!) {
    create_article(input: $input){
      id
      url
      title
    }
  }
`;

export const removeArticle = gql`
  mutation($id: ID!) {
    remove_article(id: $id)
  }
`;

export const updateArticle = gql`
  mutation($id: ID!, $input: ArticleInput_Update!) {
    isUpdated: update_article(id: $id, input: $input)
  }
`;
