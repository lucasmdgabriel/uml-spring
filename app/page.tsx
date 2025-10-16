"use client"

import SetupView from "./views/SetupView";
import { useEffect, useState } from "react";

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
  const [projectConfig, setProjectConfig] = useState<ProjectConfigProps>({
    project: 'MAVEN_PROJECT',
    language: 'JAVA',
    bootVersion: '4.0.0.BUILD-SNAPSHOT',
    packaging: 'JAR',
    javaVersion: '21',
    group: '',
    artifat: '',
    name: '',
    description: '',
    packageName: ''
  });

  useEffect(() => {
    if (projectConfig.group == "" || projectConfig.name == "")
      return;

    setProjectConfig({
        ... projectConfig,
        packageName: projectConfig.group+"."+projectConfig.name
    })
  }, [projectConfig.group, projectConfig.name]);
  
  return (
    <SetupView projConfig={projectConfig} updateProjConfig={(newProjConfig: ProjectConfigProps) => {
      setProjectConfig(newProjConfig);
    }}/>
  );
}
