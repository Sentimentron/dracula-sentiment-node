function draculaSoftmax(values) {

  // TODO: need to check if this U is the same as the one exported
  var act = [];
  for (var i = 0; i < values.length; i++) {
    var tmp = numeric.dot(values[i], draculaParams_U);
    tmp = numeric.add(tmp, draculaParams_b);
    act.push(tmp);
  }

  var exp = [];
  for (var i = 0; i < act.length; i++) {
    var ex = numeric.exp(act[i]);
    ex = numeric.div(ex, numeric.sum(ex))
    exp.push(ex);
  }
  return exp;
}

function determineLabels(exp) {

  // Compute the argmax
  var ret = [];
  for (var i = 0; i < exp.length; i++) {
    var argMax = 0;
    var argMaxVal = 0;
    for (var j = 0; j < exp[i].length; j++) {
      var v = exp[i][j];
      if (v > argMaxVal) {
        argMax = j;
        argMaxVal = v;
      }
    }
    if (argMax == 0) {
      ret.push("negative");
    } else if (argMax == 2) {
      ret.push("positive");
    } else {
      ret.push("Something weird's going on here: the argMax is not working "
      +" correctly");
    }
  }

  return ret;
}
