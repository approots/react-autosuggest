let data, multipleSections;

function setData(newData, hasMultipleSections = false) {
  data = newData;
  multipleSections = hasMultipleSections;
}

function next(position) {
  let [sectionIndex, itemIndex] = position;

  if (multipleSections) {
    return getNextSectionIndexes(sectionIndex, itemIndex);
  }

  return [null, getNextIndex(data, itemIndex)];
}

function getNextSectionIndexes(sectionIndex, itemIndex) {
  if (sectionIndex === null) {
    sectionIndex = 0;
  }

  while(sectionIndex < data.length) {
    let section = data[sectionIndex];
    if (section.length) {
      let nextIndex = getNextIndex(section, itemIndex);
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

  while(sectionIndex >= 0) {
    let section = data[sectionIndex];
    if (section.length) {
      let prevIndex = getPrevIndex(section, itemIndex);
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
  if (! section.length) {
    return null;
  }

  // Return the last item.
  if (itemIndex === null) {
    // return last index (index of last enabled suggestion)
    return section[section.length - 1];
  }

  // Return the previous item.
  const index = section.indexOf(itemIndex);
  return (index > 0) ? section[index - 1] : null;
}

function getNextIndex(section, itemIndex) {
  if (! section.length) {
    return null;
  }

  // return the first item
  if (itemIndex === null) {
    // return first index (index of first enabled suggestion)
    return section[0];
  }

  // return the next item
  const index = section.indexOf(itemIndex);
  return (index !== -1 && section.length > index + 1) ? section[index + 1] : null;
}

function prev(position) {
  let [sectionIndex, itemIndex] = position;

  if (multipleSections) {
    return getPrevSectionIndexes(sectionIndex, itemIndex);
  }

  return [null, getPrevIndex(data, itemIndex)];
}

function isLast(position) {
  return next(position)[1] === null;
}

export default {
  setData,
  next,
  prev,
  isLast
};