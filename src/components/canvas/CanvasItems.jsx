import React from "react";

function CanvasItems({ selectedItems, colors }) {
  const filteredData = selectedItems.filter((item) => {
    return item.hide === false;
  });

  function calculateTotalWidth() {
    return filteredData.reduce((total, item) => {
      return total + Number(item.measurements.width);
    }, 0);
  }

  function calculateShortestLength() {
    return Math.min(
      ...filteredData.map((item) => Number(item.measurements.length))
    );
  }

  function calculatePosition(width, height, length, index) {
    const totalWidth = calculateTotalWidth();
    const shortestLength = calculateShortestLength();
    const start = -(totalWidth / 2);

    let cumulativeWidth = 0;
    for (let i = 0; i < index; i++) {
      cumulativeWidth += Number(filteredData[i].measurements.width);
    }

    const xAxis = start + cumulativeWidth + width / 2;
    const yAxis = height / 2;
    const zAxis = Number(length - shortestLength) / 2;

    return [xAxis / 30, yAxis / 30, zAxis / 30];
  }

  function assignColor(index) {
    return colors[index % colors.length];
  }

  return selectedItems.map((item, index) => {
    const width = item.measurements.width;
    const height = item.measurements.height;
    const length = item.measurements.length;
    if (item.hide) {
      return null;
    } else
      return (
        <mesh
          className="canvas-item"
          position={calculatePosition(width, height, length, index)}
          key={item.id}
        >
          <boxGeometry
            args={[
              width / 30,
              item.measurements.height / 30,
              item.measurements.length / 30,
            ]}
          />
          <meshStandardMaterial color={assignColor(index)} />
        </mesh>
      );
  });
}

export default CanvasItems;
