    // Set the focus to the input box
    document.getElementById("person1-input").focus();
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:4dcf5868-c448-449d-8df1-46f65eab8577',
    });
    // Define and initialize lexruntime values
    var lexruntime = new AWS.LexRuntime();
    var lexUserId = 'chatbot-demo' + Date.now();
    var sessionAttributes = {};