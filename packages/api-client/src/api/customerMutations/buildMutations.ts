/* TODO: Fetch custom client directly, may be using context  */
const resetPasswordByUrlMutation: (context) => any = (context): any => {

  const resetUrl = context.client.graphQLClient.variable('resetUrl', 'URL!');
  const password = context.client.graphQLClient.variable('password', 'String!');

  return context.client.graphQLClient.mutation('customerRecover', [resetUrl, password], (root) => {
    root.add('customerRecover', {args: {resetUrl, password}}, (customer) => {
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const customerAddressDeleteMutation: (context) => any = (context): any => {

  const id = context.client.graphQLClient.variable('id', 'ID!');
  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');

  return context.client.graphQLClient.mutation('customerAddressDelete', [id, customerAccessToken], (root) => {
    root.add('customerAddressDelete', {args: {id, customerAccessToken}}, (customer) => {
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
      customer.add('deletedCustomerAddressId');
    });
  });
};

const customerAddressAddMutation: (context) => any = (context): any => {

  const address = context.client.graphQLClient.variable('address', 'MailingAddressInput!');
  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');

  return context.client.graphQLClient.mutation('customerAddressCreate', [customerAccessToken, address], (root) => {
    root.add('customerAddressCreate', {args: {address, customerAccessToken}}, (customer) => {
      customer.add('customerAddress', (addressInfo) => {
        addressInfo.add('id');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};
const customerAddressUpdateMutation: (context) => any = (context): any => {

  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
  const id = context.client.graphQLClient.variable('id', 'ID!');
  const address = context.client.graphQLClient.variable('address', 'MailingAddressInput!');

  return context.client.graphQLClient.mutation('customerAddressUpdate', [customerAccessToken, id, address], (root) => {
    root.add('customerAddressUpdate', {args: {address, id, customerAccessToken}}, (customer) => {
      customer.add('customerAddress', (addressInfo) => {
        addressInfo.add('id');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const editProfileMutation: (context) => any = (context): any => {
  const customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
  const customer = context.client.graphQLClient.variable('customer', 'CustomerUpdateInput!');

  return context.client.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], (root) => {
    root.add('customerUpdate', {args: {customerAccessToken, customer}}, (customer) => {
      customer.add('customer', (fields) => {
        fields.add('id');
        fields.add('displayName');
        fields.add('email');
        fields.add('firstName');
        fields.add('lastName');
        fields.add('phone');
      });
      customer.add('customerAccessToken', (token) => {
        token.add('accessToken');
        token.add('expiresAt');
      });
      customer.add('customerUserErrors', (error) => {
        error.add('code');
        error.add('field');
        error.add('message');
      });
    });
  });
};

const signInMutation = `mutation customerAccessTokenCreate($email: String!, $password: String!){
    customerAccessTokenCreate(input:{email: $email, password: $password}){
      customerAccessToken{
        accessToken
        expiresAt
      }
      customerUserErrors{
        code
        field
        message
      }
    }
  }`;

const signOutMutation = `mutation customerAccessTokenDelete($customerAccessToken: String!, $password: String!){
    customerAccessTokenDelete(customerAccessToken:$customerAccessToken){
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors{
        field
        message
      }
    }
  }`;

const signUpMutation= `mutation CREATE_CUSTOMER( $input: CustomerCreateInput! ){
	customerCreate(input: $input){
		customer{
      id
    }
    customerUserErrors{
      code
			field
      message
    }
	}
}`;

const forgotPasswordMutation = `mutation RESET_PASSWORD($email: String!){
  customerRecover(email: $email){
    customerUserErrors{
      code
      field
      message
    }
  }
}`;

const changePasswordMutation = `mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
  customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customer {
      id
      firstName
      lastName
      email
      displayName
      acceptsMarketing
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`;

export {
  changePasswordMutation,
  forgotPasswordMutation,
  editProfileMutation,
  signInMutation,
  signOutMutation,
  signUpMutation,
  resetPasswordByUrlMutation,
  customerAddressDeleteMutation,
  customerAddressAddMutation,
  customerAddressUpdateMutation
};
