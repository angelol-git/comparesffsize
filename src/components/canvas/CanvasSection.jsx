import { useState, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Grid, OrbitControls, Bounds, useBounds } from "@react-three/drei";
import { Focus } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import CanvasItems from "./CanvasItems";
import CanvasLegend from "./CanvasLegend";

const INITIAL_CAMERA_POSITION = [10, 15, 20];
const INITIAL_TARGET = [0, 0, 0];
const INITIAL_FOV = 75;

function CameraAndBoundsController({ shouldRecenter }) {
  const { camera, controls } = useThree();
  const bounds = useBounds();

  if (shouldRecenter > 0) {
    camera.position.set(...INITIAL_CAMERA_POSITION);
    camera.fov = INITIAL_FOV;
    camera.updateProjectionMatrix();

    if (controls) {
      controls.target.set(...INITIAL_TARGET);
    }

    setTimeout(() => {
      bounds.refresh().clip().fit();
    }, 0);
  }

  return null;
}

function CanvasSection({ items, isCanvasView, setIsCanvasView }) {
  const isMobile = useIsMobile(setIsCanvasView);
  const [recenterCount, setRecenterCount] = useState(0);
  const filteredData = items.filter((item) => {
    return !item.hide;
  });

  const handleRecenter = useCallback(() => {
    setRecenterCount((prev) => prev + 1);
  }, []);

  return (
    <section
      id="canvas-wrapper"
      className={`relative h-full min-w-0 bg-white ${isCanvasView ? "grid" : "hidden"}`}
    >
      <button
        onClick={handleRecenter}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg active:scale-95"
        aria-label="Recenter view"
        title="Recenter view"
      >
        <Focus size={16} />
        <span>Reset View</span>
      </button>

      <Canvas camera={{ position: INITIAL_CAMERA_POSITION, fov: INITIAL_FOV }}>
        <directionalLight position={[10, 10, 1]} />
        <ambientLight intensity={2.5} />

        <Bounds fit={false} clip observe margin={`${isMobile ? 1 : 1.5}`}>
          <CanvasItems filteredData={filteredData} />
          <CameraAndBoundsController shouldRecenter={recenterCount} />
        </Bounds>

        <OrbitControls makeDefault target={INITIAL_TARGET} />
        <Grid
          renderOrder={-1}
          position={[0, -0.01, 0]}
          infiniteGrid
          cellSize={2}
          sectionSize={2}
          cellColor="#60A5FA"
          sectionColor="#2563EB"
        />
      </Canvas>
      {isMobile && filteredData.length > 0 && (
        <CanvasLegend filteredData={filteredData} />
      )}
    </section>
  );
}

export default CanvasSection;
