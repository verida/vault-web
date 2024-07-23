import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { DataSchema } from "../types";

export const useDataSchema = (schemaUrl?: string) => {
  const fetchDataSchema = useCallback(async () => {
    if (!schemaUrl) return;
    else {
      const res = await fetch(schemaUrl, { method: "GET" });
      const schema: DataSchema = await res.json();
      schema.properties = (schema as any).allOf[1].properties;
      return schema;
    }
  }, [schemaUrl]);

  const {
    data: dataSchema,
    isPending: isDataSchemaPending,
    isError: isDataSchemaError,
  } = useQuery({
    queryKey: ["data", "schema", schemaUrl],
    queryFn: fetchDataSchema,
  });

  return {
    dataSchema,
    isDataSchemaPending,
    isDataSchemaError,
  };
};
