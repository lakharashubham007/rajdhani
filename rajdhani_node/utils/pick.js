/**
 * Creates an object composed of the picked object properties.
 *
 * @param {Object} object - The source object from which properties are to be picked.
 * @param {string[]} keys - An array of strings representing the keys of the properties to be extracted.
 * @returns {Object} - A new object containing only the properties specified by the keys.
 */
const pick = (object, keys) => {
    // Use the 'reduce' function to iterate over the 'keys' array and build a new object.
    return keys.reduce((obj, key) => {
      // Check if the 'object' is truthy and if it has the property specified by 'key'.
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // If the property exists, assign its value to the corresponding property in the new object.
        obj[key] = object[key];
      }
      // Return the intermediate result (the new object being built).
      return obj;
    }, {});
  };
  
  // Export the 'pick' function for use in other modules.
  module.exports = pick;
  