/**
 * Predefined templates for various stages of the Guardianes del Agua project.
 * These templates are used by the ActionBar to quickly insert scaffolded
 * prompts or guides into the chat. Each entry should be concise and written
 * in Spanish to align with the rest of the app.
 */
export const TEMPLATES = {
  /**
   * Misión: invita al alumno a formular una pregunta medible basada en un
   * problema de inundación observado. El maestro puede adaptar este texto
   * según sea necesario.
   */
  mission: `Inicio de la Misión:\nDescribe un problema de inundación que hayas visto en tu comunidad y transforma esa observación en una pregunta medible. Por ejemplo: ¿Cuántos litros de agua se acumulan en tal calle después de 10 minutos de lluvia?`,

  /**
   * Bitácora: recordatorio para que el alumno documente su proceso y datos.
   */
  bitacora: `Bitácora del proyecto:\nRegistra aquí tus observaciones, datos de campo, fechas, bocetos y avances de la maqueta. Describe también cualquier experimento que realices y los resultados obtenidos.`,

  /**
   * Plan de Ataque: guía al alumno a listar acciones, materiales y
   * herramientas matemáticas necesarias para responder su pregunta.
   */
  plan: `Plan de Ataque:\n1. Acciones: ¿Qué pasos debes seguir para responder tu pregunta?\n2. Materiales: Enumera los materiales reutilizables que necesitarás para tu maqueta.\n3. Matemáticas: ¿Qué herramientas matemáticas usarás? (Área, Volumen, Promedios, Gráficas, etc.)`,

  /**
   * Licencia: mensaje motivador que indica que el alumno puede comenzar a
   * construir su maqueta tras completar el plan.
   */
  license: `¡Felicidades!\nHan completado su Plan de Ataque y obtenido su Licencia para Construir. Ahora pueden empezar la construcción de su maqueta.`,
} as const;