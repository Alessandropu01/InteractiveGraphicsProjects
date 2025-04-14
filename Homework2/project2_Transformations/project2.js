// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.

function GetTransform(positionX, positionY, rotation, scale) {
    const radianRotation = (rotation * Math.PI) / 180;
    const cos = Math.cos(radianRotation);
    const sin = Math.sin(radianRotation);
    
    const rotationMatrix = [cos, sin, 0, -sin, cos, 0, 0, 0, 1];
    const scaleMatrix = [scale, 0, 0, 0, scale, 0, 0, 0, 1];
    
    const intermediateMatrix = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum += scaleMatrix[i * 3 + k] * rotationMatrix[k * 3 + j];
            }
            intermediateMatrix.push(sum);
        }
    }
    
    const translationMatrix = [...intermediateMatrix];
    translationMatrix[6] = positionX;
    translationMatrix[7] = positionY;

    return translationMatrix;
}

// Returns a 3x3 transformation matrix as an array of 9 values in row-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.

function ApplyTransform(trans1, trans2) {
    const resultMatrix = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum += trans1[i * 3 + k] * trans2[k * 3 + j];
            }
            resultMatrix.push(sum);
        }
    }
    return resultMatrix;
}