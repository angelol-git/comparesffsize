import React from "react";

function CanvasItems({ selectedItems }) {
  function calculateTotalWidth() {
    return selectedItems.reduce((total, item) => {
      return total + Number(item.item.measurements.width);
    }, 0);
  }

  function calculatePosition(width, height, index) {
    const totalWidth = calculateTotalWidth();
    const start = -(totalWidth / 2);

    let cumulativeWidth = 0;
    for (let i = 0; i < index; i++) {
      cumulativeWidth += Number(selectedItems[i].item.measurements.width);
    }

    let yAxis = height / 2;
    const xAxis = start + cumulativeWidth + width / 2;
    return [xAxis / 30, yAxis / 30, 0];
  }

  function assignColor(index) {
    if (index === 0) {
      return "red";
    } else if (index === 1) {
      return "blue";
    }
    return "green";
  }

  return selectedItems.map((item, index) => {
    const width = item.item.measurements.width;
    const height = item.item.measurements.height;
    return (
      <mesh
        className="canvas-item"
        position={calculatePosition(width, height, index)}
        key={`${item.brand}-${index}`}
      >
        <boxGeometry
          args={[
            width / 30,
            item.item.measurements.height / 30,
            item.item.measurements.length / 30,
          ]}
        />
        <meshStandardMaterial color={assignColor(index)} />
      </mesh>
    );
  });
}

export default CanvasItems;
