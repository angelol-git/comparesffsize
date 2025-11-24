import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Bounds } from "@react-three/drei";
import useIsMobile from "../../hooks/useIsMobile";
import CanvasItems from "./CanvasItems";
import CanvasLegend from "./CanvasLegend";

function CanvasSection({ selectedItems, isCanvasView }) {
  const isMobile = useIsMobile();
  const filteredData = selectedItems.filter((item) => {
    return item.hide === false;
  });
  return (
    <section
      id="canvas-wrapper"
      className={`bg-off-white relative min-w-0 ${isCanvasView ? "grid" : "hidden"} h-full`}
    >
      <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
        <directionalLight position={[10, 10, 1]} />
        <ambientLight intensity={2.5} />

        <Bounds fit={false} clip observe margin={1.5}>
          <CanvasItems filteredData={filteredData} />
        </Bounds>

        <OrbitControls makeDefault />
        <Grid
          renderOrder={-1}
          position={[0, -0.01, 0]}
          infiniteGrid
          cellSize={2}
          sectionSize={2}
        />
      </Canvas>
      {isMobile && filteredData.length > 0 && (
        <CanvasLegend filteredData={filteredData} />
      )}
    </section>
  );
}

export default CanvasSection;
