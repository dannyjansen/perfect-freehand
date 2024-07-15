<template>
  <div
    class="drawing-area"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseleave="stopDrawing"
  >
    <svg class="drawing-svg">
      <path v-for="(d, index) in paths" :key="index" :d="d" fill="black" />
      <path v-if="isDrawing" :d="pathData" fill="blue" />
    </svg>
  </div>
</template>

<script setup>
import { getStroke } from "perfect-freehand";
import { ref } from "vue";
import { pfOptions } from "../utils/perfectFreehandOptions";

const isDrawing = ref(false);
const points = ref([]);
const pathData = ref("");
const paths = ref([]);

const setIsDrawing = (payload) => (isDrawing.value = payload);

const startDrawing = (event) => {
  setIsDrawing(true);
  points.value.push([event.offsetX, event.offsetY]);
};

const draw = (event) => {
  if (!isDrawing.value) return;
  points.value.push([event.offsetX, event.offsetY]);
  updatePathData();
};

const stopDrawing = () => {
  setIsDrawing(false);

  if (points.value.length > 1) {
    updatePathData();
    paths.value.push(pathData.value);
  }
  points.value = [];
  pathData.value = "";
};

const updatePathData = () => {
  if (points.value.length > 1) {
    const strokePath = getStroke(points.value, pfOptions);
    pathData.value = strokePathToSvgPath(strokePath) + "Z";
  }
};

const strokePathToSvgPath = (stroke) => {
  return stroke.reduce(
    (acc, [x, y], i) => acc + `${i === 0 ? "M" : "L"} ${x} ${y} `,
    ""
  );
};
</script>

<style>
.drawing-area {
  width: 100vw;
  height: 100vh;
  cursor: crosshair;
}

.drawing-svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
