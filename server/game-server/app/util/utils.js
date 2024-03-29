var utils = module.exports;

// control variable of func "myPrint"
var isPrintFlag = false;
// var isPrintFlag = true;

/**
 * Check and invoke callback function
 */
utils.invokeCallback = function(cb) {
  if(!!cb && typeof cb === 'function') {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }
};

/**
 * clone an object
 */
utils.clone = function(origin) {
  if(!origin) {
    return;
  }

  var obj = {};
  for(var f in origin) {
    if(origin.hasOwnProperty(f)) {
      obj[f] = origin[f];
    }
  }
  return obj;
};

utils.size = function(obj) {
  if(!obj) {
    return 0;
  }

  var size = 0;
  for(var f in obj) {
    if(obj.hasOwnProperty(f)) {
      size++;
    }
  }

  return size;
};

// print the file name and the line number ~ begin
function getStack(){
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) {
    return stack;
  };
  var err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

function getFileName(stack) {
  return stack[1].getFileName();
}

function getFileNameByIndex(stack, index) {
  return stack[index].getFileName();
}

function getLineNumber(stack){
  return stack[1].getLineNumber();
}

function getLineNumberByIndex(stack, index){
  return stack[index].getLineNumber();
}

utils.myPrint = function() {
  if (isPrintFlag) {
    var len = arguments.length;
    if(len <= 0) {
      return;
    }
    var stack = getStack();
    var aimStr = '\'' + getFileName(stack) + '\' @' + getLineNumber(stack) + ' :\n';
    for(var i = 0; i < len; ++i) {
      aimStr += arguments[i] + ' ';
    }
    console.log('\n' + aimStr);
  }
};
// print the file name and the line number ~ end

utils.traceback = function(stackIndex) {
  stackIndex = stackIndex || 0;

  var stack = getStack();
  var aimStr = '';
  for(var i = stackIndex; i < stack.length; ++i) {
    aimStr += '\'' + getFileNameByIndex(stack, i) + '\' @' + getLineNumberByIndex(stack, i) + ' :\n';
  }
  return aimStr;
};

utils.printTraceback = function() {
  var len = arguments.length;
  if (len <= 0) {
    return;
  }

  var aimStr = '';
  for(var i = 0; i < len; ++i) {
    if(arguments[i]) {
      aimStr += arguments[i] + ' ';
    }
    else {
      aimStr += 'null ';
    }
  }

  console.log(aimStr + ' traceback:' + utils.traceback(2));
};

utils.obj2Str = function(obj, level) {
  if(typeof(level) == 'undefined') {
    level = 3;
  }
  level -= 1;

  if(!obj) {
    return 'null';
  }

  if(typeof(obj) != 'object' || level <= 0) {
    return obj;
  }

  var str = '';
  str += '{';
  for (var k in obj) {
    if(typeof(obj[k]) != 'function') {
      str += ("\"" + k + '":' + utils.obj2Str(obj[k], level) + ',');
    }
  }
  str += '}';

  return str;
}

