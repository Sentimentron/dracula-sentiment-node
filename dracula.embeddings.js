function draculaGetEmbeddings(word, length) {
  // Assumes dracula.params.js is included beforehand
  var ret = [];

  var maxOffset = length;
  if (word.length < maxOffset) maxOffset = word.length;

  for (var i = 0; i < maxOffset; i++) {
    var character = word[i]
    // Check that the character is defined in the parameters
    var isAvailable = character in draculaParams_char_dict
    // If not, substitute with zero character
    if (!isAvailable) character = 0
    else {
      character = draculaParams_char_dict[character];
    }
    ret.push(draculaParams_Cemb[character]);
  }

  for (var i = ret.length; i < length; i++) {
    var r = [];
    // Change from browser version: ES6 is messy
    for (var j = 0; j < 32; j++) r.push(0);
    ret.push(r);
  }

  return ret;
}
