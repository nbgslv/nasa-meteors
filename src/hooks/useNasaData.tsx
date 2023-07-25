import React, { useEffect, useState } from 'react';

type MeteoriteRaw = {
  id: string;
  name: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
}

type Meteorite = {
  id: number;
  name: string;
  nametype: string;
  recclass: string;
  mass: number;
  fall: string;
  year: Date;
  reclat: number;
  reclong: number;
}

const useNasaData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [rawData, setRawData] = useState<Meteorite[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://data.nasa.gov/resource/y77d-th95.json');
        const data = await response.json();
        const meteoriteData = data.map((meteorite: MeteoriteRaw) => ({
          id: parseInt(meteorite.id),
          name: meteorite.name,
          nametype: meteorite.nametype,
          recclass: meteorite.recclass,
          mass: parseInt(meteorite.mass),
          fall: meteorite.fall,
          year: new Date(meteorite.year),
          reclat: parseFloat(meteorite.reclat),
          reclong: parseFloat(meteorite.reclong)
        }));
        setRawData(meteoriteData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    rawData
  };
};

export default useNasaData;