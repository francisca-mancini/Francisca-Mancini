import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import collectionIntroParser from '../../../helpers/collectionIntroParser';

function CollectionIntro({ data }) {
  const collection = data.shop.collections.edges[0].node;
  const description = collectionIntroParser(collection.description, collection.descriptionHtml);

  return (
    <div>
      <h2>{collection.title}</h2>
      <div>{collection.description}</div>
    </div>
  )
}

const query = gql`
  query query {
    shop {
      collections(first: 10) {
        edges {
          node { 
            description
            descriptionHtml
            title
          }
        }
      }
    }
  }
`;

const CollectionIntroWithData = compose(
  graphql(query)
)(CollectionIntro);

export default CollectionIntroWithData;