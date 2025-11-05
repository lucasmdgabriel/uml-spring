"use client"

import ConfigurationView from "@/views/ConfigurationView";
import SetupView from "../views/SetupView";
import { useState } from "react";
import DependenciesView from "@/views/DependenciesView";
import UMLFileView from "@/views/UMLFileView";

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

export interface AdditionalConfigProps {
  structureType: string,
  database: string,
  databaseName: string,
  databaseUser: string,
  databasePassword: string
}

export default function Home() {
  return (
    <ConfigurationView/>
  );
}
