import { omegaModules } from "./mock/modules";

export function getModuleById(id: string) {
  const moduleDefinition = omegaModules.find((item) => item.id === id);

  if (!moduleDefinition) {
    throw new Error(`OMEGA module not registered: ${id}`);
  }

  return moduleDefinition;
}
