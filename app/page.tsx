"use client"

import SetupView from "../views/SetupView";
import { useState } from "react";

export interface ProjectConfigProps {
  type: string,
  language: string,
  bootVersion: string,
  packaging: string,
  javaVersion: string,
  groupId: string,
  artifactId: string,
  name: string,
  description: string,
  packageName: string,
}

export default function Home() {
  return (
    <SetupView/>
  );
}
