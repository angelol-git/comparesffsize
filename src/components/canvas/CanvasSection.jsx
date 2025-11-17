import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import CanvasItems from "./CanvasItems";
function CanvasSection({ selectedItems, isCanvasView }) {
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
      </Canvas>
    </section>
  );
}

export default CanvasSection;
