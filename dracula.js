// This is the core function, used by everything
function dracula(content, visualize) {
  // Tokenize
  var tokens = draculaTokenize(content);
  // Create embeddings
  var embeddings = [];
  var lengths = [];
  var maxOffset = 20;
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    var tokenEmbeddings = draculaGetEmbeddings(token, maxOffset);
    embeddings.push(tokenEmbeddings);
    var l = token.length;
    if (maxOffset < l) l = maxOffset;
    lengths.push(l);
  }
 
  lengths.push(0); 
  if (visualize) {
    visualizeCharacterEmbeddings(embeddings, lengths);
  }

  // First-level LSTMs
  var lstmOutput1 = [];
  for (var i = 0; i < embeddings.length; i++) {
    var cur = embeddings[i];
    var out1 = draculaBLSTM(cur, 'lstm_chars_1', 32);
    lstmOutput1.push(out1);
  }

  if (visualize) {
    visualizeLSTMCharsActivation(lstmOutput1, 1, lengths);
  }

  var lstmOutput = lstmOutput1;
  // Mean-pooling
  var meanOutput = [];
  for (var i = 0; i < lstmOutput.length; i++) {
    if (lengths[i] == 0) break;
    var cur = [];
    var min = [];
    var max = [];
    for (var j = 0; j < 32; j++) {
        cur.push(0);
        max.push(-Number.MAX_VALUE);
        min.push(Number.MAX_VALUE);
    }
    for (var j = 0; j < lengths[i]; j++) {
      cur = numeric.add(cur, lstmOutput[i][j]);
      max = numeric.max(max, lstmOutput[i][j]);
      min = numeric.min(min, lstmOutput[i][j]);
    }
    cur = numeric.div(cur, lengths[i]);
    var poolOut = cur.concat(max).concat(min);
    meanOutput.push(poolOut);
  }

  if (visualize) {
    visualize2DActivation(meanOutput, "mma-pooling-plot", "Min-Max-Average pooling");
  }

  // Word-level LSTMs
  var lstmWords = meanOutput;
  for (var i = 1; i <= 1; i++) {
    var prefix = 'lstm_words_' + i;
    lstmWords = draculaBLSTM(lstmWords, prefix, 96);
    if (visualize)
      visualize2DActivation(lstmWords, "lstm-words-"+i, "Word-level LSTM")
  }

  var finalPool = [];
  for (var i = 0; i < 96; i++) {
    finalPool.push(0);
  }
  for (var i = 0; i < lstmWords.length; i++) {
    finalPool = numeric.add(finalPool, lstmWords[i]);
  }
  finalPool = numeric.div(finalPool, lstmWords.length)
  if (visualize) {
    visualize2DActivation([finalPool], "mean-pooling-plot", "Mean-pooling");
  }

  // Output
  var probs = draculaSoftmax([finalPool]);
  if (visualize) {
    visualize2DActivation(probs, "probs-plot", "Softmax");
  }
  output = determineLabels(probs);
  return output.join(', ');
}
