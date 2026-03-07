import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Bounds } from "@react-three/drei";
import useIsMobile from "../../hooks/useIsMobile";
import CanvasItems from "./CanvasItems";
import CanvasLegend from "./CanvasLegend";

function CanvasSection({ items, isCanvasView, setIsCanvasView }) {
  const isMobile = useIsMobile(setIsCanvasView);
  const filteredData = items.filter((item) => {
    return !item.hide;
  });
  return (
    <section
      id="canvas-wrapper"
      className={`bg-off-white relative h-full min-w-0 ${isCanvasView ? "grid" : "hidden"}`}
    >
      <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
        <directionalLight position={[10, 10, 1]} />
        <ambientLight intensity={2.5} />

        <Bounds fit={false} clip observe margin={`${isMobile ? 1 : 1.5}`}>
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
