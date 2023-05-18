// Load the WebM file

function getDurationFromWebmArrayBuffer(buffer) {

  // Find the Segment element
  const segmentElement = findElement(buffer, 0x18538067); // ID for Segment element

  if (segmentElement) {
    // Find the Info element within the Segment
    const infoElement = findElement(buffer, 0x1549A966, segmentElement.endPosition); // ID for Info element

    if (infoElement) {
      // Find the Duration element within the Info
      const durationElement = findElement(buffer, 0x4489, infoElement.endPosition); // ID for Duration element

      if (durationElement) {
        // Extract the duration value (stored as a float)
        const durationBytes = buffer.slice(durationElement.dataStartPosition, durationElement.dataEndPosition);
        const duration = new DataView(durationBytes).getFloat64(0, true);

        // Print the duration
        console.log('Duration:', duration, 'seconds');
      }
    }
  }
};

// Helper function to find an element by its ID in the WebM file
function findElement(buffer, elementId, startPosition = 0) {
  let position = startPosition;

  while (position < buffer.byteLength) {
    const id = readEBMLVarInt(buffer, position);
    position += id.length;

    if (id.value === elementId) {
      const size = readEBMLVarInt(buffer, position);
      position += size.length;

      return {
        startPosition: position,
        endPosition: position + size.value,
        dataStartPosition: position + size.length,
        dataEndPosition: position + size.value
      };
    } else {
      const size = readEBMLVarInt(buffer, position);
      position += size.length + size.value;
    }
  }

  return null;
}

// Helper function to read an EBML variable-length integer
function readEBMLVarInt(buffer, position) {
  let value = 0;
  let length = 0;
  let byte = buffer[position];

  while ((byte & 0x80) === 0x00) {
    value = (value << 7) | byte;
    length++;
    byte = buffer[position + length];
  }

  value = (value << 7) | (byte & 0x7F);
  length++;

  return { value, length };
}
