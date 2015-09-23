"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var data = undefined,
    multipleSections = undefined;

function setData(newData) {
  var hasMultipleSections = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  data = newData;
  multipleSections = hasMultipleSections;
}

function next(position) {
  var _position = _slicedToArray(position, 2);

  var sectionIndex = _position[0];
  var itemIndex = _position[1];

  if (multipleSections) {
    return getNextSectionIndexes(sectionIndex, itemIndex);
  }

  return [null, getNextIndex(data, itemIndex)];
}

function getNextSectionIndexes(sectionIndex, itemIndex) {
  if (sectionIndex === null) {
    sectionIndex = 0;
  }

  while (sectionIndex < data.length) {
    var section = data[sectionIndex];
    if (section.length) {
      var nextIndex = getNextIndex(section, itemIndex);
      if (nextIndex !== null) {
        return [sectionIndex, nextIndex];
      }
    }
    // If no nextIndex found in first call to getNextIndex,
    // then set itemIndex to null and let subsequent calls start the search from the bottom of the next section.
    itemIndex = null;
    sectionIndex++;
  }

  return [null, null];
}

function getPrevSectionIndexes(sectionIndex, itemIndex) {
  if (sectionIndex === null) {
    sectionIndex = data.length - 1;
  }

  while (sectionIndex >= 0) {
    var section = data[sectionIndex];
    if (section.length) {
      var prevIndex = getPrevIndex(section, itemIndex);
      if (prevIndex !== null) {
        return [sectionIndex, prevIndex];
      }
    }
    // If no prevIndex found in first call to getPrevIndex,
    // then set itemIndex to null and let subsequent calls start the search from the top of the next section.
    itemIndex = null;
    sectionIndex--;
  }

  return [null, null];
}

function getPrevIndex(section, itemIndex) {
  if (!section.length) {
    return null;
  }

  // Return the last item.
  if (itemIndex === null) {
    // return last index (index of last enabled suggestion)
    return section[section.length - 1];
  }

  // Return the previous item.
  var index = section.indexOf(itemIndex);
  return index > 0 ? section[index - 1] : null;
}

function getNextIndex(section, itemIndex) {
  if (!section.length) {
    return null;
  }

  // return the first item
  if (itemIndex === null) {
    // return first index (index of first enabled suggestion)
    return section[0];
  }

  // return the next item
  var index = section.indexOf(itemIndex);
  return index !== -1 && section.length > index + 1 ? section[index + 1] : null;
}

function prev(position) {
  var _position2 = _slicedToArray(position, 2);

  var sectionIndex = _position2[0];
  var itemIndex = _position2[1];

  if (multipleSections) {
    return getPrevSectionIndexes(sectionIndex, itemIndex);
  }

  return [null, getPrevIndex(data, itemIndex)];
}

function isLast(position) {
  return next(position)[1] === null;
}

exports["default"] = {
  setData: setData,
  next: next,
  prev: prev,
  isLast: isLast
};
module.exports = exports["default"];