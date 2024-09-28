import {AttributeType} from "@aws-sdk/client-cognito-identity-provider/dist-types/models/models_0";

function extractCustomAttributes(
    userAttributes: AttributeType[]
): Record<string, string> {
  return userAttributes?.reduce((acc, attribute) => {
    if (attribute.Name.startsWith('custom:')) {
      const key = attribute.Name.replace('custom:', '');
      if (key === 'collectionOrgId') {
        acc["collectionOrganizationId"] = attribute.Value;
      }
      acc[key] = attribute.Value;
    }
    if (attribute.Name === 'email') {
      acc['email'] = attribute.Value;
    }
    if (attribute.Name === 'sub') {
      acc['uid'] = attribute.Value;
    }
    return acc;
  }, {} as Record<string, string>);
}

function removeCustomKeys(dataDecodeToken: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  // Iterate over the object keys
  for (const key in dataDecodeToken) {
    if (dataDecodeToken.hasOwnProperty(key)) {
      if (!key.startsWith('custom:')) {
        result[key] = dataDecodeToken[key];
      }
    }
  }

  return result;
}
export {
  extractCustomAttributes,
  removeCustomKeys
}