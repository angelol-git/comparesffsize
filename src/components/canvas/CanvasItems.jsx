import React from "react";

function CanvasItems({ selectedItems }) {
  function calculateTotalWidth() {
    return selectedItems.reduce((total, item) => {
      return total + Number(item.item.measurements.width);
    }, 0);
  }

  function calculatePosition(width, index) {
    const totalWidth = calculateTotalWidth();
    const start = -(totalWidth / 2);

    let cumulativeWidth = 0;
    for (let i = 0; i < index; i++) {
      cumulativeWidth += Number(selectedItems[i].item.measurements.width);
    }
    const xAxis = start + cumulativeWidth + width / 2;
    return [xAxis / 30, 0, 0];
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

    return (
      <mesh
        className="canvas-item"
        position={calculatePosition(width, index)}
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
