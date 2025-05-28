import { Edges } from "@react-three/drei";

const GAP = 2;
function CanvasItems({ selectedItems }) {
  const filteredData = selectedItems.filter((item) => {
    return item.hide === false;
  });

  function calculateTotalWidth() {
    return filteredData.reduce((total, item) => {
      return total + Number(item.measurements.width) + GAP;
    }, 0);
  }

  function calculateShortestLength() {
    return Math.min(
      ...filteredData.map((item) => Number(item.measurements.length)),
    );
  }

  function calculatePosition(width, height, length, index) {
    const totalWidth = calculateTotalWidth();
    const shortestLength = calculateShortestLength();
    const start = -(totalWidth / 2);
    let cumulativeWidth = 0;
    for (let i = 0; i < index; i++) {
      cumulativeWidth += Number(filteredData[i].measurements.width) + GAP;
    }

    const xAxis = start + cumulativeWidth + width / 2;
    const yAxis = height / 2;
    const zAxis = Number(length - shortestLength) / 2;

    return [xAxis / 30, yAxis / 30, zAxis / 30];
  }

  return filteredData.map((item, index) => {
    const width = item.measurements.width;
    const height = item.measurements.height;
    const length = item.measurements.length;
    if (item.hide) {
      return null;
    } else
      return (
        <mesh
          className="canvas-pointer"
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
          <meshStandardMaterial color={item.color} />
          <Edges linewidth={1} threshold={20} color="white" />
        </mesh>
      );
  });
}

export default CanvasItems;
