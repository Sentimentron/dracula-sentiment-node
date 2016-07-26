# dracula-sentiment-node

[Try a live web demo](http://dracula.sentimentron.co.uk/sentiment-demo/).

A quick way to get "good enough" sentiment analysis into your applications, this package uses character and word-level embeddings and LSTM networks to decide if a given text is either "positive" or "negative".

## Installation

    npm install dracula-sentiment --save

## Usage
    
    var dracula = require('dracula-sentiment');
    var text = "xoxo cant wait";
    console.log(text, dracula.analyze(text));

For best performance and accuracy, remove any non-ascii characters by converting them to their closest equivalents via [`unidecode`](https://www.npmjs.com/package/unidecode) or something similar, and feed it sentence-sized chunks of text. 

## Testing
    
    npm test

Tests aren't very extensive at present. 

## Contributing

If you encounter any sentences where the classifiction is obviously wrong, open an issue and we'll work out a way to extend Dracula's training data so that it doesn't happen. Contributions to clean up the code and improve its style and performance are certainly welcome! 

## Release
* 1.0.0 Original release
