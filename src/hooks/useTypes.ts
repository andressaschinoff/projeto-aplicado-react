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
    const { data, status } = await api.get("/type");

    if (status !== 200) {
      setTypes([...backupTypes]);
      return;
    }
    setTypes(data);
  };

  return { types };
};

export { useTypes };
