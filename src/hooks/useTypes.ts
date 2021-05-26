import { useEffect, useState } from "react";
import { api } from "../services/api";

const useTypes = () => {
  const backupTypes = [
    "Vegetais",
    "Frutas",
    "Naturais",
    "Coloniais",
    "Artesanais",
  ];

  const [types, setTypes] = useState<string[]>(backupTypes);

  useEffect(() => {
    (async () => {
      await get();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = async () => {
    try {
      const { data } = await api.get("/type");

      setTypes(data);
    } catch (error) {
      console.log(error);
      setTypes([...backupTypes]);
    }
  };

  return { types };
};

export { useTypes };
