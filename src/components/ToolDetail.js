import React from 'react';

const ToolDetail = ({ tool }) => {
  const toolDetails = {
    "PetroSim Pro": {
      scientificBase: [
        "Fundamentos de Mecánica de Yacimientos",
        "Modelado Geomecánico Computacional",
        "Simulación Numérica de Fluidos Multifásicos"
      ],
      keyTechnologies: [
        "Modelado 3D de Estructuras Geológicas",
        "Simulación Termodinámica de Fluidos",
        "Análisis de Elementos Finitos"
      ],
      mathematicalModels: [
        "Ecuaciones de Darcy Modificadas",
        "Modelos de Difusividad Heterogénea",
        "Algoritmos de Optimización No Lineal"
      ],
      applications: [
        "Predicción de Comportamiento de Yacimientos",
        "Optimización de Estrategias de Perforación",
        "Evaluación de Riesgos Geológicos"
      ]
    },
    "GeoAnalytics": {
      scientificBase: [
        "Estadística Multivariada",
        "Machine Learning Geoespacial",
        "Análisis Geoestadístico"
      ],
      keyTechnologies: [
        "Redes Neuronales Convolucionales",
        "Procesamiento de Imágenes Satelitales",
        "Algoritmos de Predicción Geológica"
      ],
      mathematicalModels: [
        "Kriging Bayesiano",
        "Modelos de Regresión Geoespacial",
        "Análisis de Componentes Principales"
      ],
      applications: [
        "Predicción de Reservas Petroleras",
        "Mapeo de Estructuras Subterráneas",
        "Evaluación de Potencial Exploratorio"
      ]
    },
    "ReservoirViz": {
      scientificBase: [
        "Visualización Científica Avanzada",
        "Mecánica de Fluidos Computacional",
        "Análisis Petrofísico Integrado"
      ],
      keyTechnologies: [
        "Renderizado 3D en Tiempo Real",
        "Simulación de Flujos Multifásicos",
        "Análisis Volumétrico Avanzado"
      ],
      mathematicalModels: [
        "Ecuaciones de Estado PVT",
        "Modelos de Permeabilidad Relativa",
        "Algoritmos de Visualización Volumétrica"
      ],
      applications: [
        "Modelado de Propiedades Petrofísicas",
        "Simulación de Flujo en Medios Porosos",
        "Análisis de Escenarios de Producción"
      ]
    },
    "OptimaPro": {
      scientificBase: [
        "Teoría de Control Automático",
        "Optimización de Procesos Dinámicos",
        "Análisis de Series Temporales"
      ],
      keyTechnologies: [
        "Monitoreo en Tiempo Real",
        "Sistemas de Control Predictivo",
        "Automatización de Procesos"
      ],
      mathematicalModels: [
        "Algoritmos de Control Óptimo",
        "Modelos de Predicción ARIMA",
        "Optimización Multi-objetivo"
      ],
      applications: [
        "Control de Producción Automatizado",
        "Optimización de Tasas de Flujo",
        "Gestión de Presión de Fondo"
      ]
    },
    "EcoTrack": {
      scientificBase: [
        "Ciencias Ambientales",
        "Química Analítica",
        "Modelado de Dispersión"
      ],
      keyTechnologies: [
        "Sensores IoT Ambientales",
        "Sistemas de Alerta Temprana",
        "Análisis de Calidad del Aire"
      ],
      mathematicalModels: [
        "Modelos de Dispersión Gaussiana",
        "Análisis de Series Temporales",
        "Estadística Ambiental"
      ],
      applications: [
        "Monitoreo de Emisiones",
        "Control de Calidad Ambiental",
        "Cumplimiento Normativo"
      ]
    },
    "RiskGuard": {
      scientificBase: [
        "Teoría de Probabilidad",
        "Análisis de Confiabilidad",
        "Gestión de Riesgos"
      ],
      keyTechnologies: [
        "Sistemas Expertos",
        "Modelado de Escenarios",
        "Análisis Predictivo"
      ],
      mathematicalModels: [
        "Modelos de Riesgo Probabilístico",
        "Análisis de Árboles de Fallas",
        "Simulación Monte Carlo"
      ],
      applications: [
        "Evaluación de Riesgos Operativos",
        "Predicción de Fallas",
        "Planificación de Contingencias"
      ]
    }
  };

  const currentToolDetails = toolDetails[tool.name] || {};

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <header className="flex items-center mb-8 space-x-6">
          {tool.icon}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{tool.name}</h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Base Científica
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {currentToolDetails.scientificBase?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Tecnologías Clave
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentToolDetails.keyTechnologies?.map((tech, index) => (
              <div 
                key={index} 
                className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Modelos Matemáticos
          </h2>
          <div className="bg-black text-white rounded-lg p-6">
            {currentToolDetails.mathematicalModels?.map((model, index) => (
              <div 
                key={index} 
                className="mb-3 last:mb-0 border-b border-gray-800 pb-3 last:border-b-0"
              >
                {model}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Aplicaciones
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentToolDetails.applications?.map((app, index) => (
              <div 
                key={index} 
                className="bg-green-100 text-green-900 rounded-lg p-4 hover:bg-green-200 transition"
              >
                {app}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolDetail;