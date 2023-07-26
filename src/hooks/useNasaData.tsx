import { useEffect, useState } from 'react';

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
  const [filteredData, setFilteredData] = useState<Meteorite[]>([]);
  const [year, setYear] = useState<number>(-1);
  const [mass, setMass] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        setFilteredData(meteoriteData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!year) {
      setFilteredData(rawData);
      setErrorMessage('');
    } else {
      setFilteredData(
        rawData.filter((meteorite) => meteorite.year.getFullYear() === year)
      );
    }
  }, [year])

  useEffect(() => {
    if (isNaN(mass)) {
      setFilteredData(rawData.filter((meteorite) => meteorite.year.getFullYear() === year));
    } else {
      const meteoritesWithMass =
        rawData
          .filter((meteorite) =>
            meteorite.mass >= mass && meteorite.year.getFullYear() === year
          );
      if (meteoritesWithMass.length === 0 && year > 0) {
        // If not meteorites with mass, reset year and data
        const resetData =
          rawData
            .filter((meteorite) => meteorite.mass >= mass)
            .sort((a, b) => a.year.getFullYear() - b.year.getFullYear());
        const resetYear = resetData[0]?.year.getFullYear();
        setYear(resetYear);
        setFilteredData(
          resetData.filter((meteorite) => meteorite.year.getFullYear() === resetYear)
        );
        setErrorMessage('The mass was not found, jumping to first-year where there is a mass that fits the criteria');
      } else {
        setFilteredData(meteoritesWithMass);
      }
    }
  }, [mass])

  const getYears = (): number[] => {
    const years = rawData.map((meteorite) => meteorite.year.getFullYear()).filter((year) => year != null && !isNaN(year));
    // @ts-ignore
    return [...new Set(years)].sort((a, b) => a - b);
  }

  return {
    loading,
    setYear,
    year,
    setMass,
    yearsArray: getYears(),
    filteredData,
    errorMessage,
    resetErrorMessage: () => setErrorMessage('')
  };
};

export default useNasaData;