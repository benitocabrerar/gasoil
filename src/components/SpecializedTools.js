import React from 'react';
import ToolCard from './ToolCard';
import {
  SimulationIcon,
  DataAnalysisIcon,
  ReservoirModelingIcon,
  ProductionOptimizationIcon,
  EnvironmentalMonitoringIcon,
  RiskAssessmentIcon
} from './ToolIcons';

const SpecializedTools = ({ onToolSelect }) => {
  const tools = [
    {
      name: "PetroSim Pro",
      description: "Simulación avanzada de yacimientos petroleros con modelado 3D en tiempo real y análisis predictivo de producción.",
      category: "Simulación de Yacimientos",
      complexity: "Avanzado",
      icon: <SimulationIcon className="w-8 h-8" />
    },
    {
      name: "GeoAnalytics",
      description: "Plataforma integrada de análisis geológico con IA para predicción precisa de reservas y optimización de producción.",
      category: "Análisis de Datos",
      complexity: "Intermedio",
      icon: <DataAnalysisIcon className="w-8 h-8" />
    },
    {
      name: "ReservoirViz",
      description: "Visualización y modelado 3D de reservorios con análisis detallado de propiedades petrofísicas y simulación de flujos.",
      category: "Modelado de Reservorios",
      complexity: "Intermedio",
      icon: <ReservoirModelingIcon className="w-8 h-8" />
    },
    {
      name: "OptimaPro",
      description: "Sistema inteligente de optimización de producción con monitoreo en tiempo real y análisis predictivo de rendimiento.",
      category: "Optimización de Producción",
      complexity: "Avanzado",
      icon: <ProductionOptimizationIcon className="w-8 h-8" />
    },
    {
      name: "EcoTrack",
      description: "Sistema integral de monitoreo ambiental con alertas tempranas, reportes automatizados y seguimiento de normativas.",
      category: "Monitoreo Ambiental",
      complexity: "Básico",
      icon: <EnvironmentalMonitoringIcon className="w-8 h-8" />
    },
    {
      name: "RiskGuard",
      description: "Plataforma avanzada de evaluación de riesgos operativos con análisis predictivo y recomendaciones en tiempo real.",
      category: "Evaluación de Riesgos",
      complexity: "Intermedio",
      icon: <RiskAssessmentIcon className="w-8 h-8" />
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Herramientas Especializadas en Energía
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool, index) => (
          <ToolCard 
            key={index} 
            {...tool} 
            onSelect={() => onToolSelect(tool)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecializedTools;