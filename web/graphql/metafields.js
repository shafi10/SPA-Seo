const SHOP_NAME_SPACE = "bs-23-seo-app";
const SHOP_META_FIELD_KEY = "json-ld";

export const GetShopId = `
    query GetShopId {
        shop {
            id
        }
    }`;

export const GetShopMetafield = `
    query GetShopMetafield {
        shop {
            metafield(key: "${SHOP_META_FIELD_KEY}", namespace: "${SHOP_NAME_SPACE}") {
                id
                namespace
                key
                value
            }      
        }
    }`;

export const CheckShopMetafieldDefinition = (type) => `
    query CheckShopMetafieldDefinition {
        metafieldDefinitions( 
            first: 1, 
            namespace: "${SHOP_NAME_SPACE}", 
            key: "${SHOP_META_FIELD_KEY}", 
            ownerType: ${type}
        ) {
            edges {
                node {
                    id
                    name
                    namespace
                    key
                }
            }
        }
    }`;

export const CreateShopMetafieldDefinition = (type) => `
        mutation CreateShopMetafieldDefinition {
            metafieldDefinitionCreate(definition: {
                namespace: "${SHOP_NAME_SPACE}",
                key: "${SHOP_META_FIELD_KEY}",
                type: "json",
                name: "SEO app metafield",
                description: "Metafield for generating json-ld for SEO",
                ownerType: ${type}
            }) {
                createdDefinition {
                    id
                    name
                }
                userErrors {
                    field
                    message
                    code
                }
            }
        }`;

export const SetShopMetafield = `
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
        id
        key
        namespace
        value
    }
    userErrors {
      field
      message
      code
    }
  }
}
`;
