import React, { Suspense, useRef, useState } from "react";
import { Canvas, ThreeElements, useLoader } from "@react-three/fiber";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import styles from "./App.module.scss";
import { Mesh, Texture } from "three";
import * as THREE from "three";
import clsx from "clsx";
// import cardFrame from "./assets/3d/cardFrame.glb";
// import GltfModel from "./components/GltfModel";
import sportsPerson1Img from "./assets/img/sportsPerson1.jpg";
import sportsPerson2Img from "./assets/img/sportsPerson2.jpg";
import sportsPerson3Img from "./assets/img/sportsPerson3.jpg";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Main />
    </Suspense>
  );
}

function Main() {
  const [artifactType, setArtifactType] = useState<"card" | "prism" | "cube">(
    "card"
  );
  const [textureInput, setTextureInput] = useState(sportsPerson1Img);
  const texture = useLoader(THREE.TextureLoader, textureInput);
  return (
    <>
      <div className={styles.artifactSelector}>
        <label htmlFor="artifact">Select artifact: </label>
        <select
          id="artifact"
          value={artifactType}
          onChange={(e) => {
            setArtifactType(e.target.value as typeof artifactType);
          }}
        >
          <option value={"card"}>Card</option>
          <option value={"prism"}>Prism</option>
          <option value={"cube"}>Cube</option>
        </select>
      </div>

      <div style={{ width: "50vw", height: "70vh" }}>
        <Canvas>
          <color attach="background" args={["#f5efe6"]} />
          <PerspectiveCamera position={[0, 0, 25]} makeDefault />
          <ambientLight />
          <pointLight position={[5, 5, 5]} />
          <OrbitControls autoRotate />
          {artifactType === "card" ? <Card texture={texture} /> : null}
          {artifactType === "prism" ? <Prism texture={texture} /> : null}
          {artifactType === "cube" ? <Cube texture={texture} /> : null}
        </Canvas>
      </div>

      <TextureSelector
        textureInput={textureInput}
        setTextureInput={setTextureInput}
      />
    </>
  );
}

function TextureSelector({
  textureInput,
  setTextureInput,
}: {
  textureInput: string;
  setTextureInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={styles.textureSelector}>
      {[sportsPerson1Img, sportsPerson2Img, sportsPerson3Img].map((img) => (
        <div
          key={img}
          onClick={(e) => setTextureInput(img)}
          className={clsx({
            [styles.textureInput]: true,
            [styles.selected]: textureInput === img,
          })}
        >
          <img src={img} />
        </div>
      ))}
    </div>
  );
}

function CardFrame() {
  return (
    <group>
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[8, 1, 0.4]} />
        <meshPhysicalMaterial
          roughness={0}
          transmission={1} // Add transparency
        />
      </mesh>
      <mesh position={[0, -5, 0]}>
        <boxGeometry args={[8, 1, 0.4]} />
        <meshPhysicalMaterial
          roughness={0}
          transmission={1} // Add transparency
        />
      </mesh>
      <mesh position={[-3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[9, 1, 0.4]} />
        <meshPhysicalMaterial
          roughness={0}
          transmission={1} // Add transparency
        />
      </mesh>
      <mesh position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[9, 1, 0.4]} />
        <meshPhysicalMaterial
          roughness={0}
          transmission={1} // Add transparency
        />
      </mesh>
    </group>
  );
}

function Card({ texture }: { texture: Texture }) {
  const mesh = useRef<Mesh>(null!);

  return (
    <>
      <mesh ref={mesh}>
        <boxGeometry args={[6, 9, 0.1]} />
        <meshStandardMaterial attach="material-4" map={texture} />
        <meshStandardMaterial attach="material-5" map={texture} />
        <meshBasicMaterial attach="material-0" color={0xfff123} />
        <meshBasicMaterial attach="material-1" color={0xfff123} />
        <meshBasicMaterial attach="material-2" color={0xfff123} />
        <meshBasicMaterial attach="material-3" color={0xfff123} />
        {/* <meshLambertMaterial map={{ image: sportsPerson1Img }} /> */}
      </mesh>
      <CardFrame />
    </>
  );
}

function Prism({ texture }: { texture: Texture }) {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[5, 5, 6, 3, 2]} />
      {/* <meshBasicMaterial attach="material-0" color={0xff0000} />
      <meshBasicMaterial attach="material-1" color={0x00ff00} />
      <meshBasicMaterial attach="material-2" color={0x0000ff} /> */}
      <meshStandardMaterial attach="material-1" map={texture} />
      <meshStandardMaterial attach="material-2" map={texture} />
      <meshStandardMaterial attach="material-0" map={texture} />
    </mesh>
  );
}

function Cube({ texture }: { texture: Texture }) {
  return (
    <mesh>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
}

export default App;
