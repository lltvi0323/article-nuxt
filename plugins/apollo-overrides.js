const apolloOverrides = ({ app }) => {
  app.apolloProvider.defaultClient.defaultOptions = {
    query: {
      fetchPolicy: "no-cache"
    }
  };
};

export default apolloOverrides;
