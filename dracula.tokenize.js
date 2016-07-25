function draculaTokenize(input) {
  // Not too sophisticated at the moment
  // return input.split(/\W+/);
  var tokens = input.split(' ');
  var ret = [];
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].length == 0) continue;
    ret.push(tokens[i]);
  }
  return ret;
}
