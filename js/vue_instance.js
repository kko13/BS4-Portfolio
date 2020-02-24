var vm = new Vue({
    el: '#app',
    data: {
      userMessage: '',
      andyMessage: '',
      messages: []
    },
    updated() {
      this.$nextTick(() => {
        let messageDisplay = vm.$refs.chatArea
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      })
    },
    methods: {
        sendMessage(direction) {
            var _this = this
            if (!this.userMessage && !this.andyMessage) {
              return
            }
            if (direction === 'out') {
              this.messages.push({
                body: this.andyMessage,
                author: 'andy'
              })
              this.andyMessage = ''
            } else if (direction === 'in') {
              this.messages.push({
                body: this.userMessage,
                author: 'user'
              })
              // Capture input text and disable input form
              var inputBox = document.getElementById('person1-input');
              var userInput = this.userMessage;
              inputBox.value = '';
              inputBox.disabled = true;
      
              // Define parameters required for postText call
              var params = {
                botAlias: 'dev',
                botName: 'PortfolioBot',
                inputText: userInput,
                userId: lexUserId,
                sessionAttributes: sessionAttributes
              };
      
              // Call postText to send message to lex and receive response
              lexruntime.postText(params, function (err, data) {
                if (err) {
                  console.log(err, err.stack);
                }
                if (data) {
                  // capture the sessionAttributes for the next cycle
                  sessionAttributes = data.sessionAttributes;
                  // show response and/or error/dialog status
                  console.log(data)
      
                  _this.messages.push({
                    body: data.message,
                    author: 'andy'
                  })
                  
                  // re-enable input
                  inputBox.value = '';
                  inputBox.disabled = false;
                  inputBox.focus()
                  
                }
              });
              this.userMessage = ''
              
            } else {
              alert("Something went wrong")
            }
            
          }
    }
});