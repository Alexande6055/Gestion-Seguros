
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SolicitudAsesor {
  id: string;
  fecha: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  email: string;
  mensaje: string;
}

interface SolicitudesContextType {
  solicitudes: SolicitudAsesor[];
  agregarSolicitud: (solicitud: Omit<SolicitudAsesor, 'id' | 'fecha'>) => void;
  eliminarSolicitud: (id: string) => void;
}

const SolicitudesContext = createContext<SolicitudesContextType | undefined>(undefined);

export const useSolicitudes = () => {
  const context = useContext(SolicitudesContext);
  if (!context) {
    throw new Error('useSolicitudes debe ser usado dentro de un SolicitudesProvider');
  }
  return context;
};

interface SolicitudesProviderProps {
  children: ReactNode;
}

export const SolicitudesProvider: React.FC<SolicitudesProviderProps> = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState<SolicitudAsesor[]>([]);

  const agregarSolicitud = (solicitudData: Omit<SolicitudAsesor, 'id' | 'fecha'>) => {
    const nuevaSolicitud: SolicitudAsesor = {
      ...solicitudData,
      id: Date.now().toString(),
      fecha: new Date().toISOString().split('T')[0],
    };
    setSolicitudes(prev => [nuevaSolicitud, ...prev]);
  };

  const eliminarSolicitud = (id: string) => {
    setSolicitudes(prev => prev.filter(solicitud => solicitud.id !== id));
  };

  return (
    <SolicitudesContext.Provider value={{
      solicitudes,
      agregarSolicitud,
      eliminarSolicitud
    }}>
      {children}
    </SolicitudesContext.Provider>
  );
};
