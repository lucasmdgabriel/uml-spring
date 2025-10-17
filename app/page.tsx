"use client"

import SetupView from "./views/SetupView";
import { useState } from "react";

export interface ProjectConfigProps {
  project: string,
  language: string,
  bootVersion: string,
  packaging: string,
  javaVersion: string,
  group: string,
  artifat: string,
  name: string,
  description: string,
  packageName: string,
}

export default function Home() {
  return (
    <SetupView/>
  );
}
