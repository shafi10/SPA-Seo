export const createStagedUploadMutation = `
mutation CreateStagedUploadUrl {
  stagedUploadsCreate(input: {
    resource: BULK_MUTATION_VARIABLES,
    filename: "products_update.jsonl",
    mimeType: "text/jsonl",
    httpMethod: POST
  }) {
    stagedTargets {
      url
      resourceUrl
      parameters {
        name
        value
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const bulkOperationMutaion = `
mutation {
  bulkOperationRunMutation(
    mutation: """
      mutation FileUpdate($input: [FileUpdateInput!]!) {
        fileUpdate(files: $input) {
          userErrors {
            code
            field
            message
          }
          files {
            alt
          }
        }
      }
    """
    stagedUploadPath: "tmp/83475562783/bulk/38299101-3916-4ac9-a842-2d0713fdc332/products_update.jsonl"
  ) {
    bulkOperation {
      id
      status
    }
    userErrors {
      message
      field
    }
  }
}
`;
