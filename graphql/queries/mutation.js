import gql from "graphql-tag";

export const createArticle = gql`
  mutation($title: String!, $content: String) {
    articleRemoved: create_article(
      input: { category_id: 1, title: $title, content: $content }
    ) {
      id
      title
      content
      category {
        id
      }
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
