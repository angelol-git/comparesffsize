import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Text } from "@react-three/drei";
import CanvasItems from "./CanvasItems";
function CanvasSection({ selectedItems, isCanvasView, isMobile }) {
  return (
    <section
      id="canvas-wrapper"
      className={`bg-off-white relative min-h-0 min-w-0 ${isCanvasView ? "grid" : "hidden"}`}
    >
      <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
        {selectedItems.length > 0 && (
          <CanvasItems selectedItems={selectedItems} />
        )}
        <directionalLight position={[10, 10, 1]} />
        <ambientLight intensity={2.5} />
        <OrbitControls />
        <Grid
          renderOrder={-1}
          position={[0, -0.01, 0]}
          infiniteGrid
          cellSize={2}
          sectionSize={2}
        />
        <Text
          position={[0, 0, 0]} // Adjust position as needed
          fontSize={1} // Set font size
          color="black" // Set text color
          anchorX="center" // Horizontal alignment
          anchorY="middle" // Vertical alignment
        ></Text>
      </Canvas>
      {isMobile && (
        <ul className="bg-dark-gray/60 pointer-events-none absolute right-0 bottom-0 flex flex-col gap-2 p-4">
          {selectedItems.map((item) => {
            return (
              <li
                key={item.id}
                className="flex items-center gap-2 text-xs text-white"
              >
                <div
                  style={{ backgroundColor: item.color }}
                  className="flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center lg:h-[24px] lg:w-[24px]"
                />
                <div>
                  {item.brand} - {item.name} ({item.measurements.volume} L)
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default CanvasSection;
